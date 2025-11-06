
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer 
      className="w-full text-center p-4 mt-8 border-t"
      style={{
        borderColor: 'var(--md-sys-color-outline)',
        color: 'var(--md-sys-color-on-surface-variant)'
      }}
    >
      <p>&copy; {currentYear} Daniel Forero. All rights reserved.</p>
    </footer>
  );
};

export default Footer;