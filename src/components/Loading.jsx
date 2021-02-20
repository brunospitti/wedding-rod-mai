import React from 'react';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';

export const Loading = ({ heart }) => (
  <StyledLoadingWrapper>
    <BackgroundImage className="heart" fixed={heart.childImageSharp.fixed} />
  </StyledLoadingWrapper>
);

// styled components
const StyledLoadingWrapper = styled.div`
  @keyframes heartbeat {
    0% {
      transform: scale(0.8);
    }
    25% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.8);
    }
    75% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.8);
    }
  }

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;

  .heart {
    animation: heartbeat 2s infinite;
  }
`;
