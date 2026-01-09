import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import CTA from '../components/home/CTA';
import { features } from '../data/home';

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-[#0a0a0f]">
      <Hero />
      <Features features={features} />
      <CTA />
    </div>
  );
}