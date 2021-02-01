import React from 'react';
import { Section } from '../helpers/Section';
import { Presents } from '../Presents';

export const PresentsSection = ({ presents }) => (
  <Section>
    <Presents presents={presents} />
  </Section>
);
