import React from 'react';

export const NameContext = React.createContext({});

export const { Provider: NameProvider, Consumer: NameConsumer } = NameContext;
