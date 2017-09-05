import { h } from 'preact';
import LandingSection from '../components/landing-section.jsx';

const sections = [
  'Show Search',
  'Person Search',
  'Full Schedule'
];

const Landing = () => (
  <section class='landing'>
    {sections.map(section => (
      <LandingSection title={section} />
    ))}
  </section>
);

export default Landing;
