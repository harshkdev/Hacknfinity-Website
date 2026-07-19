"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { User, Calendar, Award, Star, Bell, Settings, Edit, Download, LogOut, Lock, CheckCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { events, certificates } from "@/data/mock";
import { formatDate, formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockUser = { name:"Arjun Sharma", email:"arjun@iitd.ac.in", college:"IIT Delhi", year:"3rd Year", points:2450, avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=arjun&backgroundColor=b6e3f4", bio:"Full-stack developer and open-source enthusiast. Building the future one commit at a time.", github:"https://github.com", linkedin:"https://linkedin.com", joinedAt:"2024-03-15" };
const mockBadges = [
  { id:"1", name:"Early Adopter", icon:"⭐", color:"text-yellow-400", earnedAt:"2024-03-15", locked:false },
  { id:"2", name:"Hackathon Veteran", icon:"⚔️", color:"text-purple-400", earnedAt:"2024-11-17", locked:false },
  { id:"3", name:"Community Helper", icon:"🤝", color:"text-green-400", earnedAt:"2025-01-20", locked:false },
  { id:"4", name:"Top Contributor", icon:"🏆", color:"text-orange-400", earnedAt:"2025-06-01", locked:false },
  { id:"5", name:"Code Wizard", icon:"🧙", color:"text-blue-400", earnedAt:"", locked:true },
  { id:"6", name:"Mentor", icon:"📚", color:"text-cyan-400", earnedAt:"", locked:true },
];
const mockNotifications = [
  { id:"1", title:"Registration confirmed", message:"You are registered for Hacknfinity Hackathon 2025", type:"event", read:false, createdAt:"2025-07-15T10:00:00Z" },
  { id:"2", title:"Certificate issued", message:"Your certificate for React Masterclass is ready", type:"certificate", read:false, createdAt:"2025-07-10T09:00:00Z" },
  { id:"3", title:"New event announced", message:"Web3 DevCon India 2025 is open for registration", type:"announcement", read:true, createdAt:"2025-07-08T12:00:00Z" },
  { id:"4", title:"Thread replied", message:"Someone replied to your forum thread", type:"reply", read:true, createdAt:"2025-07-06T15:00:00Z" },
];
const tabs = [{ id:"profile", icon:<User className="w-4 h-4"/>, label:"Profile" }, { id:"events", icon:<Calendar className="w-4 h-4"/>, label:"My Events" }, { id:"certs", icon:<Award className="w-4 h-4"/>, label:"Certificates" }, { id:"badges", icon:<Star className="w-4 h-4"/>, label:"Badges & Points" }, { id:"notifs", icon:<Bell className="w-4 h-4"/>, label:"Notifications" }, { id:"settings", icon:<Settings className="w-4 h-4"/>, label:"Settings" }];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const unread = mockNotifications.filter(n=>!n.read).length;
  const myEvents = events.slice(0, 3);
  const myCerts = certificates.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#050507] pt-16 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-[var(--bg-card)] border-r border-[var(--border-subtle)] py-8 px-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="text-center mb-8">
          <Image src={mockUser.avatar} alt={mockUser.name} width={64} height={64} className="rounded-full ring-2 ring-purple-500/40 mx-auto mb-3"/>
          <div className="font-display font-bold text-sm text-[var(--text-primary)]">{mockUser.name}</div>
          <div className="text-xs text-[var(--text-muted)]">{mockUser.college}</div>
        </div>
        <nav className="flex-1 space-y-1">
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setActiveTab(t.id)} className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",activeTab===t.id?"bg-purple-500/15 text-purple-400":"text-[var(--text-body)] hover:bg-white/5 hover:text-[var(--text-primary)]")}>
              {t.icon}{t.label}{t.id==="notifs"&&unread>0&&<span className="ml-auto w-5 h-5 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center">{unread}</span>}
            </button>
          ))}
        </nav>
        <button className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-[var(--text-muted)] hover:text-red-400 transition-colors mt-4">
          <LogOut className="w-4 h-4"/>Log Out
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
        {/* Mobile tabs */}
        <div className="lg:hidden flex gap-2 flex-wrap mb-6">
          {tabs.map(t=><button key={t.id} onClick={()=>setActiveTab(t.id)} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",activeTab===t.id?"bg-gradient-to-r from-[#a855f7] to-[#22d3ee] text-white border-transparent":"border-[var(--border-brand)] text-[var(--text-body)]")}>{t.icon}{t.label}</button>)}
        </div>

        {activeTab==="profile" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <div className="h-32 rounded-2xl bg-gradient-to-r from-[#a855f7]/30 to-[#22d3ee]/20 relative mb-16">
              <div className="absolute -bottom-12 left-6">
                <Image src={mockUser.avatar} alt={mockUser.name} width={80} height={80} className="rounded-full ring-4 ring-[#050507]"/>
              </div>
              <button className="absolute top-4 right-4 btn-secondary text-xs px-3 py-1.5"><Edit className="w-3 h-3"/>Edit</button>
            </div>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="font-display font-bold text-2xl text-[var(--text-primary)]">{mockUser.name}</h1>
                <p className="text-sm text-[var(--text-muted)]">{mockUser.email} · {mockUser.college} · {mockUser.year}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">Joined {formatDate(mockUser.joinedAt)}</p>
              </div>
              <span className="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-[#a855f7]/20 to-[#22d3ee]/20 border border-purple-500/30 text-gradient">⭐ {mockUser.points.toLocaleString()} XP</span>
            </div>
            <p className="text-[var(--text-body)] mb-5">{mockUser.bio}</p>
            <div className="flex gap-3 mb-8">
              <a href={mockUser.github} className="btn-secondary text-sm px-4 py-2"><GithubIcon className="w-4 h-4"/>GitHub</a>
              <a href={mockUser.linkedin} className="btn-secondary text-sm px-4 py-2"><LinkedinIcon className="w-4 h-4"/>LinkedIn</a>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[{l:"Events",v:myEvents.length},{l:"Certificates",v:myCerts.length},{l:"Badges",v:mockBadges.filter(b=>!b.locked).length}].map(s=>(
                <div key={s.l} className="glass-card text-center py-5">
                  <div className="text-2xl font-display font-bold text-gradient">{s.v}</div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab==="events" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">My Registered Events</h2>
            <div className="space-y-4">
              {myEvents.map(e=>(
                <div key={e.id} className="glass-card p-5 flex items-center gap-4">
                  <Image src={e.banner} alt={e.title} width={80} height={48} className="rounded-xl object-cover flex-shrink-0"/>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-[var(--text-primary)] truncate">{e.title}</div>
                    <div className="text-xs text-[var(--text-muted)]">{formatDate(e.date)} · {e.location}</div>
                  </div>
                  <span className={cn("badge flex-shrink-0",e.status==="upcoming"?"text-green-400":e.status==="ongoing"?"text-amber-400":"text-gray-400")}>{e.status}</span>
                  <button className="btn-secondary text-xs px-3 py-1.5 flex-shrink-0"><Download className="w-3 h-3"/>Ticket</button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab==="certs" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">My Certificates</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {myCerts.map(c=>(
                <div key={c.id} className="ticket-container p-5">
                  <div className="flex items-center justify-between mb-3"><span className="badge">{c.type}</span><CheckCircle className="w-5 h-5 text-green-400"/></div>
                  <div className="font-display font-bold text-sm text-[var(--text-primary)] mb-1 line-clamp-2">{c.event}</div>
                  <div className="text-xs text-[var(--text-muted)] mb-4">{formatDate(c.issuedDate)}</div>
                  <button className="btn-secondary text-xs w-full justify-center py-2"><Download className="w-3 h-3"/>Download PDF</button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab==="badges" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-2">Badges & Points</h2>
            <div className="glass-card p-5 mb-6">
              <div className="flex justify-between text-sm mb-2"><span className="text-[var(--text-body)]">Level 5 — Rising Star</span><span className="text-[var(--text-muted)]">2,450 / 3,000 XP</span></div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-[#a855f7] to-[#22d3ee]" style={{width:"82%"}}/></div>
              <div className="text-xs text-[var(--text-muted)] mt-1">550 XP to next level</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mockBadges.map(b=>(
                <div key={b.id} className={cn("glass-card p-5 text-center relative",b.locked&&"opacity-50")}>
                  {b.locked&&<div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/30"><Lock className="w-6 h-6 text-[var(--text-muted)]"/></div>}
                  <div className="text-4xl mb-2">{b.icon}</div>
                  <div className={cn("font-semibold text-sm",b.color)}>{b.name}</div>
                  {!b.locked&&<div className="text-xs text-[var(--text-muted)] mt-1">{formatDate(b.earnedAt)}</div>}
                  {b.locked&&<div className="text-xs text-[var(--text-muted)] mt-1">Locked</div>}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab==="notifs" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <div className="flex justify-between mb-6"><h2 className="font-display font-bold text-2xl text-[var(--text-primary)]">Notifications</h2><button className="text-sm text-purple-400 hover:text-purple-300">Mark all as read</button></div>
            <div className="space-y-3">
              {mockNotifications.map(n=>(
                <div key={n.id} className={cn("glass-card p-4 flex items-start gap-4",!n.read&&"border-l-2 border-purple-500")}>
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",n.type==="event"?"bg-green-500/20":n.type==="certificate"?"bg-purple-500/20":n.type==="announcement"?"bg-blue-500/20":"bg-orange-500/20")}>
                    {n.type==="event"?<Calendar className="w-5 h-5 text-green-400"/>:n.type==="certificate"?<Award className="w-5 h-5 text-purple-400"/>:n.type==="announcement"?<Bell className="w-5 h-5 text-blue-400"/>:<User className="w-5 h-5 text-orange-400"/>}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-[var(--text-primary)]">{n.title}</div>
                    <div className="text-xs text-[var(--text-body)] mt-0.5">{n.message}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">{formatRelativeTime(n.createdAt)}</div>
                  </div>
                  {!n.read&&<div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0 mt-1"/>}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab==="settings" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">Settings</h2>
            <div className="glass-card p-6 mb-5">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">Account Settings</h3>
              <p className="text-sm text-[var(--text-muted)]">Full settings management will be available in Phase 2 with Clerk authentication integration.</p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
