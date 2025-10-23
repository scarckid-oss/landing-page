import React from 'react';
import { APP_CONFIG } from './constants';
import { GlowingLink } from './components/GlowingLink';
import { Header } from './components/Header';
import { SectionTitle } from './components/SectionTitle';
import { EmailSubscription } from './components/EmailSubscription';
import { LatestDropShowcase } from './components/LatestDropShowcase';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ArtistBio } from './components/ArtistBio';
import { TourDates } from './components/TourDates';
import { AiChat } from './components/AiChat';
import { LyricExplainer } from './components/LyricExplainer';
import { FanGallery } from './components/FanGallery';
import { MerchDesigner } from './components/MerchDesigner';
import { Acknowledgement } from './components/Acknowledgement';

const App: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center p-4 relative overflow-hidden"
    >
        <AnimatedBackground />
        <div
            className="absolute inset-0 bg-black opacity-70"
            style={{
                backgroundImage: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.01) 0, rgba(255, 255, 255, 0.01) 2px, transparent 2px, transparent 10px)'
            }}
        ></div>

      <div className="max-w-[640px] w-full mx-auto pt-16 pb-12 relative z-10">

        <Header />

        <main className="space-y-12">

          <LatestDropShowcase />
          
          <ArtistBio />
          
          <LyricExplainer />

          <MerchDesigner />
          
          <FanGallery />

          <AiChat />
          
          <TourDates />

          <section>
            <SectionTitle color={APP_CONFIG.SUNRISE_ORANGE}>
              {'// stream now //'}
            </SectionTitle>
            <div className="space-y-4">
              {APP_CONFIG.streamingLinks.map((link, index) => (
                <GlowingLink key={index} {...link} />
              ))}
            </div>
          </section>

          <EmailSubscription />

          <section>
            <SectionTitle color={APP_CONFIG.WARM_PINK}>
              {'\\ connect //'}
            </SectionTitle>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {APP_CONFIG.socialLinks.map((link, index) => (
                <GlowingLink key={index} {...link} />
              ))}
            </div>
          </section>
          
          <Acknowledgement />

        </main>

        <footer className="mt-16 text-center text-sm text-gray-400 font-mono relative z-10">
            <p>MESSAGE: AWAKEN // [STATUS: ONLINE]</p>
            <p className="mt-1 text-xs">© 2024. SCARCEKID. ALL RIGHTS RESERVED.</p>
        </footer>

      </div>
    </div>
  );
};

export default App;