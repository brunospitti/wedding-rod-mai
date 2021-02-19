import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import format from 'date-fns/format';
import BackgroundImage from 'gatsby-background-image';

import { breakpoints, fontFamilyNames, fontFamilyTitle } from '../assets/globalStyles';
import { BgImage } from './BgImage';

export const Banner = ({ banner: bannerData, heart }) => {
  const bannerDate = new Date(bannerData.date);
  const daysLeft = differenceInCalendarDays(bannerDate, new Date());
  const daysLeftDisplay = bannerData.daysLeft.replace('{daysLeft}', daysLeft);

  const { calendar } = useStaticQuery(graphql`
    query Calendar {
      calendar: file(relativePath: { eq: "calendar.png" }) {
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
    <StyledBannerWrapper>
      <div className="banner-image-holder">
        <BgImage fixedImage={bannerData.image.childImageSharp.fixed}>
          <StyledBannerContent>
            <div className="text">
              <div className="days-left-holder">
                <div className="days-left">
                  <BackgroundImage fixed={calendar.childImageSharp.fixed} />
                  <span id="days-left-text">{daysLeftDisplay}</span>
                </div>
              </div>
              <div className="main-text">
                <span id="title">{bannerData.title}</span>
                <div className="date-holder">
                  <div className="date">
                    <span id="date-text">{format(bannerDate, 'dd.MM.yyyy')}</span>
                    <BackgroundImage fixed={heart.childImageSharp.fixed} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-overlay" />
          </StyledBannerContent>
        </BgImage>
      </div>
    </StyledBannerWrapper>
  );
};

// styled components

const StyledBannerWrapper = styled.div`
  width: 100%;
  height: 750px;
  position: relative;
  .banner-image-holder {
    height: 100%;
  }
`;

const StyledBannerContent = styled.div`
  position: relative;
  height: 100%;
  .bg-overlay {
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .text {
    position: absolute;
    width: 100%;
    height: 100%;

    .days-left-holder {
      display: flex;
      justify-content: flex-end;
      padding: 20px;
      .days-left {
        display: inline-flex;
        align-items: center;
        span {
          margin-left: 10px;
          font-size: 2em;
          font-family: ${fontFamilyTitle};
        }
      }
    }
    .main-text {
      transform: rotate(-5deg);
      padding-top: 100px;
      .date-holder {
        display: flex;
        justify-content: center;
        .date {
          display: inline-flex;
          align-items: center;
          span {
            letter-spacing: 5px;
            margin-right: 15px;
            font-family: ${fontFamilyNames};
            font-size: 4em;
          }
        }
      }
    }
    span {
      margin: auto;
      text-align: center;
      display: block;
      line-height: 1;
      color: white;
      &#title {
        font-family: ${fontFamilyNames};
        font-size: 7em;
      }
    }
  }
`;
