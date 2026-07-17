"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BarChart2, Users, Calendar, FileText, Star, Settings, TrendingUp, Eye, Edit, Trash2, Plus, Shield, ChevronRight } from "lucide-react";
import { events } from "@/data/mock";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockUsers = [
  { name:"Arjun Sharma", college:"IIT Delhi", joined:"2024-03-15", events:5, status:"Active", avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=arjun" },
  { name:"Priya Mehta", college:"BITS Pilani", joined:"2024-04-20", events:8, status:"Active", avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=priya" },
  { name:"Rishi Kapoor", college:"NIT Trichy", joined:"2024-05-10", events:3, status:"Active", avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=rishi" },
  { name:"Sneha Patel", college:"DTU Delhi", joined:"2024-06-01", events:6, status:"Inactive", avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=sneha" },
  { name:"Kavya Reddy", college:"NID Ahmedabad", joined:"2024-07-15", events:2, status:"Active", avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=kavya" },
];
const monthlyData = [320,480,620,750,890,1100,1350,1580,1820,2200,2700,3200];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const tabs = [{ id:"overview", icon:<BarChart2 className="w-4 h-4"/>, label:"Overview" }, { id:"events", icon:<Calendar className="w-4 h-4"/>, label:"Events" }, { id:"users", icon:<Users className="w-4 h-4"/>, label:"Users" }, { id:"analytics", icon:<TrendingUp className="w-4 h-4"/>, label:"Analytics" }, { id:"settings", icon:<Settings className="w-4 h-4"/>, label:"Settings" }];

export default function AdminPage() {
  const [tab, setTab] = useState("overview");
  const maxBar = Math.max(...monthlyData);

  return (
    <div className="min-h-screen bg-[#050507] pt-16 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-[var(--bg-card)] border-r border-[var(--border-subtle)] py-8 px-4 sticky top-16 h-[calc(100vh-4rem)]">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/30 to-cyan-500/20 flex items-center justify-center border border-purple-500/30"><Shield className="w-5 h-5 text-purple-400"/></div>
          <div><div className="font-display font-bold text-sm text-[var(--text-primary)]">Admin Panel</div><div className="text-xs text-[var(--text-muted)]">Hacknfinity</div></div>
        </div>
        <nav className="flex-1 space-y-1">
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",tab===t.id?"bg-purple-500/15 text-purple-400":"text-[var(--text-body)] hover:bg-white/5 hover:text-[var(--text-primary)]")}>
              {t.icon}{t.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
        {/* Admin banner */}
        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-8 text-sm">
          <Shield className="w-4 h-4 text-amber-400 flex-shrink-0"/>
          <span className="text-amber-300 font-medium">Admin Access Only</span>
          <span className="text-amber-400/70">— This panel is for authorized administrators only.</span>
        </div>

        {/* Mobile tabs */}
        <div className="lg:hidden flex flex-wrap gap-2 mb-6">
          {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",tab===t.id?"bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-transparent":"border-[var(--border-brand)] text-[var(--text-body)]")}>{t.icon}{t.label}</button>)}
        </div>

        {tab==="overview" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">Overview</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {[{l:"Total Users",v:"8,500+",icon:<Users className="w-6 h-6 text-blue-400"/>,bg:"from-blue-500/20 to-indigo-500/20",border:"border-blue-500/20"},{l:"Events Hosted",v:"52",icon:<Calendar className="w-6 h-6 text-purple-400"/>,bg:"from-purple-500/20 to-pink-500/20",border:"border-purple-500/20"},{l:"Prize Distributed",v:"₹10L+",icon:<TrendingUp className="w-6 h-6 text-green-400"/>,bg:"from-green-500/20 to-emerald-500/20",border:"border-green-500/20"},{l:"Active This Month",v:"1,240",icon:<Eye className="w-6 h-6 text-cyan-400"/>,bg:"from-cyan-500/20 to-blue-500/20",border:"border-cyan-500/20"}].map(s=>(
                <div key={s.l} className="glass-card p-5">
                  <div className={cn("w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4 border",s.bg,s.border)}>{s.icon}</div>
                  <div className="font-display font-bold text-2xl text-gradient mb-1">{s.v}</div>
                  <div className="text-sm text-[var(--text-muted)]">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <div className="glass-card p-5">
                <h3 className="font-display font-semibold text-[var(--text-primary)] mb-4">Recent Registrations</h3>
                <table className="w-full text-sm">
                  <thead><tr className="text-[var(--text-muted)] text-xs border-b border-[var(--border-subtle)]"><th className="pb-2 text-left">Name</th><th className="pb-2 text-left hidden sm:table-cell">College</th><th className="pb-2 text-left">Event</th><th className="pb-2 text-right">Status</th></tr></thead>
                  <tbody className="divide-y divide-[var(--border-subtle)]">
                    {mockUsers.slice(0,5).map(u=>(
                      <tr key={u.name} className="text-xs">
                        <td className="py-2.5 text-[var(--text-primary)] font-medium">{u.name.split(" ")[0]}</td>
                        <td className="py-2.5 text-[var(--text-muted)] hidden sm:table-cell truncate max-w-[120px]">{u.college}</td>
                        <td className="py-2.5 text-[var(--text-muted)]">Hackathon</td>
                        <td className="py-2.5 text-right"><span className={cn("px-2 py-0.5 rounded-full text-xs",u.status==="Active"?"bg-green-500/20 text-green-400":"bg-gray-500/20 text-gray-400")}>{u.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="glass-card p-5">
                <h3 className="font-display font-semibold text-[var(--text-primary)] mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  {events.filter(e=>e.status==="upcoming").slice(0,3).map(e=>(
                    <div key={e.id} className="flex items-center gap-3">
                      <Image src={e.banner} alt={e.title} width={44} height={28} className="rounded-lg object-cover flex-shrink-0"/>
                      <div className="flex-1 min-w-0"><div className="text-sm text-[var(--text-primary)] truncate font-medium">{e.title}</div><div className="text-xs text-[var(--text-muted)]">{formatDate(e.date)}</div></div>
                      <button className="p-1.5 rounded-lg hover:bg-white/5 text-[var(--text-muted)] hover:text-purple-400"><Edit className="w-3.5 h-3.5"/></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {["Add Event","Add Blog Post","Upload Gallery","Send Announcement"].map(a=>(
                <button key={a} className="glass-card p-4 text-sm font-medium text-[var(--text-body)] hover:text-purple-400 flex items-center gap-2 transition-colors"><Plus className="w-4 h-4"/>{a}</button>
              ))}
            </div>
          </motion.div>
        )}

        {tab==="events" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <div className="flex justify-between mb-6"><h2 className="font-display font-bold text-2xl text-[var(--text-primary)]">Manage Events</h2><button className="btn-primary text-sm"><Plus className="w-4 h-4"/>Add Event</button></div>
            <div className="glass-card overflow-hidden">
              <table className="w-full text-sm">
                <thead className="border-b border-[var(--border-subtle)]"><tr className="text-[var(--text-muted)] text-xs">
                  <th className="px-5 py-3 text-left">Event</th><th className="px-5 py-3 text-left hidden md:table-cell">Date</th><th className="px-5 py-3 text-left">Status</th><th className="px-5 py-3 text-left hidden sm:table-cell">Attendees</th><th className="px-5 py-3 text-right">Actions</th>
                </tr></thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {events.map(e=>(
                    <tr key={e.id} className="hover:bg-white/2 transition-colors">
                      <td className="px-5 py-3 font-medium text-[var(--text-primary)] max-w-[180px] truncate">{e.title}</td>
                      <td className="px-5 py-3 text-[var(--text-muted)] hidden md:table-cell">{formatDate(e.date)}</td>
                      <td className="px-5 py-3"><span className={cn("px-2 py-0.5 rounded-full text-xs font-medium",e.status==="upcoming"?"bg-green-500/20 text-green-400":e.status==="ongoing"?"bg-amber-500/20 text-amber-400":"bg-gray-500/20 text-gray-400")}>{e.status}</span></td>
                      <td className="px-5 py-3 text-[var(--text-muted)] hidden sm:table-cell">{e.attendees||0}</td>
                      <td className="px-5 py-3 text-right">
                        <button className="p-1.5 rounded-lg hover:bg-white/5 text-[var(--text-muted)] hover:text-purple-400 mr-2"><Edit className="w-3.5 h-3.5"/></button>
                        <button className="p-1.5 rounded-lg hover:bg-white/5 text-[var(--text-muted)] hover:text-red-400"><Trash2 className="w-3.5 h-3.5"/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {tab==="users" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">Manage Users</h2>
            <div className="glass-card overflow-hidden">
              <table className="w-full text-sm">
                <thead className="border-b border-[var(--border-subtle)]"><tr className="text-[var(--text-muted)] text-xs">
                  <th className="px-5 py-3 text-left">User</th><th className="px-5 py-3 text-left hidden md:table-cell">College</th><th className="px-5 py-3 text-left hidden sm:table-cell">Joined</th><th className="px-5 py-3 text-left">Events</th><th className="px-5 py-3 text-left">Status</th>
                </tr></thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {mockUsers.map(u=>(
                    <tr key={u.name} className="hover:bg-white/2">
                      <td className="px-5 py-3"><div className="flex items-center gap-3"><Image src={u.avatar} alt={u.name} width={32} height={32} className="rounded-full"/><span className="font-medium text-[var(--text-primary)]">{u.name}</span></div></td>
                      <td className="px-5 py-3 text-[var(--text-muted)] hidden md:table-cell">{u.college}</td>
                      <td className="px-5 py-3 text-[var(--text-muted)] hidden sm:table-cell">{formatDate(u.joined)}</td>
                      <td className="px-5 py-3 text-[var(--text-body)]">{u.events}</td>
                      <td className="px-5 py-3"><span className={cn("px-2 py-0.5 rounded-full text-xs",u.status==="Active"?"bg-green-500/20 text-green-400":"bg-gray-500/20 text-gray-400")}>{u.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {tab==="analytics" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">Platform Analytics</h2>
            <div className="glass-card p-6 mb-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-5">Monthly Member Growth</h3>
              <div className="flex items-end gap-2 h-48">
                {monthlyData.map((v,i)=>(
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-lg" style={{height:`${(v/maxBar)*100}%`,background:"linear-gradient(to top, #A855F7, #22D3EE)"}}/>
                    <span className="text-xs text-[var(--text-muted)]">{months[i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[{l:"Avg. session",v:"4m 32s"},{l:"Bounce rate",v:"28%"},{l:"Top page",v:"/events"}].map(m=>(
                <div key={m.l} className="glass-card p-5 text-center"><div className="text-2xl font-display font-bold text-gradient mb-1">{m.v}</div><div className="text-xs text-[var(--text-muted)]">{m.l}</div></div>
              ))}
            </div>
          </motion.div>
        )}

        {tab==="settings" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">Admin Settings</h2>
            <div className="glass-card p-6"><p className="text-sm text-[var(--text-muted)]">Full admin settings will be available in Phase 2 with live authentication and database integration.</p></div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
