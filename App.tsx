import React, { useState } from 'react';
import FloatingHearts from './components/FloatingHearts';
import ValentineDisplay from './components/ValentineDisplay';
import { AppStage } from './types';
import { Heart, PlayCircle, Sparkles } from 'lucide-react';

// --- CONFIGURATION ---
// Replace the URL below with your direct video link (MP4/WebM)
const VIDEO_URL = "https://findmeaninternship.com/jargons/LinuRajVal.mp4";
const RECIPIENT_NAME = "Linu Rajwani";
const MESSAGE = "I couldn't afford to buy anything that could touch your heart, so from the depths of my thoughts, I put my hands to work. I hope this affects joy and a tear or two on you.";
// ---------------------

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.SETUP);

  const handleOpen = () => {
    setStage(AppStage.PREVIEW);
  };

  const handleReset = () => {
    setStage(AppStage.SETUP);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-valentine-50 via-pink-50 to-valentine-100 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">

      <FloatingHearts />

      {stage === AppStage.SETUP && (
        <div className="z-10 w-full max-w-lg bg-white/60 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/50 animate-fade-in-up flex flex-col items-center text-center">

          <div className="inline-block p-4 bg-valentine-100 rounded-full text-valentine-500 mb-6 shadow-sm animate-pulse-slow">
            <Sparkles size={40} />
          </div>

          <h1 className="font-script text-5xl md:text-6xl text-valentine-600 mb-4 drop-shadow-sm">
            For You
          </h1>

          <p className="text-valentine-800/70 mb-8 text-lg font-medium">
            A special surprise awaits...
          </p>

          <button
            onClick={handleOpen}
            className="group relative w-full aspect-video max-w-sm rounded-2xl overflow-hidden shadow-xl border-4 border-white transition-transform hover:scale-[1.02] hover:shadow-2xl cursor-pointer bg-black/5"
          >
            {/* Placeholder Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-valentine-300 to-valentine-500 opacity-20 group-hover:opacity-30 transition-opacity"></div>

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 text-valentine-600 rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <PlayCircle size={48} fill="currentColor" className="text-valentine-100" />
              </div>
            </div>

            {/* Text hint */}
            <div className="absolute bottom-4 left-0 right-0 text-valentine-900/60 text-sm font-semibold tracking-wider uppercase">
              Click to Open
            </div>
          </button>

          <div className="mt-8 flex items-center gap-2 text-valentine-400 text-sm font-medium">
            <Heart size={16} className="fill-valentine-400 animate-pulse" />
            <span>Happy Valentine's Day</span>
          </div>

        </div>
      )}

      {stage === AppStage.PREVIEW && (
        <ValentineDisplay
          videoUrl={VIDEO_URL}
          recipientName={RECIPIENT_NAME}
          message={MESSAGE}
          onBack={handleReset}
        />
      )}

    </div>
  );
};

export default App;
