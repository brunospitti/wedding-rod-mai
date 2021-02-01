import FontFaceObserver from 'fontfaceobserver';
import React, { useState, useEffect } from 'react';
import Loadable from 'react-loadable';
import { useStaticQuery, graphql } from 'gatsby';

import styled from 'styled-components';
import { breakpoints } from '../assets/globalStyles';
import { Layout } from '../components/helpers/Layout';
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
      },
      form = {
        subTitle: '',
      },
      friends = [],
      parents = [],
      byOurSide = {},
      presents = {},
      ourStory = {},
      invite = {},
      welcome = {},
      finalPhrase = {},
    },
    setNormalizedData,
  ] = useState({});

  useEffect(() => {
    setNormalizedData(dataNormalize(data));
    setDataLoaded(true);
  }, [data]);

  const { pattern } = useStaticQuery(graphql`
    query Pattern {
      pattern: file(relativePath: { eq: "pattern.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid
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

  const LoadablePhotosCarousel = Loadable({
    loader: () => import('./PhotosCarousel'),
    loading: () => <div>loading</div>,
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
          <Banner banner={banner} pattern={pattern} />
          <Section>
            <TextSection
              title={welcome.title}
              subTitle={welcome.subTitle}
              description={welcome.description}
            />
          </Section>
          <SectionRaw>
            <IrelandPhoto />
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
            <LoadablePhotosCarousel pattern={pattern} />
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
          </Section>
        </div>

        <div className="loading">loading</div>
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
`;
