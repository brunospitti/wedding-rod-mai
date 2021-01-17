import React from 'react';
import styled from 'styled-components';

import { GlobalStyles } from '../../assets/globalStyles';
import { Helmet } from './Helmet';
import { useTheme } from '../hooks/Theme/useTheme';

export const Layout = ({ children }) => {
  const { theme } = useTheme();
  console.log('🚀 ~ file: Layout.jsx ~ line 10 ~ Layout ~ theme', theme);

  return (
    <>
      <Helmet />
      <StyledLayout>{children}</StyledLayout>
      <GlobalStyles theme={theme} />
    </>
  );
};

const StyledLayout = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1700px;
  margin: 0 auto;
  position: relative;
`;
