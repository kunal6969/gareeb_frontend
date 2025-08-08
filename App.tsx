import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import CgpaPage from './pages/CgpaPage';
import AboutPage from './pages/AboutPage';
import { ChartPieIcon, UsersIcon, MenuIcon, Gradients } from './components/VibrantIcons';

const App: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Default to dark theme
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem('theme');
    const shouldDark = saved ? saved === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', shouldDark);
  }, []);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'text-cyan-300 bg-white/5 dark:bg-white/5'
        : 'text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
    }`;

  return (
    <HashRouter>
      {/* SVG gradients for vibrant icons */}
      <Gradients />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 border-b border-slate-200/70 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2 font-extrabold tracking-tight text-slate-900 dark:text-white">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-black">M</span>
              <span>MNIT LIVE</span>
            </NavLink>

            <nav className="hidden md:flex items-center gap-2">
              <NavLink to="/" className={linkClasses} end>
                <ChartPieIcon className="w-5 h-5" />
                <span>Home</span>
              </NavLink>
              <NavLink to="/about" className={linkClasses}>
                <UsersIcon className="w-5 h-5" />
                <span>About</span>
              </NavLink>
            </nav>

            <button
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200"
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
                <span>About</span>
              </NavLink>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<CgpaPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-slate-200/70 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} MNIT LIVE </p>
          <p className="opacity-80">Fast, minimal, and focused on CGPA/SGPA calculation.</p>
        </div>
      </footer>
    </HashRouter>
  );
};

export default App;
