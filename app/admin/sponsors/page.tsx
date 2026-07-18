"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminSponsorsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "", logo: "", url: "", tier: "community"
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/sponsors");
      const data = await res.json();
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        toast.error(data.error || "Failed to load sponsors");
        setItems([]);
      }
    } catch (error) {
      toast.error("Network error");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.logo) return toast.error("Please upload a logo");
    
    try {
      const res = await fetch("/api/sponsors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to save");
      toast.success("Sponsor added!");
      setIsFormOpen(false);
      fetchItems();
    } catch (error) {
      toast.error("Error adding sponsor");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/sponsors/${id}`, { method: "DELETE" });
      toast.success("Deleted");
      fetchItems();
    } catch (error) {
      toast.error("Error deleting sponsor");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display font-bold text-3xl text-[var(--text-primary)]">Manage Sponsors</h1>
        <button onClick={() => setIsFormOpen(!isFormOpen)} className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Sponsor
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="glass-card p-6 rounded-xl mb-8 space-y-4 border border-[var(--border-subtle)]">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Company Name" required className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input type="url" placeholder="Website URL (optional)" className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} />
            <select className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.tier} onChange={e => setFormData({...formData, tier: e.target.value})}>
              <option value="platinum">Platinum</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="community">Community</option>
            </select>
          </div>
          
          <div className="flex items-center gap-4">
            <CldUploadWidget uploadPreset="ml_default" onSuccess={(result: any) => setFormData(prev => ({...prev, logo: result.info.secure_url}))}>
              {({ open }) => (
                <button type="button" onClick={() => open()} className="btn-secondary px-4 py-2 text-sm flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> {formData.logo ? "Change Logo" : "Upload Logo"}
                </button>
              )}
            </CldUploadWidget>
            {formData.logo && (
              <div className="flex items-center gap-3">
                <img src={formData.logo} alt="Preview" className="h-10 w-16 object-contain bg-white/5 rounded border border-purple-500/30" />
                <span className="text-sm text-green-400">Logo uploaded!</span>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" className="btn-primary px-6 py-2">Save Sponsor</button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-[var(--text-muted)]">Loading sponsors...</p>
      ) : (
        <div className="space-y-4">
          {items.map((item: any) => (
            <div key={item._id} className="glass-card p-4 rounded-xl border border-[var(--border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={item.logo} alt={item.name} className="w-12 h-12 rounded-full bg-white object-contain p-1" />
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">{item.name}</h3>
                  <p className="text-sm text-[var(--text-muted)] capitalize">{item.tier} Tier</p>
                </div>
              </div>
              <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-300 p-2">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          {items.length === 0 && <p className="text-[var(--text-muted)]">No sponsors found.</p>}
        </div>
      )}
    </div>
  );
}
