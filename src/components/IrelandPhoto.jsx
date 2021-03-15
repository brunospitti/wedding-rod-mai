import React from 'react';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';
import { useTheme } from './hooks/Theme/useTheme';
import { TextFromString } from './helpers/Content';
import { Section } from './helpers/Section';
import { breakpoints } from '../assets/globalStyles';
import { HeartDivider } from './HeartDivider';

export const IrelandPhoto = ({ photo, ireland }) => {
  const { theme } = useTheme();

  return (
    <StyledIrelandPhotoWrapper theme={theme}>
      <HeartDivider />

      <div className="ireland-section-holder">
        <Section className="ireland-section">
          {ireland.description && (
            <TextFromString className="text description" text={ireland.description} />
          )}

          <div className="image-holder">
            <StyledBackgroundImage
              className="background-image"
              Tag="div"
              fixed={photo.childImageSharp.fixed}
              backgroundColor="transparent"
            />
          </div>
        </Section>
      </div>
    </StyledIrelandPhotoWrapper>
  );
};

// styled components

const StyledIrelandPhotoWrapper = styled.div`
  .ireland-section-holder {
    background: ${({ theme }) => theme.irelandSectionBg};
    padding: 30px 0;
    .ireland-section {
      margin: 0;
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        @media ${breakpoints.tabletSmall} {
          flex-direction: column;
        }
      }
      .text.description {
        color: ${({ theme }) => theme.bg};
        font-weight: 400;
        flex: 1;
        @media ${breakpoints.tabletSmall} {
          text-align: center;
        }
      }

      .image-holder {
        width: 100%;
        height: 500px;
        max-width: 340px;
        margin-left: 100px;
        @media ${breakpoints.tabletSmall} {
          height: 350px;
          max-width: 340px;
          margin: 30px auto 0;
        }
        .background-image {
          background-size: contain;
        }
      }
    }
  }
`;

const StyledBackgroundImage = styled(BackgroundImage)`
  width: 100% !important;
  height: 100% !important;
  background-size: contain !important;
`;
