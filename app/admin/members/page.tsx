"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash2, Image as ImageIcon, Pencil, GraduationCap } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminTeamPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "", role: "", team: "Founders", college: "", bio: "", avatar: "",
    linkedin: "", github: "", twitter: ""
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/members", { cache: "no-store" });
      const data = await res.json();
      if (Array.isArray(data)) {
        setMembers(data);
      } else {
        toast.error(data.error || "Failed to load members");
        setMembers([]);
      }
    } catch (error) {
      toast.error("Network error");
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.avatar) return toast.error("Please upload an avatar image");
    
    try {
      const url = editId ? `/api/members/${editId}` : "/api/members";
      const method = editId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save member");
      }
      toast.success(editId ? "Member updated!" : "Member added!");
      setIsFormOpen(false);
      setEditId(null);
      fetchMembers();
    } catch (error: any) {
      toast.error(error.message || "Error saving member");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this team member?")) return;
    try {
      await fetch(`/api/members/${id}`, { method: "DELETE" });
      toast.success("Member removed");
      fetchMembers();
    } catch (error) {
      toast.error("Error deleting member");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display font-bold text-3xl text-[var(--text-primary)]">Manage Team Members</h1>
        <button onClick={() => {
          setFormData({ name: "", role: "", team: "Founders", college: "", bio: "", avatar: "", linkedin: "", github: "", twitter: "" });
          setEditId(null);
          setIsFormOpen(!isFormOpen);
        }} className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="glass-card p-6 rounded-xl mb-8 space-y-4 border border-[var(--border-subtle)]">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" required className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input type="text" placeholder="Role (e.g. Lead Organizer)" required className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
            
            <select className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.team} onChange={e => setFormData({...formData, team: e.target.value})}>
              <option value="Founders">Founders</option>
              <option value="Developers">Developers</option>
              <option value="Designers">Designers</option>
              <option value="Event Coordinators">Event Coordinators</option>
              <option value="Marketing">Marketing</option>
            </select>
            <input type="text" placeholder="College / University" required className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})} />
            
            <input type="url" placeholder="LinkedIn URL (optional)" className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} />
            <input type="url" placeholder="GitHub URL (optional)" className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} />
            <input type="url" placeholder="Twitter/X URL (optional)" className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} />
          </div>
          
          <textarea placeholder="Short Bio" required className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none min-h-[100px]" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
          
          <div className="flex items-center gap-4">
            <CldUploadWidget uploadPreset="ml_default" onSuccess={(result: any) => setFormData(prev => ({...prev, avatar: result.info.secure_url}))}>
              {({ open }) => (
                <button type="button" onClick={() => open()} className="btn-secondary px-4 py-2 text-sm flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> {formData.avatar ? "Change Avatar" : "Upload Avatar"}
                </button>
              )}
            </CldUploadWidget>
            {formData.avatar && (
              <div className="flex items-center gap-3">
                <img src={formData.avatar} alt="Preview" className="h-10 w-10 object-cover rounded-full border border-purple-500/30" />
                <span className="text-sm text-green-400">Image uploaded!</span>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" className="btn-primary px-6 py-2">{editId ? "Update Member" : "Save Member"}</button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-[var(--text-muted)]">Loading members...</p>
      ) : (
        <div className="space-y-4">
          {members.map((member: any) => (
            <div key={member._id} className="glass-card p-4 rounded-xl border border-[var(--border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover border border-purple-500/20" />
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">{member.name}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{member.role} · {member.team}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => {
                  setFormData({
                    name: member.name || "", role: member.role || "", team: member.team || "Founders",
                    college: member.college || "", bio: member.bio || "", avatar: member.avatar || "",
                    linkedin: member.linkedin || "", github: member.github || "", twitter: member.twitter || ""
                  });
                  setEditId(member._id);
                  setIsFormOpen(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} className="text-purple-400 hover:text-purple-300 p-2">
                  <Pencil className="w-5 h-5" />
                </button>
                <button onClick={() => handleDelete(member._id)} className="text-red-400 hover:text-red-300 p-2">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {members.length === 0 && <p className="text-[var(--text-muted)]">No team members found.</p>}
        </div>
      )}
    </div>
  );
}
