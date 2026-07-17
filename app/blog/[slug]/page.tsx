"use client";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/data/mock";
import { Clock, Calendar, Tag, ArrowLeft, Link2 } from "lucide-react";
import { TwitterIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/utils";
import toast from "react-hot-toast";

const sampleContent = `
<h2>Introduction</h2>
<p>The landscape of technology is evolving at an unprecedented pace. As student developers in India, we are at the forefront of one of the most exciting periods in tech history. This article dives deep into the key trends and practical steps you can take to build a strong career foundation.</p>
<h2>Why This Matters for Students</h2>
<p>India produces over 1.5 million engineering graduates every year, yet there is a massive skill gap between what academia teaches and what the industry needs. The good news? The gap is bridgeable — and the Hacknfinity community is proof of that.</p>
<p>Here are three critical areas to focus on:</p>
<ul>
<li>Building real projects, not just tutorials</li>
<li>Contributing to open source early</li>
<li>Networking within the right communities</li>
</ul>
<h2>Getting Started</h2>
<p>The best time to start was yesterday. The second best time is today. Pick one technology, go deep, and build something real. Share it on GitHub. Get feedback. Iterate.</p>
<code>const journey = { start: 'today', destination: 'your dream job' };</code>
<h2>Conclusion</h2>
<p>Your college matters less than your skills, your projects, and your network. Hacknfinity exists to help you build all three. Join us, contribute, and grow together.</p>
`;

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const blog = blogs.find(b => b.slug === slug);
  const related = blogs.filter(b => b.slug !== slug && b.category === blog?.category).slice(0, 3);

  if (!blog) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050507] pt-20">
      <div className="text-center"><div className="text-5xl mb-4">📄</div><h1 className="font-display text-2xl text-[var(--text-primary)]">Article not found</h1><Link href="/blog" className="btn-primary mt-4 inline-flex">Browse Blog</Link></div>
    </div>
  );

  const copyLink = () => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied!"); };

  return (
    <div className="min-h-screen bg-[#050507] pt-20">
      {/* Cover */}
      <div className="relative h-64 sm:h-96">
        <Image src={blog.cover} alt={blog.title} fill className="object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/50 to-transparent"/>
        <span className="absolute bottom-6 left-6 badge">{blog.category}</span>
      </div>

      <Container className="max-w-3xl pb-24">
        {/* Back */}
        <Link href="/blog" className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-purple-400 mt-6 mb-6 transition-colors"><ArrowLeft className="w-4 h-4"/>Back to Blog</Link>

        {/* Header */}
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] mb-4">{blog.title}</h1>
        <p className="text-lg text-[var(--text-body)] mb-6">{blog.excerpt}</p>
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[var(--border-subtle)]">
          <Image src={blog.author.avatar} alt={blog.author.name} width={44} height={44} className="rounded-full ring-2 ring-purple-500/30"/>
          <div>
            <div className="font-semibold text-sm text-[var(--text-primary)]">{blog.author.name}</div>
            <div className="text-xs text-[var(--text-muted)]">{blog.author.role}</div>
          </div>
          <div className="flex items-center gap-3 ml-auto text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/>{formatDate(blog.publishedAt)}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3"/>{blog.readTime} min read</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose-hacknfinity" dangerouslySetInnerHTML={{ __html: sampleContent }}/>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-10 mb-8">
          {blog.tags.map(t=><span key={t} className="badge">{t}</span>)}
        </div>

        {/* Share */}
        <div className="flex items-center gap-3 p-5 glass-card mb-12">
          <span className="text-sm font-semibold text-[var(--text-primary)]">Share this article:</span>
          <a href={`https://twitter.com/intent/tweet?text=${blog.title}&url=${typeof window!=='undefined'?window.location.href:''}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-sky-500/20 text-[var(--text-muted)] hover:text-sky-400 transition-colors"><TwitterIcon className="w-4 h-4"/></a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window!=='undefined'?window.location.href:''}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-blue-500/20 text-[var(--text-muted)] hover:text-blue-400 transition-colors"><LinkedinIcon className="w-4 h-4"/></a>
          <button onClick={copyLink} className="p-2 rounded-full hover:bg-purple-500/20 text-[var(--text-muted)] hover:text-purple-400 transition-colors"><Link2 className="w-4 h-4"/></button>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">More from Hacknfinity</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map(r=>(
                <Link key={r.id} href={`/blog/${r.slug}`} className="glass-card overflow-hidden group hover:no-underline">
                  <div className="relative aspect-video overflow-hidden"><Image src={r.cover} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500"/></div>
                  <div className="p-4"><span className="badge text-xs mb-2">{r.category}</span><h3 className="font-display font-semibold text-sm text-[var(--text-primary)] line-clamp-2 group-hover:text-purple-400 transition-colors">{r.title}</h3></div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-12 relative rounded-2xl p-8 text-center overflow-hidden border border-purple-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/5"/>
          <div className="relative z-10">
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-2">Never miss an article</h3>
            <p className="text-[var(--text-body)] text-sm mb-5">Get weekly articles on AI, Web Dev, Open Source, and student careers.</p>
            <div className="flex gap-2 max-w-sm mx-auto">
              <input type="email" placeholder="Your email" className="flex-1 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-full px-4 py-2.5 text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500/50"/>
              <button className="btn-primary text-sm px-5 py-2.5">Subscribe</button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
