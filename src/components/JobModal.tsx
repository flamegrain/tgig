import React, { useState } from 'react';
import { JobListing } from '../types';
import { MBTA_COLORS } from '../data/mbtaData';
import {
  X,
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  ExternalLink,
  Mail,
  CheckCircle2,
  DollarSign,
  AlertCircle,
  AlertTriangle,
  ThumbsUp,
  Share2,
  Calendar,
  Send,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface JobModalProps {
  job: JobListing | null;
  onClose: () => void;
}

export const JobModal: React.FC<JobModalProps> = ({ job, onClose }) => {
  const [emailInput, setEmailInput] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  if (!job) return null;

  const lineColor = MBTA_COLORS[job.nearestStation.line];

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;

    setEmailSent(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });

    setTimeout(() => {
      setEmailSent(false);
      setEmailInput('');
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-800 bg-slate-900/60 sticky top-0 z-10 backdrop-blur-md flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                {job.category}
              </span>
              <span className="text-xs text-slate-400">Posted {job.postedAgo}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5 leading-snug">
              {job.title}
            </h2>
            <p className="text-sm font-semibold text-slate-300 mt-0.5">
              {job.company} • <span className="text-slate-400 font-normal">{job.location}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Wage */}
            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-750">
              <span className="text-[11px] text-slate-400 block font-medium">Hourly Wage</span>
              <span className="text-xl font-extrabold text-emerald-400 mt-0.5 block">
                ${job.hourlyWage}
                <span className="text-xs font-normal text-slate-400">/hr</span>
              </span>
            </div>

            {/* Nearest Transit */}
            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-750">
              <span className="text-[11px] text-slate-400 block font-medium">MBTA Distance</span>
              <span className="text-sm font-bold text-slate-200 mt-1 flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: lineColor }}
                />
                {job.nearestStation.walkMinutes} min walk
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                {job.nearestStation.name} ({job.nearestStation.line})
              </span>
            </div>

            {/* Work Auth */}
            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-750">
              <span className="text-[11px] text-slate-400 block font-medium">Work Authorization</span>
              <span className="text-xs font-bold text-sky-400 mt-1 block truncate">
                {job.workAuth}
              </span>
              <span className="text-[10px] text-slate-400 block">Student Eligible</span>
            </div>

            {/* Schedule */}
            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-750">
              <span className="text-[11px] text-slate-400 block font-medium">Schedule Flexibility</span>
              <span className="text-xs font-bold text-amber-400 mt-1 block">
                {job.scheduleFlexibility.split(' ')[0]}
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                {job.hoursPerWeek}
              </span>
            </div>
          </div>

          {/* Health & Expiration Status Notice */}
          {job.status === 'expired' || job.healthCheckStatus === 'dead_link' ? (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Position Closed / Expired:</strong> This opening was detected as delisted or filled on the host platform during the scheduled health audit ({job.lastVerifiedAt || 'Recently'}).
                </span>
              </div>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Verified Active Opening • Audited on {job.lastVerifiedAt || 'Today'}</span>
              </div>
              <span className="text-[11px] text-emerald-500/80 font-medium hidden sm:inline">Periodic auto-sync active</span>
            </div>
          )}

          {/* Aggregator Notice Banner */}
          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {job.originalSource === 'Craigslist' ? (
                  <span>
                    Verified direct post on <strong className="text-[#a855f7]">Craigslist Boston Gigs</strong>. Same-day / instant payout gig.
                  </span>
                ) : (
                  <span>
                    Direct application via <strong className="text-white">{job.company}</strong> career portal. T-Gig does not charge any broker fees.
                  </span>
                )}
              </span>
            </div>
            <a
              href={job.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold underline shrink-0 ml-2"
            >
              Open Original ↗
            </a>
          </div>

          {/* Job Description & Details */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-2">
                About the Role
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            <div>
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-2">
                Key Tasks
              </h4>
              <ul className="space-y-1.5 text-sm text-slate-300">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Perks */}
            <div>
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-2">
                Student Perks & Benefits
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.perks.map((perk, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold"
                  >
                    ✨ {perk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Employer Trust & Reviews Section */}
          <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/80 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h4 className="text-base font-bold text-white">
                  Employer Reputation & Payment History
                </h4>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  {job.employerRating} / 5.0
                </span>
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  {job.payPunctualityRate}% On-Time Pay
                </span>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-3 pt-2">
              {job.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200">{rev.authorRole}</span>
                      {rev.verifiedStudent && (
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-semibold">
                          Verified Student
                        </span>
                      )}
                    </div>
                    <span className="text-slate-400 text-[11px]">{rev.date}</span>
                  </div>

                  <p className="text-slate-300 italic">"{rev.comment}"</p>

                  <div className="flex items-center gap-2 pt-1 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      ⚡ Pay Speed: <strong className="text-white">{rev.paySpeed}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      🛋️ Vibe: <strong className="text-emerald-400">{rev.vibe}</strong>
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-slate-400">
                      <ThumbsUp className="w-3 h-3" /> {rev.upvotes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Forward to Email Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-850/80 border border-slate-700/60">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200 mb-1">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Forward this gig to your inbox</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              We'll send you the address, MBTA transit steps, and direct apply link for easy review.
            </p>

            {emailSent ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Sent! Check your inbox shortly. Good luck with the application!
              </div>
            ) : (
              <form onSubmit={handleSendEmail} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="your.name@husky.neu.edu / college.edu"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-transform active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send to Me</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-400 hidden sm:block">
            No registration needed to view jobs
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
            >
              Close
            </button>
            {job.status === 'expired' || job.healthCheckStatus === 'dead_link' ? (
              <a
                href={job.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 font-bold text-xs transition-colors"
              >
                <span>View Archived Posting</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <a
                href={job.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-glow-green transition-transform active:scale-95"
              >
                <span>Apply on {job.company}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
