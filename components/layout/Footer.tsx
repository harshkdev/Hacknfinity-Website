"use client";
import Link from "next/link";
import Image from "next/image";
import { MessageSquare, Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon, YoutubeIcon, DiscordIcon } from "@/components/icons/SocialIcons";
import { SOCIAL_LINKS } from "@/lib/utils";

const footerLinks = {
  Community: [
    { label: "About Us", href: "/about" },
    { label: "Core Members", href: "/members" },
    { label: "Community Forum", href: "/community" },
    { label: "Campus Ambassadors", href: "/opportunities#ambassador" },
  ],
  Events: [
    { label: "Upcoming Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Hackathons", href: "/events?category=Hackathon" },
    { label: "Workshops", href: "/events?category=Workshop" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Resource Hub", href: "/resources" },
    { label: "Certificates", href: "/certificates" },
    { label: "Opportunities", href: "/opportunities" },
  ],
  Company: [
    { label: "Sponsors", href: "/sponsors" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: MessageSquare, href: SOCIAL_LINKS.discord, label: "Discord", color: "hover:text-indigo-400" },
  { icon: GithubIcon, href: SOCIAL_LINKS.github, label: "GitHub", color: "hover:text-white" },
  { icon: TwitterIcon, href: SOCIAL_LINKS.twitter, label: "Twitter / X", color: "hover:text-sky-400" },
  { icon: LinkedinIcon, href: SOCIAL_LINKS.linkedin, label: "LinkedIn", color: "hover:text-blue-400" },
  { icon: YoutubeIcon, href: SOCIAL_LINKS.youtube, label: "YouTube", color: "hover:text-red-400" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--border-subtle)] mt-20 overflow-hidden w-full">
      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      {/* Newsletter section */}
      <div className="bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5 border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center block" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <h3 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-2">
              Stay in the loop 🔔
            </h3>
            <p className="text-[var(--text-body)] mb-6">
              Get weekly updates on events, resources, and opportunities. No spam, ever.
            </p>
            <form className="flex gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-full px-5 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500/50 transition-colors"
              />
              <button type="submit" className="btn-primary text-sm px-6 py-3">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative h-8 w-auto">
                <Image src="/logo.png" alt="Hacknfinity Logo" width={60} height={60} className="w-auto h-full drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all duration-300" />
              </div>
              <span className="font-display font-bold text-lg tracking-widest text-gradient">
                HACKNFINITY
              </span>
            </Link>
            <p className="text-[var(--text-body)] text-sm leading-relaxed mb-6 max-w-sm">
              India&apos;s largest student tech community. Building the next generation of innovators, 
              one hackathon at a time. 🚀
            </p>

            {/* Contact info */}
            <div className="space-y-2 text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <a href="mailto:hello@hacknfinity.in" className="hover:text-purple-400 transition-colors">
                  hello@hacknfinity.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>New Delhi, India</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`p-2.5 rounded-full bg-white/5 text-[var(--text-muted)] transition-all hover:bg-white/10 hover:scale-110 ${color}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-sm text-[var(--text-primary)] mb-4 tracking-wider uppercase">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-[var(--text-muted)] hover:text-purple-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © {currentYear} Hacknfinity. Made with ❤️ by students, for students.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            India&apos;s Largest Student Tech Community 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
