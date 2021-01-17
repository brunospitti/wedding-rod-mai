import React from 'react';
import Loadable from 'react-loadable';
import { graphql } from 'gatsby';

import { breakpoints, colors } from '../assets/globalStyles';

import { HomePage } from '../components/HomePage';
import { Theme } from '../components/hooks/Theme/Theme';

const IndexPage = (props) => {
  return (
    <Theme>
      <HomePage data={props.data} />
    </Theme>
  );
};

export const mainInfo = graphql`
  fragment mainInfo on MarkdownRemark {
    frontmatter {
      title
      subTitle
      description
    }
  }
`;

export const parentsInfo = graphql`
  fragment parentsInfo on MarkdownRemark {
    frontmatter {
      title
      image {
        childImageSharp {
          fixed(height: 200, quality: 90) {
            originalName
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`;

export const pageQuery = graphql`
  query MainQuery {
    banner: allMarkdownRemark(filter: { fields: { slug: { regex: "/banner/" } } }) {
      edges {
        node {
          frontmatter {
            title
            date
            daysLeft
          }
        }
      }
    }

    welcome: allMarkdownRemark(filter: { fields: { slug: { regex: "/welcome/" } } }) {
      edges {
        node {
          ...mainInfo
        }
      }
    }

    invite: allMarkdownRemark(filter: { fields: { slug: { regex: "/invite/" } } }) {
      edges {
        node {
          ...mainInfo
        }
      }
    }

    ourStory: allMarkdownRemark(filter: { fields: { slug: { regex: "/ourStory/" } } }) {
      edges {
        node {
          ...mainInfo
        }
      }
    }

    presents: allMarkdownRemark(filter: { fields: { slug: { regex: "/presents/" } } }) {
      edges {
        node {
          frontmatter {
            title
            subTitle
            description
            buttonLink
            buttonText
          }
        }
      }
    }

    byOurSide: allMarkdownRemark(filter: { fields: { slug: { regex: "/byOurSide/" } } }) {
      edges {
        node {
          frontmatter {
            title
            sub_title
            description
            parentsTitle
            friendsTitle
          }
        }
      }
    }

    parents: allMarkdownRemark(filter: { fields: { slug: { regex: "/parents/" } } }) {
      edges {
        node {
          ...parentsInfo
        }
      }
    }

    friends: allMarkdownRemark(filter: { fields: { slug: { regex: "/friends/" } } }) {
      edges {
        node {
          ...parentsInfo
        }
      }
    }

    form: allMarkdownRemark(filter: { fields: { slug: { regex: "/form/" } } }) {
      edges {
        node {
          frontmatter {
            title
            subTitle
            description
            name
            eMail
            phone
            going
            maybe
            notGoing
          }
        }
      }
    }

    finalPhrase: allMarkdownRemark(
      filter: { fields: { slug: { regex: "/finalPhrase/" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

export default IndexPage;
