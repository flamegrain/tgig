import React, { useState } from 'react';
import { X, Mail, Bell, Sparkles, CheckCircle2, Shield, Train } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SubwayLine } from '../types';

interface EmailSubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmailSubscribeModal: React.FC<EmailSubscribeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState('');
  const [selectedLines, setSelectedLines] = useState<SubwayLine[]>(['Red', 'Green', 'Orange']);
  const [minWage, setMinWage] = useState<number>(18);
  const [onlyF1, setOnlyF1] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleLine = (line: SubwayLine) => {
    if (selectedLines.includes(line)) {
      if (selectedLines.length > 1) {
        setSelectedLines(selectedLines.filter((l) => l !== line));
      }
    } else {
      setSelectedLines([...selectedLines, line]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-slate-750 rounded-3xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-3xl">
              📬
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              You're in the T-Gig Circle!
            </h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              We just sent a confirmation to <strong className="text-emerald-400">{email}</strong>.
              Every morning at <strong>8:00 AM EST</strong>, you'll receive handpicked student gigs near your chosen MBTA lines.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
              >
                Back to Map
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
                <Bell className="w-3.5 h-3.5" />
                <span>Daily Boston Student Gig Digest</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Never Miss a Subway-Friendly Job
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Zero spam. Delivered straight to your inbox at 8:00 AM every morning with exact T-stops and verified wages.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Your Student / Personal Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. yourname@northeastern.edu or @bu.edu"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-750 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* MBTA Line Preferences */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Preferred MBTA Subway Lines
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Red', 'Orange', 'Green', 'Blue'] as SubwayLine[]).map((line) => {
                    const isSelected = selectedLines.includes(line);
                    return (
                      <button
                        type="button"
                        key={line}
                        onClick={() => toggleLine(line)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          isSelected
                            ? line === 'Red'
                              ? 'bg-[#DA291C]/30 text-rose-300 border-[#DA291C]'
                              : line === 'Orange'
                              ? 'bg-[#ED8B00]/30 text-amber-300 border-[#ED8B00]'
                              : line === 'Green'
                              ? 'bg-[#00843D]/30 text-emerald-300 border-[#00843D]'
                              : 'bg-[#003DA5]/30 text-sky-300 border-[#003DA5]'
                            : 'bg-slate-950/40 text-slate-500 border-slate-800'
                        }`}
                      >
                        {line}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Wage and Visa Check */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Min Hourly Wage
                  </label>
                  <select
                    value={minWage}
                    onChange={(e) => setMinWage(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-750 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value={15}>$15+/hr (Any)</option>
                    <option value={18}>$18+/hr (Standard)</option>
                    <option value={22}>$22+/hr (Tech/Tutoring)</option>
                    <option value={28}>$28+/hr (Premium)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Visa Compliance
                  </label>
                  <button
                    type="button"
                    onClick={() => setOnlyF1(!onlyF1)}
                    className={`w-full py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      onlyF1
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-950 text-slate-400 border-slate-750'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>{onlyF1 ? 'F-1 Safe Only' : 'All Gigs'}</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm shadow-glow-green flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <span>Subscribe Free (No Spam Ever)</span>
                <Sparkles className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-500">
                You can 1-click unsubscribe at any time. Powered by T-Gig open campus crawler.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
