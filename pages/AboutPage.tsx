import { FC } from 'react';
import { PROFILE_PHOTO } from '../constants';

const AboutPage: FC = () => {
  return (
    <div className="min-h-[calc(100vh-200px)]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Clean photo card */}
          <div className="relative mx-auto">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl subtle-shadow overflow-hidden bg-white dark:bg-white/5 ring-1 ring-slate-200/70 dark:ring-white/10">
              <img
                src={PROFILE_PHOTO}
                alt="Kunal Thapliyal"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-5">
            <h1 className="text-4xl md:text-5xl font-extrabold">About Me</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Hi, I’m <span className="font-semibold text-cyan-600 dark:text-cyan-400">Kunal Thapliyal</span> — a creator, tech enthusiast, and MNIT student dedicated to making tools that simplify student life. MNIT LIVE is designed for you to finally able to calculate your cgpas accurately and efficiently. I hope you find it useful!
            </p>

            {/* Simple social buttons */}
            <div className="flex gap-3 pt-4">
              <a href="https://www.instagram.com/that_relatable_kunal/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-slate-100 ring-1 ring-slate-200/70 dark:ring-white/10 hover:bg-slate-200/60 dark:hover:bg-white/15">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.5" cy="6.5" r="1"/></svg>
                <span className="font-medium">Instagram</span>
              </a>
              <a href="https://www.linkedin.com/in/kunal-thapliyal-b308712ba/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-slate-100 ring-1 ring-slate-200/70 dark:ring-white/10 hover:bg-slate-200/60 dark:hover:bg-white/15">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0zM8 8h4.78v2.18h.07c.66-1.25 2.28-2.57 4.69-2.57 5.01 0 5.94 3.3 5.94 7.59V24h-5v-7.62c0-1.82-.03-4.16-2.53-4.16-2.53 0-2.92 1.98-2.92 4.03V24H8z"/></svg>
                <span className="font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
