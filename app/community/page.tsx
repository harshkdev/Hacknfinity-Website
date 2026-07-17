"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { forumThreads, members } from "@/data/mock";
import type { ForumThread } from "@/types";
import { MessageSquare, ThumbsUp, Eye, Plus, Search, Pin, CheckCircle, X, Hash } from "lucide-react";
import { cn, formatRelativeTime } from "@/lib/utils";
import toast from "react-hot-toast";

const cats = ["All","General","Projects","Questions","Teammates","Showcase"];
const trendingTags = ["DSA","React","Hackathon","ML","Open Source","System Design","Web3","Python"];

export default function CommunityPage() {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [threads, setThreads] = useState(forumThreads);
  const [form, setForm] = useState({ title:"", category:"General", body:"", tags:"" });

  const filtered = threads.filter(t => (cat==="All"||t.category===cat) && (!search||t.title.toLowerCase().includes(search.toLowerCase())));

  const submit = () => {
    if (!form.title || !form.body) return;
    const newThread: ForumThread = {
      id: Date.now().toString(), title: form.title, body: form.body,
      author: { name: "You", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=you", badge: "Member" },
      category: form.category as ForumThread["category"],
      tags: form.tags.split(",").map(s=>s.trim()).filter(Boolean),
      upvotes: 0, replies: 0, views: 1, createdAt: new Date().toISOString(),
    };
    setThreads([newThread, ...threads]);
    setShowModal(false);
    setForm({ title:"", category:"General", body:"", tags:"" });
    toast.success("Thread posted! 🎉");
  };

  return (
    <div className="min-h-screen bg-[#050507] pt-24">
      <section className="section-glow-top py-16 px-4 text-center">
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
          <span className="badge inline-flex mb-4">Community</span>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-[var(--text-primary)] mb-4">Community <span className="text-gradient">Forum</span></h1>
          <p className="text-[var(--text-body)] text-lg max-w-xl mx-auto">Ask questions, share projects, find teammates.</p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search discussions..." className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-full pl-11 pr-5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500/50"/>
          </div>
          <button onClick={()=>setShowModal(true)} className="btn-primary text-sm px-5"><Plus className="w-4 h-4"/>New Thread</button>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {cats.map(c=><button key={c} onClick={()=>setCat(c)} className={cn("px-4 py-1.5 rounded-full text-sm font-medium border transition-all",cat===c?"bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-transparent":"border-[var(--border-brand)] text-[var(--text-body)] hover:bg-purple-500/10")}>{c}</button>)}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {filtered.map((t,i)=>(
              <motion.div key={t.id} className="glass-card p-5 cursor-pointer" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}} whileHover={{y:-2}}>
                <div className="flex flex-wrap gap-2 mb-2">
                  {t.isPinned&&<span className="flex items-center gap-1 text-xs text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full"><Pin className="w-3 h-3"/>Pinned</span>}
                  {t.isAnswered&&<span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full"><CheckCircle className="w-3 h-3"/>Answered</span>}
                  <span className="badge text-xs">{t.category}</span>
                </div>
                <h3 className="font-display font-semibold text-base text-[var(--text-primary)] mb-1 hover:text-purple-400 transition-colors">{t.title}</h3>
                <p className="text-sm text-[var(--text-body)] line-clamp-2 mb-3">{t.body}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {t.tags.slice(0,3).map(tag=><span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-[var(--text-muted)] border border-[var(--border-subtle)]">#{tag}</span>)}
                </div>
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <Image src={t.author.avatar} alt={t.author.name} width={20} height={20} className="rounded-full"/>
                    <span>{t.author.name}</span>
                    {t.author.badge&&<span className="badge text-xs">{t.author.badge}</span>}
                    <span>· {formatRelativeTime(t.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5"/>{t.upvotes}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5"/>{t.replies}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5"/>{t.views}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-base text-[var(--text-primary)] mb-4">Community Stats</h3>
              {[{l:"Members",v:"8,500+"},{l:"Threads",v:"1,240+"},{l:"Answered",v:"890+"}].map(s=>(
                <div key={s.l} className="flex justify-between py-2 border-b border-[var(--border-subtle)] last:border-0 text-sm">
                  <span className="text-[var(--text-muted)]">{s.l}</span>
                  <span className="font-semibold text-gradient">{s.v}</span>
                </div>
              ))}
            </div>
            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-base text-[var(--text-primary)] mb-4">Top Contributors</h3>
              <div className="space-y-3">
                {members.slice(0,5).map((m,i)=>(
                  <div key={m.id} className="flex items-center gap-3">
                    <span className="text-xs text-[var(--text-muted)] w-5">#{i+1}</span>
                    <Image src={m.avatar} alt={m.name} width={32} height={32} className="rounded-full"/>
                    <div><div className="text-sm font-medium text-[var(--text-primary)]">{m.name}</div><div className="text-xs text-[var(--text-muted)]">{m.role}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-base text-[var(--text-primary)] mb-4">Trending Tags</h3>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map(t=><button key={t} onClick={()=>setSearch(t)} className="text-xs px-3 py-1 rounded-full bg-white/5 text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-purple-400 hover:border-purple-500/30 transition-colors">#{t}</button>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Thread Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setShowModal(false)}>
            <motion.div className="glass-card p-8 max-w-lg w-full" initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.9,opacity:0}} onClick={e=>e.stopPropagation()}>
              <div className="flex justify-between mb-6">
                <h2 className="font-display font-bold text-xl text-[var(--text-primary)]">Start a Discussion</h2>
                <button onClick={()=>setShowModal(false)} className="p-1 rounded-full hover:bg-white/10"><X className="w-5 h-5"/></button>
              </div>
              <div className="space-y-4">
                <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Thread title..." className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500/50"/>
                <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-purple-500/50">
                  {["General","Projects","Questions","Teammates","Showcase"].map(c=><option key={c}>{c}</option>)}
                </select>
                <textarea value={form.body} onChange={e=>setForm({...form,body:e.target.value})} placeholder="What's on your mind?" rows={4} className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500/50 resize-none"/>
                <input value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})} placeholder="Tags (comma separated, e.g. React, DSA)" className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500/50"/>
                <div className="flex gap-3">
                  <button onClick={()=>setShowModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                  <button onClick={submit} className="btn-primary flex-1 justify-center">Post Thread</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
