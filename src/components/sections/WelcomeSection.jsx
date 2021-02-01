import React from 'react';
import { Section } from '../helpers/Section';
import { TextSection } from '../TextSection';

export const WelcomeSection = ({ welcome }) => (
  <Section>
    <TextSection
      title={welcome.title}
      subTitle={welcome.subTitle}
      description={welcome.description}
    />
  </Section>
);
