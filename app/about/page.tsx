"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Rocket, Eye, BookOpen, Link2, Building2, Lightbulb, ArrowRight, Users, Calendar } from "lucide-react";
import { Section } from "@/components/ui/Section";

const timeline = [
  { year: "2022 Q1", title: "Hacknfinity Founded", desc: "Two friends, one dream: make tech education accessible to every Indian student.", color: "from-purple-500 to-pink-500" },
  { year: "2022 Q3", title: "First Hackathon", desc: "50 students. 12 projects. 1 unforgettable weekend. The spark was lit.", color: "from-pink-500 to-orange-500" },
  { year: "2023 Q1", title: "1,000 Members", desc: "Community exploded across 10 colleges. Word spread fast.", color: "from-orange-500 to-yellow-500" },
  { year: "2023 Q4", title: "First National Event", desc: "500 students from 50+ colleges converged at IIT Delhi. History made.", color: "from-yellow-500 to-green-500" },
  { year: "2024 Q2", title: "5,000 Members", desc: "100+ colleges, 25+ states. Hacknfinity became truly national.", color: "from-green-500 to-cyan-500" },
  { year: "2025 Q1", title: "8,500+ Members", desc: "India's largest student tech community. This is just the beginning.", color: "from-cyan-500 to-blue-500" },
];

const goals = [
  { icon: "🎓", title: "Educate", desc: "Free workshops, bootcamps, and resources accessible to every student." },
  { icon: "🔗", title: "Connect", desc: "A network of 8,500+ peers, mentors, and industry leaders." },
  { icon: "🏗️", title: "Build", desc: "Real projects through hackathons and community collaborations." },
  { icon: "💡", title: "Innovate", desc: "Push boundaries with cutting-edge technology and bold ideas." },
];

export default function AboutPage() {
  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
  const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

  return (
    <div className="min-h-screen bg-[#050507] pt-24 overflow-x-hidden">
      {/* Hero */}
      <Section className="section-glow-top text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.span variants={fadeUp} className="badge inline-flex mb-4">Our Story</motion.span>
          <motion.h1 variants={fadeUp} className="font-display font-extrabold text-5xl sm:text-6xl text-[var(--text-primary)] mb-6 max-w-3xl mx-auto leading-tight">
            Building the{" "}
            <span className="text-gradient">Future of Student Tech</span>{" "}
            in India
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[var(--text-body)] text-lg max-w-2xl mx-auto mb-10">
            Hacknfinity was born from a simple belief: every student deserves access to world-class tech education, regardless of which college they attend.
          </motion.p>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 glass-card px-5 py-3 rounded-full">
              <Users className="w-4 h-4 text-purple-400" /><span className="text-sm font-semibold text-[var(--text-primary)]">8,500+ Members</span>
            </div>
            <div className="flex items-center gap-2 glass-card px-5 py-3 rounded-full">
              <Calendar className="w-4 h-4 text-cyan-400" /><span className="text-sm font-semibold text-[var(--text-primary)]">52+ Events</span>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* Mission & Vision */}
      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: <Rocket className="w-7 h-7 text-purple-400" />, bg: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/20", title: "Our Mission", text: "To democratize tech education and create a thriving ecosystem where every student, regardless of college or background, can learn, build, and succeed in technology." },
            { icon: <Eye className="w-7 h-7 text-cyan-400" />, bg: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/20", title: "Our Vision", text: "A future where India's 40 million college students have access to world-class tech education, mentorship, and the connections that open doors." },
          ].map((item, i) => (
            <motion.div key={item.title} className="glass-card p-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.bg} border ${item.border} flex items-center justify-center mb-5`}>{item.icon}</div>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-3">{item.title}</h2>
              <p className="text-[var(--text-body)] leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section containerClassName="max-w-4xl">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="badge inline-flex mb-4">Timeline</span>
          <h2 className="font-display font-bold text-4xl text-[var(--text-primary)]">Our <span className="text-gradient">Journey</span></h2>
        </motion.div>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-cyan-500/30 to-transparent hidden md:block" />
          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div key={item.year} className={`flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <div className="flex-1">
                  <div className="glass-card p-6">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white mb-3 inline-block`}>{item.year}</span>
                    <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-2">{item.title}</h3>
                    <p className="text-[var(--text-body)] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color} flex-shrink-0 hidden md:block ring-4 ring-[#050507]`} />
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Goals */}
      <Section className="section-glow-bottom">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="badge inline-flex mb-4">What We Stand For</span>
          <h2 className="font-display font-bold text-4xl text-[var(--text-primary)]">Community <span className="text-gradient">Goals</span></h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {goals.map((g, i) => (
            <motion.div key={g.title} className="glass-card p-6 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }}>
              <div className="text-4xl mb-4">{g.icon}</div>
              <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">{g.title}</h3>
              <p className="text-sm text-[var(--text-body)]">{g.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Team CTA */}
      <Section className="text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-4">
            Meet the people behind <span className="text-gradient">Hacknfinity</span>
          </h2>
          <Link href="/members" className="btn-primary inline-flex">Meet the Team <ArrowRight className="w-5 h-5" /></Link>
        </motion.div>
      </Section>
    </div>
  );
}
