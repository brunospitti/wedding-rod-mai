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
      sub_title
      description
    }
  }
`;

export const parentsInfo = graphql`
  fragment parentsInfo on MarkdownRemark {
    frontmatter {
      title
      image
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
            days_left
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

    our_history: allMarkdownRemark(
      filter: { fields: { slug: { regex: "/our-history/" } } }
    ) {
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
            sub_title
            description
            button_link
            button_text
          }
        }
      }
    }

    by_our_side: allMarkdownRemark(
      filter: { fields: { slug: { regex: "/by-our-side/" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            sub_title
            description
            parents_title
            friends_title
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
            sub_title
            description
            name
            e_mail
            phone
            not_going
            maybe
            going
          }
        }
      }
    }
  }
`;

export default IndexPage;
