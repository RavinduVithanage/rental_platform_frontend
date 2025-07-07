import Hero from '../components/about/Hero';
import OurStory from '../components/about/OurStory';
import Values from '../components/about/Values';
import Stats from '../components/about/Stats';
import Team from '../components/about/Team';
import CTA from '../components/about/CTA';
import { teamMembers, values, stats } from '../data/about';

export default function About() {
  return (
    <div className="relative overflow-hidden">
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        .animate-slide-in {
          animation: slideIn 0.8s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <Hero />
      <OurStory />
      <Values values={values} />
      <Stats stats={stats} />
      <Team teamMembers={teamMembers} />
      <CTA />
    </div>
  );
}