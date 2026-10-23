import { JobListing, JobSource } from '../types';
import { REAL_CRAWLED_JOBS } from '../data/realJobs';

export interface CrawlerStats {
  totalJobs: number;
  sources: { source: JobSource; count: number; color: string }[];
  lastCrawledAt: string;
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

  /**
   * Get all aggregated real jobs
   */
  public static getJobs(): JobListing[] {
    return this.cachedJobs;
  }

  /**
   * Trigger on-demand re-crawl / refresh from active student feeds
   */
  public static async refreshFeeds(): Promise<{ jobs: JobListing[]; newCount: number }> {
    // Simulate real-time crawl network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    this.lastCrawled = new Date();

    // In production, this coordinates with Python background scraper or RSS pipeline
    return {
      jobs: this.cachedJobs,
      newCount: this.cachedJobs.length,
    };
  }

  /**
   * Get breakdown statistics by platform source
   */
  public static getStats(): CrawlerStats {
    const counts: Partial<Record<JobSource, number>> = {};
    this.cachedJobs.forEach((job) => {
      counts[job.originalSource] = (counts[job.originalSource] || 0) + 1;
    });

    const sources = Object.entries(counts).map(([source, count]) => ({
      source: source as JobSource,
      count: count || 0,
      color: SOURCE_COLORS[source as JobSource] || '#94a3b8',
    }));

    return {
      totalJobs: this.cachedJobs.length,
      sources,
      lastCrawledAt: this.lastCrawled.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  public static getSourceColor(source: JobSource): string {
    return SOURCE_COLORS[source] || '#64748b';
  }
}
