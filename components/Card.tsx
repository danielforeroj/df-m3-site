
import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`rounded-2xl transition-shadow duration-300 ease-in-out shadow-sm hover:shadow-lg overflow-hidden ${className}`}
      style={{
        backgroundColor: 'var(--md-sys-color-surface-variant)',
        color: 'var(--md-sys-color-on-surface-variant)',
      }}
    >
      {children}
    </div>
  );
};

export default Card;
