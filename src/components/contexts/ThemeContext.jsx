import React from 'react';

export const ThemeContext = React.createContext({});

export const { Provider: ThemeProvider, Consumer: ThemeConsumer } = ThemeContext;
