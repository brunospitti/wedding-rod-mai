import React from 'react';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';
import { useTheme } from './hooks/Theme/useTheme';
import { TextSection } from '../components/TextSection';
import { BgImage } from './BgImage';
import { breakpoints, fontFamilyTitle } from '../assets/globalStyles';

const PicturesHolder = ({ activePictures }) => (
  <div className="pictures-holder">
    {activePictures.map((person) => {
      return (
        <div className="person-holder" key={person.title}>
          <div className="image-holder">
            <StyledBackgroundImage fixed={person.image.childImageSharp.fixed} />
          </div>
          <div className="name">{person.title}</div>
        </div>
      );
    })}
  </div>
);

export const ByOurSide = ({ byOurSide, friends, parents }) => {
  const { theme } = useTheme();

  const [activePictures, setActivePictures] = React.useState([]);
  const [activeGroup, setActiveGroup] = React.useState();

  const handleActiveChange = (group) => {
    setActivePictures(group);

    setActiveGroup(group === parents ? 'parents' : 'friends');
  };

  React.useEffect(() => {
    handleActiveChange(parents);
  }, [parents]);

  return (
    <StyledByOurSide theme={theme}>
      <TextSection
        title={byOurSide.title}
        subTitle={byOurSide.subTitle}
        description={byOurSide.description}
      />

      <div className={`godfathers-holder ${activeGroup}-active`}>
        <div className="buttons-holder">
          <button
            className={activePictures === parents ? 'active' : null}
            id="parents"
            onClick={() => handleActiveChange(parents)}
          >
            {byOurSide.parentsTitle}
          </button>
          <button
            className={activePictures === friends ? 'active' : null}
            id="friends"
            onClick={() => handleActiveChange(friends)}
          >
            {byOurSide.friendsTitle}
          </button>
        </div>
        <PicturesHolder activePictures={activePictures} key={activeGroup} />
      </div>
    </StyledByOurSide>
  );
};

// styled components

const StyledBackgroundImage = styled(BackgroundImage)`
  width: 100% !important;
  height: 100% !important;
  background-size: contain !important;
`;

const StyledByOurSide = styled.div`
  @keyframes appear {
    0% {
      opacity: 0;
    }
    33% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .godfathers-holder {
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
        border-radius: 3px;
        transition: 0.25s all ease;
        border-bottom: 4px solid transparent;
        &.active,
        &:hover {
          border-bottom-color: ${(props) => props.theme.tertiary};
        }
      }
    }
    .image-holder {
      height: 100%;
      width: 100%;
      margin: auto;
    }
    .pictures-holder {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      -webkit-animation: appear 0.75s;
      animation: appear 0.75s;
    }
    .person-holder {
      margin-bottom: 20px;
      text-align: center;
      font-style: italic;
      width: calc(100% / 4);
      height: 170px;
    }
    &.parents-active {
      .person-holder {
        height: 230px;
      }
    }
  }
`;
