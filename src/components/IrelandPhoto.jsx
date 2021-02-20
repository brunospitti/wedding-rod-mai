import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';
import { useTheme } from './hooks/Theme/useTheme';
import { TextFromString } from './helpers/Content';
import { Section } from './helpers/Section';
import { breakpoints } from '../assets/globalStyles';

export const IrelandPhoto = ({ photo, ireland }) => {
  const { theme } = useTheme();

  const { heartDivider } = useStaticQuery(graphql`
    query HeartDivider {
      heartDivider: file(relativePath: { eq: "heart-divider.png" }) {
        childImageSharp {
          fixed(height: 30, quality: 90) {
            originalName
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <StyledIrelandPhotoWrapper theme={theme}>
      <div className="heart-divider-holder">
        <StyledBackgroundImage
          className="heart-divider"
          Tag="div"
          fixed={heartDivider.childImageSharp.fixed}
          backgroundColor="transparent"
        />
      </div>
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
  .heart-divider-holder {
    height: 30px;
    margin-bottom: 100px;
  }
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
