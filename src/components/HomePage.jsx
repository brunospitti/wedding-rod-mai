import FontFaceObserver from 'fontfaceobserver';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { breakpoints, colors } from '../assets/globalStyles';
import { Layout } from '../components/helpers/Layout';
import { Banner } from '../components/Banner';
import { TextSection } from '../components/TextSection';
import { dataNormalize } from '../helpers/dataNormalize';

export const HomePage = ({ data }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [
    {
      banner = {},
      form = {},
      friends = {},
      parents = {},
      by_our_side: byOurSide = {},
      presents = {},
      our_history: ourHistory = {},
      invite = {},
      welcome = {},
    },
    setNormalizedData,
  ] = useState({});

  useEffect(() => {
    setNormalizedData(dataNormalize(data));
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

  // console.log('🚀 ~ banner', banner);
  // console.log('🚀 ~ form', form);
  // console.log('🚀 ~ friends', friends);
  // console.log('🚀 ~ parents', parents);
  // console.log('🚀 ~ byOurSide', byOurSide);
  // console.log('🚀 ~ presents', presents);
  // console.log('🚀 ~ ourHistory', ourHistory);
  // console.log('🚀 ~ invite', invite);
  // console.log('🚀 ~ welcome', welcome);

  return (
    <Layout>
      {fontLoaded ? (
        <>
          <Banner banner={banner} />
          <TextSection
            title={welcome.title}
            subTitle={welcome.sub_title}
            description={welcome.description}
          />
        </>
      ) : (
        <div>loading</div>
      )}
    </Layout>
  );
};
