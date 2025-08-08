import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import CgpaPage from './pages/CgpaPage';
import AboutPage from './pages/AboutPage';
import { ChartPieIcon, UsersIcon, MenuIcon, Gradients } from './components/VibrantIcons';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Lightweight CSS-based fade/slide without adding a heavy lib
  return (
    <div className="reveal">
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Default to dark theme
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem('theme');
    const shouldDark = saved ? saved === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', shouldDark);
  }, []);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `u-underline inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'text-cyan-300 bg-white/5 dark:bg-white/5'
        : 'text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
    }`;

  return (
    <HashRouter>
      {/* SVG gradients for vibrant icons */}
      <Gradients />

      {/* Header / Navbar */}
      <header className={`sticky top-0 z-30 ${scrolled ? 'backdrop-blur bg-white/60 dark:bg-gray-900/60 shadow-lg' : 'supports-[backdrop-filter]:bg-transparent'} border-b border-slate-200/70 dark:border-white/10 transition-all`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2 font-extrabold tracking-tight">
              <span className="sr-only">MNIT LIVE</span>
              <span className="brand-logo-platinum text-xl md:text-2xl">MNIT LIVE</span>
            </NavLink>

            <nav className="hidden md:flex items-center gap-2">
              <NavLink to="/" className={linkClasses} end>
                <ChartPieIcon className="w-5 h-5" />
                <span>Home</span>
              </NavLink>
              <NavLink to="/about" className={linkClasses}>
                <UsersIcon className="w-5 h-5" />
                <span>About Us</span>
              </NavLink>
            </nav>

            <button
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 ripple"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden pb-3 flex flex-col gap-2">
              <NavLink to="/" className={linkClasses} end onClick={() => setMobileOpen(false)}>
                <ChartPieIcon className="w-5 h-5" />
                <span>Home</span>
              </NavLink>
              <NavLink to="/about" className={linkClasses} onClick={() => setMobileOpen(false)}>
                <UsersIcon className="w-5 h-5" />
                <span>About Us</span>
              </NavLink>
            </div>
          )}
        </div>
      </header>

      {/* Parallax background layers */}
      <div className="parallax pointer-events-none fixed inset-0 -z-10 opacity-60">
        <div className="parallax-layer" style={{ transform: 'translateZ(-200px) scale(1.2) rotateZ(5deg)', background: 'radial-gradient(600px 600px at 20% 20%, rgba(67,56,202,.15), transparent 60%)' }} />
        <div className="parallax-layer" style={{ transform: 'translateZ(-400px) scale(1.4)', background: 'radial-gradient(700px 700px at 80% 40%, rgba(6,182,212,.15), transparent 60%)' }} />
        <div className="parallax-layer" style={{ transform: 'translateZ(-300px) scale(1.3) rotateZ(-8deg)', background: 'radial-gradient(500px 500px at 50% 90%, rgba(139,92,246,.12), transparent 60%)' }} />
      </div>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <PageTransition>
          <Routes>
            <Route path="/" element={<CgpaPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageTransition>
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-slate-200/70 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MNIT LIVE</p>
          <p className="opacity-80">Fast, minimal, and focused on CGPA/SGPA calculation.</p>
        </div>
      </footer>
    </HashRouter>
  );
};

export default App;
