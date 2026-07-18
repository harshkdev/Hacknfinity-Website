import type { Member, Event, Blog, Sponsor, GalleryItem, Resource, Certificate, Opportunity, ForumThread, Testimonial, Stat } from "@/types";

// ============================================================
// STATS
// ============================================================
export const stats: Stat[] = [
  { label: "Community Members", value: "10K+", numericValue: 10, suffix: "K+", icon: "Users", description: "Students from 200+ colleges across India" },
  { label: "Collaborations", value: "100+", numericValue: 100, suffix: "+", icon: "Building", description: "Partnerships and industry sponsors" },
  { label: "Events", value: "50+", numericValue: 50, suffix: "+", icon: "Calendar", description: "Hackathons, workshops & webinars" },
  { label: "Reach", value: "500K+", numericValue: 500, suffix: "K+", icon: "Globe", description: "Impressions & social reach" },
];

// ============================================================
// MEMBERS
// ============================================================
export const members: Member[] = [
  {
    id: "1",
    name: "Arjun Sharma",
    role: "Co-Founder & President",
    team: "Founders",
    college: "IIT Delhi",
    bio: "Full-stack developer and open-source enthusiast. Building India's largest student tech community one hackathon at a time.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=arjun&backgroundColor=b6e3f4",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "2",
    name: "Priya Mehta",
    role: "Co-Founder & CTO",
    team: "Founders",
    college: "BITS Pilani",
    bio: "AI/ML researcher passionate about democratizing technology education for students across India.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya&backgroundColor=c0aede",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "3",
    name: "Rishi Kapoor",
    role: "Lead Developer",
    team: "Developers",
    college: "NIT Trichy",
    bio: "Backend engineer specializing in distributed systems and cloud architecture.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rishi&backgroundColor=d1d4f9",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "4",
    name: "Sneha Patel",
    role: "Frontend Developer",
    team: "Developers",
    college: "DTU Delhi",
    bio: "React enthusiast building beautiful, accessible interfaces. Love contributing to open source.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sneha&backgroundColor=ffd5dc",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "5",
    name: "Aditya Kumar",
    role: "DevOps Engineer",
    team: "Developers",
    college: "VIT Vellore",
    bio: "Cloud native developer. Kubernetes, Docker and CI/CD pipelines are my playground.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aditya&backgroundColor=b6e3f4",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "6",
    name: "Kavya Reddy",
    role: "Lead Designer",
    team: "Designers",
    college: "NID Ahmedabad",
    bio: "UI/UX designer crafting beautiful digital experiences. Figma is my canvas.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kavya&backgroundColor=ffdfbf",
    linkedin: "https://linkedin.com",
  },
  {
    id: "7",
    name: "Vikram Singh",
    role: "Motion Designer",
    team: "Designers",
    college: "NIFT Mumbai",
    bio: "Bringing interfaces to life with purposeful animation and micro-interactions.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram&backgroundColor=c0aede",
    linkedin: "https://linkedin.com",
  },
  {
    id: "8",
    name: "Ananya Iyer",
    role: "Head of Events",
    team: "Event Coordinators",
    college: "SRM University",
    bio: "Event strategist who has organized 30+ tech events with 1000+ combined attendees.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ananya&backgroundColor=ffd5dc",
    linkedin: "https://linkedin.com",
  },
  {
    id: "9",
    name: "Rahul Verma",
    role: "Events Coordinator",
    team: "Event Coordinators",
    college: "Amity University",
    bio: "Passionate about creating memorable hackathon experiences that inspire student innovation.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul&backgroundColor=b6e3f4",
    linkedin: "https://linkedin.com",
  },
  {
    id: "10",
    name: "Meghna Das",
    role: "Head of Marketing",
    team: "Marketing",
    college: "Jadavpur University",
    bio: "Growth hacker and content strategist who grew our community from 500 to 8500+ members.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=meghna&backgroundColor=ffdfbf",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    id: "11",
    name: "Kiran Nair",
    role: "Social Media Manager",
    team: "Marketing",
    college: "Manipal University",
    bio: "Content creator specializing in tech education, memes, and community engagement.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kiran&backgroundColor=d1d4f9",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    id: "12",
    name: "Suresh Balaji",
    role: "Full Stack Developer",
    team: "Developers",
    college: "Anna University",
    bio: "MERN stack developer & competitive programmer. 5-star on HackerRank.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=suresh&backgroundColor=b6e3f4",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "13",
    name: "Pooja Gupta",
    role: "Brand Designer",
    team: "Designers",
    college: "Pearl Academy",
    bio: "Visual identity designer who shaped the Hacknfinity brand from day one.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pooja&backgroundColor=c0aede",
    linkedin: "https://linkedin.com",
  },
  {
    id: "14",
    name: "Dharun Raja",
    role: "App Developer",
    team: "Developers",
    college: "PSG Tech",
    bio: "React Native & Flutter developer building cross-platform mobile experiences.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dharun&backgroundColor=d1d4f9",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "15",
    name: "Ishita Banerjee",
    role: "Content Strategist",
    team: "Marketing",
    college: "Presidency University",
    bio: "Technical writer & blogger who makes complex topics accessible for student developers.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ishita&backgroundColor=ffd5dc",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
];

// ============================================================
// EVENTS
// ============================================================
export const events: Event[] = [
  {
    id: "1",
    slug: "hacknfinity-hackathon-2025",
    title: "Hacknfinity Hackathon 2025",
    subtitle: "Build the Future in 48 Hours",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
    date: "2025-08-15",
    endDate: "2025-08-17",
    duration: "48 hours",
    location: "IIT Delhi, New Delhi",
    mode: "Offline",
    category: "Hackathon",
    status: "upcoming",
    description: "India's biggest student hackathon is back! Join 1000+ students from 200+ colleges to build innovative solutions in AI, Web3, HealthTech, and FinTech. Massive prize pool, industry mentors, and life-changing connections await.",
    highlights: ["₹10L+ Prize Pool", "200+ Teams", "50+ Mentors", "Industry Judges", "Workshops & Talks", "Swag & Goodies"],
    speakers: [
      { name: "Dr. Anand Kumar", role: "Chief AI Officer", company: "TCS Innovation Labs", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anand" },
      { name: "Ritika Shah", role: "VP Engineering", company: "Razorpay", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ritika" },
    ],
    prizes: [
      { position: "🥇 1st Place", amount: "₹3,00,000", description: "Grand Prize" },
      { position: "🥈 2nd Place", amount: "₹1,50,000", description: "Runner Up" },
      { position: "🥉 3rd Place", amount: "₹75,000", description: "Second Runner Up" },
    ],
    attendees: 650,
    maxAttendees: 1000,
    tags: ["Hackathon", "AI/ML", "Web3", "HealthTech", "FinTech"],
    isFeatured: true,
  },
  {
    id: "2",
    slug: "react-masterclass-2025",
    title: "React & Next.js Masterclass",
    subtitle: "From Zero to Production in One Day",
    banner: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80",
    date: "2025-07-28",
    endDate: "2025-07-28",
    duration: "8 hours",
    location: "Online (Zoom)",
    mode: "Online",
    category: "Workshop",
    status: "upcoming",
    description: "A hands-on full-day workshop covering React fundamentals, Next.js App Router, Server Components, TypeScript, and deployment. Build a real-world project from scratch.",
    highlights: ["Hands-on coding", "Certificate of completion", "Recording access", "Doubt sessions", "Project review"],
    speakers: [{ name: "Sneha Patel", role: "Frontend Developer", company: "Hacknfinity", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sneha" }],
    attendees: 340,
    maxAttendees: 500,
    tags: ["React", "Next.js", "TypeScript", "Workshop"],
    isFeatured: true,
  },
  {
    id: "3",
    slug: "ai-ml-bootcamp-july-2025",
    title: "AI/ML Bootcamp — Summer 2025",
    subtitle: "Master Machine Learning in 4 Weeks",
    banner: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
    date: "2025-07-01",
    endDate: "2025-07-29",
    duration: "4 weeks",
    location: "Online",
    mode: "Online",
    category: "Bootcamp",
    status: "ongoing",
    description: "Intensive 4-week bootcamp covering Python, NumPy, Pandas, Scikit-learn, TensorFlow, and real-world projects. Daily sessions, weekly assignments, and a final capstone project.",
    highlights: ["4 weeks intensive", "Daily live sessions", "Industry projects", "Certificate", "Job referrals"],
    attendees: 420,
    maxAttendees: 400,
    tags: ["AI", "ML", "Python", "TensorFlow", "Bootcamp"],
    isFeatured: true,
  },
  {
    id: "4",
    slug: "open-source-summit-2025",
    title: "Open Source Summit India 2025",
    subtitle: "Contribute, Collaborate, Create",
    banner: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    date: "2025-06-10",
    endDate: "2025-06-11",
    duration: "2 days",
    location: "IISc Bangalore",
    mode: "Hybrid",
    category: "Conference",
    status: "past",
    description: "A two-day conference celebrating open source contributions from Indian students. Talks, workshops, and networking with core maintainers of major open source projects.",
    highlights: ["30+ speakers", "15 workshops", "Open source sprints", "Networking"],
    attendees: 800,
    tags: ["Open Source", "Conference", "Linux", "GitHub"],
  },
  {
    id: "5",
    slug: "dsa-crash-course-june-2025",
    title: "DSA Crash Course for Placements",
    subtitle: "Crack FAANG Interviews in 30 Days",
    banner: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80",
    date: "2025-06-01",
    endDate: "2025-06-30",
    duration: "30 days",
    location: "Online",
    mode: "Online",
    category: "Bootcamp",
    status: "past",
    description: "30-day intensive program covering Arrays, Linked Lists, Trees, Graphs, DP, and System Design. Daily problems, weekly contests, and mock interview sessions.",
    highlights: ["500+ problems covered", "Mock interviews", "System design sessions", "Placement assistance"],
    attendees: 1200,
    tags: ["DSA", "Algorithms", "Placements", "FAANG"],
  },
  {
    id: "6",
    slug: "web3-devcon-2025",
    title: "Web3 DevCon India 2025",
    subtitle: "The Future of Decentralized Web",
    banner: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80",
    date: "2025-09-05",
    endDate: "2025-09-06",
    duration: "2 days",
    location: "Mumbai",
    mode: "Offline",
    category: "Conference",
    status: "upcoming",
    description: "India's premier student-focused Web3 conference. Learn about blockchain, smart contracts, DeFi, NFTs, and the decentralized future from industry pioneers.",
    highlights: ["25+ speakers", "Hackathon", "NFT drops", "Networking"],
    attendees: 180,
    maxAttendees: 600,
    tags: ["Web3", "Blockchain", "DeFi", "Ethereum"],
  },
];

// ============================================================
// BLOGS
// ============================================================
export const blogs: Blog[] = [
  {
    id: "1",
    slug: "future-of-ai-in-india",
    title: "The Future of AI in India: Opportunities for Student Developers",
    excerpt: "India is poised to become an AI superpower. Here's how student developers can ride this wave and build a career in artificial intelligence.",
    content: "# The Future of AI in India...",
    cover: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    author: { name: "Priya Mehta", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya", role: "Co-Founder & CTO" },
    publishedAt: "2025-07-10",
    readTime: 8,
    tags: ["AI", "Career", "India Tech"],
    category: "AI/ML",
    isFeatured: true,
  },
  {
    id: "2",
    slug: "mastering-nextjs-app-router",
    title: "Mastering Next.js App Router: A Complete Guide for 2025",
    excerpt: "The App Router changed everything about how we build Next.js applications. This guide covers everything from Server Components to streaming.",
    content: "# Mastering Next.js App Router...",
    cover: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    author: { name: "Sneha Patel", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sneha", role: "Frontend Developer" },
    publishedAt: "2025-07-05",
    readTime: 12,
    tags: ["Next.js", "React", "TypeScript"],
    category: "Web Development",
    isFeatured: true,
  },
  {
    id: "3",
    slug: "open-source-for-beginners",
    title: "How to Make Your First Open Source Contribution (And Why You Should)",
    excerpt: "Contributing to open source is one of the best ways to grow as a developer. Here's a step-by-step guide to making your first PR.",
    content: "# Open Source for Beginners...",
    cover: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    author: { name: "Arjun Sharma", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=arjun", role: "Co-Founder" },
    publishedAt: "2025-06-28",
    readTime: 6,
    tags: ["Open Source", "GitHub", "Beginner"],
    category: "Open Source",
  },
  {
    id: "4",
    slug: "dsa-roadmap-2025",
    title: "The Complete DSA Roadmap for Placement Season 2025",
    excerpt: "A structured, week-by-week plan to master Data Structures and Algorithms and crack top product company interviews.",
    content: "# DSA Roadmap 2025...",
    cover: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    author: { name: "Rishi Kapoor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rishi", role: "Lead Developer" },
    publishedAt: "2025-06-20",
    readTime: 15,
    tags: ["DSA", "Placements", "Algorithms", "Career"],
    category: "DSA",
  },
  {
    id: "5",
    slug: "web3-getting-started",
    title: "Getting Started with Web3: From Zero to Your First dApp",
    excerpt: "Web3 can feel overwhelming. This beginner-friendly guide breaks down blockchain, smart contracts, and building your first decentralized application.",
    content: "# Getting Started with Web3...",
    cover: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    author: { name: "Aditya Kumar", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aditya", role: "DevOps Engineer" },
    publishedAt: "2025-06-12",
    readTime: 10,
    tags: ["Web3", "Blockchain", "Ethereum", "Beginner"],
    category: "Web3",
  },
  {
    id: "6",
    slug: "building-saas-in-college",
    title: "How I Built and Launched a SaaS Product While Still in College",
    excerpt: "A personal story of building a real SaaS product from a college hostel room — what worked, what didn't, and lessons learned.",
    content: "# Building SaaS in College...",
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    author: { name: "Meghna Das", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=meghna", role: "Head of Marketing" },
    publishedAt: "2025-06-01",
    readTime: 9,
    tags: ["SaaS", "Startup", "Entrepreneurship", "College"],
    category: "Startups",
  },
];

// ============================================================
// SPONSORS
// ============================================================
export const sponsors: Sponsor[] = [
  { id: "1", name: "Google for Startups", logo: "https://api.dicebear.com/7.x/initials/svg?seed=GS&backgroundColor=3b82f6&textColor=ffffff&fontSize=40", website: "https://google.com", tier: "Title" },
  { id: "2", name: "Microsoft for Students", logo: "https://api.dicebear.com/7.x/initials/svg?seed=MS&backgroundColor=a855f7&textColor=ffffff&fontSize=40", website: "https://microsoft.com", tier: "Title" },
  { id: "3", name: "Vercel", logo: "https://api.dicebear.com/7.x/initials/svg?seed=VE&backgroundColor=000000&textColor=ffffff&fontSize=40", website: "https://vercel.com", tier: "Gold" },
  { id: "4", name: "GitHub Education", logo: "https://api.dicebear.com/7.x/initials/svg?seed=GH&backgroundColor=22d3ee&textColor=ffffff&fontSize=40", website: "https://github.com", tier: "Gold" },
  { id: "5", name: "AWS Educate", logo: "https://api.dicebear.com/7.x/initials/svg?seed=AW&backgroundColor=d946ef&textColor=ffffff&fontSize=40", website: "https://aws.amazon.com", tier: "Silver" },
  { id: "6", name: "Notion", logo: "https://api.dicebear.com/7.x/initials/svg?seed=NO&backgroundColor=a855f7&textColor=ffffff&fontSize=40", website: "https://notion.so", tier: "Silver" },
  { id: "7", name: "Figma", logo: "https://api.dicebear.com/7.x/initials/svg?seed=FI&backgroundColor=3b82f6&textColor=ffffff&fontSize=40", website: "https://figma.com", tier: "Community" },
  { id: "8", name: "Postman", logo: "https://api.dicebear.com/7.x/initials/svg?seed=PO&backgroundColor=22d3ee&textColor=ffffff&fontSize=40", website: "https://postman.com", tier: "Community" },
];

// ============================================================
// GALLERY
// ============================================================
export const gallery: GalleryItem[] = [
  { id: "1", url: "/gallery/IMG-20260715-WA0065~2.jpg", thumbnail: "/gallery/IMG-20260715-WA0065~2.jpg", caption: "Hacknfinity Event Photo", event: "Hacknfinity Hackathon 2024", type: "image", date: "2024-11-15" },
  { id: "2", url: "/gallery/IMG-20260716-WA0002.jpg", thumbnail: "/gallery/IMG-20260716-WA0002.jpg", caption: "Community Meetup", event: "React Masterclass 2024", type: "image", date: "2024-10-20" },
  { id: "3", url: "/gallery/whatsapp-image.jpeg", thumbnail: "/gallery/whatsapp-image.jpeg", caption: "Team Session", event: "Internal", type: "image", date: "2024-08-05" },
  { id: "4", url: "/gallery/img-2.png", thumbnail: "/gallery/img-2.png", caption: "Workshop Snapshot", event: "AI/ML Bootcamp 2024", type: "image", date: "2024-07-20" },
  { id: "5", url: "/gallery/img-7.png", thumbnail: "/gallery/img-7.png", caption: "Open Source Summit", event: "Open Source Summit 2024", type: "image", date: "2024-09-10" },
  { id: "6", url: "/gallery/Screenshot_20260715-202541.WhatsApp~2.png", thumbnail: "/gallery/Screenshot_20260715-202541.WhatsApp~2.png", caption: "Hackathon Highlight", event: "Hacknfinity Hackathon 2024", type: "image", date: "2024-11-16" },
];

// ============================================================
// RESOURCES
// ============================================================
export const resources: Resource[] = [
  { id: "1", title: "Complete DSA Notes — Arrays to Graphs", description: "Comprehensive handwritten-style notes covering all major DSA topics with examples and complexity analysis.", type: "Notes", category: "DSA", downloadUrl: "#", tags: ["DSA", "Arrays", "Trees", "Graphs"], downloads: 4200, uploadedAt: "2025-05-15", author: "Rishi Kapoor" },
  { id: "2", title: "React + Next.js 14 Workshop Slides", description: "Full presentation slides from our React Masterclass — 150+ slides covering hooks, state, App Router, and more.", type: "PPT", category: "Web Development", downloadUrl: "#", tags: ["React", "Next.js", "TypeScript"], downloads: 2800, uploadedAt: "2025-06-20", author: "Sneha Patel" },
  { id: "3", title: "2025 Full Stack Developer Roadmap", description: "A complete, curated roadmap for becoming a production-ready full stack developer in 2025.", type: "Roadmap", category: "Career", downloadUrl: "#", tags: ["Roadmap", "Full Stack", "Career"], downloads: 6100, uploadedAt: "2025-01-10", author: "Arjun Sharma" },
  { id: "4", title: "AI/ML Bootcamp — Week 1 Recording", description: "Full recording of Week 1: Python for ML, NumPy, Pandas, and data preprocessing.", type: "Recording", category: "AI/ML", downloadUrl: "#", tags: ["AI", "ML", "Python", "NumPy"], downloads: 1900, uploadedAt: "2025-07-05", author: "Priya Mehta" },
  { id: "5", title: "Striver's SDE Sheet — Annotated Version", description: "The popular Striver SDE Sheet with community annotations, hints, and editorial links.", type: "Sheet", category: "DSA", downloadUrl: "#", tags: ["DSA", "Placements", "SDE Sheet"], downloads: 8500, uploadedAt: "2025-03-22", author: "Dharun Raja" },
  { id: "6", title: "Hacknfinity Open Source Projects", description: "Collection of beginner-friendly open source projects maintained by Hacknfinity members. Perfect for first contributions.", type: "Repo", category: "Open Source", repoUrl: "https://github.com", tags: ["Open Source", "GitHub", "Beginner"], downloads: 320, uploadedAt: "2025-04-01", author: "Aditya Kumar" },
];

// ============================================================
// CERTIFICATES
// ============================================================
export const certificates: Certificate[] = [
  { id: "HNF-2024-HACK-001", recipientName: "Rahul Verma", event: "Hacknfinity Hackathon 2024", issuedDate: "2024-11-17", type: "Winner", verificationUrl: "https://hacknfinity.in/verify/HNF-2024-HACK-001" },
  { id: "HNF-2024-HACK-042", recipientName: "Ananya Iyer", event: "Hacknfinity Hackathon 2024", issuedDate: "2024-11-17", type: "Participation", verificationUrl: "https://hacknfinity.in/verify/HNF-2024-HACK-042" },
  { id: "HNF-2024-REACT-015", recipientName: "Suresh Balaji", event: "React Masterclass 2024", issuedDate: "2024-10-20", type: "Participation", verificationUrl: "https://hacknfinity.in/verify/HNF-2024-REACT-015" },
  { id: "HNF-2025-AIML-007", recipientName: "Ishita Banerjee", event: "AI/ML Bootcamp 2025", issuedDate: "2025-07-29", type: "Participation", verificationUrl: "https://hacknfinity.in/verify/HNF-2025-AIML-007" },
];

// ============================================================
// OPPORTUNITIES
// ============================================================
export const opportunities: Opportunity[] = [
  { id: "1", title: "Frontend Developer Intern", company: "Razorpay", logo: "https://api.dicebear.com/7.x/initials/svg?seed=Razorpay&backgroundColor=3b82f6&textColor=fff", type: "Internship", domain: "Web Development", stipend: "₹25,000/month", duration: "3 months", location: "Bangalore", mode: "Hybrid", deadline: "2025-08-01", description: "Build cutting-edge payment UI at India's leading fintech. Work with React, TypeScript, and modern frontend tooling.", requirements: ["React", "TypeScript", "3rd/4th year"], applyLink: "#", postedAt: "2025-07-01", isHot: true },
  { id: "2", title: "ML Research Intern", company: "DRDO", logo: "https://api.dicebear.com/7.x/initials/svg?seed=DRDO&backgroundColor=a855f7&textColor=fff", type: "Internship", domain: "AI/ML", stipend: "₹15,000/month", duration: "6 months", location: "Delhi", mode: "On-site", deadline: "2025-07-31", description: "Work on computer vision and NLP projects for national security applications at India's premier defence research organization.", requirements: ["Python", "TensorFlow/PyTorch", "Research experience"], applyLink: "#", postedAt: "2025-07-05" },
  { id: "3", title: "Backend Engineer Intern", company: "Swiggy", logo: "https://api.dicebear.com/7.x/initials/svg?seed=Swiggy&backgroundColor=22d3ee&textColor=fff", type: "Internship", domain: "Backend", stipend: "₹30,000/month", duration: "4 months", location: "Bangalore", mode: "Remote", deadline: "2025-08-15", description: "Scale backend systems serving 10M+ daily orders. Work with Go, gRPC, Kafka, and distributed databases.", requirements: ["Go/Java/Python", "Distributed systems", "CGPA 7.0+"], applyLink: "#", postedAt: "2025-07-08", isHot: true },
  { id: "4", title: "UI/UX Design Intern", company: "Zepto", logo: "https://api.dicebear.com/7.x/initials/svg?seed=Zepto&backgroundColor=d946ef&textColor=fff", type: "Internship", domain: "Design", stipend: "₹20,000/month", duration: "2 months", location: "Mumbai", mode: "On-site", deadline: "2025-07-25", description: "Design user experiences for one of India's fastest-growing quick commerce apps. Figma skills required.", requirements: ["Figma", "UX Research", "Portfolio required"], applyLink: "#", postedAt: "2025-07-10" },
  { id: "5", title: "DevOps Intern", company: "Cloudinary", logo: "https://api.dicebear.com/7.x/initials/svg?seed=Cloudinary&backgroundColor=3b82f6&textColor=fff", type: "Internship", domain: "DevOps", stipend: "₹22,000/month", duration: "3 months", location: "Remote", mode: "Remote", deadline: "2025-08-30", description: "Work on cloud infrastructure, CI/CD pipelines, and Kubernetes orchestration at a global scale.", requirements: ["Docker", "Kubernetes", "AWS/GCP", "Linux"], applyLink: "#", postedAt: "2025-07-12" },
];

// ============================================================
// FORUM THREADS
// ============================================================
export const forumThreads: ForumThread[] = [
  { id: "1", title: "Best resources to learn System Design in 2025?", body: "I'm preparing for FAANG interviews next year and want to get serious about system design. What are the best resources — books, courses, YouTube channels?", author: { name: "Karan Mehta", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=karan", badge: "Member" }, category: "Questions", tags: ["System Design", "FAANG", "Interviews"], upvotes: 142, replies: 38, views: 2100, createdAt: "2025-07-15", isAnswered: true, isPinned: true },
  { id: "2", title: "Looking for teammates for Hacknfinity Hackathon 2025", body: "Team of 2 looking for a UI/UX designer and a backend developer. We're building an AI-powered mental health platform. DM if interested!", author: { name: "Priti Shah", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priti", badge: "Active" }, category: "Teammates", tags: ["Hackathon", "Team", "AI/ML"], upvotes: 89, replies: 24, views: 980, createdAt: "2025-07-14" },
  { id: "3", title: "Showcase: Built a real-time collaborative code editor", body: "Hey everyone! Spent 3 weeks building a collaborative code editor with Monaco Editor, WebSockets, and operational transforms. Open source — PRs welcome!", author: { name: "Suresh B", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=suresh", badge: "Builder" }, category: "Showcase", tags: ["Open Source", "WebSockets", "React"], upvotes: 215, replies: 47, views: 3200, createdAt: "2025-07-12" },
  { id: "4", title: "How do you stay motivated during a long bootcamp?", body: "I'm in week 2 of the AI/ML bootcamp and already feeling burnt out. Any tips from people who've completed long programs?", author: { name: "Riya Joshi", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=riya", badge: "Member" }, category: "General", tags: ["Motivation", "Bootcamp", "Productivity"], upvotes: 73, replies: 29, views: 850, createdAt: "2025-07-11", isAnswered: true },
  { id: "5", title: "Review my portfolio website — feedback welcome!", body: "Just finished my portfolio site built with Next.js and Three.js. Would love feedback on design, performance, and content before I start applying.", author: { name: "Aman Gupta", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aman", badge: "Member" }, category: "Showcase", tags: ["Portfolio", "Next.js", "Three.js"], upvotes: 58, replies: 22, views: 640, createdAt: "2025-07-10" },
];

// ============================================================
// TESTIMONIALS
// ============================================================
export const testimonials: Testimonial[] = [
  { id: "1", name: "Priya Sharma", role: "CS Student", college: "IIT Delhi", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya", content: "Hacknfinity gave me my first real team, my first shipped product, and my first internship offer.", rating: 5, event: "Hacknfinity Hackathon 2024" },
  { id: "2", name: "Arjun Mehta", role: "ECE Student", college: "VIT Vellore", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=arjun", content: "I went from zero coding experience to winning my first hackathon in 4 months.", rating: 5, event: "React Masterclass 2024" },
  { id: "3", name: "Sneha Reddy", role: "Software Engineer", college: "Google", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sneha", content: "As a mentor, I have seen students grow faster here than anywhere else.", rating: 5, event: "Hacknfinity Hackathon 2024" },
  { id: "4", name: "Rohan Kulkarni", role: "Full Stack Dev @ Freshworks", college: "COEP Pune", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rohan", content: "From a complete beginner to a working developer in 6 months — that's my Hacknfinity story. The resource hub, community forum, and network of alumni are invaluable.", rating: 5 },
  { id: "5", name: "Aditi Jain", role: "Product Manager @ Paytm", college: "IIM Bangalore", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aditi", content: "What sets Hacknfinity apart is the quality of the community. Everyone is helpful, motivated, and genuinely interested in growing together. I met my co-founder at one of their events!", rating: 5 },
];

// ============================================================
// ANNOUNCEMENTS
// ============================================================
export const announcements = [
  { id: "1", text: "🚀 Registrations for Hacknfinity Hackathon 2025 are now open!", link: "/events/hacknfinity-hackathon-2025", cta: "Register Now" },
  { id: "2", text: "📚 AI/ML Bootcamp is live — join 400+ students learning together!", link: "/events/ai-ml-bootcamp-july-2025", cta: "Join Now" },
];
