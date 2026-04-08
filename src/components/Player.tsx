import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, 
  Volume2, VolumeX, Heart, ListMusic, Maximize2 
} from 'lucide-react';
import { motion } from 'motion/react';
import { Song } from '../types';

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const Player: React.FC<PlayerProps> = ({ currentSong, isPlaying, setIsPlaying }) => {
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="max-w-6xl mx-auto glass-dark rounded-3xl p-4 flex items-center gap-4 md:gap-8 pointer-events-auto shadow-2xl"
      >
        {/* Song Info */}
        <div className="flex items-center gap-4 w-1/4 min-w-[150px]">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
            <img src={currentSong.cover} alt={currentSong.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="hidden sm:block min-w-0">
            <h4 className="font-bold text-white truncate text-sm md:text-base">{currentSong.title}</h4>
            <p className="text-xs text-slate-400 truncate">{currentSong.artist}</p>
          </div>
          <button className="text-slate-400 hover:text-primary transition-colors hidden lg:block">
            <Heart size={18} />
          </button>
        </div>

        {/* Controls & Progress */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="flex items-center gap-4 md:gap-8">
            <button className="text-slate-500 hover:text-white transition-colors hidden sm:block">
              <Shuffle size={18} />
            </button>
            <button className="text-slate-300 hover:text-white transition-colors">
              <SkipBack size={24} fill="currentColor" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-primary/30"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>
            <button className="text-slate-300 hover:text-white transition-colors">
              <SkipForward size={24} fill="currentColor" />
            </button>
            <button className="text-slate-500 hover:text-white transition-colors hidden sm:block">
              <Repeat size={18} />
            </button>
          </div>

          <div className="w-full flex items-center gap-3">
            <span className="text-[10px] font-mono text-slate-500 w-10 text-right">1:24</span>
            <div className="flex-1 h-1.5 bg-white/10 rounded-full relative group cursor-pointer">
              <div 
                className="absolute top-0 left-0 h-full bg-primary rounded-full" 
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-500 w-10">{currentSong.duration}</span>
          </div>
        </div>

        {/* Volume & Extra */}
        <div className="flex items-center justify-end gap-4 w-1/4 hidden md:flex">
          <div className="flex items-center gap-2 w-32">
            <button onClick={() => setIsMuted(!isMuted)} className="text-slate-400 hover:text-white transition-colors">
              {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <div className="flex-1 h-1 bg-white/10 rounded-full relative group cursor-pointer">
              <div 
                className="absolute top-0 left-0 h-full bg-slate-300 rounded-full" 
                style={{ width: `${isMuted ? 0 : volume}%` }}
              />
            </div>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors">
            <ListMusic size={18} />
          </button>
          <button className="text-slate-400 hover:text-white transition-colors">
            <Maximize2 size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Player;
