import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import { BgImage } from './BgImage';

export const IrelandPhoto = () => {
  const {
    allFile: {
      childImageSharp: { fixed },
    },
  } = useStaticQuery(graphql`
    query IrelandPhoto {
      allFile: file(relativePath: { eq: "banner.jpg" }) {
        childImageSharp {
          fixed(height: 650, quality: 100) {
            originalName
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <StyledIrelandPhotoWrapper>
      <BgImage fixedImage={fixed} />
    </StyledIrelandPhotoWrapper>
  );
};

// styled components

const StyledIrelandPhotoWrapper = styled.div`
  width: 100%;
  height: 500px;
  max-width: 900px;
  display: block;
  margin: 100px auto;
`;
