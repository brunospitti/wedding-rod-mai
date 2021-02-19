import React from 'react';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';
import { useTheme } from './hooks/Theme/useTheme';

export const BgImage = ({ fixedImage, fluidImage, children, backgroundColor }) => {
  const { theme } = useTheme();

  return (
    <StyledBgImage
      className="background-image"
      Tag="div"
      fixed={fixedImage}
      fluid={fluidImage}
      backgroundColor={backgroundColor || theme.primary}
      data-loading="eager"
    >
      {children}
    </StyledBgImage>
  );
};

// styled components

const StyledBgImage = styled(BackgroundImage)`
  width: 100% !important;
  height: 100% !important;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
