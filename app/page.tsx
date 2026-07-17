"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles, ArrowRight, Users, Calendar, Building2, Globe,
  Star, Code2, ChevronDown, MapPin, Clock, Trophy, Zap, BookOpen, Heart,
} from "lucide-react";
import CountUp from "react-countup";
import { useInView as useInViewObs } from "react-intersection-observer";
import { stats, events, sponsors, testimonials } from "@/data/mock";
import { cn, formatDate } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// ─── Particle Canvas ────────────────────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      o: Math.random() * 0.4 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168,85,247,${p.o})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" id="particle-canvas" />;
}

// ─── Stat Icons ──────────────────────────────────────────────────────────────
const statIcons: Record<string, React.FC<{ className?: string }>> = {
  Users: ({ className }) => <Users className={className} />,
  Calendar: ({ className }) => <Calendar className={className} />,
  Building: ({ className }) => <Building2 className={className} />,
  Globe: ({ className }) => <Globe className={className} />,
};

// ─── Event Card ──────────────────────────────────────────────────────────────
function EventCard({ event }: { event: typeof events[0] }) {
  const statusColor = event.status === "upcoming" ? "bg-green-500/20 text-green-400 border-green-500/30"
    : event.status === "ongoing" ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
    : "bg-gray-500/20 text-gray-400 border-gray-500/30";
  return (
    <motion.div
      className="glass-card overflow-hidden flex flex-col"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image src={event.banner} alt={event.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/80 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full border", statusColor)}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
          <span className="badge">{event.mode}</span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="badge mb-3 self-start">{event.category}</span>
        <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-3 line-clamp-2">{event.title}</h3>
        <div className="space-y-1.5 mb-4 text-sm text-[var(--text-body)]">
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-purple-400" />{formatDate(event.date)}</div>
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-cyan-400" />{event.location}</div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-purple-400" />{event.duration}</div>
        </div>
        <p className="text-sm text-[var(--text-body)] line-clamp-2 mb-4 flex-1">{event.description}</p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--border-subtle)]">
          <span className="flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
            <Users className="w-4 h-4" />{event.attendees?.toLocaleString()}+ registered
          </span>
          <Link href={`/events/${event.slug}`} className="text-sm font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const [statsRef, statsInView] = useInViewObs({ threshold: 0.2, triggerOnce: true });
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
  const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

  const featuredEvents = events.filter((e) => e.isFeatured);

  return (
    <div className="min-h-screen bg-[#050507] overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-12">
        <ParticleField />
        {/* Gradient blobs */}
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* ── Two-column layout on lg, single column below ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 xl:gap-20">

          {/* Left column — copy */}
          <motion.div
            className="flex-1 text-center lg:text-left max-w-2xl lg:max-w-[720px]"
            initial="hidden" animate="visible" variants={stagger}
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 badge mb-6 sm:mb-8">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="uppercase tracking-wider font-semibold text-xs text-[var(--text-primary)]">
                India&apos;s Largest Student Tech Community
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] leading-[0.95] tracking-tight mb-8"
            >
              Build. Hack.<br />
              <span className="text-gradient-shimmer">Grow Together.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl text-[var(--text-body)] max-w-2xl mx-auto lg:mx-0 mb-12 leading-relaxed"
            >
              Join <span className="text-purple-400 font-semibold">8,500+ student developers</span> from{" "}
              <span className="text-cyan-400 font-semibold">200+ colleges</span> across India.
              Connect, learn, and build the future of tech.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5"
            >
              <Link href="/sign-up" className="btn-primary group relative text-[15px] px-8 py-4">
                Join Community 
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                <span className="absolute inset-0 rounded-full bg-white/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              <Link href="/events" className="btn-secondary group text-[15px] px-8 py-4 bg-white/5 backdrop-blur-md">
                Explore Events 
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 opacity-70" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column — code widget */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block relative flex-shrink-0 w-[380px] xl:w-[420px] lg:mt-24 xl:mt-32"
          >
            {/* Ambient cyan glow behind card */}
            <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="glass-card p-6 text-left font-mono relative z-10 animate-float shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border-white/10">
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-[10px] text-[var(--text-muted)] tracking-wide">hacknfinity.js</span>
              </div>
              <pre className="text-xs leading-6 select-none">
{`  `}<span className="text-blue-400">const</span>{` `}<span className="text-yellow-300">hacknfinity</span>{` = {\n`}
{`    `}<span className="text-cyan-300">members</span>{`:  `}<span className="text-green-300">'8500+'</span>{`,\n`}
{`    `}<span className="text-cyan-300">events</span>{`:   `}<span className="text-green-300">'52+'</span>{`,\n`}
{`    `}<span className="text-cyan-300">colleges</span>{`: `}<span className="text-green-300">'200+'</span>{`,\n`}
{`    `}<span className="text-cyan-300">vibe</span>{`:     `}<span className="text-purple-300">'legendary'</span>{`\n`}
{`  };`}
              </pre>
              {/* Fake blinking cursor */}
              <div className="mt-3 flex items-center gap-2 border-t border-[var(--border-subtle)] pt-3">
                <span className="inline-block w-1.5 h-4 bg-purple-400 animate-pulse rounded-sm" />
                <span className="text-[10px] text-[var(--text-muted)]">ready to build something great?</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-6 h-6 text-[var(--text-muted)]" />
        </motion.div>
      </section>

      {/* ─── STATS ─── */}
      <section className="section-padding section-glow-bottom" ref={statsRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="badge inline-flex mb-4">Our Impact</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl sm:text-5xl text-[var(--text-primary)] mb-4">
              Numbers That{" "}
              <span className="text-gradient">Speak for Themselves</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = statIcons[stat.icon];
              return (
                <motion.div
                  key={stat.label}
                  className="glass-card stat-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
                    {Icon && <Icon className="w-6 h-6 text-purple-400" />}
                  </div>
                  <div className="stat-number">
                    {statsInView ? (
                      <CountUp start={0} end={stat.numericValue > 10000 ? stat.numericValue / 1000 : stat.numericValue}
                        duration={2.5} decimals={stat.numericValue > 10000 ? 1 : 0}
                        suffix={stat.numericValue > 10000 ? "L" + stat.suffix : stat.suffix}
                      />
                    ) : "0"}
                  </div>
                  <div className="font-display font-semibold text-[var(--text-primary)] mt-2 mb-1">{stat.label}</div>
                  <div className="text-xs text-[var(--text-muted)] leading-relaxed">{stat.description}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── VALUE PROPS ─── */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="badge inline-flex mb-4">Why Hacknfinity?</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl sm:text-5xl text-[var(--text-primary)] mb-4">
              Everything You Need to <span className="text-gradient">Level Up</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[var(--text-body)] max-w-xl mx-auto">
              From hackathons to resources to a thriving community — we&apos;ve got you covered.
            </motion.p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Zap className="w-6 h-6 text-yellow-400" />, bg: "from-yellow-500/20 to-orange-500/20", border: "border-yellow-500/20", title: "Hackathons & Competitions", desc: "Win ₹10L+ in prizes. Build real products in 48 hours. Get noticed by top companies.", link: "/events?category=Hackathon" },
              { icon: <BookOpen className="w-6 h-6 text-purple-400" />, bg: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/20", title: "Workshops & Learning", desc: "Free workshops, bootcamps, and live sessions on React, AI, DSA, Web3, and more.", link: "/events?category=Workshop" },
              { icon: <Heart className="w-6 h-6 text-cyan-400" />, bg: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/20", title: "Community & Network", desc: "8,500+ peers, industry mentors, alumni at top companies. Your next co-founder is here.", link: "/community" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="glass-card p-7 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -4 }}
              >
                <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-5 border", item.bg, item.border)}>
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">{item.title}</h3>
                <p className="text-[var(--text-body)] text-sm leading-relaxed flex-1">{item.desc}</p>
                <Link href={item.link} className="mt-5 text-sm font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED EVENTS ─── */}
      <section className="section-padding section-glow-top">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div className="flex items-end justify-between mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <div>
              <motion.p variants={fadeUp} className="badge inline-flex mb-3">Events</motion.p>
              <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl sm:text-5xl text-[var(--text-primary)]">
                Featured <span className="text-gradient">Events</span>
              </motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Link href="/events" className="btn-secondary text-sm hidden sm:flex">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event, i) => (
              <motion.div key={event.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link href="/events" className="btn-secondary">View All Events <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* ─── SPONSORS MARQUEE ─── */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-sm text-[var(--text-muted)] uppercase tracking-widest mb-10">
            Trusted by Industry Leaders
          </motion.p>
          <div className="marquee-container mb-4">
            <div className="marquee-track">
              {[...sponsors, ...sponsors].map((sponsor, i) => (
                <div key={i} className="flex items-center gap-2 glass-card px-5 py-3 mx-3 flex-shrink-0 rounded-full">
                  <Image src={sponsor.logo} alt={sponsor.name} width={28} height={28} className="rounded-full" />
                  <span className="text-sm font-semibold text-[var(--text-body)] whitespace-nowrap">{sponsor.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="marquee-container" style={{ direction: "rtl" }}>
            <div className="marquee-track">
              {[...sponsors.slice(3), ...sponsors.slice(3)].map((sponsor, i) => (
                <div key={i} className="flex items-center gap-2 glass-card px-5 py-3 mx-3 flex-shrink-0 rounded-full" style={{ direction: "ltr" }}>
                  <Image src={sponsor.logo} alt={sponsor.name} width={28} height={28} className="rounded-full" />
                  <span className="text-sm font-semibold text-[var(--text-body)] whitespace-nowrap">{sponsor.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section-padding section-glow-bottom">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="badge inline-flex mb-4">Testimonials</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl sm:text-5xl text-[var(--text-primary)]">
              What Our <span className="text-gradient">Community Says</span>
            </motion.h2>
          </motion.div>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t) => (
                <div key={t.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] px-3 min-w-0">
                  <div className="glass-card p-7 h-full flex flex-col">
                    <div className="flex mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-[var(--text-body)] leading-relaxed italic flex-1 mb-6">&quot;{t.content}&quot;</p>
                    <div className="flex items-center gap-3">
                      <Image src={t.avatar} alt={t.name} width={44} height={44} className="rounded-full ring-2 ring-purple-500/30" />
                      <div>
                        <div className="font-semibold text-sm text-[var(--text-primary)]">{t.name}</div>
                        <div className="text-xs text-[var(--text-muted)]">{t.role} · {t.college}</div>
                      </div>
                      {t.event && <span className="ml-auto badge text-xs">{t.event.split(" ").slice(0, 2).join(" ")}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            className="relative rounded-3xl p-10 sm:p-16 text-center overflow-hidden border border-purple-500/20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            <div className="relative z-10">
              <p className="badge inline-flex mb-6">Join Free · No Credit Card</p>
              <h2 className="font-display font-bold text-4xl sm:text-5xl text-[var(--text-primary)] mb-5">
                Ready to Join India&apos;s Largest<br className="hidden sm:block" />
                <span className="text-gradient"> Student Tech Community?</span>
              </h2>
              <p className="text-[var(--text-body)] mb-10 max-w-2xl mx-auto text-lg">
                Free to join. No gatekeeping. Just 8,500+ students learning, building, and growing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/sign-up" className="btn-primary text-base px-10 py-4">
                  Join for Free <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/resources" className="btn-secondary text-base px-10 py-4">
                  Browse Resources
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
