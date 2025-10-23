import React from 'react';
import { Mail } from 'lucide-react';
import { APP_CONFIG } from '../constants';

export const Header: React.FC = () => (
  <header className="text-center mb-12 relative z-10">
    <img
      src={APP_CONFIG.ARTIST_IMAGE_URL}
      alt="ScarceKID Artist Profile"
      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover object-top mx-auto mb-6 border-4 border-white shadow-xl
                   shadow-[0_0_20px_rgba(255,77,109,0.8),_0_0_30px_rgba(255,165,0,0.6)]"
    />

    <h1
      className="text-6xl md:text-8xl font-bold uppercase mb-2 tracking-widest font-mono bg-clip-text text-transparent"
      style={{
        backgroundImage: `linear-gradient(to right, ${APP_CONFIG.WARM_PINK}, ${APP_CONFIG.SUNRISE_ORANGE})`,
        textShadow: `0 0 10px rgba(255, 77, 109, 0.5), 0 0 20px rgba(255, 77, 109, 0.3)`
      }}
    >
      {APP_CONFIG.MAIN_TITLE}
    </h1>
    <p
      className="text-xl md:text-2xl text-white font-mono uppercase"
      style={{
        textShadow: `0 0 8px rgba(255, 165, 0, 0.8)`
      }}
    >
      {APP_CONFIG.TAGLINE}
    </p>
     <div className="flex justify-center items-center mt-4">
        <a href={`mailto:${APP_CONFIG.ARTIST_EMAIL}`} className="flex items-center text-sm text-gray-400 font-mono hover:text-white transition-colors duration-300 group">
          <Mail size={16} className="mr-2 text-amber-500 group-hover:scale-110 transition-transform" />
          <span>{APP_CONFIG.ARTIST_EMAIL}</span>
        </a>
     </div>
    <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent w-48 mx-auto mt-4 rounded-full opacity-70"></div>
  </header>
);