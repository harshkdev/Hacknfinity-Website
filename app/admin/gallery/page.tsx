"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminGalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    caption: "", event: "", type: "image", url: "", thumbnail: "", date: ""
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        toast.error(data.error || "Failed to load items");
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
    if (!formData.url) return toast.error("Please upload an image/video");
    
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to save");
      toast.success("Added to gallery!");
      setIsFormOpen(false);
      fetchItems();
    } catch (error) {
      toast.error("Error creating item");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      toast.success("Deleted");
      fetchItems();
    } catch (error) {
      toast.error("Error deleting item");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display font-bold text-3xl text-[var(--text-primary)]">Manage Gallery</h1>
        <button onClick={() => setIsFormOpen(!isFormOpen)} className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Media
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="glass-card p-6 rounded-xl mb-8 space-y-4 border border-[var(--border-subtle)]">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Caption" required className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.caption} onChange={e => setFormData({...formData, caption: e.target.value})} />
            <input type="text" placeholder="Event Name" required className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.event} onChange={e => setFormData({...formData, event: e.target.value})} />
            <input type="text" placeholder="Date (YYYY-MM-DD)" required className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            <select className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>
          
          <div className="flex items-center gap-4">
            <CldUploadWidget uploadPreset="ml_default" onSuccess={(result: any) => setFormData(prev => ({...prev, url: result.info.secure_url, thumbnail: result.info.secure_url}))}>
              {({ open }) => (
                <button type="button" onClick={() => open()} className="btn-secondary px-4 py-2 text-sm flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> {formData.url ? "Change Media" : "Upload Media"}
                </button>
              )}
            </CldUploadWidget>
            {formData.url && (
              <div className="flex items-center gap-3">
                <img src={formData.url} alt="Preview" className="h-10 w-16 object-cover rounded border border-purple-500/30" />
                <span className="text-sm text-green-400">Media uploaded!</span>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" className="btn-primary px-6 py-2">Save Media</button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-[var(--text-muted)]">Loading gallery...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item: any) => (
            <div key={item._id} className="glass-card overflow-hidden rounded-xl border border-[var(--border-subtle)] relative group">
              <img src={item.url} alt={item.caption} className="w-full h-40 object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => handleDelete(item._id)} className="bg-red-500/80 text-white p-2 rounded-full hover:bg-red-500">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">{item.caption}</p>
                <p className="text-xs text-[var(--text-muted)] truncate">{item.event}</p>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-[var(--text-muted)] col-span-full">No items found.</p>}
        </div>
      )}
    </div>
  );
}
