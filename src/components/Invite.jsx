import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import differenceInDays from 'date-fns/differenceInDays';
import BackgroundImage from 'gatsby-background-image';

import { breakpoints, colors, fontFamilyTitle } from '../assets/globalStyles';

export const Invite = ({
  name,
  info,
  fazendaImages,
  sunImage,
  photoImage,
  flowerInviteBackground,
  flowerInviteBackgroundTablet,
  flowerInviteBackgroundMobile,
}) => {
  const daysLeft = differenceInDays(new Date(2021, 11, 18), new Date());
  const [showPictures, setShowPictures] = useState(false);

  function useHideOutsideClick(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          event.target.parentNode.className !== 'show-pictures'
        ) {
          setShowPictures(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useHideOutsideClick(wrapperRef);

  const ImageToRender = showPictures ? StyledFazendaImageOpen : StyledFazendaImage;

  const flowerBackgrounds = [
    flowerInviteBackground,
    {
      ...flowerInviteBackgroundTablet,
      media: breakpoints.tabletSmall,
    },
    {
      ...flowerInviteBackgroundMobile,
      media: breakpoints.mobileSmall,
    },
  ];

  return (
    <StyledInviteWrapper>
      <StyledInvite colors={colors}>
        <StyledFlowerBackground fluid={flowerBackgrounds} data-loading="eager" />
        <div className="invite-border">
          <div className="invite-background">
            <div className="invite-content">
              <StyledInviteMain>
                <div className="invite-side invite-left">
                  <div className="title">{`${name || info.hello},`}</div>
                  <div className="we-invite-you">{info.invite}</div>
                  <div className="info">
                    <div className="date">{info.weddingDate}</div>
                    <div className="info--sub">
                      <div className="place">
                        <span>Fazenda Fagundes</span>Rodovia Arão Sahm, 1632-1748,
                        Mairiporã SP
                      </div>
                      <div className="time">
                        <div className="begin">
                          {info.starts}: <span>16</span> hrs
                        </div>
                        <div className="end">
                          {info.ends}: <span>02</span> hrs
                        </div>
                      </div>
                    </div>
                    <div className="dress-code">*{info.dress_code}</div>
                  </div>
                </div>
                <div className="invite-side invite-right">
                  {info.countdown_still} <span id="days">{daysLeft}</span>{' '}
                  {info.countdown_days}
                </div>
              </StyledInviteMain>

              <StyledInviteFooter>
                <div className="temperature">
                  <StyledSunImage fluid={sunImage} />
                  <div className="info">
                    <span id="title">{info.weather_title}</span>
                    <div>
                      <span>{info.weather_min} 18° C</span>
                      <span>{info.weather_max} 25° C</span>
                      <span>{info.weather_prec} 4.4mm</span>
                    </div>
                  </div>
                </div>
                <div
                  className="show-pictures"
                  onClick={() => setShowPictures(!showPictures)}
                >
                  <StyledPhotoImage fluid={photoImage} />
                  <span>{info.show_pictures}</span>
                </div>
              </StyledInviteFooter>
            </div>
          </div>
        </div>
        <StyledFazenda className={showPictures && 'show-fazenda'} ref={wrapperRef}>
          {fazendaImages.edges.map(({ node: { fluid } }) => (
            <ImageToRender
              backgroundColor={`#a7ceca`}
              key={fluid.originalName}
              fluid={fluid}
            />
          ))}
        </StyledFazenda>
      </StyledInvite>
    </StyledInviteWrapper>
  );
};

// styled components
const StyledInviteWrapper = styled.div`
  margin: 22em 0;
  @media ${breakpoints.desktop} {
    margin: 18em 0;
  }
  @media ${breakpoints.desktopSmall} {
    margin: 14em 0;
  }
  @media ${breakpoints.desktopExtraSmall} {
    margin: 12em 0;
  }
`;

const StyledInvite = styled.div`
  width: 70%;
  height: 500px;
  margin: 15% auto;
  background: ${colors.primary};
  padding: 20px;
  @media ${breakpoints.desktopSmall} {
    width: 80%;
    margin: 10% auto;
    padding: 15px;
  }
  @media ${breakpoints.desktopExtraSmall} {
    width: 88%;
    height: 460px;
    margin: 6% auto;
    padding: 15px;
  }
  @media ${breakpoints.tabletSmall} {
    height: 800px;
  }
  @media ${breakpoints.mobileSmall} {
    width: 100%;
    height: 760px;
    padding: 7px;
  }
  .invite-border {
    position: relative;
    background: radial-gradient(
        ellipse farthest-corner at right bottom,
        #fedb37 0%,
        #fdb931 8%,
        #daccae 30%,
        #b9984d 40%,
        transparent 80%
      ),
      radial-gradient(
        ellipse farthest-corner at left top,
        #d2d28b 0%,
        #debf69 8%,
        #d1b464 25%,
        #756439 62.5%,
        #7f7151 100%
      );
    padding: 5px;
    width: 100%;
    height: 100%;
    @media ${breakpoints.mobileSmall} {
      padding: 4px;
    }
  }
  .invite-background {
    height: 100%;
    background: white;
    padding: 2em 2em 1em;
    position: relative;
    @media ${breakpoints.mobile} {
      padding: 1.5em 1em;
    }
    @media ${breakpoints.mobileSmall} {
      padding: 1em 0.5em;
    }
    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 80%;
      height: 100%;
      top: 0;
      background: linear-gradient(
        286deg,
        ${({ colors }) => colors.bgColor} 0%,
        ${({ colors }) => colors.bgColor} 48%,
        transparent 48.2%,
        transparent 100%
      );
      right: 0;
      @media ${breakpoints.tabletSmall} {
        width: 100%;
        height: 80%;
        margin-top: 4%;
        background: linear-gradient(
          -7deg,
          ${({ colors }) => colors.bgColor} 0%,
          ${({ colors }) => colors.bgColor} 46%,
          transparent 46.2%,
          transparent 100%
        );
      }
      @media ${breakpoints.mobile} {
        height: 77%;
      }
    }
  }
  .invite-content {
    position: relative;
    z-index: 9;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

const StyledFlowerBackground = styled(BackgroundImage)`
  display: block;
  position: absolute !important;
  width: 100%;
  height: 885px;
  margin: -200px -17%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  @media ${breakpoints.desktop} {
    width: 100%;
    height: 810px;
    margin: -168px -16%;
  }
  @media ${breakpoints.desktopSmall} {
    width: 110%;
    height: 730px;
    margin: -130px -15%;
  }
  @media ${breakpoints.desktopExtraSmall} {
    width: 115%;
    height: 650px;
    margin: -110px -15%;
  }
  @media ${breakpoints.tablet} {
    width: 120%;
    height: 600px;
    margin: -90px -19%;
  }
  @media ${breakpoints.tabletSmall} {
    width: 120%;
    height: 1020px;
    margin: -110px -16%;
  }
  @media ${breakpoints.mobile} {
    margin: -115px -56%;
    width: 200%;
    height: 1000px;
  }
  @media ${breakpoints.mobileSmall} {
    margin: -100px -41%;
    width: 190%;
  }
`;

const StyledInviteMain = styled.div`
  display: flex;
  height: 100%;
  font-weight: 300;
  @media ${breakpoints.tabletSmall} {
    flex-direction: column;
  }
  @media ${breakpoints.mobile} {
    font-size: 0.9em;
  }
  @media ${breakpoints.mobile} {
    margin-bottom: 2em;
  }
  @media ${breakpoints.mobileSmall} {
    font-size: 0.8em;
    margin-bottom: 1.2em;
  }
  .invite-side {
    &.invite-left {
      flex: 1;
      font-size: 0.7em;
      @media ${breakpoints.tabletSmall} {
        text-align: center;
      }
      .title {
        font-size: 3em;
        text-transform: capitalize;
        @media ${breakpoints.mobileSmall} {
          font-size: 2.8em;
        }
      }
      .we-invite-you {
        font-size: 2em;
        margin-top: 0.5em;
      }
      .info {
        margin-top: 2.7em;
        font-size: inherit;
        @media ${breakpoints.mobile} {
          margin-top: 4em;
        }
        @media ${breakpoints.mobileSmall} {
          margin-top: 3em;
        }
        .date {
          font-size: 3em;
          @media ${breakpoints.mobileSmall} {
            font-size: 2.5em;
          }
        }
        .info--sub {
          display: flex;
          margin-top: 1em;
          align-items: center;
          @media ${breakpoints.tabletSmall} {
            display: inline-flex;
          }
          @media ${breakpoints.mobile} {
            font-size: 1.3em;
          }
          @media ${breakpoints.mobileSmall} {
            flex-direction: column;
          }
          .place {
            font-size: 1em;
            width: 15em;
            letter-spacing: 0.115em;
            @media ${breakpoints.mobileSmall} {
              font-size: 1.15em;
            }
            span {
              font-size: 1.5em;
              display: block;
              margin-bottom: 0.2em;
              letter-spacing: 0.115em;
            }
          }
          .time {
            border-left: 1px solid #ababab;
            padding: 0.3em 0 1.5em 1em;
            margin-left: 1em;
            font-size: 0.8em;
            text-align: center;
            @media ${breakpoints.mobileSmall} {
              font-size: 1em;
              margin: 1.3em 0 0.3em;
              display: flex;
              align-items: baseline;
              border: 0;
              padding: 0;
            }
            .begin,
            .end {
              font-size: 0.9em;
            }
            .begin {
              margin-bottom: 0.3em;
              @media ${breakpoints.mobileSmall} {
                margin-right: 1em;
                padding-right: 1em;
                padding-bottom: 0.6em;
                border-right: 1px solid #ababab;
              }
            }
            .end {
              span {
                font-size: 1.75em;
                @media ${breakpoints.mobileSmall} {
                  font-size: 2.5em;
                }
              }
            }
            span {
              font-size: 4em;
              @media ${breakpoints.mobileSmall} {
                font-size: 2.5em;
              }
            }
          }
        }
        .dress-code {
          margin-top: 0.7em;
          font-size: 1.2em;
        }
      }
    }
    &.invite-right {
      margin-top: -0.7em;
      width: 31%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 1em;
      font-size: 2.25em;
      text-transform: uppercase;
      @media ${breakpoints.tablet} {
        font-size: 1.95em;
      }
      @media ${breakpoints.tabletSmall} {
        width: 100%;
        margin: 0;
        flex: 1;
      }
      span {
        font-family: ${fontFamilyTitle};
        font-size: 5em;
        line-height: 0.9;
        letter-spacing: 0.2em;
        margin: -0.1em 0 0.1em 0.2em;
      }
    }
  }
`;

const StyledInviteFooter = styled.div`
  margin-top: auto;
  display: flex;
  @media ${breakpoints.tabletSmall} {
    flex-direction: column;
  }
  > div {
    display: flex;
    align-items: center;
    span {
      font-size: 0.8em;
    }
    &.temperature {
      flex: 1;
      @media ${breakpoints.tabletSmall} {
        margin-bottom: 1.3em;
      }
      span {
        margin-right: 1em;
        &#title {
          margin-right: 0;
          font-weight: 600;
          display: block;
        }
      }
    }
    &.show-pictures {
      flex-basis: 34%;
      margin-right: auto;
      cursor: pointer;
      border-bottom: 1px solid transparent;
      transition: all 0.25s ease;
      @media ${breakpoints.tabletSmall} {
        flex-basis: 100%;
        width: 72%;
      }
      @media ${breakpoints.mobile} {
        width: 100%;
      }
      &:hover {
        border-bottom: 1px solid;
      }
    }
  }
`;

const StyledSunImage = styled(BackgroundImage)`
  display: inline-block;
  height: 30px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 0.5em;
  width: 30px;
`;

const StyledPhotoImage = styled(BackgroundImage)`
  display: inline-block;
  height: 30px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 55px;
  margin-right: 0.75em;
`;

const StyledFazenda = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 1em;
  background: white;
  opacity: 0;
  height: 0px;
  transition: all 0.5s ease;
  @media ${breakpoints.tabletSmall} {
    flex-wrap: wrap;
    z-index: 999;
    justify-content: space-around;
  }
  &.show-fazenda {
    height: auto;
    opacity: 1;
  }
`;

const StyledFazendaImage = styled(BackgroundImage)`
  width: 18%;
  max-width: 200px;
  height: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  transition: all 0.25s ease;
  background-size: cover;
  @media ${breakpoints.tabletSmall} {
    &:last-child {
      display: none;
    }
  }
`;

const StyledFazendaImageOpen = styled(StyledFazendaImage)`
  height: 200px;
  @media ${breakpoints.desktop} {
    height: 170px;
  }
  @media ${breakpoints.desktopSmall} {
    height: 150px;
  }
  @media ${breakpoints.desktopExtraSmall} {
    height: 140px;
  }
  @media ${breakpoints.tabletSmall} {
    width: 48%;
    max-width: 48%;
    margin-bottom: 10px;
    height: 160px;
    &:last-child {
      display: none;
    }
  }
  @media ${breakpoints.mobileSmall} {
    height: 140px;
  }
`;
