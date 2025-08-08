import { FC } from 'react';
import { PROFILE_PHOTO } from '../constants';

const AboutPage: FC = () => {
  return (
    <div className="min-h-[calc(100vh-200px)]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="w-full h-20 rounded-2xl mb-10 subtle-shadow bg-white/60 dark:bg-white/5" />
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
              Hi, I’m <span className="font-semibold text-cyan-600 dark:text-cyan-400">Kunal Thapliyal</span> — a creator, tech enthusiast, and MNIT student dedicated to making tools that simplify student life. MNIT LIVE is designed for speed, accuracy, and style. Let’s connect!
            </p>

            {/* Simple social buttons */}
            <div className="flex gap-3 pt-4">
              <a href="https://www.instagram.com/that_relatable_kunal/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-slate-100 ring-1 ring-slate-200/70 dark:ring-white/10">
                <span>Instagram</span>
              </a>
              <a href="https://www.linkedin.com/in/kunal-thapliyal-b308712ba/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-900 dark:bg:white/10 dark:text-slate-100 ring-1 ring-slate-200/70 dark:ring-white/10">
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
