import React from 'react';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';
import { useTheme } from './hooks/Theme/useTheme';
import { TextSection } from '../components/TextSection';
import { BgImage } from './BgImage';
import { breakpoints, fontFamilyTitle } from '../assets/globalStyles';

export const ByOurSide = ({ byOurSide, friends, parents }) => {
  const { theme } = useTheme();

  const [activePictures, setActivePictures] = React.useState(parents);

  return (
    <StyledByOurSide theme={theme}>
      <TextSection
        title={byOurSide.title}
        subTitle={byOurSide.sub_title}
        description={byOurSide.description}
      />

      <div className="godfathers-holder">
        <div className="buttons-holder">
          <button
            className={activePictures === parents ? 'active' : null}
            onClick={() => setActivePictures(parents)}
          >
            {byOurSide.parents_title}
          </button>
          <button
            className={activePictures === friends ? 'active' : null}
            onClick={() => setActivePictures(friends)}
          >
            {byOurSide.friends_title}
          </button>
        </div>
        <div className="pictures-holder">
          {activePictures.map((person) => {
            return (
              <div className="person-holder" key={person.title}>
                <div className="image-holder">
                  <BgImage
                    fixedImage={person.image.childImageSharp.fixed}
                    backgroundColor="transparent"
                  />
                </div>
                <div className="name">{person.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </StyledByOurSide>
  );
};

// styled components

const StyledByOurSide = styled.div`
  .buttons-holder {
    display: flex;
    justify-content: space-around;
    width: 80%;
    margin: 0 auto 20px;
    button {
      padding: 0 30px 5px;
      font-family: ${fontFamilyTitle};
      font-size: 2em;
      color: ${(props) => props.theme.primary};
      background: transparent;
      cursor: pointer;
      border: 0;
      transition: 0.25s all ease;
      border-bottom: 4px solid transparent;
      &.active,
      &:hover {
        border-bottom-color: ${(props) => props.theme.tertiary};
      }
    }
  }
  .image-holder {
    height: 150px;
    width: 150px;
    margin: auto;
  }
  .pictures-holder {
    display: flex;
    justify-content: space-around;
  }
  .person-holder {
    margin-bottom: 20px;
    text-align: center;
    font-style: italic;
  }
`;
