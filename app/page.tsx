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
import { stats, testimonials } from "@/data/mock";
import { cn, formatDate } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Section } from "@/components/ui/Section";

// ─── Infinity Hero Background ────────────────────────────────────────────────
function InfinityHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Lemniscate (∞) parametric: Bernoulli ─────────────────────────────────
    // x = a·cos(t)/(1+sin²(t))  y = a·sin(t)cos(t)/(1+sin²(t))
    function getInfinityPoint(angle: number, a: number, cx: number, cy: number) {
      const denom = 1 + Math.sin(angle) ** 2;
      return {
        x: cx + a * Math.cos(angle) / denom,
        y: cy + a * Math.sin(angle) * Math.cos(angle) / denom,
      };
    }

    // ── Stars ─────────────────────────────────────────────────────────────────
    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      o: Math.random() * 0.5 + 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // ── Flowing particles along the ∞ path ───────────────────────────────────
    const flowParticles = Array.from({ length: 32 }, (_, i) => ({
      t: (i / 32) * Math.PI * 2,
      speed: 0.004 + Math.random() * 0.004,
      size: Math.random() * 3 + 1.5,
      trail: [] as {x:number,y:number}[],
      color: Math.random() > 0.5 ? 0 : 1, // 0=purple 1=cyan
    }));

    // ── Free-floating dust particles ─────────────────────────────────────────
    const dust = Array.from({ length: 55 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r: Math.random() * 1.5 + 0.3,
      o: Math.random() * 0.25 + 0.05,
    }));

    const draw = () => {
      t += 0.006;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // ── Subtle neon grid ──────────────────────────────────────────────────
      const gridSpacing = 80;
      ctx.lineWidth = 0.3;
      ctx.strokeStyle = "rgba(139,92,246,0.06)";
      for (let x = 0; x < W; x += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // ── Twinkling stars ──────────────────────────────────────────────────
      stars.forEach((s) => {
        const alpha = s.o * (0.5 + 0.5 * Math.sin(t * s.twinkleSpeed * 60 + s.twinkleOffset));
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,180,255,${alpha})`;
        ctx.fill();
      });

      // ── Infinity symbol — pushed to lower 25% of hero, well below text ──
      const cx = W * 0.5;
      const cy = H * 0.78;          // bottom quarter — never overlaps headline
      const a  = Math.min(W, H) * 0.20; // smaller radius
      const STEPS = 300;

      // Soft outer glow (3 passes, reduced opacity)
      for (let pass = 0; pass < 3; pass++) {
        const blur  = [24, 12, 5][pass];
        const alpha = [0.04, 0.07, 0.12][pass]; // ↓ from 0.06/0.1/0.18
        ctx.save();
        ctx.filter = `blur(${blur}px)`;
        ctx.beginPath();
        for (let i = 0; i <= STEPS; i++) {
          const angle = (i / STEPS) * Math.PI * 2;
          const p = getInfinityPoint(angle, a, cx, cy);
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        const grad = ctx.createLinearGradient(cx - a, cy, cx + a, cy);
        grad.addColorStop(0,   `rgba(139,92,246,${alpha})`);
        grad.addColorStop(0.5, `rgba(0,217,255,${alpha})`);
        grad.addColorStop(1,   `rgba(139,92,246,${alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = [14, 6, 2][pass];
        ctx.stroke();
        ctx.restore();
      }

      // Crisp stroke on top (reduced to 35% opacity)
      ctx.beginPath();
      for (let i = 0; i <= STEPS; i++) {
        const angle = (i / STEPS) * Math.PI * 2;
        const p = getInfinityPoint(angle, a, cx, cy);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      const strokeGrad = ctx.createLinearGradient(cx - a, cy, cx + a, cy);
      strokeGrad.addColorStop(0,   "rgba(139,92,246,0.35)");
      strokeGrad.addColorStop(0.5, "rgba(0,217,255,0.35)");
      strokeGrad.addColorStop(1,   "rgba(139,92,246,0.35)");
      ctx.strokeStyle = strokeGrad;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // ── Flowing particles along the ∞ path ─────────────────────────────
      flowParticles.forEach((fp) => {
        fp.t = (fp.t + fp.speed) % (Math.PI * 2);
        const p = getInfinityPoint(fp.t, a, cx, cy);
        fp.trail.push({ x: p.x, y: p.y });
        if (fp.trail.length > 14) fp.trail.shift();

        // trail
        fp.trail.forEach((pt, i) => {
          const prog = i / fp.trail.length;
          const col = fp.color === 0
            ? `rgba(168,85,247,${prog * 0.7})`
            : `rgba(34,211,238,${prog * 0.7})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, fp.size * prog * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = col;
          ctx.fill();
        });

        // head with glow
        ctx.save();
        ctx.filter = "blur(3px)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, fp.size * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = fp.color === 0 ? "rgba(168,85,247,0.9)" : "rgba(34,211,238,0.9)";
        ctx.fill();
        ctx.restore();

        ctx.beginPath();
        ctx.arc(p.x, p.y, fp.size, 0, Math.PI * 2);
        ctx.fillStyle = fp.color === 0 ? "#a855f7" : "#22d3ee";
        ctx.fill();
      });

      // ── Floating dust ───────────────────────────────────────────────────
      dust.forEach((d) => {
        d.x = (d.x + d.vx + 1) % 1;
        d.y = (d.y + d.vy + 1) % 1;
        ctx.beginPath();
        ctx.arc(d.x * W, d.y * H, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168,85,247,${d.o})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ─── Stat Icons ──────────────────────────────────────────────────────────────
const statIcons: Record<string, React.FC<{ className?: string }>> = {
  Users: ({ className }) => <Users className={className} />,
  Calendar: ({ className }) => <Calendar className={className} />,
  Building: ({ className }) => <Building2 className={className} />,
  Globe: ({ className }) => <Globe className={className} />,
};

// ─── Event Card ──────────────────────────────────────────────────────────────
function EventCard({ event }: { event: any }) {
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

  const [events, setEvents] = useState<any[]>([]);
  const [sponsors, setSponsors] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/events", { cache: "no-store" }).then(res => res.json()).then(data => { if (Array.isArray(data)) setEvents(data); }).catch(console.error);
    fetch("/api/sponsors", { cache: "no-store" }).then(res => res.json()).then(data => { if (Array.isArray(data)) setSponsors(data); }).catch(console.error);
  }, []);

  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
  const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

  const featuredEvents = events.filter((e) => e.isFeatured);

  return (
    <div className="min-h-screen bg-[#050507] overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-12">
        {/* Diagonal gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/8 via-transparent to-cyan-500/6 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/60 via-transparent to-transparent pointer-events-none" />
        {/* Soft accent orbs */}
        <div className="absolute top-1/3 -left-24 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 -right-24 w-[350px] h-[350px] bg-cyan-500/6 rounded-full blur-[100px] pointer-events-none" />


        {/* ── Two-column layout on lg, single column below ── */}
        <div className="w-full block">
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

            {/* Headline — Enhancement 1: slightly larger, tighter leading */}
            <motion.h1
              variants={fadeUp}
              className="font-display font-extrabold text-5xl sm:text-[64px] lg:text-[76px] xl:text-[92px] leading-[0.9] tracking-[-0.02em] mb-8"
            >
              Build. Hack.<br />
              <span className="text-gradient">Grow Together.</span>
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

            {/* ── Enhancement 4a: Floating badge — top-right of widget ── */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="absolute -top-4 -right-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#a855f7]/30 bg-[#0d0d12]/80 backdrop-blur-md shadow-lg shadow-purple-500/10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] shadow-[0_0_6px_#a855f7] animate-pulse" />
              <span className="text-[10px] font-semibold tracking-widest uppercase text-purple-300">Community Live</span>
            </motion.div>

            {/* ── Enhancement 4b: Floating badge — bottom-left of widget ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="absolute -bottom-4 -left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#22d3ee]/25 bg-[#0d0d12]/80 backdrop-blur-md shadow-lg shadow-cyan-500/10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] shadow-[0_0_6px_#22d3ee] animate-pulse" style={{ animationDelay: "0.5s" }} />
              <span className="text-[10px] font-semibold tracking-widest uppercase text-cyan-300">Events &amp; Sessions</span>
            </motion.div>

            <div className="relative z-10 animate-float p-6 text-left font-mono rounded-2xl border border-purple-500/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl" style={{ background: "rgba(10,10,18,0.92)" }}>
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
      <Section className="section-padding section-glow-bottom" ref={statsRef}>
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
                  className="glass-card stat-card flex flex-col items-center justify-center text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#a855f7]/20 to-[#22d3ee]/20 flex items-center justify-center mb-4 border border-purple-500/20">
                    {Icon && <Icon className="w-6 h-6 text-purple-400" />}
                  </div>
                  <div className="stat-number">
                    {statsInView ? (
                      <CountUp start={0} end={stat.numericValue} duration={2.5} suffix={stat.suffix} />
                    ) : "0"}
                  </div>
                  <div className="font-display font-semibold text-[var(--text-primary)] mt-2 mb-1">{stat.label}</div>
                  <div className="text-xs text-[var(--text-muted)] leading-relaxed">{stat.description}</div>
                </motion.div>
              );
            })}
          </div>
        </Section>

      {/* ─── VALUE PROPS ─── */}
      <Section className="py-12 lg:py-16">
          <motion.div className="text-center mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="badge inline-flex mb-4">Why Hacknfinity?</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl sm:text-5xl text-[var(--text-primary)] mb-4">
              Everything You Need to <span className="text-gradient">Level Up</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[var(--text-body)] max-w-xl mx-auto">
              From hackathons to resources to a thriving community — we&apos;ve got you covered.
            </motion.p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: <Zap className="w-6 h-6 text-fuchsia-400" />, bg: "from-fuchsia-500/20 to-purple-500/20", border: "border-fuchsia-500/20", title: "Hackathons & Competitions", desc: "Win ₹10L+ in prizes. Build real products in 48 hours. Get noticed by top companies.", link: "/events?category=Hackathon" },
              { icon: <BookOpen className="w-6 h-6 text-purple-400" />, bg: "from-[#a855f7]/20 to-[#22d3ee]/20", border: "border-purple-500/20", title: "Workshops & Learning", desc: "Free workshops, bootcamps, and live sessions on React, AI, DSA, Web3, and more.", link: "/events?category=Workshop" },
              { icon: <Heart className="w-6 h-6 text-cyan-400" />, bg: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/20", title: "Community & Network", desc: "8,500+ peers, industry mentors, alumni at top companies. Your next co-founder is here.", link: "/community" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="glass-card p-8 flex flex-col group hover:border-purple-500/40 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.25)] transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
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
        </Section>

      {/* ─── FEATURED EVENTS ─── */}
      <Section className="section-padding section-glow-top">
          <motion.div className="flex items-end justify-between mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <div>
              <motion.p variants={fadeUp} className="badge inline-flex mb-3">Events</motion.p>
              <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl sm:text-5xl text-[var(--text-primary)] mb-4">
                Featured <span className="text-gradient">Events</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[var(--text-body)] max-w-xl text-base sm:text-lg">
                Join thousands of students at our upcoming hackathons, workshops, and meetups across India.
              </motion.p>
            </div>
            <motion.div variants={fadeUp}>
              <Link href="/events" className="btn-secondary text-sm hidden sm:flex">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event, i) => (
              <motion.div key={event._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link href="/events" className="btn-secondary">View All Events <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </Section>

      {/* ─── SPONSORS MARQUEE ─── */}
      <Section className="section-padding overflow-hidden">
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
        </Section>

      {/* ─── TESTIMONIALS ─── */}
      <Section className="section-padding section-glow-bottom overflow-hidden">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="badge inline-flex mb-4">Testimonials</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl sm:text-5xl text-[var(--text-primary)]">
              What Our <span className="text-gradient">Community Says</span>
            </motion.h2>
          </motion.div>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -mx-4 sm:-mx-6">
              {testimonials.map((t) => (
                <div key={t.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] px-4 sm:px-6 min-w-0">
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
        </Section>

      {/* ─── CTA BANNER ─── */}
      <Section className="section-padding">
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
        </Section>
    </div>
  );
}
