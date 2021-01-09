import React from 'react';
import styled from 'styled-components';

import { colors, breakpoints, fontFamilyTitle } from '../assets/globalStyles';

export const Title = ({ text }) => {
  return <StyledTitle>{text}</StyledTitle>;
};

// styled components
const StyledTitle = styled.div`
  display: inline-block;
  font-family: ${fontFamilyTitle};
  font-size: 5em;
  margin: 0.5em 0;
  @media ${breakpoints.mobile} {
    font-size: 3em;
  }
  &:after {
    content: '';
    display: block;
    height: 2px;
    width: calc(100% + 100px);
    max-width: 90vw;
    background: ${colors.secondary};
  }
`;
