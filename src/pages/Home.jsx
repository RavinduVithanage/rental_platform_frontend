import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import CTA from '../components/home/CTA';
import { features } from '../data/home';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
        }
        .animate-slide-up-delay {
          animation: slideUp 0.8s ease-out 0.3s both;
        }
        .animate-slide-up-delay-2 {
          animation: slideUp 0.8s ease-out 0.6s both;
        }
      `}</style>

      <Hero />
      <Features features={features} />
      <CTA />
    </div>
  );
}