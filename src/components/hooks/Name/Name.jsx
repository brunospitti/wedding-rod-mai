import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { useQueryParam, StringParam } from 'use-query-params';

import { NameProvider } from '../../contexts/NameContext';

export const Name = ({ children }) => {
  const [nameFromURL] = useQueryParam('name', StringParam);

  const [name, setName] = React.useState(nameFromURL || 'Convidado');

  return (
    <NameProvider
      value={{
        name,
        setName,
      }}
    >
      {children}
    </NameProvider>
  );
};

Name.propTypes = {
  children: PropTypes.node,
};
