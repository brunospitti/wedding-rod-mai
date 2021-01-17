import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { useStaticQuery, graphql } from 'gatsby';

import { ThemeProvider } from '../../contexts/ThemeContext';

export const Theme = ({ children }) => {
  const [theme, setTheme] = React.useState({});
  const {
    allMarkdownRemark: {
      edges: [
        {
          node: { frontmatter: themeQuery },
        },
      ],
    },
  } = useStaticQuery(graphql`
    query Theme {
      allMarkdownRemark(filter: { fields: { slug: { regex: "/theme/" } } }) {
        edges {
          node {
            frontmatter {
              primary
              primaryContrast
              secondary
              tertiary
              text
              bg
            }
          }
        }
      }
    }
  `);

  React.useEffect(() => {
    setTheme(themeQuery.allMarkdownRemark?.edges[0].node?.frontmatter);
  }, [themeQuery]);

  return (
    <ThemeProvider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

Theme.propTypes = {
  children: PropTypes.node,
};
