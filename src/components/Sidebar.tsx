import React from 'react';
import { Home, Music2, TrendingUp, Heart, Info, Library, Disc, User } from 'lucide-react';
import { motion } from 'motion/react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Music2, label: 'Playlist' },
    { icon: TrendingUp, label: 'Trending' },
    { icon: Heart, label: 'Favorites' },
    { icon: Info, label: 'About' },
  ];

  const libraryItems = [
    { icon: Library, label: 'Browse' },
    { icon: Disc, label: 'Albums' },
    { icon: User, label: 'Artists' },
  ];

  return (
    <aside className="w-64 bg-bg-sidebar/50 backdrop-blur-md border-r border-white/5 flex flex-col h-full hidden lg:flex">
      <div className="p-8">
        <div className="flex items-center gap-2 text-primary">
          <Music2 size={32} />
          <span className="text-2xl font-bold tracking-tight text-white">FazalMusic</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-8">
        <div>
          <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Menu</h3>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    item.active
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Library</h3>
          <ul className="space-y-1">
            {libraryItems.map((item) => (
              <li key={item.label}>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200">
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="p-6">
        <div className="glass rounded-2xl p-4">
          <p className="text-xs text-slate-400 mb-2">Upgrade to</p>
          <p className="text-sm font-bold text-white mb-3">Premium Plan</p>
          <button className="w-full py-2 bg-white text-bg-main rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
