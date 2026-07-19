"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certificates } from "@/data/mock";
import type { Certificate } from "@/types";
import { Search, CheckCircle, XCircle, Download, Shield, Award } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

export default function CertificatesPage() {
  const [searchId, setSearchId] = useState("");
  const [state, setState] = useState<"idle"|"found"|"notfound">("idle");
  const [found, setFound] = useState<Certificate|null>(null);

  const verify = () => {
    const cert = certificates.find(c => c.id.toLowerCase() === searchId.trim().toLowerCase());
    if (cert) { setFound(cert); setState("found"); }
    else { setFound(null); setState("notfound"); }
  };

  return (
    <div className="min-h-screen bg-[#050507] pt-24">
      <section className="section-glow-top py-20 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#a855f7]/20 to-[#22d3ee]/20 border border-purple-500/20 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-[var(--text-primary)] mb-4">Certificate <span className="text-gradient">Verification</span></h1>
          <p className="text-[var(--text-body)] text-lg max-w-xl mx-auto">Verify the authenticity of any Hacknfinity certificate instantly.</p>
        </motion.div>
      </section>

      {/* Search */}
      <div className="max-w-lg mx-auto px-4 mb-16">
        <div className="glass-card p-8">
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Certificate ID</label>
          <input value={searchId} onChange={e=>setSearchId(e.target.value)} onKeyDown={e=>e.key==="Enter"&&verify()}
            placeholder="e.g. HNF-2024-HACK-001" className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500/50 mb-4" />
          <button onClick={verify} className="btn-primary w-full justify-center py-3">
            <Search className="w-4 h-4" /> Verify Certificate
          </button>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs text-[var(--text-muted)]">Try:</span>
            {certificates.slice(0,2).map(c=>(
              <button key={c.id} onClick={()=>{setSearchId(c.id);}} className="text-xs text-purple-400 hover:text-purple-300 underline underline-offset-2">{c.id}</button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {state === "found" && found && (
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="mt-6 space-y-5">
              <div className="flex items-center justify-center gap-3 text-green-400">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Certificate Verified ✓</span>
              </div>
              <div className="ticket-container p-8 text-center">
                <div className="font-display font-bold text-xl text-gradient mb-1 tracking-widest">HACKNFINITY</div>
                <div className="text-xs text-[var(--text-muted)] mb-6">India's Largest Student Tech Community</div>
                <div className="text-sm text-[var(--text-muted)] mb-2">Certificate of {found.type}</div>
                <div className="font-display font-extrabold text-3xl text-[var(--text-primary)] mb-1">{found.recipientName}</div>
                <div className="text-sm text-[var(--text-body)] mb-4">for successfully participating in</div>
                <div className="font-display font-bold text-xl text-gradient mb-6">{found.event}</div>
                <div className="border-t border-dashed border-[var(--border-subtle)] my-5" />
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>Issued: {formatDate(found.issuedDate)}</span>
                  <div className="w-16 h-16 border border-purple-500/30 rounded-lg flex items-center justify-center font-mono text-xs text-purple-400">QR</div>
                  <span className="font-mono">{found.id}</span>
                </div>
              </div>
              <button className="btn-secondary w-full justify-center"><Download className="w-4 h-4"/> Download PDF</button>
            </motion.div>
          )}
          {state === "notfound" && (
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="mt-6 glass-card p-6 text-center">
              <XCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
              <p className="font-semibold text-[var(--text-primary)]">Certificate not found</p>
              <p className="text-sm text-[var(--text-muted)] mt-1">Please check the ID and try again.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sample certs */}
      <div className="max-w-4xl mx-auto px-4 pb-24">
        <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] text-center mb-6">Recent Certificates</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certificates.map((c,i)=>(
            <motion.div key={c.id} className="glass-card p-5 text-center" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}>
              <Award className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="badge mx-auto mb-2 text-xs">{c.type}</div>
              <div className="font-semibold text-sm text-[var(--text-primary)] mb-1 line-clamp-2">{c.event}</div>
              <div className="text-xs text-[var(--text-muted)]">{formatDate(c.issuedDate)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
