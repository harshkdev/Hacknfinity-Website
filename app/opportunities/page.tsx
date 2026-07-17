"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { opportunities } from "@/data/mock";
import type { Opportunity } from "@/types";
import { Briefcase, MapPin, Calendar, DollarSign, Clock, ArrowRight, Flame, Users, CheckCircle } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

const typeTabs = ["All","Internship","Full-time","Part-time"];
const domains = ["All","Web Dev","AI/ML","Design","DevOps","Backend"];
const modes = ["All","Remote","On-site","Hybrid"];
const ambassadorBenefits = ["Official Hacknfinity badge & swag kit","Early access to all events","Letter of Recommendation","Networking with 8500+ community","Resume & LinkedIn credibility"];

export default function OpportunitiesPage() {
  const [type, setType] = useState("All");
  const [domain, setDomain] = useState("All");
  const [mode, setMode] = useState("All");

  const filtered = useMemo(() => opportunities.filter(o => {
    const matchType = type === "All" || o.type === type;
    const matchDomain = domain === "All" || o.domain.includes(domain.replace("Web Dev","Web Development").replace("AI/ML","AI").replace("Backend","Backend"));
    const matchMode = mode === "All" || o.mode === mode;
    return matchType && matchDomain && matchMode;
  }), [type, domain, mode]);

  const getDaysLeft = (deadline: string) => Math.max(0, Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000));

  return (
    <div className="min-h-screen bg-[#050507] pt-24">
      <section className="section-glow-top py-16 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span className="badge inline-flex mb-4">Opportunities</span>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-[var(--text-primary)] mb-4">Launch Your <span className="text-gradient">Career</span></h1>
          <p className="text-[var(--text-body)] text-lg max-w-xl mx-auto mb-8">Internships, jobs, and opportunities curated for student developers.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[{v:`${opportunities.length}+`,l:"Opportunities"},{v:"50+",l:"Hiring Partners"},{v:"200+",l:"Placed Students"}].map(s=>(
              <span key={s.l} className="glass-card px-5 py-2 rounded-full text-sm font-semibold text-[var(--text-primary)]"><span className="text-gradient">{s.v}</span> {s.l}</span>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-8 space-y-3">
        <div className="flex flex-wrap gap-2">
          {typeTabs.map(t=><button key={t} onClick={()=>setType(t)} className={cn("px-4 py-1.5 rounded-full text-sm font-semibold border transition-all",type===t?"bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-transparent":"border-[var(--border-brand)] text-[var(--text-body)] hover:bg-purple-500/10")}>{t}</button>)}
        </div>
        <div className="flex flex-wrap gap-2">
          {domains.map(d=><button key={d} onClick={()=>setDomain(d)} className={cn("px-3 py-1 rounded-full text-xs font-medium border transition-all",domain===d?"border-purple-500 text-purple-400 bg-purple-500/10":"border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-purple-500/50")}>{d}</button>)}
          {modes.map(m=><button key={m} onClick={()=>setMode(m)} className={cn("px-3 py-1 rounded-full text-xs font-medium border transition-all",mode===m?"border-cyan-500 text-cyan-400 bg-cyan-500/10":"border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-cyan-500/50")}>{m}</button>)}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {filtered.map((o,i)=>{
            const days = getDaysLeft(o.deadline);
            return (
              <motion.div key={o.id} className="glass-card p-6" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.05}} whileHover={{y:-4}}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Image src={o.logo} alt={o.company} width={48} height={48} className="rounded-xl flex-shrink-0" />
                    <div><div className="font-medium text-sm text-[var(--text-body)]">{o.company}</div>{o.isHot&&<span className="text-xs text-orange-400 font-bold flex items-center gap-1"><Flame className="w-3 h-3"/>HOT</span>}</div>
                  </div>
                  <span className="badge text-xs">{o.type}</span>
                </div>
                <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">{o.title}</h3>
                <div className="grid grid-cols-2 gap-1.5 mb-4 text-sm text-[var(--text-body)]">
                  {o.stipend&&<div className="flex items-center gap-1.5 text-green-400"><DollarSign className="w-3.5 h-3.5"/>{o.stipend}</div>}
                  {o.duration&&<div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-purple-400"/>{o.duration}</div>}
                  <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-cyan-400"/>{o.location}</div>
                  <span className="badge text-xs self-center">{o.mode}</span>
                </div>
                <div className={cn("flex items-center gap-1.5 text-xs mb-4", days < 7 ? "text-red-400" : "text-[var(--text-muted)]")}>
                  <Calendar className="w-3 h-3"/><span>Deadline: {formatDate(o.deadline)}</span>
                  {days > 0 && <span className={cn("ml-auto px-2 py-0.5 rounded-full text-xs font-semibold", days<7?"bg-red-500/20 text-red-400":"bg-green-500/20 text-green-400")}>{days}d left</span>}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {o.requirements.slice(0,3).map(r=><span key={r} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-[var(--text-muted)] border border-[var(--border-subtle)]">{r}</span>)}
                </div>
                <a href={o.applyLink} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center text-sm py-2.5">Apply Now <ArrowRight className="w-4 h-4"/></a>
              </motion.div>
            );
          })}
        </div>

        {/* Ambassador CTA */}
        <motion.div className="relative rounded-3xl p-8 overflow-hidden" initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          style={{background:"linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(34,211,238,0.1) 100%)", border:"1px solid rgba(168,85,247,0.3)"}}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="badge mb-4">Campus Program</span>
              <h2 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-4">Become a Campus <span className="text-gradient">Ambassador</span></h2>
              <p className="text-[var(--text-body)] mb-6">Represent Hacknfinity at your college. Lead the tech revolution on campus.</p>
              <button className="btn-primary">Apply Now <ArrowRight className="w-4 h-4"/></button>
            </div>
            <ul className="space-y-3">
              {ambassadorBenefits.map(b=>(
                <li key={b} className="flex items-center gap-3 text-sm text-[var(--text-body)]">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0"/>{b}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
