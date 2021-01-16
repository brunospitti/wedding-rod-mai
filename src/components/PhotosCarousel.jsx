import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import BackgroundImage from 'gatsby-background-image';
import { useStaticQuery, graphql } from 'gatsby';

import { breakpoints, colors } from '../assets/globalStyles';
import { useTheme } from './hooks/Theme/useTheme';

import { NonStretchedImg } from './helpers/NonStretchedImg';

export const PhotosCarousel = () => {
  const { theme } = useTheme();

  const { photos, pattern } = useStaticQuery(graphql`
    query PhotosCarousel {
      photos: allImageSharp(
        filter: { fluid: { originalName: { regex: "/^carousel/" } } }
        sort: { fields: fluid___originalName }
      ) {
        edges {
          node {
            id
            fluid(maxWidth: 1000) {
              originalName
              presentationWidth
              ...GatsbyImageSharpFluid
            }
          }
        }
      }

      pattern: file(relativePath: { eq: "pattern.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <StyledCarousel>
      <StyledPattern
        theme={theme}
        fluid={pattern.childImageSharp.fluid}
        background="white"
      />

      <Carousel
        swipeScrollTolerance={2}
        swipeable
        emulateTouch
        infiniteLoop
        centerMode
        // autoPlay
        centerSlidePercentage={50}
        showArrows={true}
        showStatus={false}
        showThumbs={false}
      >
        {photos.edges.map(({ node: { fluid } }) => (
          <NonStretchedImg key={fluid.originalName} fluid={fluid} />
        ))}
      </Carousel>
    </StyledCarousel>
  );
};

// styled components
const StyledCarousel = styled.div`
  margin: 6.5em 0;
  position: relative;
  @media ${breakpoints.tabletSmall} {
    width: calc(100% + 20px);
    margin-left: -10px;
  }
  .carousel-root {
    .carousel {
      .slider {
        height: 600px;
        align-items: center;
        @media ${breakpoints.mobile} {
          height: 450px;
        }
        @media ${breakpoints.mobileSmall} {
          height: 350px;
        }
        .slide {
          background: transparent;
          .gatsby-image-wrapper {
            transition: all 0.25s ease;
            height: 300px !important;
            max-height: 300px !important;
            max-width: 80% !important;
            width: 80% !important;
            @media ${breakpoints.tabletSmall} {
              height: 250px !important;
              max-height: 250px !important;
              max-width: 55% !important;
              width: 55% !important;
            }
            @media ${breakpoints.mobile} {
              height: 200px !important;
              max-height: 200px !important;
              max-width: 50% !important;
              width: 50% !important;
            }
            @media ${breakpoints.mobileSmall} {
              max-width: 100% !important;
              width: 100% !important;
            }
          }
          &.selected {
            .gatsby-image-wrapper {
              border: 6px solid #cccccc;
              height: 500px !important;
              max-height: 500px !important;
              width: 100% !important;
              max-width: 100% !important;
              @media ${breakpoints.tabletSmall} {
                width: 130% !important;
                max-width: 130% !important;
                margin-left: -15% !important;
              }
              @media ${breakpoints.mobile} {
                z-index: 9;
                height: 400px !important;
                max-height: 400px !important;
                width: 150% !important;
                max-width: 150% !important;
                margin-left: -25% !important;
              }
              @media ${breakpoints.mobileSmall} {
                height: 320px !important;
                max-height: 320px !important;
                width: 200% !important;
                max-width: 200% !important;
                margin-left: -50% !important;
              }
            }
          }
        }
      }
      .control-dots {
        background: rgba(255, 255, 255, 0.6);
        width: 575px;
        padding: 10px;
        margin: auto;
        position: relative;
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        @media ${breakpoints.mobile} {
          width: 100%;
        }
        .dot {
          background: ${colors.secondary};
          box-shadow: none;
          margin: auto;

          &.selected {
            width: 12px;
            height: 12px;
          }
        }
      }
      .control-prev.control-arrow:before {
        border-right-width: 12px;
      }
      .control-next.control-arrow:before {
        border-left-width: 12px;
      }
      &.carousel-slider .control-arrow {
        opacity: 1;
        &:hover {
          background: rgba(42, 88, 84, 0.3);
        }
      }
    }
  }
`;

const StyledPattern = styled(BackgroundImage)`
  background-size: contain;
  display: block;
  background-color: white;
  background-position: left;
  position: absolute !important;
  width: 100%;
  height: 660px !important;
  background-repeat: repeat-x !important;
  opacity: 0.3 !important;
  &:before,
  &:after {
    box-shadow: 0 0 20px 30px ${(props) => props.theme.bg} inset;
  }
`;
