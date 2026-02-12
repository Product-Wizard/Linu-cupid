import React, { useCallback, useRef } from 'react';
import { Upload, Video, Heart } from 'lucide-react';

interface VideoUploaderProps {
  onVideoSelect: (url: string) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onVideoSelect(url);
    }
  }, [onVideoSelect]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      onVideoSelect(url);
    }
  }, [onVideoSelect]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div 
      className="w-full max-w-md mx-auto"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/*"
        className="hidden"
      />
      
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-valentine-300 rounded-3xl p-10 
                   bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:border-valentine-500 hover:scale-[1.02]
                   transition-all duration-300 cursor-pointer group flex flex-col items-center justify-center gap-4 shadow-lg"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-valentine-200 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="bg-gradient-to-br from-valentine-400 to-valentine-600 p-4 rounded-full text-white relative shadow-md group-hover:rotate-12 transition-transform duration-300">
            <Video size={32} />
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-bold text-valentine-800 mb-1">Upload a Video</h3>
          <p className="text-valentine-600 text-sm">Drag & drop or click to choose a file</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-valentine-400 font-medium bg-valentine-50 px-3 py-1 rounded-full border border-valentine-100">
          <Upload size={12} />
          <span>MP4, MOV, WebM</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-valentine-800/60 text-sm flex items-center justify-center gap-1">
          Made with <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" /> for your Valentine
        </p>
      </div>
    </div>
  );
};

export default VideoUploader;