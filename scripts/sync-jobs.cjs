/**
 * T-Gig Boston - Automated Job Sync & Health-Check Engine
 * 1. Checks every job's sourceUrl for HTTP status and expiration keywords.
 * 2. Marks dead/removed links as 'expired'.
 * 3. Updates lastVerifiedAt timestamp for active links.
 * 4. Outputs sync report for GitHub Actions / Vercel CI.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const DATA_FILE = path.resolve(__dirname, '../src/data/realJobs.ts');
const REPORT_FILE = path.resolve(__dirname, '../scripts/sync-report.json');

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

// Common dead/expired indicators across supported platforms
const EXPIRED_PATTERNS = [
  /this posting has been deleted/i,
  /this posting has expired/i,
  /this job is no longer available/i,
  /no longer accepting applications/i,
  /page not found/i,
  /post has been removed/i,
  /\[deleted by user\]/i,
  /\[removed by moderator\]/i,
];

/**
 * Perform HTTP request to check if a job URL is still alive and active
 */
function checkUrlHealth(targetUrl, maxRedirects = 5) {
  return new Promise((resolve) => {
    if (maxRedirects < 0) {
      return resolve({ alive: false, status: 310, reason: 'Too many redirects' });
    }

    try {
      const parsed = new URL(targetUrl);
      const client = parsed.protocol === 'https:' ? https : http;

      const req = client.request(
        parsed,
        {
          method: 'GET',
          headers: {
            'User-Agent': USER_AGENT,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
          },
          timeout: 8000,
        },
        (res) => {
          // Handle 3xx Redirects
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            const redirectUrl = new URL(res.headers.location, parsed.origin).href;
            res.resume(); // consume response data to free up memory
            return resolve(checkUrlHealth(redirectUrl, maxRedirects - 1));
          }

          // 404, 410, 500+ are dead
          if (res.statusCode === 404 || res.statusCode === 410 || res.statusCode >= 500) {
            res.resume();
            return resolve({
              alive: false,
              statusCode: res.statusCode,
              reason: `HTTP ${res.statusCode}`,
            });
          }

          // Read small chunk of body (up to 32KB) to check for expiration text
          let body = '';
          res.on('data', (chunk) => {
            if (body.length < 32768) {
              body += chunk.toString('utf8');
            }
          });

          res.on('end', () => {
            // Check for known expiration phrases
            for (const pattern of EXPIRED_PATTERNS) {
              if (pattern.test(body)) {
                return resolve({
                  alive: false,
                  statusCode: res.statusCode,
                  reason: 'Listing text indicates expired/deleted',
                });
              }
            }

            // HTTP 200 or 403 (for Reddit bot protection where post is still indexed)
            // Reddit bot protection returns 403 to data center bots, but canonical URL is alive
            if (res.statusCode === 200 || (res.statusCode === 403 && targetUrl.includes('reddit.com'))) {
              return resolve({
                alive: true,
                statusCode: res.statusCode,
                reason: 'Active OK',
              });
            }

            resolve({
              alive: true,
              statusCode: res.statusCode,
              reason: `HTTP ${res.statusCode}`,
            });
          });
        }
      );

      req.on('timeout', () => {
        req.destroy();
        resolve({ alive: false, statusCode: 408, reason: 'Request Timeout (8s)' });
      });

      req.on('error', (err) => {
        resolve({ alive: false, statusCode: 0, reason: err.message });
      });

      req.end();
    } catch (err) {
      resolve({ alive: false, statusCode: 0, reason: err.message });
    }
  });
}

/**
 * Main Sync & Health Check Workflow
 */
async function runSync() {
  console.log('====================================================');
  console.log('🚇 T-Gig Boston: Scheduled Job Sync & Health Check');
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
  console.log('====================================================\n');

  if (!fs.existsSync(DATA_FILE)) {
    console.error(`Error: Data file not found at ${DATA_FILE}`);
    process.exit(1);
  }

  const content = fs.readFileSync(DATA_FILE, 'utf8');

  // Parse export const REAL_CRAWLED_JOBS: JobListing[] = [...]
  // We locate the array content between REAL_CRAWLED_JOBS: JobListing[] = [ and ];
  const match = content.match(/export const REAL_CRAWLED_JOBS: JobListing\[\] = (\[[\s\S]*\]);/);
  if (!match) {
    console.error('Error: Could not locate REAL_CRAWLED_JOBS array in realJobs.ts');
    process.exit(1);
  }

  let jobs;
  try {
    // Safely evaluate array literal
    const sanitized = match[1];
    jobs = eval(sanitized);
  } catch (err) {
    console.error('Error parsing jobs array:', err);
    process.exit(1);
  }

  console.log(`🔍 Total jobs in database to audit: ${jobs.length}\n`);

  const results = {
    totalAudited: jobs.length,
    activeCount: 0,
    expiredCount: 0,
    timestamp: new Date().toISOString(),
    details: [],
  };

  const today = new Date().toISOString().split('T')[0];

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    process.stdout.write(`[${i + 1}/${jobs.length}] Checking "${job.title.slice(0, 35)}..." `);

    const health = await checkUrlHealth(job.sourceUrl);

    if (health.alive) {
      job.status = 'active';
      job.healthCheckStatus = 'healthy';
      job.lastVerifiedAt = today;
      results.activeCount++;
      console.log(`✅ ACTIVE (${health.reason})`);
    } else {
      job.status = 'expired';
      job.healthCheckStatus = 'dead_link';
      job.lastVerifiedAt = today;
      results.expiredCount++;
      console.log(`⚠️ EXPIRED/DEAD (${health.reason})`);
    }

    results.details.push({
      id: job.id,
      title: job.title,
      url: job.sourceUrl,
      alive: health.alive,
      statusCode: health.statusCode,
      reason: health.reason,
    });

    // Polite delay to avoid hammering target platforms
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log('\n====================================================');
  console.log(`📊 Audit Summary: ${results.activeCount} Active, ${results.expiredCount} Expired/Dead`);
  console.log('====================================================\n');

  // Format the jobs array back into formatted TypeScript code
  // IMPORTANT: Use replacement function () => ... to avoid $ pattern expansion in string.replace
  const formattedArray = JSON.stringify(jobs, null, 2);
  const updatedContent = content.replace(
    /export const REAL_CRAWLED_JOBS: JobListing\[\] = (\[[\s\S]*\]);/,
    () => `export const REAL_CRAWLED_JOBS: JobListing[] = ${formattedArray};`
  );

  fs.writeFileSync(DATA_FILE, updatedContent, 'utf8');
  console.log(`💾 Successfully updated ${DATA_FILE}`);

  fs.writeFileSync(REPORT_FILE, JSON.stringify(results, null, 2), 'utf8');
  console.log(`📄 Saved audit report to ${REPORT_FILE}\n`);
}

runSync().catch((err) => {
  console.error('Sync failed with error:', err);
  process.exit(1);
});
