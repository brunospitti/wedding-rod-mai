import React from 'react';
import styled from 'styled-components';
import { useQueryParam, StringParam } from 'use-query-params';

export const Video = () => {
  const [rod] = useQueryParam('rod', StringParam);
  const showVideo = rod === 'gay';

  if (!showVideo) return null;

  return (
    <StyledVideo>
      <iframe
        width="800"
        height="450"
        src="https://www.youtube.com/embed/I9vJFxztCJE"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ 'max-width': '100%' }}
      ></iframe>
    </StyledVideo>
  );
};

// styled components
const StyledVideo = styled.div`
  text-align: center;
  margin-top: 50px;
`;
