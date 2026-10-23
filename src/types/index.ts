export type SubwayLine = 'Red' | 'Orange' | 'Green' | 'Blue';

export interface SubwayStation {
  id: string;
  name: string;
  lines: SubwayLine[];
  coords: [number, number]; // [lat, lng]
  nearbyUniversities?: string[];
}

export type JobCategory = 
  | 'Campus' 
  | 'Tutoring' 
  | 'Barista & Cafe' 
  | 'Research & Lab' 
  | 'Retail & Ops' 
  | 'Events & Gigs'
  | 'Pet Care & Walking'
  | 'Babysitting & Nanny'
  | 'Corporate Co-op & Intern';

export type WorkAuth = 
  | 'All Students' 
  | 'On-Campus (F-1 100% Safe)' 
  | 'CPT/OPT Eligible' 
  | 'US Citizen / GC';

export type JobSource =
  | 'Indeed'
  | 'Craigslist'
  | 'Reddit (r/bostonjobs)'
  | 'Snagajob'
  | 'WayUp'
  | 'Sittercity'
  | 'Superprof'
  | 'Wag!'
  | 'Discord (Boston Student Hub)'
  | 'Harvard SEO Office'
  | 'BU Student Link'
  | 'MIT Student Gigs'
  | 'Company Direct';

export interface EmployerReview {
  id: string;
  authorRole: string;
  rating: number; // 1-5
  verifiedStudent: boolean;
  paySpeed: 'Instant / Same Day' | 'Weekly (No Delay)' | 'Bi-Weekly' | 'Occasionally Late';
  vibe: 'Super Chill' | 'Respects Study Schedule' | 'Busy / High Energy' | 'Strict Manager';
  comment: string;
  date: string;
  upvotes: number;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  hourlyWage: number;
  location: string;
  coords: [number, number]; // [lat, lng]
  nearestStation: {
    stationId: string;
    name: string;
    line: SubwayLine;
    walkMinutes: number;
  };
  workAuth: WorkAuth;
  category: JobCategory;
  hoursPerWeek: string;
  scheduleFlexibility: 'High (Exam Friendly)' | 'Moderate' | 'Fixed Shifts';
  description: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
  employerRating: number;
  employerReviewCount: number;
  payPunctualityRate: number; // Percentage, e.g. 98%
  originalSource: JobSource;
  sourceUrl: string;
  postedAgo: string;
  featured?: boolean;
  reviews: EmployerReview[];
}
