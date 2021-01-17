import React from 'react';
import { NameContext } from '../../contexts/NameContext';

export const useName = () => React.useContext(NameContext);
