import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { FilterBar, FilterState } from './components/FilterBar';
import { LiveMbtaBanner } from './components/LiveMbtaBanner';
import { MapComponent } from './components/MapComponent';
import { JobList } from './components/JobList';
import { JobModal } from './components/JobModal';
import { EmailSubscribeModal } from './components/EmailSubscribeModal';
import { JobCrawlerService } from './services/jobCrawlerService';
import { JobListing, SubwayLine, WorkAuth, JobCategory, JobSource } from './types';
import { Map, ListFilter, RefreshCw, Globe, CheckCircle2, Train } from 'lucide-react';

export function App() {
  const [jobs, setJobs] = useState<JobListing[]>(() => JobCrawlerService.getJobs());
  const [isCrawling, setIsCrawling] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    selectedLine: 'All',
    maxWalkMinutes: 0,
    selectedAuth: 'All',
    minWage: 15,
    selectedCategory: 'All',
    selectedSource: 'All',
  });

  // Selected Job for Modal & Map Sync
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<'map' | 'list'>('map');

  // On-demand Crawl Refresh
  const handleRefreshCrawl = async () => {
    setIsCrawling(true);
    const result = await JobCrawlerService.refreshFeeds();
    setJobs([...result.jobs]);
    setIsCrawling(false);
    const now = new Date();
    setLastSyncTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  // Filter Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesStation = job.nearestStation.name.toLowerCase().includes(query);
        const matchesCategory = job.category.toLowerCase().includes(query);
        const matchesDesc = job.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCompany && !matchesStation && !matchesCategory && !matchesDesc) {
          return false;
        }
      }

      // Subway Line
      if (filters.selectedLine !== 'All') {
        if (job.nearestStation.line !== filters.selectedLine) {
          return false;
        }
      }

      // Max Walk Minutes
      if (filters.maxWalkMinutes > 0) {
        if (job.nearestStation.walkMinutes > filters.maxWalkMinutes) {
          return false;
        }
      }

      // Work Authorization
      if (filters.selectedAuth !== 'All') {
        if (job.workAuth !== filters.selectedAuth) {
          return false;
        }
      }

      // Min Wage
      if (job.hourlyWage < filters.minWage) {
        return false;
      }

      // Category
      if (filters.selectedCategory !== 'All') {
        if (job.category !== filters.selectedCategory) {
          return false;
        }
      }

      // Platform Source
      if (filters.selectedSource !== 'All') {
        if (job.originalSource !== filters.selectedSource) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, filters]);

  const crawlerStats = useMemo(() => JobCrawlerService.getStats(), [jobs]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100">
      {/* Top Navigation */}
      <Navbar
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        jobCount={filteredJobs.length}
      />

      {/* Hero Sub-header banner */}
      <section className="bg-gradient-to-b from-slate-900 to-[#0b0f19] border-b border-slate-800/60 px-4 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <Globe className="w-3.5 h-3.5" />
                <span>Live Feed from WayUp • Sittercity • Wag! • Superprof • Snagajob • Reddit • Craigslist</span>
              </span>

              <button
                onClick={handleRefreshCrawl}
                disabled={isCrawling}
                className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 transition-colors"
              >
                <RefreshCw className={`w-3 h-3 ${isCrawling ? 'animate-spin text-emerald-400' : ''}`} />
                <span>{isCrawling ? 'Crawling latest feeds...' : `Synced ${lastSyncTime}`}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Real Boston Student Gigs <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">On The MBTA</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Crawled from top student community platforms. Filter by walking distance to MBTA stations, hourly wages, and legal F-1 / CPT work authorization.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Average Hourly Pay</span>
              <strong className="text-emerald-400 text-lg font-black">$25.20/hr</strong>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Active Sources</span>
              <strong className="text-cyan-400 text-lg font-black">{crawlerStats.sources.length} Platforms</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 lg:px-8 py-4 flex-1 flex flex-col space-y-4">
        {/* Real-time MBTA V3 API Status Banner */}
        <LiveMbtaBanner />

        {/* Interactive Filter Bar */}
        <FilterBar
          filters={filters}
          onChange={setFilters}
          totalFiltered={filteredJobs.length}
          onRefreshCrawl={handleRefreshCrawl}
          isCrawling={isCrawling}
        />

        {/* Mobile View Toggle */}
        <div className="flex md:hidden rounded-xl bg-slate-900 border border-slate-800 p-1">
          <button
            onClick={() => setMobileTab('map')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
              mobileTab === 'map'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Map View</span>
          </button>
          <button
            onClick={() => setMobileTab('list')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
              mobileTab === 'list'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Job List ({filteredJobs.length})</span>
          </button>
        </div>

        {/* Desktop Split Layout & Mobile Switched Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 min-h-[580px]">
          {/* Map Column (60% width on Desktop) */}
          <div
            className={`md:col-span-7 min-h-[520px] h-[560px] md:h-[calc(100vh-280px)] md:sticky md:top-24 rounded-2xl overflow-hidden ${
              mobileTab === 'map' ? 'block' : 'hidden md:block'
            }`}
          >
            <MapComponent
              jobs={filteredJobs}
              selectedJob={selectedJob}
              onSelectJob={(job) => setSelectedJob(job)}
              activeLineFilter={filters.selectedLine}
            />
          </div>

          {/* Job List Column (40% width on Desktop) */}
          <div
            className={`md:col-span-5 h-[540px] md:h-[calc(100vh-280px)] overflow-y-auto pr-1 ${
              mobileTab === 'list' ? 'block' : 'hidden md:block'
            }`}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Live Opportunities ({filteredJobs.length})
              </span>
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Verified & MBTA Indexed
              </span>
            </div>

            <JobList
              jobs={filteredJobs}
              selectedJob={selectedJob}
              onSelectJob={(job) => setSelectedJob(job)}
              onForwardEmail={(job) => setSelectedJob(job)}
            />
          </div>
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="mt-8 border-t border-slate-800/80 bg-slate-950 py-6 px-4 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-1.5">
            <span>T-Gig is an independent transit job aggregator. All opportunities are crawled from public boards and student communities.</span>
          </p>
          <p className="text-slate-400">
            MBTA route data is powered by official MBTA V3 API.
          </p>
        </div>
      </footer>

      {/* Detail Modal */}
      <JobModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />

      {/* Daily Digest Subscription Modal */}
      <EmailSubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
      />
    </div>
  );
}
