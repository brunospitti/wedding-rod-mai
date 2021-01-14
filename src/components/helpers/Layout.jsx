import React from 'react';
import styled from 'styled-components';

import { GlobalStyles } from '../../assets/globalStyles';
import { Helmet } from './Helmet';

export const Layout = ({ children }) => (
  <>
    <Helmet />
    <StyledLayout>{children}</StyledLayout>
    <GlobalStyles />
  </>
);

const StyledLayout = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1700px;
  margin: 0 auto;
  position: relative;
`;
