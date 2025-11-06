import React, { useState, useEffect } from 'react';

const defaultPalette = ['#000000', '#fb0100', '#00ff85', '#3a83f3'];

interface ThemePickerProps {
  currentTheme: 'light' | 'dark' | 'system';
  currentAccent: string;
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
  onAccentChange: (accent: string) => void;
}

const ThemePicker: React.FC<ThemePickerProps> = ({ currentTheme, currentAccent, onThemeChange, onAccentChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [palette, setPalette] = useState<string[]>(defaultPalette);

  useEffect(() => {
    // Read palette from CMS/global bootstrap once on mount
    if (typeof window !== 'undefined' && window.DFTheme?.palette?.length) {
      setPalette(window.DFTheme.palette);
    }
  }, []);

  const themeOptions: { name: 'light' | 'dark' | 'system'; icon: string }[] = [
    { name: 'light', icon: 'light_mode' },
    { name: 'dark', icon: 'dark_mode' },
    { name: 'system', icon: 'auto_mode' },
  ];

  return (
    <div id="theme-fab" className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div 
          className="absolute bottom-full right-0 mb-4 p-3 rounded-2xl shadow-xl transition-all"
          style={{ backgroundColor: 'var(--md-sys-color-surface-variant)'}}
        >
          <div className="flex flex-col items-center gap-3">
             <div className="flex items-center gap-2" aria-label="Color mode">
                {themeOptions.map(option => {
                    const isActive = currentTheme === option.name;
                    return (
                     <button
                        key={option.name}
                        type="button"
                        onClick={() => onThemeChange(option.name)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 border-2 ${isActive ? 'border-[var(--md-sys-color-primary)]' : 'border-transparent'} hover:border-[var(--md-sys-color-primary)]`}
                        style={{ backgroundColor: 'var(--md-sys-color-surface)'}}
                        aria-label={`Select ${option.name} mode`}
                        aria-pressed={isActive}
                    >
                        <span className="material-symbols-outlined text-xl" style={{ color: 'var(--md-sys-color-on-surface)'}}>
                            {option.icon}
                        </span>
                    </button>
                )})}
            </div>

            <div className="h-px w-full my-1" style={{backgroundColor: 'var(--md-sys-color-outline)'}}></div>
            
            <div className="flex flex-col gap-3" aria-label="Accent color">
                {palette.map(hex => {
                  const isActive = currentAccent.toLowerCase() === hex.toLowerCase();
                  return (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => onAccentChange(hex)}
                      aria-label={`Use accent ${hex}`}
                      aria-pressed={isActive}
                      className={`w-8 h-8 rounded-full transition-all duration-200 border-2 ${isActive ? 'scale-110 border-[var(--md-sys-color-primary)]' : 'border-transparent'} hover:scale-110 hover:border-[var(--md-sys-color-primary)]`}
                      style={{ backgroundColor: hex }}
                    />
                  )
                })}
            </div>
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
        aria-expanded={isOpen}
      >
        <span className="material-symbols-outlined transition-transform duration-300" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}>
          {isOpen ? 'close' : 'palette'}
        </span>
      </button>
    </div>
  );
};

export default ThemePicker;