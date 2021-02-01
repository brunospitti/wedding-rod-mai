import React from 'react';
import styled from 'styled-components';

import { breakpoints, fontFamilyTitle } from '../assets/globalStyles';
import { useTheme } from './hooks/Theme/useTheme';

export const Invite = ({ invite }) => {
  const { theme } = useTheme();
  console.log('🚀 ~ file: Invite.jsx ~ line 9 ~ Invite ~ theme', theme);

  return <StyledInviteWrapper theme={theme}>{invite.title}</StyledInviteWrapper>;
};

// styled components
const StyledInviteWrapper = styled.div`
  margin: 100px auto;
  width: 100%;
  max-width: 1100px;
  height: 300px;
  border: 3px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${fontFamilyTitle};
  font-size: 3em;
`;
