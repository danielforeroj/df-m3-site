import React, { useState, useEffect, useCallback } from 'react';
import { palettes } from '../themes/colorPalettes';

type ColorMode = 'light' | 'dark';

const ThemePicker: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('grayscale');
  const [colorMode, setColorMode] = useState<ColorMode>('light');

  const applyTheme = useCallback((themeName: string) => {
    const theme = palettes[themeName];
    if (!theme) return;
    
    const isDarkMode = document.documentElement.classList.contains('dark');
    const colors = isDarkMode ? theme.dark : theme.light;

    for (const [key, value] of Object.entries(colors)) {
      document.documentElement.style.setProperty(key, value);
    }
    
    localStorage.setItem('portfolio-theme', themeName);
    setActiveTheme(themeName);
  }, []);
  
  const applyColorMode = useCallback((mode: ColorMode) => {
      document.documentElement.classList.toggle('dark', mode === 'dark');
      setColorMode(mode);
      const savedTheme = localStorage.getItem('portfolio-theme') || 'grayscale';
      applyTheme(savedTheme);
  }, [applyTheme]);

  const toggleColorMode = () => {
    const newMode = colorMode === 'light' ? 'dark' : 'light';
    localStorage.setItem('portfolio-color-mode', newMode);
    applyColorMode(newMode);
  }

  useEffect(() => {
    // Set initial color mode
    const savedMode = localStorage.getItem('portfolio-color-mode') as ColorMode | null;
    if (savedMode) {
      applyColorMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyColorMode(systemPrefersDark ? 'dark' : 'light');
    }

    // Set initial theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'grayscale';
    applyTheme(savedTheme);
    
    // Listen for system changes ONLY if no manual override is set
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem('portfolio-color-mode')) {
            applyColorMode(e.matches ? 'dark' : 'light');
        }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [applyTheme, applyColorMode]);

  const themeOptions = [
    { name: 'grayscale', color: '#808080' },
    { name: 'default', color: '#005FAF' },
    { name: 'forest', color: '#006D39' },
    { name: 'coral', color: '#BC443A' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div 
          className="p-3 rounded-2xl shadow-xl transition-all"
          style={{ backgroundColor: 'var(--md-sys-color-surface-variant)'}}
        >
          <div className="flex flex-col items-center gap-3">
            <button
                onClick={toggleColorMode}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border-2 border-transparent hover:scale-110"
                style={{ backgroundColor: 'var(--md-sys-color-surface)'}}
                aria-label={`Toggle color mode, current is ${colorMode}`}
            >
              <span className="material-symbols-outlined text-lg" style={{ color: 'var(--md-sys-color-on-surface)'}}>
                {colorMode === 'dark' ? 'dark_mode' : 'light_mode'}
              </span>
            </button>
            <div className="h-px w-full my-1" style={{backgroundColor: 'var(--md-sys-color-outline)'}}></div>
            {themeOptions.map(option => (
              <button
                key={option.name}
                onClick={() => applyTheme(option.name)}
                className={`w-8 h-8 rounded-full transition-all duration-200 border-2 ${activeTheme === option.name ? 'border-[var(--md-sys-color-primary)] scale-110' : 'border-transparent hover:scale-110'}`}
                style={{ backgroundColor: option.color }}
                aria-label={`Select ${option.name} theme`}
              />
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
        style={{
          backgroundColor: 'var(--md-sys-color-primary-container)',
          color: 'var(--md-sys-color-on-primary-container)',
        }}
        aria-label="Toggle theme picker"
      >
        <span className="material-symbols-outlined transition-transform duration-300" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}>
          {isOpen ? 'close' : 'palette'}
        </span>
      </button>
    </div>
  );
};

export default ThemePicker;