// ============================================================
// HACKNFINITY — TypeScript Type Definitions
// ============================================================

export interface Member {
  id: string;
  name: string;
  role: string;
  team: "Founders" | "Developers" | "Designers" | "Event Coordinators" | "Marketing";
  college: string;
  bio: string;
  avatar: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  banner: string;
  date: string;
  endDate?: string;
  duration: string;
  location: string;
  mode: "Online" | "Offline" | "Hybrid";
  category: "Hackathon" | "Workshop" | "Webinar" | "Bootcamp" | "Talk" | "Conference";
  status: "upcoming" | "ongoing" | "past";
  description: string;
  highlights: string[];
  speakers?: Speaker[];
  prizes?: Prize[];
  registrationLink?: string;
  attendees?: number;
  maxAttendees?: number;
  tags: string[];
  isFeatured?: boolean;
}

export interface Speaker {
  name: string;
  role: string;
  company: string;
  avatar: string;
}

export interface Prize {
  position: string;
  amount: string;
  description: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover: string;
  author: BlogAuthor;
  publishedAt: string;
  readTime: number;
  tags: string[];
  category: string;
  isFeatured?: boolean;
}

export interface BlogAuthor {
  name: string;
  avatar: string;
  role: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
  tier: "Title" | "Gold" | "Silver" | "Community";
  description?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  thumbnail: string;
  caption: string;
  event: string;
  type: "image" | "video";
  date: string;
  width?: number;
  height?: number;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "Notes" | "PPT" | "Roadmap" | "Recording" | "Sheet" | "Repo";
  category: string;
  downloadUrl?: string;
  repoUrl?: string;
  previewUrl?: string;
  tags: string[];
  downloads: number;
  uploadedAt: string;
  author: string;
}

export interface Certificate {
  id: string;
  recipientName: string;
  event: string;
  issuedDate: string;
  type: "Participation" | "Winner" | "Runner-up" | "Volunteer" | "Speaker";
  verificationUrl: string;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  logo: string;
  type: "Internship" | "Full-time" | "Part-time" | "Freelance";
  domain: string;
  stipend?: string;
  duration?: string;
  location: string;
  mode: "Remote" | "On-site" | "Hybrid";
  deadline: string;
  description: string;
  requirements: string[];
  applyLink: string;
  postedAt: string;
  isHot?: boolean;
}

export interface ForumThread {
  id: string;
  title: string;
  body: string;
  author: ForumUser;
  category: "General" | "Projects" | "Questions" | "Teammates" | "Showcase";
  tags: string[];
  upvotes: number;
  replies: number;
  views: number;
  createdAt: string;
  isAnswered?: boolean;
  isPinned?: boolean;
}

export interface ForumUser {
  name: string;
  avatar: string;
  role?: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  college: string;
  avatar: string;
  content: string;
  rating: number;
  event?: string;
}

export interface Stat {
  label: string;
  value: string;
  numericValue: number;
  suffix: string;
  icon: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "event" | "certificate" | "announcement" | "reply";
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  college: string;
  year: string;
  bio: string;
  github?: string;
  linkedin?: string;
  points: number;
  badges: Badge[];
  registeredEvents: string[];
  certificates: string[];
  joinedAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: string;
}
