import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loadable from 'react-loadable';
import { graphql } from 'gatsby';
import { useQueryParam, StringParam } from 'use-query-params';
import BackgroundImage from 'gatsby-background-image';

import { breakpoints, colors } from '../assets/globalStyles';

import { Layout } from '../components/helpers/Layout';
import { Section, SectionRaw } from '../components/helpers/Section';
import { Banner } from '../components/Banner';
import { Title } from '../components/Title';
import { Godfathers } from '../components/Godfathers';
import { Invite } from '../components/Invite';
import { Form } from '../components/Form';

import { dataNormalize } from '../helpers/dataNormalize';

const IndexPage = (props) => {
  const {
    banner,
    welcome,
    invite,
    our_history: ourHistory,
    presents,
    by_our_side: byOurSide,
    parents,
    friends,
    form,
  } = dataNormalize(props.data);

  console.log('🚀 ~ banner', banner);
  console.log('🚀 ~ form', form);
  console.log('🚀 ~ friends', friends);
  console.log('🚀 ~ parents', parents);
  console.log('🚀 ~ byOurSide', byOurSide);
  console.log('🚀 ~ presents', presents);
  console.log('🚀 ~ ourHistory', ourHistory);
  console.log('🚀 ~ invite', invite);
  console.log('🚀 ~ welcome', welcome);

  return (
    <StyledIndex>
      <Layout>
        <Banner banner={banner} />
      </Layout>
    </StyledIndex>
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
      image {
        relativePath
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
            button_link
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

const StyledIndex = styled.div`
  .LoadableTextFromString {
    line-height: 22px;
    text-align: justify;
    span {
      font-size: 0.7em;
    }
    @media ${breakpoints.mobile} {
      font-size: 0.9em;
    }
    &.LoadableCentreTextFromString {
      padding: 0 8em;
      @media ${breakpoints.tablet} {
        padding: 0 4em;
      }
      @media ${breakpoints.mobile} {
        padding: 0 2em;
      }
      @media ${breakpoints.mobile} {
        padding: 0;
      }
    }
  }
`;
export default IndexPage;
