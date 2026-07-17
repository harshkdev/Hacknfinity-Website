"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Megaphone } from "lucide-react";
import { announcements } from "@/data/mock";

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [current] = useState(0);

  if (dismissed || announcements.length === 0) return null;

  const announcement = announcements[current % announcements.length];

  return (
    <div className="announcement-banner relative z-50 py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 justify-center">
          <Megaphone className="w-4 h-4 text-purple-400 flex-shrink-0" />
          <p className="text-sm text-[var(--text-body)] text-center">
            {announcement.text}{" "}
            {announcement.link && (
              <Link
                href={announcement.link}
                className="text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-2 ml-1"
              >
                {announcement.cta} →
              </Link>
            )}
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4 text-[var(--text-muted)]" />
        </button>
      </div>
    </div>
  );
}
