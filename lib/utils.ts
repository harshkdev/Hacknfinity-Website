import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDateShort(dateString);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getEventStatus(date: string, endDate?: string): "upcoming" | "ongoing" | "past" {
  const now = new Date();
  const start = new Date(date);
  const end = endDate ? new Date(endDate) : new Date(start.getTime() + 24 * 60 * 60 * 1000);

  if (now < start) return "upcoming";
  if (now > end) return "past";
  return "ongoing";
}

export function generateCertificateId(prefix: string = "HNF"): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export const SOCIAL_LINKS = {
  discord: "https://discord.com/invite/Bne9UJV5x",
  github: "https://github.com/hacknfinity",
  twitter: "https://x.com/hacknfinity",
  linkedin: "https://www.linkedin.com/company/hacknfinity/",
  instagram: "https://www.instagram.com/hacknfinity",
  whatsapp: "https://api.whatsapp.com/send/?phone=919560249079&text&type=phone_number&app_absent=0",
  youtube: "https://youtube.com/@hacknfinity",
};
