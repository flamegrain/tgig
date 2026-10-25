import { JobListing, JobSource } from '../types';
import { REAL_CRAWLED_JOBS } from '../data/realJobs';

export interface CrawlerStats {
  totalJobs: number;
  activeJobs: number;
  expiredJobs: number;
  sources: { source: JobSource; count: number; color: string }[];
  lastCrawledAt: string;
  autoSyncIntervalMinutes: number;
}

const SOURCE_COLORS: Record<JobSource, string> = {
  'WayUp': '#2563eb', // Blue
  'Sittercity': '#ec4899', // Pink
  'Wag!': '#10b981', // Green
  'Superprof': '#f97316', // Orange
  'Snagajob': '#eab308', // Yellow
  'Reddit (r/bostonjobs)': '#ff4500', // Reddit orange-red
  'Craigslist': '#a855f7', // Purple
  'Discord (Boston Student Hub)': '#5865f2', // Discord Blurple
  'Indeed': '#003a9b',
  'Harvard SEO Office': '#a51c30',
  'BU Student Link': '#cc0000',
  'MIT Student Gigs': '#7b1113',
  'Company Direct': '#059669',
};

export class JobCrawlerService {
  private static cachedJobs: JobListing[] = [...REAL_CRAWLED_JOBS];
  private static lastCrawled: Date = new Date();
  public static readonly AUTO_SYNC_INTERVAL_MINUTES = 360; // 6 hours

  /**
   * Get all aggregated jobs (optionally filtering out expired/dead links)
   */
  public static getJobs(includeExpired = false): JobListing[] {
    if (includeExpired) {
      return this.cachedJobs;
    }
    return this.cachedJobs.filter(
      (job) => job.status !== 'expired' && job.healthCheckStatus !== 'dead_link'
    );
  }

  /**
   * Get all jobs raw array
   */
  public static getAllRawJobs(): JobListing[] {
    return this.cachedJobs;
  }

  /**
   * Trigger on-demand re-crawl / refresh from active student feeds
   */
  public static async refreshFeeds(): Promise<{
    jobs: JobListing[];
    activeCount: number;
    expiredCount: number;
  }> {
    // Network crawl simulation delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    this.lastCrawled = new Date();

    const activeCount = this.cachedJobs.filter(
      (j) => j.status !== 'expired' && j.healthCheckStatus !== 'dead_link'
    ).length;
    const expiredCount = this.cachedJobs.length - activeCount;

    return {
      jobs: this.cachedJobs,
      activeCount,
      expiredCount,
    };
  }

  /**
   * Get breakdown statistics by platform source and health status
   */
  public static getStats(): CrawlerStats {
    const counts: Partial<Record<JobSource, number>> = {};
    let activeJobs = 0;
    let expiredJobs = 0;

    this.cachedJobs.forEach((job) => {
      const isExpired = job.status === 'expired' || job.healthCheckStatus === 'dead_link';
      if (isExpired) {
        expiredJobs++;
      } else {
        activeJobs++;
        counts[job.originalSource] = (counts[job.originalSource] || 0) + 1;
      }
    });

    const sources = Object.entries(counts).map(([source, count]) => ({
      source: source as JobSource,
      count: count || 0,
      color: SOURCE_COLORS[source as JobSource] || '#94a3b8',
    }));

    return {
      totalJobs: this.cachedJobs.length,
      activeJobs,
      expiredJobs,
      sources,
      lastCrawledAt: this.lastCrawled.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      autoSyncIntervalMinutes: this.AUTO_SYNC_INTERVAL_MINUTES,
    };
  }

  public static getSourceColor(source: JobSource): string {
    return SOURCE_COLORS[source] || '#64748b';
  }
}
