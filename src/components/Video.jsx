import React from 'react';
import styled from 'styled-components';
import { breakpoints } from '../assets/globalStyles';

export const Video = () => (
    <StyledVideo>
      <iframe
        width="800"
        height="450"
        src="https://www.youtube.com/embed/4UvNVrw4lz4"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ 'max-width': '100%' }}
      ></iframe>
    </StyledVideo>
  );


// styled components
const StyledVideo = styled.div`
  text-align: center;
  margin-top: 50px;
  @media ${breakpoints.mobile} {
    iframe{
      height: 220px;
    }
  }
`;
