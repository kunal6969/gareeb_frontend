import { FC } from 'react';
import { PROFILE_PHOTO } from '../constants';

const AboutPage: FC = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center space-y-8 p-8">
        {/* Profile Photo */}
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 p-1">
            <img 
              src={PROFILE_PHOTO} 
              alt="Kunal Thapliyal" 
              className="w-full h-full rounded-full object-cover bg-slate-200"
              onError={(e) => {
                // Fallback to a gradient background with initials if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-3xl font-bold hidden">
              KT
            </div>
          </div>
        </div>

        {/* About Me Content */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            About Me
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            I am <span className="font-semibold text-cyan-600 dark:text-cyan-400">Kunal Thapliyal</span>, 
            a passionate creator and tech enthusiast from MNIT Jaipur. This platform is built to help 
            students quickly and accurately calculate their CGPA/SGPA. Outside of coding, I share my 
            journey on social media, connecting with like-minded learners and building tools that make 
            academic life easier.
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 pt-6">
            <a 
              href="https://www.instagram.com/that_relatable_kunal/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="font-medium">Instagram</span>
            </a>

            <a 
              href="https://www.linkedin.com/in/kunal-thapliyal-b308712ba/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="font-medium">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
            About MNIT LIVE
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            MNIT LIVE is designed to make academic calculations simple and accessible. 
            No logins, no complicated setups - just pure functionality to help MNIT students 
            track their academic progress efficiently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
