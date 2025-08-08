import { FC } from 'react';
import { PROFILE_PHOTO } from '../constants';

const AboutPage: FC = () => {
  return (
    <div className="min-h-[calc(100vh-200px)]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="w-full h-24 bg-gradient-to-r from-indigo-600/20 via-cyan-500/20 to-violet-600/20 rounded-2xl blur-[1px] mb-10" />
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Floating 3D card */}
          <div className="tilt relative mx-auto">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl p-[2px] bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-[0_30px_70px_rgba(6,182,212,.25)]">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-violet-500/20 blur-2xl" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900/40 backdrop-blur">
                <img
                  src={PROFILE_PHOTO}
                  alt="Kunal Thapliyal"
                  className="w-full h-full object-cover opacity-95"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 grid place-items-center text-white text-5xl font-black select-none">KT</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-5">
            <h1 className="text-4xl md:text-5xl font-extrabold brand-logo">About Me</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Hi, I’m <span className="font-semibold text-cyan-600 dark:text-cyan-400">Kunal Thapliyal</span> — a creator, tech enthusiast, and MNIT student dedicated to making tools that simplify student life. MNIT LIVE is designed for speed, accuracy, and style. Let’s connect!
            </p>

            {/* Social 3D buttons */}
            <div className="flex gap-4 pt-4">
              <a href="https://www.instagram.com/that_relatable_kunal/" target="_blank" rel="noopener noreferrer"
                 className="tilt group relative inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-rose-500 to-fuchsia-600 text-white shadow-[0_20px_40px_rgba(236,72,153,.35)] hover:shadow-[0_28px_60px_rgba(236,72,153,.5)] transition">
                <span className="inline-block group-hover:rotate-6 transition-transform">★</span>
                <span className="font-semibold">Instagram</span>
              </a>
              <a href="https://www.linkedin.com/in/kunal-thapliyal-b308712ba/" target="_blank" rel="noopener noreferrer"
                 className="tilt group relative inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-[0_20px_40px_rgba(37,99,235,.35)] hover:shadow-[0_28px_60px_rgba(6,182,212,.5)] transition">
                <span className="inline-block group-hover:-rotate-6 transition-transform">◆</span>
                <span className="font-semibold">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
