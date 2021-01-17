import FontFaceObserver from 'fontfaceobserver';
import React, { useState, useEffect } from 'react';
import Loadable from 'react-loadable';

import styled from 'styled-components';
import { breakpoints, colors } from '../assets/globalStyles';
import { Layout } from '../components/helpers/Layout';
import { Banner } from '../components/Banner';
import { TextSection } from '../components/TextSection';
import { dataNormalize } from '../helpers/dataNormalize';
import { IrelandPhoto } from './IrelandPhoto';
import { Invite } from './Invite';
import { Presents } from './Presents';
import { ByOurSide } from './ByOurSide';
import { Form } from './Form';

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
      return <Component />;
    },
  });

  const classNames = `HomePage ${fontLoaded && dataLoaded ? 'loaded' : ''}`;

  return (
    <Layout>
      <StyledHomePage className={classNames}>
        <div className="content">
          <Banner banner={banner} />
          <TextSection
            title={welcome.title}
            subTitle={welcome.subTitle}
            description={welcome.description}
          />
          <IrelandPhoto />
          <Invite invite={invite} />
          <TextSection
            title={ourStory.title}
            subTitle={ourStory.subTitle}
            description={ourStory.description}
          />
          <LoadablePhotosCarousel />
          <Presents presents={presents} />
          <ByOurSide byOurSide={byOurSide} friends={friends} parents={parents} />
          <Form form={form} />
          <TextSection
            title={finalPhrase.title}
            subTitle={finalPhrase.subTitle}
            description={finalPhrase.description}
          />
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
