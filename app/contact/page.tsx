"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Mail, MapPin, MessageSquare, Clock, Send, ChevronDown } from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon, YoutubeIcon, InstagramIcon, WhatsappIcon, DiscordIcon } from "@/components/icons/SocialIcons";
import toast from "react-hot-toast";
import { SOCIAL_LINKS } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const faqs = [
  { q: "How can I join Hacknfinity?", a: "Sign up for free on our website. No fees, no gatekeeping. Just create an account and you're part of India's largest student tech community." },
  { q: "Are events free to attend?", a: "Most events — workshops, webinars, and hackathons — are completely free. Some premium bootcamps may have a small fee to maintain quality." },
  { q: "Can I start a campus chapter?", a: "Absolutely! Apply through our Campus Ambassador program. We'll guide you through the process of establishing a Hacknfinity chapter at your college." },
  { q: "How do I get a certificate?", a: "Certificates are automatically issued after completing eligible events. You can download and verify them from your dashboard or the Certificates page." },
  { q: "Do you offer internship referrals?", a: "Yes! Through our hiring partner network, we actively refer strong candidates to our sponsor companies. Keep your profile updated for the best chances." },
  { q: "How can my company partner or sponsor?", a: "We'd love to work with you! Reach out at sponsors@hacknfinity.in or fill the contact form with 'Sponsorship' as the subject." },
];

const socials = [
  { icon: InstagramIcon, label: "Instagram", handle: "@hacknfinity", href: SOCIAL_LINKS.instagram, color: "text-pink-500", bg: "from-pink-500/10 to-pink-600/5" },
  { icon: LinkedinIcon, label: "LinkedIn", handle: "Hacknfinity", href: SOCIAL_LINKS.linkedin, color: "text-blue-400", bg: "from-blue-500/10 to-blue-600/5" },
  { icon: WhatsappIcon, label: "WhatsApp", handle: "Message Us", href: SOCIAL_LINKS.whatsapp, color: "text-green-500", bg: "from-green-500/10 to-green-600/5" },
  { icon: TwitterIcon, label: "Twitter / X", handle: "@hacknfinity", href: SOCIAL_LINKS.twitter, color: "text-white", bg: "from-gray-400/10 to-gray-500/5" },
  { icon: DiscordIcon, label: "Discord", handle: "Join Server", href: SOCIAL_LINKS.discord, color: "text-indigo-400", bg: "from-indigo-500/10 to-indigo-600/5" },
  { icon: GithubIcon, label: "GitHub", handle: "@hacknfinity", href: SOCIAL_LINKS.github, color: "text-white", bg: "from-gray-500/10 to-gray-600/5" },
  { icon: YoutubeIcon, label: "YouTube", handle: "@hacknfinity", href: SOCIAL_LINKS.youtube, color: "text-red-400", bg: "from-red-500/10 to-red-600/5" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number|null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Please fill all fields."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you within 24 hours. 🎉");
    setForm({ name:"", email:"", subject:"", message:"" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050507] pt-24">
      <Section className="section-glow-top text-center">
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
          <span className="badge inline-flex mb-4">Contact</span>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-[var(--text-primary)] mb-4">Get in <span className="text-gradient">Touch</span></h1>
          <p className="text-[var(--text-body)] text-lg max-w-xl mx-auto">Have a question or want to collaborate? We'd love to hear from you.</p>
        </motion.div>
      </Section>

      <Container className="pb-24">
        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <motion.form onSubmit={submit} className="glass-card p-8" initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}}>
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">Send us a message</h2>
            <div className="space-y-4">
              {[{key:"name",label:"Full Name",placeholder:"Arjun Sharma",type:"text"},{key:"email",label:"Email",placeholder:"arjun@example.com",type:"email"},{key:"subject",label:"Subject",placeholder:"I'd like to...",type:"text"}].map(f=>(
                <div key={f.key}>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">{f.label}</label>
                  <input type={f.type} value={(form as any)[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} placeholder={f.placeholder}
                    className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500/50 transition-colors"/>
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Message</label>
                <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us more..." rows={5}
                  className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500/50 transition-colors resize-none"/>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
                {loading ? "Sending..." : <><Send className="w-4 h-4"/>Send Message</>}
              </button>
            </div>
          </motion.form>

          <motion.div className="space-y-4" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{delay:0.1}}>
            {[
              {icon:<Mail className="w-6 h-6 text-purple-400"/>,title:"Email Us",value:"hacknfinity@gmail.com",link:"mailto:hacknfinity@gmail.com"},
              {icon:<MapPin className="w-6 h-6 text-cyan-400"/>,title:"Find Us",value:"New Delhi, India"},
              {icon:<MessageSquare className="w-6 h-6 text-indigo-400"/>,title:"Join Our Discord",value:"discord.com/invite/Bne9UJV5x",link:SOCIAL_LINKS.discord},
              {icon:<Clock className="w-6 h-6 text-green-400"/>,title:"Response Time",value:"Within 24 hours"},
            ].map((info)=>(
              <div key={info.title} className="glass-card p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-transparent flex items-center justify-center flex-shrink-0">{info.icon}</div>
                <div>
                  <div className="font-semibold text-sm text-[var(--text-primary)]">{info.title}</div>
                  {info.link ? <a href={info.link} className="text-sm text-purple-400 hover:text-purple-300 transition-colors">{info.value}</a>
                    : <div className="text-sm text-[var(--text-body)]">{info.value}</div>}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Socials */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] text-center mb-8">Connect With Us</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {socials.map((s,i)=>(
              <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className={`glass-card p-5 flex flex-col items-center gap-3 min-w-[120px] hover:no-underline group bg-gradient-to-br ${s.bg}`}
                initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.07}} whileHover={{y:-4}}>
                <s.icon className={`w-7 h-7 ${s.color}`}/>
                <div className="text-center">
                  <div className="font-semibold text-sm text-[var(--text-primary)]">{s.label}</div>
                  <div className="text-xs text-[var(--text-muted)]">{s.handle}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-display font-bold text-3xl text-[var(--text-primary)] text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-2xl mx-auto">
            {faqs.map((faq,i)=>(
              <div key={i} className="glass-card overflow-hidden">
                <button className="w-full flex items-center justify-between p-5 text-left" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                  <span className="font-semibold text-sm text-[var(--text-primary)]">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-purple-400 transition-transform flex-shrink-0 ml-4 ${openFaq===i?"rotate-180":""}`}/>
                </button>
                <AnimatePresence>
                  {openFaq===i && (
                    <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm text-[var(--text-body)] leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
