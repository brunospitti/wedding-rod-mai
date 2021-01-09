import React from 'react';
import PropTypes from 'prop-types';

export const HTMLContent = ({ content, className, style }) => (
  <div
    style={style}
    className={className}
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

export const TextFromString = ({ text, className, style }) => (
  <div
    style={style}
    className={className}
    dangerouslySetInnerHTML={{
      __html: text.replace(/(?:\r\n|\r|\n)/g, '<br>'),
    }}
  />
);

const Content = ({ content, className, style }) => (
  <div style={style} className={className}>
    {content}
  </div>
);

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
};

HTMLContent.propTypes = Content.propTypes;

export default Content;
