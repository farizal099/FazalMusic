import React from 'react';
import { Search, Bell, Settings, Play, Heart, Plus, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import { SONGS, ARTISTS } from '../constants';
import { Song } from '../types';

interface MainContentProps {
  onPlaySong: (song: Song) => void;
  currentSong: Song | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({ onPlaySong, currentSong, searchQuery, setSearchQuery }) => {
  const filteredSongs = SONGS.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-y-auto h-full pb-32">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-bg-main/80 backdrop-blur-md p-6 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search for songs, artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-white transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 text-slate-400 hover:text-white transition-colors">
            <Settings size={20} />
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
            <img src="https://picsum.photos/seed/user/100/100" alt="User" referrerPolicy="no-referrer" />
          </div>
        </div>
      </header>

      <div className="p-8 space-y-10">
        {/* Hero Banner */}
        <section>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-64 rounded-3xl overflow-hidden group"
          >
            <img 
              src="https://picsum.photos/seed/blinding/1200/400" 
              alt="Hero" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center p-12">
              <span className="text-slate-300 font-bold text-sm uppercase tracking-widest mb-2">Curated Playlist</span>
              <h1 className="text-5xl font-black text-white mb-4">BLINDING LIGHT</h1>
              <p className="text-slate-300 max-w-md mb-6">Enjoy vivid emotions with this stunning music album. Each track is a story.</p>
              <div className="flex items-center gap-4">
                <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95">
                  <Play size={20} fill="currentColor" />
                  Play Now
                </button>
                <button className="glass hover:bg-white/10 text-white px-8 py-3 rounded-full font-bold transition-all">
                  Follow
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Popular Artists */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Popular artists</h2>
            <button className="text-sm text-slate-400 hover:text-primary transition-colors">See all</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {ARTISTS.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-3 group cursor-pointer"
              >
                <div className="relative w-full aspect-square rounded-full overflow-hidden border-4 border-transparent group-hover:border-primary/50 transition-all duration-300">
                  <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <span className="font-semibold text-slate-300 group-hover:text-white transition-colors">{artist.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Playlist / Songs */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recently played</h2>
            <button className="text-sm text-slate-400 hover:text-primary transition-colors">See all</button>
          </div>
          <div className="space-y-2">
            {filteredSongs.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`group flex items-center gap-4 p-3 rounded-2xl transition-all duration-200 cursor-pointer ${
                  currentSong?.id === song.id ? 'bg-primary/10' : 'hover:bg-white/5'
                }`}
                onClick={() => onPlaySong(song)}
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={song.cover} alt={song.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className={`absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${currentSong?.id === song.id ? 'opacity-100' : ''}`}>
                    <Play size={16} fill="white" className="text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-semibold truncate ${currentSong?.id === song.id ? 'text-primary' : 'text-white'}`}>
                    {song.title}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">{song.artist}</p>
                </div>
                <div className="hidden md:block text-sm text-slate-500 font-mono">{song.duration}</div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                    <Heart size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-white transition-colors">
                    <Plus size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-white transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default MainContent;
