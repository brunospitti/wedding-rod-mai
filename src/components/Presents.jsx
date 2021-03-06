import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import { breakpoints } from '../assets/globalStyles';
import { useTheme } from './hooks/Theme/useTheme';
import { TextSection } from '../components/TextSection';

export const Presents = ({ presents }) => {
  const { theme } = useTheme();

  const {
    allFile: {
      childImageSharp: { fixed },
    },
  } = useStaticQuery(graphql`
    query RingsDivider {
      allFile: file(relativePath: { eq: "rings-divider.png" }) {
        childImageSharp {
          fixed(height: 80, quality: 100) {
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
        <BackgroundImage fixed={fixed} backgroundColor="transparent" />
      </div>
    </StyledPresentsWrapper>
  );
};

// styled components
const StyledPresentsWrapper = styled.div`
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
    transition: all 0.5s ease;
    @media ${breakpoints.mobile} {
      width: 90%;
      padding: 20px 10px;
    }
    &:hover {
      padding: 23px 90px;
    }
    span {
      color: ${(props) => props.theme.primaryContrast};
      font-size: 1.25em;
    }
  }
  .image-holder {
    display: flex;
    justify-content: center;
    margin: 100px 0;
  }
`;
