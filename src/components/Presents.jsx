import React from 'react';
import styled from 'styled-components';

import { breakpoints, colors, fontFamilyTitle } from '../assets/globalStyles';
import { useTheme } from './hooks/Theme/useTheme';
import { TextSection } from '../components/TextSection';

export const Presents = ({ presents }) => {
  console.log('🚀 ~ file: Presents.jsx ~ line 9 ~ Presents ~ presents', presents);
  const { theme } = useTheme();

  return (
    <StyledPresentsWrapper theme={theme}>
      <TextSection
        title={presents.title}
        subTitle={presents.sub_title}
        description={presents.description}
      />
      <a href={presents.button_link} target="_blank" rel="noreferrer">
        <span>{presents.button_text}</span>
      </a>
    </StyledPresentsWrapper>
  );
};

// styled components
const StyledPresentsWrapper = styled.div`
  margin-bottom: 200px;
  a {
    background: linear-gradient(
      ${(props) => props.theme.secondary},
      ${(props) => props.theme.primary}
    );
    color: ${(props) => props.theme.primaryContrast};
    display: flex;
    width: 30%;
    height: 60px;
    margin: auto;
    text-decoration: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 0 0 ${(props) => props.theme.primary};
    border-bottom: 4px solid ${(props) => props.theme.bgColor};
    span {
      font-size: 1.25em;
    }
  }
`;
