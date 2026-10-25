import React from 'react';
import { JobListing } from '../types';
import { MBTA_COLORS } from '../data/mbtaData';
import { JobCrawlerService } from '../services/jobCrawlerService';
import { Star, Mail, CheckCircle2, Globe } from 'lucide-react';

interface JobListProps {
  jobs: JobListing[];
  selectedJob: JobListing | null;
  onSelectJob: (job: JobListing) => void;
  onForwardEmail: (job: JobListing) => void;
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  selectedJob,
  onSelectJob,
  onForwardEmail,
}) => {
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mb-3 text-2xl">
          🔍
        </div>
        <h3 className="text-lg font-bold text-slate-200">No gigs match your filters</h3>
        <p className="text-sm text-slate-400 mt-1 max-w-sm">
          Try switching platform sources, expanding your walking distance, or lowering the minimum hourly wage.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {jobs.map((job) => {
        const isSelected = selectedJob?.id === job.id;
        const isExpired = job.status === 'expired' || job.healthCheckStatus === 'dead_link';
        const lineColor = MBTA_COLORS[job.nearestStation.line];
        const sourceColor = JobCrawlerService.getSourceColor(job.originalSource);

        return (
          <div
            key={job.id}
            onClick={() => onSelectJob(job)}
            className={`group relative p-4 rounded-2xl border transition-all cursor-pointer ${
              isExpired ? 'opacity-70 bg-slate-900/40' : ''
            } ${
              isSelected
                ? 'bg-slate-850/90 border-emerald-500/80 ring-2 ring-emerald-500/30 shadow-glow-green'
                : 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-850/60'
            }`}
          >
            {/* Top row: Company, Source Pill & Wage */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  {/* Platform Source Tag */}
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wide uppercase"
                    style={{
                      backgroundColor: `${sourceColor}20`,
                      color: sourceColor,
                      border: `1px solid ${sourceColor}50`,
                    }}
                  >
                    <Globe className="w-2.5 h-2.5" />
                    {job.originalSource.replace(' (r/bostonjobs)', '').replace(' (Boston Student Hub)', '')}
                  </span>

                  {isExpired && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wide uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      ⚠️ Expired / Closed
                    </span>
                  )}

                  <span className="text-xs font-semibold text-slate-400">
                    {job.company}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {job.title}
                </h3>
              </div>

              {/* Wage Pill */}
              <div className="flex flex-col items-end shrink-0">
                <span
                  className={`px-3 py-1 rounded-xl font-extrabold text-sm ${
                    job.hourlyWage >= 30
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : job.hourlyWage >= 20
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  ${job.hourlyWage}/hr
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 font-medium">
                  {job.hoursPerWeek.split(' ')[0]} hrs/wk
                </span>
              </div>
            </div>

            {/* Subway & Location Pill */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
              {/* MBTA Station Pill */}
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold"
                style={{
                  backgroundColor: `${lineColor}15`,
                  color:
                    lineColor === '#DA291C'
                      ? '#ff6b61'
                      : lineColor === '#ED8B00'
                      ? '#ffb84d'
                      : lineColor === '#00843D'
                      ? '#4ade80'
                      : '#60a5fa',
                  border: `1px solid ${lineColor}40`,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: lineColor }}
                />
                <span>{job.nearestStation.name}</span>
                <span className="opacity-80">({job.nearestStation.walkMinutes}m walk)</span>
              </div>

              {/* Work Auth Badge */}
              <span
                className={`px-2.5 py-1 rounded-lg font-medium ${
                  job.workAuth.includes('On-Campus')
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                    : job.workAuth.includes('CPT')
                    ? 'bg-sky-950/60 text-sky-300 border border-sky-800/60'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {job.workAuth.includes('On-Campus') ? '🎓 F-1 Safe' : job.workAuth}
              </span>

              {/* Posted Time */}
              <span className="text-slate-500 text-[11px] ml-auto">
                {job.postedAgo}
              </span>
            </div>

            {/* Trust & Pay Review Snippet */}
            <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {job.employerRating}
                </span>
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {job.payPunctualityRate}% Pay On-Time
                </span>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onForwardEmail(job)}
                  title="Forward details to my email"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onSelectJob(job)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-slate-950 text-slate-200 text-xs font-semibold transition-all"
                >
                  Details →
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
