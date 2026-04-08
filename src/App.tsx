import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import RightPanel from './components/RightPanel';
import Player from './components/Player';
import { Song } from './types';
import { SONGS } from './constants';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Search, Library, User } from 'lucide-react';

export default function App() {
  const [currentSong, setCurrentSong] = useState<Song | null>(SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handlePlaySong = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex h-screen bg-bg-main text-slate-200 overflow-hidden selection:bg-primary/30">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-bg-main flex flex-col items-center justify-center gap-6"
          >
            <div className="relative">
              <div className="w-20 h-20 border-4 border-primary/20 rounded-full animate-spin border-t-primary" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-primary rounded-full animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">FazalMusic</h2>
              <p className="text-slate-500 text-sm animate-pulse">Loading your experience...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-400/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="flex flex-1 overflow-hidden">
          <MainContent 
            onPlaySong={handlePlaySong} 
            currentSong={currentSong}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <RightPanel currentSong={currentSong} />
        </div>
      </div>

      {/* Player */}
      <Player 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
      />

      {/* Mobile Navigation (Bottom) */}
      <div className="lg:hidden fixed bottom-24 left-4 right-4 z-40 glass rounded-2xl p-2 flex items-center justify-around">
        <button className="p-3 text-primary"><Home size={24} /></button>
        <button className="p-3 text-slate-400"><Search size={24} /></button>
        <button className="p-3 text-slate-400"><Library size={24} /></button>
        <button className="p-3 text-slate-400"><User size={24} /></button>
      </div>
    </div>
  );
}
