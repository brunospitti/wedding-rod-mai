import React from 'react';
import { Section } from '../helpers/Section';
import { TextSection } from '../TextSection';

export const OurStorySection = ({ ourStory }) => (
  <Section>
    <TextSection
      title={ourStory.title}
      subTitle={ourStory.subTitle}
      description={ourStory.description}
    />
  </Section>
);
