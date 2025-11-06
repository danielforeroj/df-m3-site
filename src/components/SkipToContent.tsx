
import React from 'react';

const SkipToContent: React.FC = () => {
  return (
    <a 
      href="#main-content" 
      className="absolute top-0 left-0 m-3 p-3 -translate-y-16 focus:translate-y-0 transition-transform duration-300 rounded-lg text-sm font-semibold z-[100]"
      style={{
        backgroundColor: 'var(--md-sys-color-primary)',
        color: 'var(--md-sys-color-on-primary)'
      }}
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;