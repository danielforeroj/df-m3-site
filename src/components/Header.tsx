import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
      isActive
        ? 'bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)]'
        : 'hover:bg-[var(--md-sys-color-surface-variant)] text-[var(--md-sys-color-on-surface)]'
    }`;
    
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 rounded-lg text-base font-medium ${
      isActive
        ? 'bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)]'
        : 'hover:bg-[var(--md-sys-color-surface-variant)] text-[var(--md-sys-color-on-surface)]'
    }`;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header 
      className="sticky top-0 z-50 w-full shadow-sm"
      style={{ backgroundColor: 'var(--md-sys-color-surface)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-xl font-bold tracking-tight" style={{ color: 'var(--md-sys-color-on-surface)' }}>
              Daniel Forero
            </NavLink>
          </div>
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
            <NavLink to="/research" className={navLinkClass}>Research</NavLink>
            <NavLink to="/leads" className={navLinkClass}>Downloads</NavLink>
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full hover:bg-[var(--md-sys-color-surface-variant)] focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={mobileNavLinkClass} onClick={closeMenu}>Home</NavLink>
            <NavLink to="/blog" className={mobileNavLinkClass} onClick={closeMenu}>Blog</NavLink>
            <NavLink to="/research" className={mobileNavLinkClass} onClick={closeMenu}>Research</NavLink>
            <NavLink to="/leads" className={mobileNavLinkClass} onClick={closeMenu}>Downloads</NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;