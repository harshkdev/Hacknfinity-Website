"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, ChevronRight } from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { members } from "@/data/mock";
import type { Member } from "@/types";
import { cn } from "@/lib/utils";

const teams = ["All", "Founders", "Developers", "Designers", "Event Coordinators", "Marketing"] as const;

export default function MembersPage() {
  const [activeTeam, setActiveTeam] = useState<string>("All");

  const filtered = activeTeam === "All" ? members : members.filter((m) => m.team === activeTeam);

  return (
    <div className="min-h-screen bg-[#050507] pt-24">
      {/* Hero */}
      <section className="section-glow-top py-20 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="badge inline-flex mb-4">The Team</span>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-[var(--text-primary)] mb-4">
            Meet Our <span className="text-gradient">Core Team</span>
          </h1>
          <p className="text-[var(--text-body)] text-lg max-w-xl mx-auto">
            The passionate students behind India&apos;s largest tech community. {members.length} members and growing.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {teams.map((team) => (
            <button
              key={team}
              onClick={() => setActiveTeam(team)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200",
                activeTeam === team
                  ? "btn-primary border-transparent"
                  : "border-[var(--border-brand)] text-[var(--text-body)] hover:text-[var(--text-primary)] hover:bg-purple-500/10"
              )}
            >
              {team}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -6 }}
      className="glass-card p-6 text-center flex flex-col items-center"
    >
      <div className="relative mb-4">
        <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-purple-500/30 group-hover:ring-purple-500/60 transition-all">
          <Image src={member.avatar} alt={member.name} width={80} height={80} className="rounded-full" />
        </div>
      </div>
      <h3 className="font-display font-bold text-sm text-[var(--text-primary)] mb-0.5">{member.name}</h3>
      <p className="text-xs text-purple-400 font-medium mb-2">{member.role}</p>
      <span className="badge text-xs mb-2">{member.team}</span>
      <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] mb-2">
        <GraduationCap className="w-3 h-3 flex-shrink-0" />
        <span className="line-clamp-1">{member.college}</span>
      </div>
      <p className="text-xs text-[var(--text-body)] line-clamp-2 mb-4">{member.bio}</p>
      <div className="flex items-center gap-2 mt-auto">
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full hover:bg-blue-500/20 text-[var(--text-muted)] hover:text-blue-400 transition-colors">
            <LinkedinIcon className="w-3.5 h-3.5" />
          </a>
        )}
        {member.github && (
          <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full hover:bg-white/10 text-[var(--text-muted)] hover:text-white transition-colors">
            <GithubIcon className="w-3.5 h-3.5" />
          </a>
        )}
        {member.twitter && (
          <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full hover:bg-sky-500/20 text-[var(--text-muted)] hover:text-sky-400 transition-colors">
            <TwitterIcon className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
