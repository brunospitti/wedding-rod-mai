import React from 'react';
import { graphql } from 'gatsby';
import { HomePage } from '../components/HomePage';
import { Theme } from '../components/hooks/Theme/Theme';
import { Name } from '../components/hooks/Name/Name';

const IndexPage = (props) => {
  return (
    <Theme>
      <Name>
        <HomePage data={props.data} />
      </Name>
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
      order
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
            image {
              childImageSharp {
                fixed(height: 900, quality: 90) {
                  originalName
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }

    welcome: allMarkdownRemark(filter: { fields: { slug: { regex: "/welcome/" } } }) {
      edges {
        node {
          frontmatter {
            title
            subTitle
            description
            image {
              childImageSharp {
                fixed(height: 500, quality: 90) {
                  originalName
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }

    ireland: allMarkdownRemark(filter: { fields: { slug: { regex: "/ireland/" } } }) {
      edges {
        node {
          frontmatter {
            description
          }
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
            subTitle
            description
            parentsTitle
            friendsTitle
          }
        }
      }
    }

    parents: allMarkdownRemark(
      filter: { fields: { slug: { regex: "/parents/" } } }
      sort: { fields: frontmatter___order }
    ) {
      edges {
        node {
          ...parentsInfo
        }
      }
    }

    friends: allMarkdownRemark(
      filter: { fields: { slug: { regex: "/friends/" } } }
      sort: { fields: frontmatter___order }
    ) {
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
            nameLabel
            eMailLabel
            phoneLabel
            namePlaceholder
            eMailPlaceholder
            phonePlaceholder
            going
            maybe
            notGoing
            successTitle
            successSubTitle
            successButtonText
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
