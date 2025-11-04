import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import AdminPage from './pages/AdminPage';
import { PostType, HomePageData } from './types';
import SkipToContent from './components/SkipToContent';
import ThemePicker from './components/ThemePicker';
import { initialHomePageData } from './data/mockData';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [homepageData, setHomepageData] = useState<HomePageData>(initialHomePageData);
  const [, setForceUpdate] = useState(0);

  // This effect connects the external theme switcher to React's render cycle.
  // When the theme script in index.html dispatches 'df-theme-changed',
  // we trigger a state update to force a re-render.
  useEffect(() => {
    const handleThemeChange = () => {
      setForceUpdate(c => c + 1);
    };
    window.addEventListener('df-theme-changed', handleThemeChange);
    return () => {
      window.removeEventListener('df-theme-changed', handleThemeChange);
    };
  }, []);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--md-sys-color-background)', color: 'var(--md-sys-color-on-background)' }}>
        <SkipToContent />
        <Header isLoggedIn={isLoggedIn} />
        <main id="main-content" className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage data={homepageData} />} />
            <Route path="/blog" element={<PostListPage type={PostType.BLOG} title="Blog" />} />
            <Route path="/research" element={<PostListPage type={PostType.RESEARCH} title="Research" />} />
            <Route path="/leads" element={<PostListPage type={PostType.LEAD_MAGNET} title="Lead Magnets" />} />
            <Route path="/post/:slug" element={<PostDetailPage />} />
            <Route 
              path="/admin" 
              element={
                <AdminPage 
                  isLoggedIn={isLoggedIn} 
                  onLogin={handleLogin} 
                  onLogout={handleLogout}
                  homepageData={homepageData}
                  setHomepageData={setHomepageData}
                />
              } 
            />
          </Routes>
        </main>
        <Footer />
        <ThemePicker />
      </div>
    </HashRouter>
  );
};

export default App;