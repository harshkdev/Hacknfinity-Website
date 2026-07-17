"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { resources } from "@/data/mock";
import type { Resource } from "@/types";
import { FileText, Download, Search, Github, Play, Map, Table2, ArrowRight, BookOpen } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

const typeIcons: Record<string, React.ReactNode> = {
  Notes: <FileText className="w-6 h-6" />, PPT: <BookOpen className="w-6 h-6" />,
  Roadmap: <Map className="w-6 h-6" />, Recording: <Play className="w-6 h-6" />,
  Sheet: <Table2 className="w-6 h-6" />, Repo: <Github className="w-6 h-6" />,
};
const typeColors: Record<string, string> = {
  Notes: "from-blue-500/20 to-indigo-500/20 border-blue-500/20 text-blue-400",
  PPT: "from-orange-500/20 to-red-500/20 border-orange-500/20 text-orange-400",
  Roadmap: "from-green-500/20 to-emerald-500/20 border-green-500/20 text-green-400",
  Recording: "from-red-500/20 to-pink-500/20 border-red-500/20 text-red-400",
  Sheet: "from-yellow-500/20 to-amber-500/20 border-yellow-500/20 text-yellow-400",
  Repo: "from-gray-500/20 to-slate-500/20 border-gray-500/20 text-gray-400",
};
const tabs = ["All", "Notes", "PPT", "Roadmap", "Recording", "Sheet", "Repo"];

export default function ResourcesPage() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => resources.filter(r => (tab === "All" || r.type === tab) && (!search || r.title.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase()))), [tab, search]);

  return (
    <div className="min-h-screen bg-[#050507] pt-24">
      <section className="section-glow-top py-16 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span className="badge inline-flex mb-4">Free Resources</span>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-[var(--text-primary)] mb-4">Resource <span className="text-gradient">Hub</span></h1>
          <p className="text-[var(--text-body)] text-lg max-w-xl mx-auto mb-8">Free learning materials from the Hacknfinity community.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[{v:"50+",l:"Resources"},{v:"25K+",l:"Downloads"},{v:"20+",l:"Contributors"}].map(s=>(
              <span key={s.l} className="glass-card px-5 py-2.5 rounded-full text-sm font-semibold text-[var(--text-primary)]"><span className="text-gradient">{s.v}</span> {s.l}</span>
            ))}
          </div>
        </motion.div>
      </section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map(t=>(
            <button key={t} onClick={()=>setTab(t)} className={cn("px-4 py-1.5 rounded-full text-sm font-semibold border transition-all", tab===t?"bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-transparent":"border-[var(--border-brand)] text-[var(--text-body)] hover:bg-purple-500/10")}>{t}</button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search resources..." className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-full pl-11 pr-6 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500/50 transition-colors" />
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {filtered.map((r,i)=>(
            <motion.div key={r.id} className="glass-card p-6 flex gap-5" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.05}} whileHover={{y:-4}}>
              <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 border", typeColors[r.type])}>{typeIcons[r.type]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-display font-bold text-base text-[var(--text-primary)] line-clamp-2">{r.title}</h3>
                  <span className="badge flex-shrink-0 text-xs">{r.type}</span>
                </div>
                <p className="text-sm text-[var(--text-body)] line-clamp-2 mb-3">{r.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {r.tags.slice(0,3).map(t=><span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-[var(--text-muted)] border border-[var(--border-subtle)]">{t}</span>)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1"><Download className="w-3 h-3"/>{r.downloads.toLocaleString()}</span>
                  {r.type === "Repo" ? (
                    <a href={r.repoUrl||"#"} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs px-4 py-1.5 flex items-center gap-1"><Github className="w-3 h-3"/>View Repo</a>
                  ) : (
                    <a href={r.downloadUrl||"#"} className="btn-primary text-xs px-4 py-1.5 flex items-center gap-1"><Download className="w-3 h-3"/>Download</a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div className="relative rounded-3xl p-8 text-center border border-purple-500/20 overflow-hidden" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/5"/>
          <div className="relative z-10">
            <h3 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-2">Share Your Knowledge</h3>
            <p className="text-[var(--text-body)] mb-5">Help 8,500+ students learn. Contribute a resource to the hub.</p>
            <button className="btn-primary">Contribute a Resource <ArrowRight className="w-4 h-4"/></button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
