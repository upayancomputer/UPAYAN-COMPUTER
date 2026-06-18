import { Course, Feature, Testimonial, GalleryItem, Statistic } from './types';

export const COURSES: Course[] = [
  {
    id: 'office-app',
    title: 'Computer Office Application Course',
    shortTitle: 'Office Application',
    duration: '3 / 6 Months (Flexible)',
    category: 'core',
    icon: 'Monitor',
    description: 'Learn fundamental computer operation, typing, spreadsheets, presentations, internet navigation, and cloud tools critical for every modern workspace.',
    fullDescription: 'This comprehensive course is designed for beginners to intermediate learners who want to master standard office tools. It provides hands-on training to make students proficient in administrative, business, and daily digital operations, making them prime candidates for modern corporate jobs.',
    curriculum: [
      'Introduction to Computer Hardware, Software, & Operating Systems (Windows)',
      'Advanced Bengali & English Typing Principles (Fast & Accurate Touch Typing)',
      'Microsoft Word: Document Formatting, Resume Writing, Cover Letters, Mail Merge',
      'Microsoft Excel: Data Formatting, Formulas (VLOOKUP, IF, SUMIF), Pivots, Accounting Sheet Preparation',
      'Microsoft PowerPoint: Interactive Presentation Design, Slide Master, Animation Principles',
      'Microsoft Access: Introduction to Database Concept, Structuring Tables & Forms',
      'Internet Essentials: Email Writing Etiquette, Cloud Storage (Google Drive, OneDrive), Safe Browsing',
      'Freelance Marketplace Fundamentals: Data Entry, Virtual Assistant Portals'
    ],
    benefits: [
      'Flexible choices between 3 Months fast-track or 6 Months comprehensive program.',
      'Comprehensive textbook and custom Bengali lecture sheets provided free of cost.',
      'Extensive hands-on daily practice labs under direct instructor supervision.',
      'Prepares you fully for Govt. Board examinations (BTEB).'
    ],
    opportunities: [
      'Office Assistant or Front Desk Administrator',
      'Data Entry Operator in corporate companies',
      'Computer Operator in clinics, government, and schools',
      'Freelance Data Expert (Virtual Assistant) via Upwork/Fiverr'
    ],
    learningOutcomes: [
      'Format corporate-ready reports, agreements, and resumes perfectly.',
      'Calculate budgets, analyze databases, and make professional charts in Excel.',
      'Design high-impact slides to present sales, findings, or business plans.',
      'Fluently use email, search engines, and cloud tools for remote productivity.'
    ],
    price: '৳ 3,500 (3 Months) / ৳ 5,000 (6 Months)',
    installments: 'Available in 2 monthly installments'
  },
  {
    id: 'adv-tech',
    title: 'Advanced Computer Technology Course',
    shortTitle: 'Advanced Tech',
    duration: '6 Months (2 Hours/Day, 3 Days/Week)',
    category: 'advanced',
    icon: 'Cpu',
    description: 'Bridge the gap between basic operation and high-level tech skills. Includes graphic design, database management, computer networking, and hardware repair.',
    fullDescription: 'This course is tailored for individuals ready to go beyond simple administrative tasks. It provides deep technical insight into how computer hardware works, how systems communicate over a network, and introduces high-income skills like creative Graphic Design and Professional Web Design basics.',
    curriculum: [
      'Advanced Hardware Troubleshooting & PC Assembly (Building & Repairing PCs)',
      'Operating System Installation (Windows 10/11, Ubuntu Linux) & Driver Configuration',
      'Intro to Computer Networking: IP Addressing, LAN Setup, Router Configuration',
      'Graphic Design Fundamentals: Adobe Photoshop (Retouching, Banner Design, Photo Manipulation)',
      'Adobe Illustrator Principles: Vector Logo Design, Typography, Branding Identity',
      'Introduction to HTML5, CSS3 & Responsive Web Design concepts',
      'IT Support Desktop Operations & Security Protection (Antivirus systems)'
    ],
    benefits: [
      'Dual focus on Creative Design (Adobe Suite) and Technical Support (IT, Systems).',
      'Provides practical troubleshooting kits and networking tools in-classroom.',
      'Access highly coveted freelance mentorship programs for designer marketplaces.',
      'Industry-standard guidelines prepare you for modern professional roles.'
    ],
    opportunities: [
      'IT Support Technician / Desktop Support Specialist',
      'Junior Graphic Designer at print houses or marketing agencies',
      'Network Support Assistant for sub-district ISPs',
      'Freelance Photo Editor & Brand Designer on international marketplaces'
    ],
    learningOutcomes: [
      'Assemble a PC from individual parts and identify/fix diagnostic errors.',
      'Install, clone, and backup operating systems and fix driver-level issues.',
      'Configure a local client-router-switch environment securely with IP configurations.',
      'Create logos, Facebook banners, promotional material, and vector illustrations.'
    ],
    price: '৳ 6,000',
    installments: 'Pay in 2 easy monthly installments'
  },
  {
    id: 'diploma-ict',
    title: 'Diploma in Information & Communication Technology (ICT)',
    shortTitle: 'ICT Diploma',
    duration: '1 Year (Comprehensive Program)',
    category: 'diploma',
    icon: 'GraduationCap',
    description: 'The ultimate professional course covering office software, database administration, programming fundamentals, web development, and client server setup.',
    fullDescription: 'Our hallmark one-year diploma is a structured, long-term program meticulously engineered to transform you into an all-rounder IT Professional. From database architecture and computer assembly to coding fundamentals, this course provides a rigorous, deep-dive training program standardizing you with elite credentials.',
    curriculum: [
      'Semester 1: Mastering Office Suites & Advanced Graphic Design',
      'Semester 1: Hardware Diagnostics, Network Administration & PC Security',
      'Semester 2: Web Development Fundamentals (HTML, CSS, JavaScript, Tailwind)',
      'Semester 2: Relational Database Management Systems (SQL, Access, Database Design)',
      'Semester 2: Python Programming Basics (Variables, Loops, Data Objects, File Handling)',
      'Professional Soft Skills: English Communication, Interview Preparation, Portfolio Web Design',
      'Final Live Capstone Project: Create and Deploy an Interactive Multi-page System'
    ],
    benefits: [
      'Awarded with a prestigious formal 1-Yr Diploma Certificate.',
      'Personal portfolio hosting space given for free to showcase web and design projects.',
      'Guaranteed internship opportunities at local IT service agencies upon top criteria.',
      'Lifetime lab access and direct one-on-one session consultation with expert mentors.'
    ],
    opportunities: [
      'IT Office Manager & Database Administrator',
      'Web Developer / Frontend Assistant',
      'IT System Administrator & Coordinator in non-profit or corporate divisions',
      'Full-stack technology freelancer handling diverse development projects'
    ],
    learningOutcomes: [
      'Develop modern, responsive websites with dynamic JavaScript functionality.',
      'Structure relational databases and perform standard SQL queries securely.',
      'Write procedural Python programs to parse data and automate system workloads.',
      'Demonstrate deep professional expertise across modern hardware, networks, and suites.'
    ],
    price: '৳ 20,000',
    installments: '৳ 4,000 Admission Fee followed by 4 monthly installments of ৳ 4,000'
  },
  {
    id: 'hsc-ict',
    title: 'HSC ICT Academic Program',
    shortTitle: 'HSC ICT Academic',
    duration: '3 / 4 Months (Board Exam Centric)',
    category: 'academic',
    icon: 'BookOpen',
    description: 'Master the entire HSC ICT syllabus with expert lessons on Number Systems, HTML, SQL Database, C Programming, and Communication Systems.',
    fullDescription: 'Customized strictly based on the National Curriculum and Textbook Board (NCTB) syllabus, this academic program ensures 100% preparation for college board assessments. We break down dense topics like binary math, networking topologies, coding in C, and SQL into highly visualized, practical practical examples.',
    curriculum: [
      'Chapter 1: Information and Communication Technology: World & Bangladesh Perspective',
      'Chapter 2: Communication Systems and Networking (Topologies, Transmission Media, IP)',
      'Chapter 3: Number Systems & Digital Devices (Binary Math, Logic Gates, Truth Tables)',
      'Chapter 4: Web Design Essentials & HTML5 (Constructing layout tags, lists, links, image embedding)',
      'Chapter 5: Programming Language C (Variables, Control Flow, Arrays, Functions, HSC Board Problems)',
      'Chapter 6: Database Management Systems (DBMS) (Primary Keys, Foreign Keys, SQL queries)',
      'HSC Board Question Analysis: Solving the past 10 years of CQ & MCQ challenges',
      'Weekly Mock Tests + Speed Exams targeting rapid MCQ answers'
    ],
    benefits: [
      'Tailored matching for all chapters of Bangladesh National HSC syllabus.',
      'Interactive visual kits to study Boolean Logic gates and circuits directly.',
      'Specialist short sheets and MCQ hacking tactics for competitive Board Exams.',
      'Small discussion circles where every student gets their programming logic reviewed.'
    ],
    opportunities: [
      'Achieve standard A+ in HSC Board ICT Exam',
      'Build solid logical foundations for University Admission Engineering Exams',
      'Acquire core computer foundation supporting early college IT projects'
    ],
    learningOutcomes: [
      'Solve complicated binary, decimal, octal, hexadecimal mathematical conversions quickly.',
      'Design, connect, and analyze logic circuits for any logical formulation.',
      'Write, test, and debug fully working logical console applications in C programming.',
      'Explain communication paradigms and structure custom HTML pages seamlessly.'
    ],
    price: '৳ 6,000',
    installments: 'One-time payment'
  }
];

export const FEATURES: Feature[] = [
  {
    id: 'trainers',
    title: 'Experienced Trainers',
    description: 'Learn from registered technicians, creative graphic designers, and academic computer teachers who offer deep personalized care for every student.',
    iconName: 'Users',
    color: 'blue'
  },
  {
    id: 'lab',
    title: 'Modern Computer Lab',
    description: 'Practice on dedicated, fast multi-core desktop computers in a fully air-conditioned room with 24/7 power backup and high-speed Wi-Fi.',
    iconName: 'CircuitBoard',
    color: 'purple'
  },
  {
    id: 'practical',
    title: 'Practical Learning',
    description: 'No rote memorization. Our courses are 20% theory and 80% direct typing, assembly, design, and coding worksheets.',
    iconName: 'MousePointerClick',
    color: 'cyan'
  },
  {
    id: 'batches',
    title: 'Small Batch System',
    description: 'Every session holds a maximum of 10-12 students. This guarantees you a dedicated station and one-on-one attention from your trainer.',
    iconName: 'LayoutGrid',
    color: 'indigo'
  },
  {
    id: 'curr',
    title: 'Industry Relevant Curriculum',
    description: 'Our syllabus is regularly monitored and updated to match the demands of international freelance boards and corporate jobs.',
    iconName: 'Compass',
    color: 'emerald'
  },
  {
    id: 'cert',
    title: 'Certificate Upon Completion',
    description: 'Earn a professionally recognized course completion certificate and validation that looks spectacular on your resume.',
    iconName: 'Award',
    color: 'purple'
  },
  {
    id: 'guidance',
    title: 'Career Guidance',
    description: 'Get tailored resume building, portfolio counseling, interview guidance, and tips on running freelance marketplaces safely.',
    iconName: 'TrendingUp',
    color: 'blue'
  },
  {
    id: 'fees',
    title: 'Affordable Fees & Installments',
    description: 'Quality education should be accessible. Installment setups are available to make sure financials never block your skill journey.',
    iconName: 'BadgeCent',
    color: 'cyan'
  }
];

export const STATS: Statistic[] = [
  {
    id: 'students',
    value: 1200,
    suffix: '+',
    label: 'Students Trained',
    iconName: 'HeartHandshake',
    description: 'Talented students equipped with digital fluency'
  },
  {
    id: 'success',
    value: 95,
    suffix: '%',
    label: 'Success Rate',
    iconName: 'CheckCircle2',
    description: 'Students who completed exams or secured freelance/jobs'
  },
  {
    id: 'years',
    value: 10,
    suffix: '+',
    label: 'Years Experience',
    iconName: 'Sparkles',
    description: 'Standard of trust and technical educational excellence'
  },
  {
    id: 'programs',
    value: 4,
    suffix: '',
    label: 'Professional Programs',
    iconName: 'Briefcase',
    description: 'Focused modules matching market expectations'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Mahmudul Hasan',
    role: 'Freelance Web Developer',
    course: 'Diploma in ICT (Year 2025)',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
    rating: 5,
    review: 'Joining UPAYAN was the best decision of my life. Before enrolling in the 1-Year Diploma, I could barely operate Excel. By the end, I was making websites and writing Python scripts! The trainers are super supportive and help you patiently with every tiny error.',
    date: 'February 12, 2026'
  },
  {
    id: 't2',
    name: 'Ayesha Akhter',
    role: 'Junior Graphic Designer',
    course: 'Advanced Computer Technology (6 Mon.)',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120',
    rating: 5,
    review: 'The Computer lab is outstanding, with individual machines for everyone. The Graphic Design classes using Photoshop and Illustrator are purely project-based. Thanks to UPAYAN teachers, I now design social media campaigns for local clients!',
    date: 'April 05, 2026'
  },
  {
    id: 't3',
    name: 'Sajid Islam',
    role: 'HSC Candidate (A+ Cadet)',
    course: 'HSC ICT Academic Program (3 Mon.)',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120',
    rating: 5,
    review: 'Logic gates and C programming used to scare me in college. At UPAYAN, they break things down visually with live coding and real practice. I scored 98% in my ICT mock-board! Highly recommend this to all college students.',
    date: 'May 30, 2026'
  },
  {
    id: 't4',
    name: 'Nusrat Jahan',
    role: 'Operations Clerk at Square Tech',
    course: 'Computer Office Application (3 Mon.)',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120&h=120',
    rating: 5,
    review: 'The 3-Month Office Application course made me highly productive. I mastered Excel macros, typing Bengali/English at lightning speed, and organizing presentations. Got selected for my job because of the confidence gained here.',
    date: 'May 20, 2026'
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Modern High-Speed Practical Lab Stations',
    category: 'lab',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600',
    aspectRatio: 'wide'
  },
  {
    id: 'g2',
    title: 'Hands-on Coding & Hardware Demo Classroom',
    category: 'classroom',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
    aspectRatio: 'portrait'
  },
  {
    id: 'g3',
    title: 'Annual Course Graduation & Certificate Ceremony',
    category: 'events',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600',
    aspectRatio: 'video'
  },
  {
    id: 'g4',
    title: 'Our Clean, Air-Conditioned High-Tech Study Spaces',
    category: 'lab',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
    aspectRatio: 'square'
  },
  {
    id: 'g5',
    title: 'Special ICT Seminar of UPAYAN Alumnus and Mentors',
    category: 'events',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600',
    aspectRatio: 'wide'
  },
  {
    id: 'g6',
    title: 'Official Course Accreditation & Govt. Syllabus Integration',
    category: 'certificates',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600',
    aspectRatio: 'video'
  }
];
