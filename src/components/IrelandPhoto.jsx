import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import { useTheme } from './hooks/Theme/useTheme';
import { BgImage } from './BgImage';

export const IrelandPhoto = ({ photo }) => {
  const { theme } = useTheme();

  return (
    <StyledIrelandPhotoWrapper theme={theme}>
      <div className="background-strip"></div>
      <div className="image-holder">
        <BgImage fixedImage={photo.childImageSharp.fixed} />
      </div>
    </StyledIrelandPhotoWrapper>
  );
};

// styled components

const StyledIrelandPhotoWrapper = styled.div`
  display: flex;
  justify-content: center;
  .background-strip {
    position: absolute;
    width: 100%;
    height: 200px;
    background: ${({ theme }) => theme.tertiary};
    top: 140px;
  }
  .image-holder {
    width: 100%;
    height: 520px;
    max-width: 670px;
  }
`;
