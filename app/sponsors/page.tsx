"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { sponsors } from "@/data/mock";
import { ExternalLink, ArrowRight, Users, Calendar, Trophy, CheckCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const benefits = ["Reach 8,500+ highly engaged student developers", "Brand exposure across 200+ college chapters", "Direct access to top campus talent pipeline", "Speaking opportunities at national events", "Logo placement on all event materials", "Social media features to 1L+ followers"];

export default function SponsorsPage() {
  const titleSponsors = sponsors.filter(s => s.tier === "Title");
  const goldSponsors = sponsors.filter(s => s.tier === "Gold");
  const silverSponsors = sponsors.filter(s => s.tier === "Silver");
  const communitySponsors = sponsors.filter(s => s.tier === "Community");

  return (
    <div className="min-h-screen bg-[#050507] pt-24">
      <Section className="section-glow-top text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span className="badge inline-flex mb-4">Partners</span>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-[var(--text-primary)] mb-4">
            Our <span className="text-gradient">Sponsors & Partners</span>
          </h1>
          <p className="text-[var(--text-body)] text-lg max-w-xl mx-auto">
            Industry leaders who believe in India&apos;s next generation of tech innovators.
          </p>
        </motion.div>
      </Section>

      <Container className="pb-24 space-y-20">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[{ val: "9+", label: "Partners" }, { val: "3", label: "Years" }, { val: "₹50L+", label: "Prize Money" }].map((s) => (
            <motion.div key={s.label} className="glass-card text-center py-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-3xl font-display font-extrabold text-gradient mb-1">{s.val}</div>
              <div className="text-sm text-[var(--text-muted)]">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Title */}
        {titleSponsors.length > 0 && (
          <div>
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6 flex items-center gap-3">
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full text-yellow-400 text-sm">Title Sponsor</span>
            </h2>
            <div className="grid gap-6">
              {titleSponsors.map((s, i) => (
                <motion.div key={s.id} className="glass-card p-8 flex items-center gap-8" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ border: "1px solid rgba(234,179,8,0.3)" }}>
                  <Image src={s.logo} alt={s.name} width={80} height={80} className="rounded-2xl flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-1">{s.name}</h3>
                    <p className="text-[var(--text-body)]">{s.description}</p>
                  </div>
                  <a href={s.website} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm flex-shrink-0">
                    Visit <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Gold */}
        <div>
          <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-400/10 to-amber-400/10 border border-yellow-400/20 rounded-full text-yellow-300 text-sm">Gold Sponsors</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {goldSponsors.map((s, i) => (
              <motion.a key={s.id} href={s.website} target="_blank" rel="noopener noreferrer" className="glass-card p-6 flex items-center gap-5 hover:no-underline group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }}>
                <Image src={s.logo} alt={s.name} width={60} height={60} className="rounded-xl flex-shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] group-hover:text-gradient">{s.name}</h3>
                  <p className="text-sm text-[var(--text-muted)]">Gold Sponsor</p>
                </div>
                <ExternalLink className="w-4 h-4 text-[var(--text-muted)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Silver */}
        <div>
          <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">
            <span className="px-3 py-1 bg-gradient-to-r from-gray-400/10 to-slate-400/10 border border-gray-400/20 rounded-full text-gray-300 text-sm">Silver Sponsors</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {silverSponsors.map((s, i) => (
              <motion.a key={s.id} href={s.website} target="_blank" rel="noopener noreferrer" className="glass-card p-5 flex items-center gap-4 group hover:no-underline" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -3 }}>
                <Image src={s.logo} alt={s.name} width={48} height={48} className="rounded-xl flex-shrink-0" />
                <span className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-purple-400 transition-colors">{s.name}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Community */}
        <div>
          <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm">Community Partners</span>
          </h2>
          <div className="flex flex-wrap gap-4">
            {communitySponsors.map((s, i) => (
              <motion.a key={s.id} href={s.website} target="_blank" rel="noopener noreferrer" className="glass-card flex items-center gap-3 px-5 py-3 rounded-full hover:no-underline group" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Image src={s.logo} alt={s.name} width={28} height={28} className="rounded-full" />
                <span className="text-sm font-medium text-[var(--text-body)] group-hover:text-[var(--text-primary)]">{s.name}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Become a sponsor CTA */}
        <motion.div className="relative rounded-3xl p-10 overflow-hidden border border-purple-500/20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10" />
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-4">Become a Sponsor</h2>
              <p className="text-[var(--text-body)] mb-6">Partner with Hacknfinity and reach India&apos;s most passionate student developers.</p>
              <Link href="/contact" className="btn-primary">Get in Touch <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-[var(--text-body)]">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />{b}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
