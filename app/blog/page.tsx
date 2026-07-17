"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/data/mock";
import type { Blog } from "@/types";
import { Search, Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { cn, formatDate } from "@/lib/utils";

const categories = ["All", "AI/ML", "Web Development", "Open Source", "DSA", "Web3", "Startups"];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => blogs.filter((b) => {
    const matchCat = category === "All" || b.category === category;
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  }), [search, category]);

  const featured = blogs.find(b => b.isFeatured);
  const rest = filtered.filter(b => !b.isFeatured || search || category !== "All");

  return (
    <div className="min-h-screen bg-[#050507] pt-24">
      <Section className="section-glow-top text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span className="badge inline-flex mb-4">Blog</span>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-[var(--text-primary)] mb-4">
            The Hacknfinity <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-[var(--text-body)] text-lg max-w-xl mx-auto">Insights on AI, Web Dev, Open Source, DSA, and student careers.</p>
        </motion.div>
      </Section>

      {/* Filters */}
      <Container className="mb-10 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles, tags..." className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-full pl-12 pr-6 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500/50 transition-colors" />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={cn("px-4 py-1.5 rounded-full text-sm font-medium border transition-all", category === c ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-transparent" : "border-[var(--border-brand)] text-[var(--text-body)] hover:bg-purple-500/10")}>{c}</button>
          ))}
        </div>
      </Container>

      <Container className="pb-24">
        {/* Featured */}
        {featured && !search && category === "All" && (
          <motion.div className="glass-card overflow-hidden mb-10 grid md:grid-cols-2" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 200 }}>
            <div className="relative aspect-video md:aspect-auto md:h-full overflow-hidden">
              <Image src={featured.cover} alt={featured.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0d0d12]/50" />
            </div>
            <div className="p-8 flex flex-col">
              <div className="flex gap-2 mb-4">
                <span className="badge">Featured</span>
                <span className="badge">{featured.category}</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-primary)] mb-3 line-clamp-3">{featured.title}</h2>
              <p className="text-[var(--text-body)] text-sm leading-relaxed line-clamp-3 mb-6 flex-1">{featured.excerpt}</p>
              <div className="flex items-center gap-3 mb-6">
                <Image src={featured.author.avatar} alt={featured.author.name} width={32} height={32} className="rounded-full" />
                <span className="text-sm text-[var(--text-body)]">{featured.author.name}</span>
                <span className="text-[var(--text-muted)]">·</span>
                <span className="text-sm text-[var(--text-muted)] flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime} min</span>
              </div>
              <Link href={`/blog/${featured.slug}`} className="btn-primary self-start text-sm">Read Article <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </motion.div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-[var(--text-muted)]"><BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" /><p>No articles found</p></div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(search || category !== "All" ? filtered : rest).map((blog, i) => <BlogCard key={blog.id} blog={blog} index={i} />)}
          </div>
        )}
      </Container>
    </div>
  );
}

function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  return (
    <motion.div className="glass-card overflow-hidden flex flex-col" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -4 }}>
      <div className="relative aspect-video overflow-hidden">
        <Image src={blog.cover} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/60 to-transparent" />
        <span className="absolute bottom-3 left-3 badge">{blog.category}</span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/blog/${blog.slug}`}>
          <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2 line-clamp-2 hover:text-purple-400 transition-colors">{blog.title}</h3>
        </Link>
        <p className="text-sm text-[var(--text-body)] line-clamp-3 mb-4 flex-1">{blog.excerpt}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {blog.tags.slice(0, 2).map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-[var(--text-muted)] border border-[var(--border-subtle)]">{t}</span>)}
        </div>
        <div className="flex items-center gap-3 pt-3 border-t border-[var(--border-subtle)]">
          <Image src={blog.author.avatar} alt={blog.author.name} width={24} height={24} className="rounded-full" />
          <span className="text-xs text-[var(--text-body)]">{blog.author.name}</span>
          <span className="ml-auto text-xs text-[var(--text-muted)] flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readTime}m</span>
        </div>
      </div>
    </motion.div>
  );
}
