import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import { breakpoints, fontFamilyTitle } from '../assets/globalStyles';
import { useTheme } from './hooks/Theme/useTheme';
import { TextSection } from '../components/TextSection';
import { BgImage } from './BgImage';

export const Presents = ({ presents }) => {
  const { theme } = useTheme();

  const {
    allFile: {
      childImageSharp: { fixed },
    },
  } = useStaticQuery(graphql`
    query GaelicFigure {
      allFile: file(relativePath: { eq: "gaelic.png" }) {
        childImageSharp {
          fixed(height: 77, quality: 90) {
            originalName
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <StyledPresentsWrapper theme={theme}>
      <TextSection
        title={presents.title}
        subTitle={presents.subTitle}
        description={presents.description}
      />
      <div className="button-wrapper">
        <a href={presents.buttonLink} target="_blank" rel="noreferrer">
          <span>{presents.buttonText}</span>
        </a>
      </div>
      <div className="image-holder">
        <BgImage fixedImage={fixed} backgroundColor="transparent" />
      </div>
    </StyledPresentsWrapper>
  );
};

// styled components
const StyledPresentsWrapper = styled.div`
  margin-bottom: 200px;
  .button-wrapper {
    display: flex;
    justify-content: center;
  }
  a {
    border-radius: 10px;
    background: linear-gradient(
      ${(props) => props.theme.secondary},
      ${(props) => props.theme.primary}
    );
    display: inline-flex;
    padding: 23px 70px;
    text-decoration: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 0 0 ${(props) => props.theme.primary};
    border-bottom: 4px solid ${(props) => props.theme.bg};
    span {
      color: ${(props) => props.theme.primaryContrast};
      font-size: 1.25em;
    }
  }
  .image-holder {
    height: 70px;
    width: 70px;
    display: block;
    margin: 100px auto;
  }
`;
