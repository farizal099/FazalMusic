import React from 'react';
import { MoreHorizontal, ListMusic, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Song } from '../types';
import { SONGS } from '../constants';

interface RightPanelProps {
  currentSong: Song | null;
}

const RightPanel: React.FC<RightPanelProps> = ({ currentSong }) => {
  const displaySong = currentSong || SONGS[0];

  return (
    <aside className="w-80 bg-bg-sidebar/30 backdrop-blur-md border-l border-white/5 flex flex-col h-full hidden xl:flex">
      <div className="p-8 flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-slate-300">
            <Volume2 size={18} />
            <span className="text-sm font-semibold">Now Playing</span>
          </div>
          <button className="p-2 text-slate-400 hover:text-white transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-8 pr-2">
          {/* Main Cover */}
          <motion.div
            key={displaySong.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
              <img 
                src={displaySong.cover} 
                alt={displaySong.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-2xl font-bold text-white truncate">{displaySong.title}</h3>
                <button className="text-slate-400 hover:text-primary transition-colors">
                  <ListMusic size={20} />
                </button>
              </div>
              <p className="text-slate-400">{displaySong.artist}</p>
            </div>
          </motion.div>

          {/* Up Next */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Up Next</h4>
              <button className="text-xs text-primary font-semibold">See all</button>
            </div>
            <div className="space-y-3">
              {SONGS.slice(0, 3).map((song) => (
                <div key={song.id} className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={song.cover} alt={song.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-semibold text-slate-300 truncate group-hover:text-white transition-colors">
                      {song.title}
                    </h5>
                    <p className="text-xs text-slate-500 truncate">{song.artist}</p>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{song.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lyrics Preview */}
        <div className="mt-8 glass rounded-2xl p-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Lyrics</h4>
          <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 italic">
            "I said, ooh, I'm blinded by the lights. No, I can't sleep until I feel your touch..."
          </p>
        </div>
      </div>
    </aside>
  );
};

export default RightPanel;
