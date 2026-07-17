"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const [show, setShow] = useState(false);
  return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center px-4 py-24 relative overflow-hidden">
      <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-600/15 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"/>
      <div className="absolute bottom-20 -right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"/>
      <motion.div initial={{opacity:0,y:30,scale:0.97}} animate={{opacity:1,y:0,scale:1}} transition={{duration:0.5}} className="glass-card p-8 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg viewBox="0 0 40 24" className="w-10 h-6" fill="none">
              <defs>
                <linearGradient id="si-l" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#A855F7"/><stop offset="100%" stopColor="#D946EF"/></linearGradient>
                <linearGradient id="si-r" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#22D3EE"/><stop offset="100%" stopColor="#3B82F6"/></linearGradient>
              </defs>
              <path d="M20 12 C20 12 16 4 10 4 C4 4 0 8 0 12 C0 16 4 20 10 20 C16 20 20 12 20 12Z" fill="url(#si-l)"/>
              <path d="M20 12 C20 12 24 4 30 4 C36 4 40 8 40 12 C40 16 36 20 30 20 C24 20 20 12 20 12Z" fill="url(#si-r)"/>
            </svg>
            <span className="font-display font-bold tracking-widest text-gradient">HACKNFINITY</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-1">Welcome back</h1>
          <p className="text-sm text-[var(--text-muted)]">Sign in to continue your journey</p>
        </div>
        <button className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold rounded-full px-6 py-3 mb-5 hover:bg-gray-100 transition-colors text-sm">
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>
        <div className="flex items-center gap-3 mb-5"><div className="flex-1 h-px bg-[var(--border-subtle)]"/><span className="text-xs text-[var(--text-muted)]">or continue with email</span><div className="flex-1 h-px bg-[var(--border-subtle)]"/></div>
        <div className="space-y-3 mb-4">
          <input type="email" placeholder="Email address" className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500/50 transition-colors"/>
          <div className="relative">
            <input type={show?"text":"password"} placeholder="Password" className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 pr-11 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500/50 transition-colors"/>
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]" onClick={()=>setShow(!show)}>{show?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}</button>
          </div>
        </div>
        <div className="text-right mb-5"><button className="text-xs text-purple-400 hover:text-purple-300">Forgot password?</button></div>
        <button className="btn-primary w-full justify-center py-3 mb-5">Sign In</button>
        <p className="text-center text-sm text-[var(--text-muted)]">Don&apos;t have an account?{" "}<Link href="/sign-up" className="text-purple-400 hover:text-purple-300 font-medium">Sign up</Link></p>
        <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
          <Lock className="w-3 h-3"/><span>Authentication powered by Clerk — coming in Phase 2</span>
        </div>
      </motion.div>
    </div>
  );
}
