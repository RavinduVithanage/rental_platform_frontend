import Hero from '../components/about/Hero';
import OurStory from '../components/about/OurStory';
import Values from '../components/about/Values';
import Stats from '../components/about/Stats';
import Team from '../components/about/Team';
import CTA from '../components/about/CTA';
import { teamMembers, values, stats } from '../data/about';

export default function About() {
  return (
    <div className="relative overflow-hidden bg-[#0a0a0f]">
      <Hero />
      <OurStory />
      <Values values={values} />
      <Stats stats={stats} />
      <Team teamMembers={teamMembers} />
      <CTA />
    </div>
  );
}