import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutDashboard, CalendarDays, Users, Image as ImageIcon, BookOpen, Building, MessageSquare } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050507] flex flex-col pt-16">
      <div className="flex flex-1 h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[var(--border-subtle)] bg-[#0d0d12] p-4 flex flex-col">
          <div className="mb-8 px-2">
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)]">Admin Panel</h2>
          </div>
          <nav className="flex-1 space-y-1">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-[var(--text-body)] hover:text-white transition-colors"><LayoutDashboard className="w-5 h-5"/> Dashboard</Link>
            <Link href="/admin/events" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-[var(--text-body)] hover:text-white transition-colors"><CalendarDays className="w-5 h-5"/> Events</Link>
            <Link href="/admin/sponsors" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-[var(--text-body)] hover:text-white transition-colors"><Building className="w-5 h-5"/> Sponsors</Link>
            <Link href="/admin/gallery" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-[var(--text-body)] hover:text-white transition-colors"><ImageIcon className="w-5 h-5"/> Gallery</Link>
            <Link href="/admin/blog" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-[var(--text-body)] hover:text-white transition-colors"><BookOpen className="w-5 h-5"/> Blog</Link>
            <Link href="/admin/members" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-[var(--text-body)] hover:text-white transition-colors"><Users className="w-5 h-5"/> Team</Link>
            <Link href="/admin/community" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-[var(--text-body)] hover:text-white transition-colors"><MessageSquare className="w-5 h-5"/> Community</Link>
          </nav>
          <div className="mt-auto border-t border-[var(--border-subtle)] pt-4 px-2">
            <div className="flex items-center gap-3 text-[var(--text-body)]">
              <UserButton />
              <span className="text-sm font-medium">Account Settings</span>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#050507] p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
