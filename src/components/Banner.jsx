import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';
import Loadable from 'react-loadable';

import { breakpoints } from '../assets/globalStyles';

import { fontFamilyTitle } from '../assets/globalStyles';

const LoadableHeader = Loadable({
  loader: () => import('./Header'),
  loading: () => <div></div>,
  render(loaded, props) {
    let Component = loaded.Header;
    return <Component name={props.name} language={props.language} />;
  },
});

export const Banner = ({ date, name, language }) => (
  <StaticQuery
    query={graphql`
      query {
        allFile: file(relativePath: { eq: "banner.jpg" }) {
          childImageSharp {
            fixed(height: 650, quality: 100) {
              originalName
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={({
      allFile: {
        childImageSharp: { fixed },
      },
    }) => (
      <StyledBannerWrapper>
        <StyledBanner
          Tag="div"
          fixed={fixed}
          backgroundColor={`#a7ceca`}
          data-loading="eager"
        >
          <LoadableHeader name={name} language={language} />
          <StyledTitle>
            <span id="title">Vitória & Bruno</span>
            <span id="date">{date}</span>
          </StyledTitle>
        </StyledBanner>
      </StyledBannerWrapper>
    )}
  />
);

// styled components

const StyledBannerWrapper = styled.div`
  width: 100%;
  height: 650px;
`;
const StyledBanner = styled(BackgroundImage)`
  width: 100% !important;
  height: 100% !important;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const StyledTitle = styled.div`
  padding-top: 2em;
  @media ${breakpoints.mobile} {
    padding-top: 5em;
  }
  @media ${breakpoints.mobileSmall} {
    padding-top: 4em;
  }
  span {
    margin: auto;
    text-align: center;
    display: block;
    line-height: 1;
    color: white;
    &#title {
      font-family: ${fontFamilyTitle};
      width: 70%;
      font-size: 7em;
      margin-bottom: 0.15em;
      border-bottom: 2px solid;
      @media ${breakpoints.tabletSmall} {
        width: 80%;
      }
      @media ${breakpoints.mobile} {
        font-size: 5em;
      }
      @media ${breakpoints.mobileSmall} {
        font-size: 4.5em;
        line-height: 0.9em;
      }
    }
    &#date {
      font-size: 1.5em;
      @media ${breakpoints.mobile} {
        font-size: 1.25em;
      }
      @media ${breakpoints.mobileSmall} {
        font-size: 1em;
      }
    }
  }
`;
