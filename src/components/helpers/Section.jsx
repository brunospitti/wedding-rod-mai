import React from 'react';
import styled from 'styled-components';

export const SectionRaw = ({ children, className }) => {
  return <StyledSection className={className}>{children}</StyledSection>;
};

export const Section = ({ children, className }) => (
  <SectionRaw className={className}>
    <StyledMainContainer>{children}</StyledMainContainer>
  </SectionRaw>
);

// styled components
const StyledSection = styled.div`
  margin: 8em 0;
  width: 100%;
  height: 100%;
  position: relative;
`;

const StyledMainContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  position: relative;
  padding: 0 20px;
`;
