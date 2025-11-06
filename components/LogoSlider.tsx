import React from 'react';
import { LogoItem } from '../types';

interface LogoSliderProps {
  logos: LogoItem[];
  title?: string;
}

const LogoSlider: React.FC<LogoSliderProps> = ({ logos, title = "I've Worked With" }) => {
  if (!logos || logos.length === 0) {
    return null;
  }

  // Define custom keyframes for a seamless scroll. The global 'animate-scroll'
  // uses translateX(-100%), which creates a jump. A true marquee needs to
  // translate by the width of one set of logos (-50% of the doubled list).
  const customKeyframes = `
    @keyframes custom-scroll {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    .animate-custom-scroll {
      animation: custom-scroll 60s linear infinite;
    }
  `;

  return (
    <section className="py-8">
      <style>{customKeyframes}</style>
      <h2 className="text-3xl font-bold tracking-tight text-center">{title}</h2>
      <div className="mt-8 relative w-full overflow-hidden">
        <div className="flex w-max animate-custom-scroll">
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="flex-shrink-0 w-48 h-24 flex items-center justify-center mx-4" aria-hidden={index >= logos.length}>
              <img 
                src={logo.logoUrl} 
                alt={logo.name || 'Company logo'} 
                className="max-h-12 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoSlider;
