"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, Users, Search, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { events } from "@/data/mock";
import type { Event } from "@/types";
import { cn, formatDate } from "@/lib/utils";

const statusTabs = ["All", "Upcoming", "Ongoing", "Past"] as const;
const categories = ["All", "Hackathon", "Workshop", "Webinar", "Bootcamp", "Conference"] as const;

export default function EventsPage() {
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => events.filter((e) => {
    const matchStatus = status === "All" || e.status === status.toLowerCase();
    const matchCat = category === "All" || e.category === category;
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchCat && matchSearch;
  }), [status, category, search]);

  return (
    <div className="min-h-screen bg-[#050507] pt-24">
      {/* Hero */}
      <Section className="section-glow-top text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span className="badge inline-flex mb-4">All Events</span>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-[var(--text-primary)] mb-4">
            Discover <span className="text-gradient">Events</span>
          </h1>
          <p className="text-[var(--text-body)] text-lg max-w-xl mx-auto mb-8">
            Hackathons, workshops, bootcamps, and more — curated for student developers across India.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[{ label: `${events.filter(e=>e.status==='upcoming').length} Upcoming`, color: "text-green-400" }, { label: `${events.filter(e=>e.status==='ongoing').length} Ongoing`, color: "text-amber-400" }, { label: `${events.filter(e=>e.status==='past').length} Past`, color: "text-gray-400" }].map((s) => (
              <span key={s.label} className={`glass-card px-4 py-2 rounded-full text-sm font-semibold ${s.color}`}>{s.label}</span>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Filters */}
      <div className="sticky top-16 z-30 bg-[#050507]/90 backdrop-blur border-b border-[var(--border-subtle)] py-4">
        <Container className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {statusTabs.map((t) => (
              <button key={t} onClick={() => setStatus(t)} className={cn("px-4 py-1.5 rounded-full text-sm font-semibold border transition-all", status === t ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-transparent" : "border-[var(--border-brand)] text-[var(--text-body)] hover:bg-purple-500/10")}>
                {t}
              </button>
            ))}
            <div className="flex items-center gap-2 ml-auto glass-card rounded-full px-4 py-2">
              <Search className="w-4 h-4 text-[var(--text-muted)]" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events..." className="bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none w-40" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={cn("px-3 py-1 rounded-full text-xs font-medium border transition-all", category === c ? "border-purple-500 text-purple-400 bg-purple-500/10" : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-purple-500/50")}>
                {c}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Grid */}
      <Section className="py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-[var(--text-muted)]">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-medium">No events found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((event, i) => (
                <motion.div key={event.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}>
                  <EventCard event={event} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </Section>
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  const statusColor = event.status === "upcoming" ? "bg-green-500/20 text-green-400 border-green-500/30"
    : event.status === "ongoing" ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
    : "bg-gray-500/20 text-gray-400 border-gray-500/30";
  return (
    <motion.div className="glass-card overflow-hidden flex flex-col h-full" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
      <div className="relative aspect-video overflow-hidden">
        <Image src={event.banner} alt={event.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/80 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full border", statusColor)}>{event.status.charAt(0).toUpperCase() + event.status.slice(1)}</span>
          <span className="badge">{event.mode}</span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="badge mb-3 self-start">{event.category}</span>
        <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3 line-clamp-2">{event.title}</h3>
        <div className="grid grid-cols-2 gap-1.5 mb-4 text-sm text-[var(--text-body)]">
          <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" /><span className="truncate">{formatDate(event.date)}</span></div>
          <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" /><span className="truncate">{event.location}</span></div>
          <div className="flex items-center gap-1.5 col-span-2"><Clock className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />{event.duration}</div>
        </div>
        <p className="text-sm text-[var(--text-body)] line-clamp-2 mb-4 flex-1">{event.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {event.tags.slice(0, 3).map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-[var(--text-muted)] border border-[var(--border-subtle)]">{t}</span>)}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
          <span className="flex items-center gap-1.5 text-sm text-[var(--text-muted)]"><Users className="w-4 h-4" />{event.attendees?.toLocaleString()}+ registered</span>
          <Link href={`/events/${event.slug}`} className="btn-primary text-xs px-4 py-2">View Details <ArrowRight className="w-3 h-3" /></Link>
        </div>
      </div>
    </motion.div>
  );
}
