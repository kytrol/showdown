import { h } from 'preact';
import LandingSection from './landing-section.jsx';

const sections = [
  'Show Search',
  'Actor Search',
  // 'Schedule'
];

const Landing = () => (
  <section class='landing'>
    {sections.map(section => (
      <LandingSection title={section} />
    ))}
  </section>
);

export default Landing;
