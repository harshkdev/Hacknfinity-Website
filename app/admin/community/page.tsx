"use client";

import { useState, useEffect } from "react";
import { Trash2, Pin, CheckCircle, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminCommunityPage() {
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    try {
      const res = await fetch("/api/community", { cache: "no-store" });
      const data = await res.json();
      if (Array.isArray(data)) {
        setThreads(data);
      } else {
        toast.error(data.error || "Failed to load threads");
        setThreads([]);
      }
    } catch (error) {
      toast.error("Network error");
      setThreads([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFlag = async (thread: any, field: "isPinned" | "isAnswered") => {
    try {
      const res = await fetch(`/api/community/${thread._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !thread[field] }),
      });
      if (!res.ok) throw new Error("Failed to update thread");
      toast.success(`Thread updated`);
      fetchThreads();
    } catch (error) {
      toast.error("Error updating thread");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this discussion?")) return;
    try {
      await fetch(`/api/community/${id}`, { method: "DELETE" });
      toast.success("Thread deleted");
      fetchThreads();
    } catch (error) {
      toast.error("Error deleting thread");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display font-bold text-3xl text-[var(--text-primary)]">Manage Community Forum</h1>
      </div>

      {loading ? (
        <p className="text-[var(--text-muted)]">Loading discussions...</p>
      ) : (
        <div className="space-y-4">
          {threads.map((thread: any) => (
            <div key={thread._id} className="glass-card p-5 rounded-xl border border-[var(--border-subtle)] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="badge text-xs">{thread.category}</span>
                  {thread.isPinned && <span className="flex items-center gap-1 text-xs text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full"><Pin className="w-3 h-3" /> Pinned</span>}
                  {thread.isAnswered && <span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full"><CheckCircle className="w-3 h-3" /> Answered</span>}
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">{thread.title}</h3>
                <p className="text-sm text-[var(--text-muted)] line-clamp-1 mb-2">{thread.body}</p>
                <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                  <span>By: {thread.author?.name}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {thread.replies}</span>
                </div>
              </div>
              
              <div className="flex gap-2 self-start md:self-center">
                <button 
                  onClick={() => toggleFlag(thread, "isPinned")} 
                  className={`p-2 rounded-lg text-sm border transition-colors ${thread.isPinned ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" : "bg-white/5 text-[var(--text-muted)] border-[var(--border-subtle)] hover:bg-white/10"}`}
                  title={thread.isPinned ? "Unpin thread" : "Pin thread"}
                >
                  <Pin className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => toggleFlag(thread, "isAnswered")} 
                  className={`p-2 rounded-lg text-sm border transition-colors ${thread.isAnswered ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-white/5 text-[var(--text-muted)] border-[var(--border-subtle)] hover:bg-white/10"}`}
                  title={thread.isAnswered ? "Mark unanswered" : "Mark answered"}
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(thread._id)} className="text-red-400 hover:bg-red-500/10 p-2 rounded-lg border border-transparent hover:border-red-500/20 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {threads.length === 0 && <p className="text-[var(--text-muted)]">No discussions found.</p>}
        </div>
      )}
    </div>
  );
}
