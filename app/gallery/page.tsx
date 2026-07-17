"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { gallery } from "@/data/mock";
import type { GalleryItem } from "@/types";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GalleryPage() {
  const [activeEvent, setActiveEvent] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const events = ["All", ...Array.from(new Set(gallery.map(g => g.event)))];
  const filtered = activeEvent === "All" ? gallery : gallery.filter(g => g.event === activeEvent);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null), [filtered.length]);
  const next = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : null), [filtered.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const currentItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-[#050507] pt-24">
      <section className="section-glow-top py-16 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span className="badge inline-flex mb-4">Gallery</span>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-[var(--text-primary)] mb-4">
            Community <span className="text-gradient">Gallery</span>
          </h1>
          <p className="text-[var(--text-body)] text-lg max-w-xl mx-auto">Moments from our hackathons, workshops, and events.</p>
        </motion.div>
      </section>

      {/* Event filter */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 flex flex-wrap gap-2 justify-center">
        {events.map((ev) => (
          <button key={ev} onClick={() => setActiveEvent(ev)}
            className={cn("px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
              activeEvent === ev ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-transparent"
              : "border-[var(--border-brand)] text-[var(--text-body)] hover:bg-purple-500/10")}>
            {ev}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="masonry-grid">
          {filtered.map((item, i) => (
            <motion.div key={item.id} className="masonry-item cursor-pointer group relative overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              onClick={() => openLightbox(i)}>
              <Image src={item.thumbnail} alt={item.caption} width={600} height={400} className="w-full rounded-2xl object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-end p-4">
                {item.type === "video" && <Play className="w-10 h-10 text-white mx-auto mb-3" />}
                <p className="text-white text-sm font-medium line-clamp-1">{item.caption}</p>
                <span className="badge text-xs self-start mt-1">{item.event.split(" ").slice(0, 3).join(" ")}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && currentItem && (
          <motion.div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeLightbox}>
            <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors" onClick={closeLightbox}>
              <X className="w-6 h-6 text-white" />
            </button>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors" onClick={(e) => { e.stopPropagation(); prev(); }}>
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <motion.div className="max-w-4xl w-full" key={lightboxIndex} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
              <Image src={currentItem.url} alt={currentItem.caption} width={1200} height={800} className="w-full max-h-[75vh] object-contain rounded-xl" />
              <div className="mt-4 text-center">
                <p className="text-white font-medium">{currentItem.caption}</p>
                <span className="badge text-xs mt-1">{currentItem.event}</span>
              </div>
            </motion.div>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors" onClick={(e) => { e.stopPropagation(); next(); }}>
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
