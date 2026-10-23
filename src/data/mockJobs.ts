import { JobListing } from '../types';

export const MOCK_JOBS: JobListing[] = [
  {
    id: 'gig-001',
    title: 'CS & Math Peer Tutor (Discrete Math / Python)',
    company: 'Cambridge Academic Network',
    hourlyWage: 38,
    location: 'Harvard Square, Cambridge, MA',
    coords: [42.3738, -71.1198],
    nearestStation: {
      stationId: 'harvard',
      name: 'Harvard',
      line: 'Red',
      walkMinutes: 2,
    },
    workAuth: 'All Students',
    category: 'Tutoring',
    hoursPerWeek: '6 - 12 hrs/wk (Flexible)',
    scheduleFlexibility: 'High (Exam Friendly)',
    description: 'Looking for undergraduate or graduate STEM students to tutor high school & freshman college students in Python, Data Structures, or Pre-Calculus. Set your own hours directly with students.',
    responsibilities: [
      'Conduct 1-on-1 tutoring sessions in Cambridge libraries or online',
      'Explain algorithmic thinking and review homework assignments',
      'Provide concise weekly progress notes to parents'
    ],
    requirements: [
      'Current student at Harvard, MIT, Tufts, NEU, or BU',
      'Completed intro CS / Calc II with grade A- or higher',
      'Patient communicator with clear English speaking skills'
    ],
    perks: ['Pick your own weekly hours', 'Free Harvard bookstore discount', 'Weekly Venmo / Direct Deposit'],
    employerRating: 4.9,
    employerReviewCount: 32,
    payPunctualityRate: 100,
    originalSource: 'Harvard SEO Office',
    sourceUrl: 'https://seo.harvard.edu',
    postedAgo: '3 hours ago',
    featured: true,
    reviews: [
      {
        id: 'rev-1',
        authorRole: 'Sophomore CS @ Harvard',
        rating: 5,
        verifiedStudent: true,
        paySpeed: 'Instant / Same Day',
        vibe: 'Respects Study Schedule',
        comment: 'Super straightforward. They pay right after every session without having to chase down parents.',
        date: '2 days ago',
        upvotes: 18,
      },
      {
        id: 'rev-2',
        authorRole: 'Junior @ MIT',
        rating: 5,
        verifiedStudent: true,
        paySpeed: 'Instant / Same Day',
        vibe: 'Super Chill',
        comment: 'Great gigs during midterms, you can pause your hours whenever exams get crazy.',
        date: '1 week ago',
        upvotes: 9,
      }
    ]
  },
  {
    id: 'gig-002',
    title: 'Student IT Helpdesk & Hardware Technician',
    company: 'Northeastern ITS Campus Center',
    hourlyWage: 21,
    location: 'Snell Library, 360 Huntington Ave, Boston',
    coords: [42.3385, -71.0880],
    nearestStation: {
      stationId: 'ruggles',
      name: 'Ruggles',
      line: 'Orange',
      walkMinutes: 3,
    },
    workAuth: 'On-Campus (F-1 100% Safe)',
    category: 'Campus',
    hoursPerWeek: '12 - 18 hrs/wk',
    scheduleFlexibility: 'High (Exam Friendly)',
    description: 'Provide tech support at Snell Library IT Desk. Assist fellow Huskies with Wi-Fi onboarding, Husky Card printing, Canvas issues, and basic Mac/Windows troubleshooting.',
    responsibilities: [
      'Diagnose basic laptop software and network connectivity issues',
      'Manage equipment checkout (adapters, chargers, microphones)',
      'Assist staff with classroom AV setup'
    ],
    requirements: [
      'Must be enrolled NEU student (Undergrad or Grad)',
      'F-1 students fully eligible under 20-hr campus limit',
      'Friendly and approachable demeanor'
    ],
    perks: ['Allowed to study during quiet late shifts', 'Northeastern internal pay roll', 'Official university work certificate'],
    employerRating: 4.8,
    employerReviewCount: 45,
    payPunctualityRate: 99,
    originalSource: 'Company Direct',
    sourceUrl: 'https://service.northeastern.edu/tech',
    postedAgo: '5 hours ago',
    featured: true,
    reviews: [
      {
        id: 'rev-3',
        authorRole: 'MS CS @ NEU (F-1 Student)',
        rating: 5,
        verifiedStudent: true,
        paySpeed: 'Bi-Weekly',
        vibe: 'Respects Study Schedule',
        comment: '100% legal for F-1 visa. Supervisors are so nice. On slow days you can literally do your LeetCode at the desk!',
        date: 'Oct 15',
        upvotes: 42,
      }
    ]
  },
  {
    id: 'gig-003',
    title: 'AI Lab Data Annotation & Pilot Tester',
    company: 'Kendall Robotics / MIT CSAIL Spin-off',
    hourlyWage: 32,
    location: 'Main Street & Broadway, Kendall Sq, Cambridge',
    coords: [42.3635, -71.0855],
    nearestStation: {
      stationId: 'kendall',
      name: 'Kendall/MIT',
      line: 'Red',
      walkMinutes: 1,
    },
    workAuth: 'CPT/OPT Eligible',
    category: 'Research & Lab',
    hoursPerWeek: '10 - 15 hrs/wk',
    scheduleFlexibility: 'High (Exam Friendly)',
    description: 'Assist robotics engineers in labeling multimodal sensor data and evaluating physical robot trajectory videos. Right across from the Kendall Red Line exit.',
    responsibilities: [
      'Review video clips and annotate robot manipulator contact points',
      'Log unexpected edge cases and flag bounding box errors',
      'Participate in weekly team debriefs in Kendall office'
    ],
    requirements: [
      'Strong attention to detail',
      'Comfortable with web annotation interfaces',
      'Passion for robotics or machine learning'
    ],
    perks: ['Free cold brew & snacks in office', 'Letter of recommendation for grad school / co-op', 'Direct Red Line access'],
    employerRating: 4.7,
    employerReviewCount: 19,
    payPunctualityRate: 98,
    originalSource: 'MIT Student Gigs',
    sourceUrl: 'https://cap.mit.edu',
    postedAgo: '1 day ago',
    featured: true,
    reviews: [
      {
        id: 'rev-4',
        authorRole: 'Junior MechE @ MIT',
        rating: 5,
        verifiedStudent: true,
        paySpeed: 'Weekly (No Delay)',
        vibe: 'Super Chill',
        comment: 'Super cool project and $32/hr is very solid. You sit right next to actual founders.',
        date: '3 days ago',
        upvotes: 14,
      }
    ]
  },
  {
    id: 'gig-004',
    title: 'Specialty Coffee Barista (Morning Student Shift)',
    company: 'Tatte Bakery & Cafe (Kenmore)',
    hourlyWage: 18.5,
    location: 'Beacon St near Kenmore Square, Boston',
    coords: [42.3495, -71.0965],
    nearestStation: {
      stationId: 'kenmore',
      name: 'Kenmore',
      line: 'Green',
      walkMinutes: 2,
    },
    workAuth: 'All Students',
    category: 'Barista & Cafe',
    hoursPerWeek: '12 - 20 hrs/wk',
    scheduleFlexibility: 'Moderate',
    description: 'Seeking energetic student baristas for morning and weekend shifts (7am - 12pm or 11am - 4pm). Hourly base $18.50 + cash/credit tips typically average $23-$26/hr total.',
    responsibilities: [
      'Craft espresso beverages and pour latte art',
      'Warm pastries and operate Toast POS terminal',
      'Maintain clean bar and cafe seating area'
    ],
    requirements: [
      'Prior barista or food service experience preferred',
      'Punctual and positive morning energy',
      'Authorized to work in US'
    ],
    perks: ['Free meal and unlimited specialty coffee on shifts', '30% discount at all Tatte locations in Greater Boston', 'Solid pooled tip payout'],
    employerRating: 4.5,
    employerReviewCount: 28,
    payPunctualityRate: 96,
    originalSource: 'Indeed',
    sourceUrl: 'https://indeed.com',
    postedAgo: '4 hours ago',
    reviews: [
      {
        id: 'rev-5',
        authorRole: 'BU Senior',
        rating: 4,
        verifiedStudent: true,
        paySpeed: 'Weekly (No Delay)',
        vibe: 'Busy / High Energy',
        comment: 'Very busy during morning rush, but tips add another $5-$7/hr easily. Managers let BU students coordinate shifts during finals.',
        date: 'Oct 18',
        upvotes: 21,
      }
    ]
  },
  {
    id: 'gig-005',
    title: 'Student Library Circulation Desk Assistant',
    company: 'Boston University Mugar Memorial Library',
    hourlyWage: 17.5,
    location: '771 Commonwealth Avenue, Boston, MA',
    coords: [42.3508, -71.1075],
    nearestStation: {
      stationId: 'bu_central',
      name: 'BU Central',
      line: 'Green',
      walkMinutes: 1,
    },
    workAuth: 'On-Campus (F-1 100% Safe)',
    category: 'Campus',
    hoursPerWeek: '8 - 15 hrs/wk',
    scheduleFlexibility: 'High (Exam Friendly)',
    description: 'Circulation desk front-line assistant for BU students and faculty. Scan book checkouts, manage reserve textbooks, and monitor quiet study floors.',
    responsibilities: [
      'Check in and reshelf academic texts and course reserves',
      'Answer directional queries from students',
      'Process library study room reservations'
    ],
    requirements: [
      'BU enrolled student with good standing',
      'Work-study or student employment approved',
      'Dependable attendance'
    ],
    perks: ['Quiet study time permitted when tasks completed', 'Prime location right at BU Central Green Line station', 'Paid bi-weekly direct deposit'],
    employerRating: 4.9,
    employerReviewCount: 52,
    payPunctualityRate: 100,
    originalSource: 'BU Student Link',
    sourceUrl: 'https://www.bu.edu/seo',
    postedAgo: '1 day ago',
    featured: true,
    reviews: [
      {
        id: 'rev-6',
        authorRole: 'BU Sophomore (Econ)',
        rating: 5,
        verifiedStudent: true,
        paySpeed: 'Bi-Weekly',
        vibe: 'Super Chill',
        comment: 'Best student job on Comm Ave. Supervisors are fellow students. You get plenty of homework done during evening shifts.',
        date: 'Sep 29',
        upvotes: 35,
      }
    ]
  },
  {
    id: 'gig-006',
    title: 'Game Day Event Staff & Usher (Red Sox & Concerts)',
    company: 'Fenway Sports & Entertainment Management',
    hourlyWage: 20,
    location: 'Fenway Park, 4 Jersey St, Boston',
    coords: [42.3467, -71.0972],
    nearestStation: {
      stationId: 'kenmore',
      name: 'Kenmore',
      line: 'Green',
      walkMinutes: 4,
    },
    workAuth: 'All Students',
    category: 'Events & Gigs',
    hoursPerWeek: 'Flexible / Per Event',
    scheduleFlexibility: 'High (Exam Friendly)',
    description: 'Work high-energy events, playoff games, and music concerts at historic Fenway Park! Select only the dates that fit your class calendar.',
    responsibilities: [
      'Greet fans and scan mobile tickets via hand scanner',
      'Guide patrons to grandstand seats and luxury boxes',
      'Assist with crowd movement post-game'
    ],
    requirements: [
      '18+ years old',
      'Must be able to stand for 4-5 hour shifts',
      'Enthusiastic and polite communication'
    ],
    perks: ['Free Fenway staff meal during events', 'Hear live concerts for free while on duty', 'Great resume builder'],
    employerRating: 4.4,
    employerReviewCount: 67,
    payPunctualityRate: 97,
    originalSource: 'Reddit (r/bostonjobs)',
    sourceUrl: 'https://reddit.com/r/bostonjobs',
    postedAgo: '6 hours ago',
    reviews: [
      {
        id: 'rev-7',
        authorRole: 'BC Junior',
        rating: 4,
        verifiedStudent: true,
        paySpeed: 'Weekly (No Delay)',
        vibe: 'Busy / High Energy',
        comment: 'Fun atmosphere! Paycheck arrives every Thursday without fail. Perfect weekend cash.',
        date: 'Oct 02',
        upvotes: 12,
      }
    ]
  },
  {
    id: 'gig-007',
    title: 'Bookstore Associate & Merchandiser',
    company: 'Porter Square Books & Cafe',
    hourlyWage: 17.5,
    location: '25 White St, Cambridge, MA',
    coords: [42.3891, -71.1185],
    nearestStation: {
      stationId: 'porter',
      name: 'Porter',
      line: 'Red',
      walkMinutes: 2,
    },
    workAuth: 'All Students',
    category: 'Retail & Ops',
    hoursPerWeek: '10 - 16 hrs/wk',
    scheduleFlexibility: 'Moderate',
    description: 'Beloved independent bookstore in Cambridge seeking book-loving university students to assist customers, shelve new releases, and assist with author signing events.',
    responsibilities: [
      'Recommend literature, non-fiction, and student reads',
      'Organize staff pick shelves and gift displays',
      'Cashiering and gift wrapping during holiday season'
    ],
    requirements: [
      'Love for books and community literary culture',
      'Reliable weekend availability',
      'Comfortable on feet'
    ],
    perks: ['40% employee discount on all books', 'Free advance reader copy (ARC) paperbacks', 'Cozy aesthetic environment'],
    employerRating: 4.8,
    employerReviewCount: 22,
    payPunctualityRate: 99,
    originalSource: 'Craigslist',
    sourceUrl: 'https://boston.craigslist.org',
    postedAgo: '12 hours ago',
    reviews: [
      {
        id: 'rev-8',
        authorRole: 'Tufts Senior (English)',
        rating: 5,
        verifiedStudent: true,
        paySpeed: 'Weekly (No Delay)',
        vibe: 'Super Chill',
        comment: 'Dream job for readers. Right across the Porter Red Line stop. Management is super supportive of midterm weeks.',
        date: 'Oct 11',
        upvotes: 19,
      }
    ]
  },
  {
    id: 'gig-008',
    title: 'Brand Ambassador (Downtown Crossing & Seaport)',
    company: 'Boston Tech Weekend Pop-Up',
    hourlyWage: 25,
    location: 'Washington St, Downtown Crossing, Boston',
    coords: [42.3551, -71.0609],
    nearestStation: {
      stationId: 'dtx',
      name: 'Downtown Crossing',
      line: 'Orange',
      walkMinutes: 1,
    },
    workAuth: 'All Students',
    category: 'Events & Gigs',
    hoursPerWeek: '8 - 12 hrs/weekend',
    scheduleFlexibility: 'High (Exam Friendly)',
    description: 'Hand out product samples, demo a student budgeting app, and register student accounts at a vibrant downtown pop-up booth.',
    responsibilities: [
      'Engage pedestrians with friendly product demos',
      'Distribute promotional stickers and student discount cards',
      'Collect quick 30-second user feedback surveys'
    ],
    requirements: [
      'Extroverted and energetic personality',
      'Comfortable approaching college students and shoppers',
      'Smartphone for survey tracking'
    ],
    perks: ['$25/hr + $2 per verified student sign up bonus', 'Free tech merchandise hoodie', 'Direct deposit every Monday'],
    employerRating: 4.3,
    employerReviewCount: 14,
    payPunctualityRate: 94,
    originalSource: 'Reddit (r/bostonjobs)',
    sourceUrl: 'https://reddit.com/r/bostonjobs',
    postedAgo: '7 hours ago',
    reviews: [
      {
        id: 'rev-9',
        authorRole: 'Suffolk Univ Sophomore',
        rating: 4,
        verifiedStudent: true,
        paySpeed: 'Weekly (No Delay)',
        vibe: 'Busy / High Energy',
        comment: 'Paid promptly on Monday. Earned almost $300 in a weekend with the bonuses.',
        date: 'Oct 14',
        upvotes: 8,
      }
    ]
  },
  {
    id: 'gig-009',
    title: 'Biology & Wet Lab Preparation Assistant',
    company: 'Harvard Medical School Affiliated Lab',
    hourlyWage: 26,
    location: 'Longwood Ave & Avenue Louis Pasteur, Boston',
    coords: [42.3378, -71.1045],
    nearestStation: {
      stationId: 'longwood',
      name: 'Longwood Medical',
      line: 'Green',
      walkMinutes: 3,
    },
    workAuth: 'CPT/OPT Eligible',
    category: 'Research & Lab',
    hoursPerWeek: '12 - 15 hrs/wk',
    scheduleFlexibility: 'High (Exam Friendly)',
    description: 'Assist postdocs in preparing cell culture media, autoclaving glass tools, maintaining reagent inventory, and logging data.',
    responsibilities: [
      'Prepare standard buffers, agar plates, and solutions',
      'Sterilize surgical instruments and maintain biosafety hood standards',
      'Record sample logs in electronic lab notebook'
    ],
    requirements: [
      'Completed college General Biology or Organic Chemistry with lab',
      'Rigorous commitment to lab cleanliness and safety protocols',
      'Available for 2-3 hour shift blocks'
    ],
    perks: ['Valuable research co-author or recommendation letter', 'Access to cutting-edge biomedical facilities', 'Flexible lab hours'],
    employerRating: 4.9,
    employerReviewCount: 30,
    payPunctualityRate: 100,
    originalSource: 'Company Direct',
    sourceUrl: 'https://hms.harvard.edu',
    postedAgo: '2 days ago',
    featured: true,
    reviews: [
      {
        id: 'rev-10',
        authorRole: 'Northeastern Pre-Med',
        rating: 5,
        verifiedStudent: true,
        paySpeed: 'Bi-Weekly',
        vibe: 'Respects Study Schedule',
        comment: 'Invaluable clinical/lab experience for med school applicants. The P.I. is very understanding when midterms hit.',
        date: 'Oct 08',
        upvotes: 27,
      }
    ]
  },
  {
    id: 'gig-010',
    title: 'Weekend K-12 Coding Instructor (Scratch & Roblox)',
    company: 'Boston Code Academy',
    hourlyWage: 35,
    location: 'Davis Square, Somerville, MA',
    coords: [42.3972, -71.1225],
    nearestStation: {
      stationId: 'davis',
      name: 'Davis',
      line: 'Red',
      walkMinutes: 2,
    },
    workAuth: 'All Students',
    category: 'Tutoring',
    hoursPerWeek: '6 - 10 hrs (Sat/Sun)',
    scheduleFlexibility: 'Moderate',
    description: 'Teach kids aged 8-14 the basics of game logic and coding through visual programming and beginner Python in our modern Davis Square workshop.',
    responsibilities: [
      'Lead small workshops of 4-6 students',
      'Inspire creativity by helping kids build mini-games',
      'Share positive feedback with parents after class'
    ],
    requirements: [
      'Any major with coding fluency (CS, Engineering, Math, Design)',
      'High enthusiasm for working with kids',
      'Clear background check clearance'
    ],
    perks: ['$35/hr base pay', 'Curriculum provided (no lesson planning needed)', 'Davis Square food spots nearby'],
    employerRating: 4.6,
    employerReviewCount: 16,
    payPunctualityRate: 98,
    originalSource: 'Craigslist',
    sourceUrl: 'https://boston.craigslist.org',
    postedAgo: '1 day ago',
    reviews: [
      {
        id: 'rev-11',
        authorRole: 'Tufts CS Junior',
        rating: 5,
        verifiedStudent: true,
        paySpeed: 'Weekly (No Delay)',
        vibe: 'Super Chill',
        comment: 'Lessons are pre-made so zero prep time needed. 2 mins walk from Davis station. Super fun.',
        date: 'Oct 17',
        upvotes: 11,
      }
    ]
  },
  {
    id: 'gig-011',
    title: 'Evening Asian Bistro Host / Front-of-House',
    company: 'Chinatown Noodle & Dumpling House',
    hourlyWage: 19,
    location: 'Beach St, Chinatown, Boston',
    coords: [42.3515, -71.0618],
    nearestStation: {
      stationId: 'chinatown',
      name: 'Chinatown',
      line: 'Orange',
      walkMinutes: 2,
    },
    workAuth: 'All Students',
    category: 'Barista & Cafe',
    hoursPerWeek: '10 - 15 hrs/wk (Evening)',
    scheduleFlexibility: 'Moderate',
    description: 'Greet guests, manage waitlist on iPad, seat parties, and pack takeout delivery orders. Bilingual in English & Mandarin/Cantonese is a big plus!',
    responsibilities: [
      'Manage dinner rush waitlists and phone reservations',
      'Pack takeout orders and coordinate with UberEats / DoorDash drivers',
      'Ensure front-of-house clean and welcoming'
    ],
    requirements: [
      'Friendly and quick-moving',
      'Comfortable in busy restaurant environment',
      'Weekend evening availability'
    ],
    perks: ['Free authentic staff dinner on every shift', 'Cash tips shared nightly', 'Steps away from Chinatown Orange Line'],
    employerRating: 4.5,
    employerReviewCount: 23,
    payPunctualityRate: 97,
    originalSource: 'Reddit (r/bostonjobs)',
    sourceUrl: 'https://reddit.com/r/bostonjobs',
    postedAgo: '8 hours ago',
    reviews: [
      {
        id: 'rev-12',
        authorRole: 'Suffolk Freshman',
        rating: 4,
        verifiedStudent: true,
        paySpeed: 'Weekly (No Delay)',
        vibe: 'Busy / High Energy',
        comment: 'Staff meal alone saves me $30 on dining every weekend! Boss gives cash tips at the end of every night.',
        date: 'Oct 12',
        upvotes: 15,
      }
    ]
  },
  {
    id: 'gig-012',
    title: 'Student Media Equipment Room Tech',
    company: 'Emerson College Media Hub',
    hourlyWage: 18,
    location: 'Boylston St, Boston Common, Boston',
    coords: [42.3528, -71.0652],
    nearestStation: {
      stationId: 'boylston',
      name: 'Boylston',
      line: 'Green',
      walkMinutes: 1,
    },
    workAuth: 'On-Campus (F-1 100% Safe)',
    category: 'Campus',
    hoursPerWeek: '10 - 15 hrs/wk',
    scheduleFlexibility: 'High (Exam Friendly)',
    description: 'Check in/out 4K cinema cameras, audio mics, tripods, and lighting gear for film and journalism students. Overlooking Boston Common.',
    responsibilities: [
      'Inspect lens and sensor cleanliness upon return',
      'Inventory microphones, cables, and battery packs',
      'Maintain an organized gear locker'
    ],
    requirements: [
      'Enrolled Emerson or cross-registered Boston student',
      'Basic familiarity with cinema or photo gear',
      'Punctual and reliable'
    ],
    perks: ['Can test & borrow equipment for personal creative projects', 'Right at Boylston Green Line exit', 'Low stress atmosphere'],
    employerRating: 4.9,
    employerReviewCount: 38,
    payPunctualityRate: 100,
    originalSource: 'Company Direct',
    sourceUrl: 'https://emerson.edu',
    postedAgo: '2 days ago',
    reviews: [
      {
        id: 'rev-13',
        authorRole: 'Emerson VMA Senior',
        rating: 5,
        verifiedStudent: true,
        paySpeed: 'Bi-Weekly',
        vibe: 'Super Chill',
        comment: 'Hands down best gig if you love film gear. You make great friends with student creators.',
        date: 'Oct 05',
        upvotes: 22,
      }
    ]
  }
];
