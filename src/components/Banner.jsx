import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import format from 'date-fns/format';

import { breakpoints, fontFamilyNames } from '../assets/globalStyles';
import { BgImage } from './BgImage';

export const Banner = ({ banner }) => {
  const bannerDate = new Date(banner.date);
  const daysLeft = differenceInCalendarDays(bannerDate, new Date());
  const daysLeftDisplay = banner.days_left.replace('{days_left}', daysLeft);

  const {
    allFile: {
      childImageSharp: { fixed },
    },
  } = useStaticQuery(graphql`
    query BannerImage {
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
    <StyledBannerWrapper>
      <BgImage fixedImage={fixed}>
        <StyledTitle>
          <span id="title">{banner.title}</span>
          <span id="date">{format(bannerDate, 'dd.MM.yyyy')}</span>
          <span id="days-left">{daysLeftDisplay}</span>
        </StyledTitle>
      </BgImage>
    </StyledBannerWrapper>
  );
};

// styled components

const StyledBannerWrapper = styled.div`
  width: 100%;
  height: 650px;
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
      font-family: ${fontFamilyNames};
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
