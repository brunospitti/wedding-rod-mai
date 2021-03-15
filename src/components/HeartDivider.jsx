import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';

export const HeartDivider = () => {
  const { heartDivider } = useStaticQuery(graphql`
    query HeartDivider {
      heartDivider: file(relativePath: { eq: "heart-divider.png" }) {
        childImageSharp {
          fixed(height: 30, quality: 90) {
            originalName
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <StyledHeartDivider>
      <StyledBackgroundImage
        className="heart-divider"
        Tag="div"
        fixed={heartDivider.childImageSharp.fixed}
        backgroundColor="transparent"
      />
    </StyledHeartDivider>
  );
};

const StyledHeartDivider = styled.div`
  height: 30px;
  margin-bottom: 100px;
`;

const StyledBackgroundImage = styled(BackgroundImage)`
  width: 100% !important;
  height: 100% !important;
  background-size: contain !important;
`;
