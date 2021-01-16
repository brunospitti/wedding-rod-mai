import React from 'react';
import styled from 'styled-components';

import { breakpoints } from '../assets/globalStyles';
import { Title } from './Title';
import { useTheme } from './hooks/Theme/useTheme';

export const TextSection = ({ title, subTitle, description }) => {
  const { theme } = useTheme();

  return (
    <StyledTextSection theme={theme}>
      <Title>{title}</Title>
      {subTitle && <div className="text sub-title">{subTitle}</div>}
      {description && <div className="text description">{description}</div>}
    </StyledTextSection>
  );
};

// styled components
const StyledTextSection = styled.div`
  margin: 0.5em 0;
  text-align: center;
  .Title {
    margin-bottom: 1em;
  }
  .text {
  }
  .sub-title {
    font-size: 1.3333em;
    font-style: italic;
    margin-bottom: 2em;
  }
  .description {
    font-weight: 300;
  }
`;
