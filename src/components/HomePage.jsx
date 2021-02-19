import FontFaceObserver from 'fontfaceobserver';
import React, { useState, useEffect } from 'react';
import Loadable from 'react-loadable';
import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import styled from 'styled-components';
import { breakpoints } from '../assets/globalStyles';
import { Layout } from '../components/helpers/Layout';
import { Loading } from '../components/Loading';
import { Banner } from '../components/Banner';
import { TextSection } from '../components/TextSection';
import { dataNormalize } from '../helpers/dataNormalize';
import { IrelandPhoto } from './IrelandPhoto';
import { Invite } from './Invite';
import { Presents } from './Presents';
import { ByOurSide } from './ByOurSide';
import { Form } from './Form';

import { Section, SectionRaw } from './helpers/Section';

export const HomePage = ({ data }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [
    {
      banner = {
        date: new Date(),
        daysLeft: '',
        image: { childImageSharp: { fixed: '' } },
      },
      ireland = {},
      form = {
        subTitle: '',
      },
      friends = [],
      parents = [],
      byOurSide = {},
      presents = {},
      ourStory = {},
      invite = {},
      welcome = {
        image: { childImageSharp: { fixed: '' } },
      },
      finalPhrase = {},
    },
    setNormalizedData,
  ] = useState({});

  useEffect(() => {
    setNormalizedData(dataNormalize(data));
    setDataLoaded(true);
  }, [data]);

  const { pattern, frame, heart, clover } = useStaticQuery(graphql`
    query HomePageImages {
      pattern: file(relativePath: { eq: "pattern.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      frame: file(relativePath: { eq: "frame-test.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      heart: file(relativePath: { eq: "heart.png" }) {
        childImageSharp {
          fixed(height: 55, quality: 90) {
            originalName
            ...GatsbyImageSharpFixed
          }
        }
      }

      clover: file(relativePath: { eq: "clover.png" }) {
        childImageSharp {
          fixed(height: 64, quality: 90) {
            originalName
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const font = new FontFaceObserver('Hello Beautiful');

  font.load().then(
    function () {
      setFontLoaded(true);
    },
    function () {
      setFontLoaded(true);
    }
  );

  const LoadableLoading = () => <div>loading</div>;

  const LoadablePhotosCarousel = Loadable({
    loader: () => import('./PhotosCarousel'),
    // eslint-disable-next-line react/display-name
    loading: () => <LoadableLoading />,
    render(loaded, props) {
      let Component = loaded.PhotosCarousel;
      return <Component {...props} />;
    },
  });

  const classNames = `HomePage ${fontLoaded && dataLoaded ? 'loaded' : ''}`;

  return (
    <Layout>
      <StyledHomePage className={classNames}>
        <div className="content">
          <Banner banner={banner} pattern={pattern} heart={heart} />
          <Section>
            <TextSection
              title={welcome.title}
              subTitle={welcome.subTitle}
              description={welcome.description}
            />
          </Section>
          <SectionRaw>
            <IrelandPhoto photo={welcome.image} ireland={ireland} />
          </SectionRaw>
          <SectionRaw>
            <Invite invite={invite} />
          </SectionRaw>
          <Section>
            <TextSection
              title={ourStory.title}
              subTitle={ourStory.subTitle}
              description={ourStory.description}
            />
            <LoadablePhotosCarousel pattern={frame} />
          </Section>
          <Section>
            <Presents presents={presents} />
          </Section>
          <Section>
            <ByOurSide byOurSide={byOurSide} friends={friends} parents={parents} />
          </Section>
          <SectionRaw>
            <Form form={form} />
          </SectionRaw>
          <Section>
            <TextSection
              title={finalPhrase.title}
              subTitle={finalPhrase.subTitle}
              description={finalPhrase.description}
            />
            <div className="rings-holder">
              <BackgroundImage
                className="background-image"
                Tag="div"
                fixed={clover?.childImageSharp?.fixed}
                backgroundColor="transparent"
              />
            </div>
          </Section>
        </div>

        <div className="loading">
          <Loading heart={heart} />
        </div>
      </StyledHomePage>
    </Layout>
  );
};

const StyledHomePage = styled.div`
  .loading {
    display: block;
  }
  .content {
    display: none;
  }
  &.loaded {
    .loading {
      display: none;
    }
    .content {
      display: block;
    }
  }

  .rings-holder {
    display: flex;
    justify-content: center;
  }
`;
