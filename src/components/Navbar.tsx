import React from 'react';
import { Bell, MapPin, Sparkles, TrainTrack } from 'lucide-react';

interface NavbarProps {
  onOpenSubscribe: () => void;
  jobCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSubscribe, jobCount }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#0b0f19]/90 backdrop-blur-md px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-glow-green text-white font-extrabold text-xl tracking-tighter">
            T
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                T-Gig <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold uppercase tracking-wider">Boston</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              MBTA Transit-Connected Student Gigs & Campus Jobs
            </p>
          </div>
        </div>

        {/* T-Line Quick Badges */}
        <div className="hidden md:flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-full px-3 py-1.5 text-xs text-slate-300">
          <span className="text-slate-400 flex items-center gap-1">
            <TrainTrack className="w-3.5 h-3.5 text-slate-400" /> T-Lines:
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#DA291C]/20 text-[#ff6b61] font-semibold border border-[#DA291C]/40">
            Red
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#ED8B00]/20 text-[#ffb84d] font-semibold border border-[#ED8B00]/40">
            Orange
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#00843D]/20 text-[#4ade80] font-semibold border border-[#00843D]/40">
            Green
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#003DA5]/20 text-[#60a5fa] font-semibold border border-[#003DA5]/40">
            Blue
          </span>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900 border border-slate-800/80 px-3 py-1.5 rounded-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span><strong className="text-white">{jobCount}</strong> Gigs along MBTA</span>
          </div>

          <button
            onClick={onOpenSubscribe}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-glow-green transition-all hover:scale-105 active:scale-95"
          >
            <Bell className="w-4 h-4" />
            <span>Daily Email Digest</span>
            <Sparkles className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>
      </div>
    </header>
  );
};
