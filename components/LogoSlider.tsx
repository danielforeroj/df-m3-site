import React from 'react';
import { CompanyLogo } from '../types';

interface LogoSliderProps {
  logos: CompanyLogo[];
}

const LogoSlider: React.FC<LogoSliderProps> = ({ logos }) => {
  // Duplicate for seamless loop, only if there are logos to show
  const displayLogos = logos.length > 0 ? [...logos, ...logos] : [];

  if (logos.length === 0) {
    return (
      <div className="text-center py-4" style={{ color: 'var(--md-sys-color-on-surface-variant)'}}>
        No logos to display.
      </div>
    );
  }

  return (
    <div
      className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_48px,_black_calc(100%-48px),transparent_100%)]"
    >
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-scroll">
        {displayLogos.map((company, index) => (
          <li key={`logo-a-${index}-${company.name}`}>
            <img 
                src={company.logo} 
                alt={`${company.name} logo`} 
                className="max-h-8 w-auto grayscale opacity-60 hover:opacity-100 transition-all duration-300"
            />
          </li>
        ))}
      </ul>
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-scroll" aria-hidden="true">
        {displayLogos.map((company, index) => (
          <li key={`logo-b-${index}-${company.name}`}>
            <img 
                src={company.logo} 
                alt={`${company.name} logo`} 
                className="max-h-8 w-auto grayscale opacity-60 hover:opacity-100 transition-all duration-300" 
            />
          </li>
        ))}
      </ul>
      <style>{`
        .dark .grayscale {
            filter: grayscale(1) invert(1);
        }
      `}</style>
    </div>
  );
};

export default LogoSlider;