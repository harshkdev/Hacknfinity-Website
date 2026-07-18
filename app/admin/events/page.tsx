"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash2, Image as ImageIcon, Pencil } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "", slug: "", date: "", duration: "", category: "Hackathon", mode: "Offline",
    location: "", description: "", status: "upcoming", banner: "", attendees: 0, isFeatured: false
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        toast.error(data.error || "Failed to load events");
        setEvents([]);
      }
    } catch (error) {
      toast.error("Network error");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.banner) return toast.error("Please upload a banner image");
    
    try {
      const url = editId ? `/api/events/${editId}` : "/api/events";
      const method = editId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save event");
      }
      toast.success(editId ? "Event updated!" : "Event created!");
      setIsFormOpen(false);
      setEditId(null);
      fetchEvents();
    } catch (error: any) {
      toast.error(error.message || "Error creating event");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/events/${id}`, { method: "DELETE" });
      toast.success("Event deleted");
      fetchEvents();
    } catch (error) {
      toast.error("Error deleting event");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display font-bold text-3xl text-[var(--text-primary)]">Manage Events</h1>
        <button onClick={() => {
          setFormData({ title: "", slug: "", date: "", duration: "", category: "Hackathon", mode: "Offline", location: "", description: "", status: "upcoming", banner: "", attendees: 0, isFeatured: false });
          setEditId(null);
          setIsFormOpen(!isFormOpen);
        }} className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="glass-card p-6 rounded-xl mb-8 space-y-4 border border-[var(--border-subtle)]">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Title" required className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value, slug: editId ? formData.slug : e.target.value.toLowerCase().replace(/ /g, '-')})} />
            <input type="text" placeholder="Slug" required className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] outline-none" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
            <input type="text" placeholder="Date (e.g. Aug 15-17, 2024)" required className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            <input type="text" placeholder="Duration (e.g. 48 Hours, 10 AM - 5 PM)" className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
            <input type="text" placeholder="Location" required className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
            <select className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="Hackathon">Hackathon</option>
              <option value="Workshop">Workshop</option>
              <option value="Meetup">Meetup</option>
            </select>
            <select className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="past">Past</option>
            </select>
          </div>
          <textarea placeholder="Description" required className="w-full bg-[#0d0d12] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--text-primary)] focus:border-purple-500 outline-none min-h-[100px]" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          
          <div className="flex items-center gap-4">
            <CldUploadWidget uploadPreset="ml_default" onSuccess={(result: any) => setFormData(prev => ({...prev, banner: result.info.secure_url}))}>
              {({ open }) => (
                <button type="button" onClick={() => open()} className="btn-secondary px-4 py-2 text-sm flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> {formData.banner ? "Change Banner" : "Upload Banner"}
                </button>
              )}
            </CldUploadWidget>
            {formData.banner && (
              <div className="flex items-center gap-3">
                <img src={formData.banner} alt="Preview" className="h-10 w-16 object-cover rounded border border-purple-500/30" />
                <span className="text-sm text-green-400">Image uploaded!</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="w-5 h-5 accent-purple-500 rounded cursor-pointer" />
              <span className="text-sm font-medium text-[var(--text-primary)]">Feature this event on Homepage</span>
            </label>
            <button type="submit" className="btn-primary px-6 py-2">{editId ? "Update Event" : "Save Event"}</button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-[var(--text-muted)]">Loading events...</p>
      ) : (
        <div className="space-y-4">
          {events.map((event: any) => (
            <div key={event._id} className="glass-card p-4 rounded-xl border border-[var(--border-subtle)] flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">{event.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{event.date} · {event.status}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => {
                  setFormData({
                    title: event.title || "", slug: event.slug || "", date: event.date || "", duration: event.duration || "",
                    category: event.category || "Hackathon", mode: event.mode || "Offline", location: event.location || "",
                    description: event.description || "", status: event.status || "upcoming", banner: event.banner || "", attendees: event.attendees || 0, isFeatured: event.isFeatured || false
                  });
                  setEditId(event._id);
                  setIsFormOpen(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} className="text-purple-400 hover:text-purple-300 p-2">
                  <Pencil className="w-5 h-5" />
                </button>
                <button onClick={() => handleDelete(event._id)} className="text-red-400 hover:text-red-300 p-2">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {events.length === 0 && <p className="text-[var(--text-muted)]">No events found.</p>}
        </div>
      )}
    </div>
  );
}
