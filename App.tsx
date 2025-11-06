import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import { PostType } from './types';
import SkipToContent from './components/SkipToContent';
import ThemePicker from './components/ThemePicker';
import { generatePalette } from './themes/colorPalettes';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

type Theme = 'light' | 'dark' | 'system';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => 
    (localStorage.getItem('df_theme') as Theme | null) || 
    window.__siteSettings?.branding?.theme_default || 
    'system'
  );
  const [accent, setAccent] = useState<string>(() => 
    localStorage.getItem('df_accent') || 
    window.__siteSettings?.branding?.accent_default || 
    '#3B82F6'
  );
  
  const applyTheme = useCallback((mode: Theme) => {
    const r = document.documentElement;
    let finalMode = mode;
    if (mode === 'system') {
      finalMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    r.dataset.theme = finalMode;
    r.classList.remove('light', 'dark');
    if (finalMode === 'light') r.classList.add('light');
    if (finalMode === 'dark') r.classList.add('dark');
  }, []);

  const applyAccent = useCallback((hex: string) => {
    if (!hex) return;
    const p = generatePalette(hex);
    const styleId = 'df-dynamic-theme';
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
      html[data-theme="light"] {
        --md-sys-color-primary: ${p.primary_light}; --md-sys-color-on-primary: ${p.on_primary_light}; --md-sys-color-primary-container: ${p.primary_container_light}; --md-sys-color-on-primary-container: ${p.on_primary_container_light};
        --md-sys-color-secondary: ${p.secondary_light}; --md-sys-color-on-secondary: ${p.on_secondary_light}; --md-sys-color-secondary-container: ${p.secondary_container_light}; --md-sys-color-on-secondary-container: ${p.on_secondary_container_light};
        --md-sys-color-tertiary: ${p.tertiary_light}; --md-sys-color-on-tertiary: ${p.on_tertiary_light}; --md-sys-color-tertiary-container: ${p.tertiary_container_light}; --md-sys-color-on-tertiary-container: ${p.on_tertiary_container_light};
      }
      html[data-theme="dark"] {
        --md-sys-color-primary: ${p.primary_dark}; --md-sys-color-on-primary: ${p.on_primary_dark}; --md-sys-color-primary-container: ${p.primary_container_dark}; --md-sys-color-on-primary-container: ${p.on_primary_container_dark};
        --md-sys-color-secondary: ${p.secondary_dark}; --md-sys-color-on-secondary: ${p.on_secondary_dark}; --md-sys-color-secondary-container: ${p.secondary_container_dark}; --md-sys-color-on-secondary-container: ${p.on_secondary_container_dark};
        --md-sys-color-tertiary: ${p.tertiary_dark}; --md-sys-color-on-tertiary: ${p.on_tertiary_dark}; --md-sys-color-tertiary-container: ${p.tertiary_container_dark}; --md-sys-color-on-tertiary-container: ${p.on_tertiary_container_dark};
      }`;
  }, []);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('df_theme', theme);
  }, [theme, applyTheme]);

  useEffect(() => {
    applyAccent(accent);
    localStorage.setItem('df_accent', accent);
  }, [accent, applyAccent]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (localStorage.getItem('df_theme') === 'system') {
        applyTheme('system');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [applyTheme]);

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--md-sys-color-background)', color: 'var(--md-sys-color-on-background)' }}>
        <SkipToContent />
        <Header />
        <main id="main-content" className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<PostListPage type={PostType.BLOG} title="Blog" />} />
            <Route path="/research" element={<PostListPage type={PostType.RESEARCH} title="Research" />} />
            {/* FIX: Corrected typo PostType.LEAD_ MAGNET to PostType.LEAD_MAGNET */}
            <Route path="/leads" element={<PostListPage type={PostType.LEAD_MAGNET} title="Lead Magnets" />} />
            <Route path="/post/:slug" element={<PostDetailPage />} />
          </Routes>
        </main>
        <Footer />
        <ThemePicker 
          currentTheme={theme}
          currentAccent={accent}
          onThemeChange={setTheme}
          onAccentChange={setAccent}
        />
      </div>
    </HashRouter>
  );
};

export default App;