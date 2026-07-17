"use client";
import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, Users, Check, Trophy, ChevronRight, Share2, X, Ticket, Download } from "lucide-react";
import { events } from "@/data/mock";
import { cn, formatDate } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  college: z.string().min(2, "College is required"),
  year: z.string().min(1, "Select year"),
  phone: z.string().min(10, "Valid phone required"),
});
type FormData = z.infer<typeof schema>;

export default function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const event = events.find(e => e.slug === slug);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const ticketId = `HNF-${Math.random().toString(36).substring(2,8).toUpperCase()}`;

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  if (!event) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050507] pt-20">
      <div className="text-center"><div className="text-5xl mb-4">🔍</div><h1 className="font-display text-2xl text-[var(--text-primary)]">Event not found</h1><Link href="/events" className="btn-primary mt-4 inline-flex">Browse Events</Link></div>
    </div>
  );

  const onSubmit = (_: FormData) => { setShowSuccess(true); };
  const statusColor = event.status === "upcoming" ? "bg-green-500/20 text-green-400" : event.status === "ongoing" ? "bg-amber-500/20 text-amber-400" : "bg-gray-500/20 text-gray-400";
  const attendeePct = event.maxAttendees ? Math.min(100, Math.round((event.attendees||0) / event.maxAttendees * 100)) : null;

  return (
    <div className="min-h-screen bg-[#050507] pt-20">
      {/* Hero Banner */}
      <div className="relative h-72 sm:h-96">
        <Image src={event.banner} alt={event.title} fill className="object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/60 to-transparent"/>
        <div className="absolute bottom-6 left-6 right-6">
          <span className={cn("text-sm font-semibold px-3 py-1.5 rounded-full mb-3 inline-block", statusColor)}>{event.status.toUpperCase()}</span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white">{event.title}</h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-sm text-[var(--text-muted)]">
        <Link href="/events" className="hover:text-purple-400">Events</Link>
        <ChevronRight className="w-4 h-4"/><span className="text-[var(--text-primary)] truncate">{event.title}</span>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 grid lg:grid-cols-3 gap-10">
        {/* Left */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <p className="text-[var(--text-body)] leading-relaxed text-base">{event.description}</p>
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-4">Event Highlights</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {event.highlights.map(h=>(
                <div key={h} className="flex items-center gap-3 glass-card px-4 py-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0"><Check className="w-3.5 h-3.5 text-white"/></div>
                  <span className="text-sm text-[var(--text-body)]">{h}</span>
                </div>
              ))}
            </div>
          </div>
          {event.speakers && event.speakers.length > 0 && (
            <div>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-5">Speakers</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {event.speakers.map(s=>(
                  <div key={s.name} className="glass-card p-5 flex items-center gap-4">
                    <Image src={s.avatar} alt={s.name} width={56} height={56} className="rounded-full ring-2 ring-purple-500/30"/>
                    <div><div className="font-semibold text-[var(--text-primary)]">{s.name}</div><div className="text-sm text-purple-400">{s.role}</div><div className="text-xs text-[var(--text-muted)]">{s.company}</div></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {event.prizes && event.prizes.length > 0 && (
            <div>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-5 flex items-center gap-2"><Trophy className="w-6 h-6 text-yellow-400"/>Prizes</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {event.prizes.map((p,i)=>(
                  <div key={p.position} className="glass-card p-5 text-center" style={{border:`1px solid ${i===0?"rgba(234,179,8,0.4)":i===1?"rgba(156,163,175,0.4)":"rgba(180,120,75,0.4)"}`}}>
                    <div className="font-display font-bold text-2xl text-[var(--text-primary)] mb-1">{p.position}</div>
                    <div className="text-gradient font-bold text-xl mb-1">{p.amount}</div>
                    <div className="text-sm text-[var(--text-muted)]">{p.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {event.tags.map(t=><span key={t} className="badge">{t}</span>)}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          <div className="glass-card p-6 sticky top-24">
            <div className="space-y-3 mb-5 text-sm text-[var(--text-body)]">
              {[{icon:<Calendar className="w-4 h-4 text-purple-400"/>,label:formatDate(event.date)},{icon:<MapPin className="w-4 h-4 text-cyan-400"/>,label:event.location},{icon:<Clock className="w-4 h-4 text-purple-400"/>,label:event.duration},{icon:<Users className="w-4 h-4 text-cyan-400"/>,label:`${event.attendees||0} registered`}].map((item,i)=>(
                <div key={i} className="flex items-center gap-2.5">{item.icon}<span>{item.label}</span></div>
              ))}
            </div>
            {attendeePct !== null && (
              <div className="mb-5">
                <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1.5">
                  <span>{event.attendees} registered</span><span>{event.maxAttendees} spots</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" style={{width:`${attendeePct}%`}}/>
                </div>
                <div className="text-xs text-right text-[var(--text-muted)] mt-1">{attendeePct}% full</div>
              </div>
            )}
            {event.status !== "past" && (
              <button onClick={()=>setShowForm(true)} className="btn-primary w-full justify-center py-3 mb-3">Register Now</button>
            )}
            <button className="btn-secondary w-full justify-center text-sm"><Share2 className="w-4 h-4"/>Share Event</button>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>!showSuccess&&setShowForm(false)}>
            <motion.div className="glass-card p-8 max-w-lg w-full my-8" initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.9,opacity:0}} onClick={e=>e.stopPropagation()}>
              {!showSuccess ? (
                <>
                  <div className="flex justify-between mb-6"><h2 className="font-display font-bold text-xl text-[var(--text-primary)]">Register for {event.title}</h2><button onClick={()=>setShowForm(false)}><X className="w-5 h-5 text-[var(--text-muted)] hover:text-[var(--text-primary)]"/></button></div>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {[{name:"name" as const,label:"Full Name",placeholder:"Arjun Sharma",type:"text"},{name:"email" as const,label:"Email",placeholder:"arjun@iitd.ac.in",type:"email"},{name:"college" as const,label:"College",placeholder:"IIT Delhi",type:"text"},{name:"phone" as const,label:"Phone",placeholder:"+91 98765 43210",type:"tel"}].map(f=>(
                      <div key={f.name}>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">{f.label}</label>
                        <input {...register(f.name)} type={f.type} placeholder={f.placeholder} className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500/50"/>
                        {errors[f.name] && <p className="text-xs text-red-400 mt-1">{errors[f.name]?.message}</p>}
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Year of Study</label>
                      <select {...register("year")} className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-muted)] focus:outline-none focus:border-purple-500/50">
                        <option value="">Select year</option>
                        {["1st Year","2nd Year","3rd Year","4th Year","Masters","PhD"].map(y=><option key={y}>{y}</option>)}
                      </select>
                      {errors.year && <p className="text-xs text-red-400 mt-1">{errors.year.message}</p>}
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center py-3">Complete Registration</button>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-5"><Check className="w-8 h-8 text-green-400"/></div>
                  <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-2">Registration Confirmed!</h2>
                  <p className="text-[var(--text-body)] text-sm mb-6">See you at {event.title}! Check your email for details.</p>
                  <div className="ticket-container p-6 text-center mb-5">
                    <div className="font-display font-bold text-base text-gradient tracking-widest mb-1">HACKNFINITY</div>
                    <div className="text-xs text-[var(--text-muted)] mb-4">EVENT TICKET</div>
                    <div className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">{event.title}</div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-[var(--text-body)] mb-4">
                      <div><div className="text-[var(--text-muted)]">Date</div><div className="font-medium">{formatDate(event.date)}</div></div>
                      <div><div className="text-[var(--text-muted)]">Location</div><div className="font-medium line-clamp-1">{event.location}</div></div>
                    </div>
                    <div className="border-t border-dashed border-[var(--border-subtle)] my-4"/>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[var(--text-muted)]">{ticketId}</span>
                      <div className="w-14 h-14 border border-purple-500/30 rounded-lg flex items-center justify-center text-purple-400 font-mono text-xs font-bold">&lt;/&gt;</div>
                    </div>
                  </div>
                  <button className="btn-secondary w-full justify-center mb-3"><Download className="w-4 h-4"/>Download Ticket</button>
                  <button onClick={()=>setShowForm(false)} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">Close</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
