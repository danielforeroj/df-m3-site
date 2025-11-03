
import React, { ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
}

const Chip: React.FC<ChipProps> = ({ children }) => {
  return (
    <div 
      className="inline-flex items-center px-4 py-1.5 rounded-lg text-sm font-medium"
      style={{
        backgroundColor: 'var(--md-sys-color-secondary-container)',
        color: 'var(--md-sys-color-on-secondary-container)'
      }}
    >
      {children}
    </div>
  );
};

export default Chip;
