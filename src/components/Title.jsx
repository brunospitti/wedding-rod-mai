import React from 'react';
import styled from 'styled-components';

import { fontFamilyTitle } from '../assets/globalStyles';
import { useTheme } from './hooks/Theme/useTheme';

export const Title = ({ children }) => {
  const { theme } = useTheme();
  return (
    <StyledTitle className="Title" theme={theme}>
      {children}
    </StyledTitle>
  );
};

// styled components
const StyledTitle = styled.div`
  font-family: ${fontFamilyTitle};
  font-size: 3em;
  color: ${(props) => props.theme.primary};
`;
