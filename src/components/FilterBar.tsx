import React from 'react';
import { Search, Train, Clock, ShieldCheck, DollarSign, X, Globe, Sparkles } from 'lucide-react';
import { JobCategory, JobSource, SubwayLine, WorkAuth } from '../types';
import { JobCrawlerService } from '../services/jobCrawlerService';

export interface FilterState {
  search: string;
  selectedLine: SubwayLine | 'All';
  maxWalkMinutes: number; // 0 for any, 3, 5, 10
  selectedAuth: WorkAuth | 'All';
  minWage: number;
  selectedCategory: JobCategory | 'All';
  selectedSource: JobSource | 'All';
}

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalFiltered: number;
  onRefreshCrawl?: () => void;
  isCrawling?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  totalFiltered,
  onRefreshCrawl,
  isCrawling,
}) => {
  const subwayLines: (SubwayLine | 'All')[] = ['All', 'Red', 'Orange', 'Green', 'Blue'];
  const categories: (JobCategory | 'All')[] = [
    'All',
    'Corporate Co-op & Intern',
    'Tutoring',
    'Babysitting & Nanny',
    'Pet Care & Walking',
    'Barista & Cafe',
    'Campus',
    'Events & Gigs',
    'Retail & Ops',
  ];

  const availableSources: (JobSource | 'All')[] = [
    'All',
    'WayUp',
    'Sittercity',
    'Wag!',
    'Superprof',
    'Snagajob',
    'Reddit (r/bostonjobs)',
    'Craigslist',
    'Discord (Boston Student Hub)',
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, search: e.target.value });
  };

  const clearFilters = () => {
    onChange({
      search: '',
      selectedLine: 'All',
      maxWalkMinutes: 0,
      selectedAuth: 'All',
      minWage: 15,
      selectedCategory: 'All',
      selectedSource: 'All',
    });
  };

  const isFiltered =
    filters.search !== '' ||
    filters.selectedLine !== 'All' ||
    filters.maxWalkMinutes !== 0 ||
    filters.selectedAuth !== 'All' ||
    filters.minWage > 15 ||
    filters.selectedCategory !== 'All' ||
    filters.selectedSource !== 'All';

  const getLineButtonClasses = (line: SubwayLine | 'All') => {
    const isSelected = filters.selectedLine === line;
    if (line === 'All') {
      return isSelected
        ? 'bg-white text-slate-900 font-bold shadow-md'
        : 'bg-slate-800 text-slate-300 hover:bg-slate-700';
    }
    if (line === 'Red') {
      return isSelected
        ? 'bg-[#DA291C] text-white font-bold ring-2 ring-[#DA291C]/50 shadow-glow-red'
        : 'bg-slate-800/80 text-rose-300 border border-rose-900/50 hover:bg-[#DA291C]/20';
    }
    if (line === 'Orange') {
      return isSelected
        ? 'bg-[#ED8B00] text-slate-950 font-bold ring-2 ring-[#ED8B00]/50 shadow-glow-orange'
        : 'bg-slate-800/80 text-amber-300 border border-amber-900/50 hover:bg-[#ED8B00]/20';
    }
    if (line === 'Green') {
      return isSelected
        ? 'bg-[#00843D] text-white font-bold ring-2 ring-[#00843D]/50 shadow-glow-green'
        : 'bg-slate-800/80 text-emerald-300 border border-emerald-900/50 hover:bg-[#00843D]/20';
    }
    if (line === 'Blue') {
      return isSelected
        ? 'bg-[#003DA5] text-white font-bold ring-2 ring-[#003DA5]/50 shadow-glow-blue'
        : 'bg-slate-800/80 text-sky-300 border border-sky-900/50 hover:bg-[#003DA5]/20';
    }
    return '';
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
      {/* Top Search & Primary Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search bar */}
        <div className="relative md:col-span-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search co-op, babysitter, dog walking, math tutor, Tatte..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-750 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ ...filters, search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* MBTA Subway Line Selector */}
        <div className="md:col-span-7 flex flex-wrap items-center gap-1.5">
          <div className="text-xs text-slate-400 font-medium flex items-center gap-1 mr-1">
            <Train className="w-3.5 h-3.5 text-slate-400" /> T-Line:
          </div>
          {subwayLines.map((line) => (
            <button
              key={line}
              onClick={() => onChange({ ...filters, selectedLine: line })}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${getLineButtonClasses(
                line
              )}`}
            >
              {line === 'All' ? 'All Lines' : `${line} Line`}
            </button>
          ))}
        </div>
      </div>

      {/* Second Row: Community Platforms Crawler Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1 mr-1">
          <Globe className="w-3.5 h-3.5 text-emerald-400" /> Platform Source:
        </span>
        {availableSources.map((source) => {
          const isSelected = filters.selectedSource === source;
          const badgeColor =
            source === 'All' ? '#10b981' : JobCrawlerService.getSourceColor(source);

          return (
            <button
              key={source}
              onClick={() => onChange({ ...filters, selectedSource: source })}
              className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-slate-100 text-slate-950 shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {source !== 'All' && (
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: badgeColor }}
                />
              )}
              <span>{source === 'All' ? '🌐 All Platforms' : source.replace(' (r/bostonjobs)', '').replace(' (Boston Student Hub)', '')}</span>
            </button>
          );
        })}
      </div>

      {/* Third Row: Walk Distance, Wage & Work Auth */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
        <div className="flex flex-wrap items-center gap-2">
          {/* Walking Distance */}
          <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            <Clock className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <span className="text-xs text-slate-400 font-medium mr-1">Walk to T:</span>
            {[
              { label: 'Any', val: 0 },
              { label: '≤ 3m', val: 3 },
              { label: '≤ 5m', val: 5 },
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => onChange({ ...filters, maxWalkMinutes: opt.val })}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  filters.maxWalkMinutes === opt.val
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Min Wage */}
          <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            <DollarSign className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <span className="text-xs text-slate-400 font-medium mr-1">Wage:</span>
            {[
              { label: 'Any', val: 15 },
              { label: '$20+', val: 20 },
              { label: '$25+', val: 25 },
              { label: '$30+', val: 30 },
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => onChange({ ...filters, minWage: opt.val })}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  filters.minWage === opt.val
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Work Auth */}
          <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <span className="text-xs text-slate-400 font-medium mr-1">Visa:</span>
            <button
              onClick={() => onChange({ ...filters, selectedAuth: 'All' })}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                filters.selectedAuth === 'All'
                  ? 'bg-slate-200 text-slate-900 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => onChange({ ...filters, selectedAuth: 'On-Campus (F-1 100% Safe)' })}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                filters.selectedAuth === 'On-Campus (F-1 100% Safe)'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              🎓 F-1 Campus
            </button>
            <button
              onClick={() => onChange({ ...filters, selectedAuth: 'CPT/OPT Eligible' })}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                filters.selectedAuth === 'CPT/OPT Eligible'
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-sky-400'
              }`}
            >
              ⚡ CPT/OPT
            </button>
          </div>
        </div>

        {/* Clear Filters & Count */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">
            Matched <strong className="text-emerald-400">{totalFiltered}</strong> real gigs
          </span>
          {isFiltered && (
            <button
              onClick={clearFilters}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold underline underline-offset-2"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange({ ...filters, selectedCategory: cat })}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition-all ${
              filters.selectedCategory === cat
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'bg-slate-950/40 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-300'
            }`}
          >
            {cat === 'All' ? '🌟 All Categories' : cat}
          </button>
        ))}
      </div>
    </div>
  );
};
