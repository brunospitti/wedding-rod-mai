import React from 'react';
import ReactHelmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export const Helmet = () => {
  const {
    site: {
      siteMetadata: { title, description },
    },
  } = useStaticQuery(graphql`
    query HeadingQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return (
    <ReactHelmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="business.business" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content="/" />
      <meta property="og:image" content="/img/og-image.jpg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Amatic+SC&family=Poppins:ital,wght@0,200;0,700;1,200&display=swap"
        rel="stylesheet"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="img/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="img/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="img/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="img/favicon/site.webmanifest" />
    </ReactHelmet>
  );
};
