import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface ValentineDisplayProps {
  videoUrl: string;
  recipientName: string;
  message: string;
  onBack: () => void;
}

const ValentineDisplay: React.FC<ValentineDisplayProps> = ({ videoUrl, recipientName, message, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<number | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progressValue = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progressValue);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto animate-fade-in py-8">
      
      {/* Header / Title */}
      <div className="text-center mb-6 z-10 relative">
        <h1 className="font-script text-5xl md:text-7xl text-valentine-600 drop-shadow-sm mb-2 px-4">
          Happy Valentine's Day
        </h1>
        {recipientName && (
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-valentine-800 tracking-wide">
            {recipientName}
          </h2>
        )}
      </div>

      {/* Frame Container */}
      <div className="relative w-full max-w-4xl px-4 md:px-8">
        
        {/* Decorative Elements */}
        <div className="absolute -top-6 -left-2 text-6xl rotate-[-15deg] z-20 drop-shadow-lg animate-pulse-slow">🎀</div>
        <div className="absolute -bottom-6 -right-2 text-6xl rotate-[15deg] z-20 drop-shadow-lg animate-pulse-slow">🌹</div>
        <div className="absolute top-1/2 -left-8 md:-left-12 text-4xl animate-bounce delay-75 z-20">💖</div>
        <div className="absolute top-1/3 -right-8 md:-right-12 text-4xl animate-bounce delay-150 z-20">💝</div>

        {/* The Frame */}
        <div 
          className="relative bg-white/40 backdrop-blur-xl rounded-[2rem] p-4 md:p-6 shadow-2xl border-4 border-white/60 overflow-hidden"
          onMouseMove={handleMouseMove}
          onClick={handleMouseMove}
        >
          {/* Video Container */}
          <div className="relative rounded-2xl overflow-hidden shadow-inner bg-black aspect-video group">
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-contain bg-black"
              loop
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
            />
            
            {/* Custom Overlay Controls */}
            <div 
              className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 transition-opacity duration-300 flex flex-col justify-end p-6 ${showControls ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="flex items-center gap-4 text-white">
                <button 
                  onClick={togglePlay}
                  className="p-3 rounded-full bg-valentine-600/90 hover:bg-valentine-500 hover:scale-110 transition-all shadow-lg"
                >
                  {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                </button>

                <button onClick={restartVideo} className="p-2 text-white/80 hover:text-white transition-colors">
                  <RotateCcw size={20} />
                </button>

                <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden mx-2 cursor-pointer">
                  <div 
                    className="h-full bg-valentine-500 rounded-full" 
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <button onClick={toggleMute} className="p-2 text-white/80 hover:text-white transition-colors">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Message Area */}
          {message && (
            <div className="mt-6 text-center px-4 md:px-12 pb-2">
              <p className="font-script text-3xl md:text-4xl text-valentine-700 leading-relaxed">
                "{message}"
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Back/Reset button removed for this version as it is a single personalized view */}
    </div>
  );
};

export default ValentineDisplay;