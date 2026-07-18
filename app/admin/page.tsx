import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div>
      <h1 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-6">Dashboard Overview</h1>
      <p className="text-[var(--text-body)]">
        Welcome to the Hacknfinity Admin Panel! Select a category from the sidebar to manage your content.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="glass-card p-6 rounded-xl border border-[var(--border-subtle)]">
          <h3 className="font-semibold text-[var(--text-primary)] mb-2">Events</h3>
          <p className="text-sm text-[var(--text-muted)]">Manage upcoming hackathons and workshops.</p>
        </div>
        <div className="glass-card p-6 rounded-xl border border-[var(--border-subtle)]">
          <h3 className="font-semibold text-[var(--text-primary)] mb-2">Sponsors</h3>
          <p className="text-sm text-[var(--text-muted)]">Upload and manage sponsor logos and links.</p>
        </div>
        <div className="glass-card p-6 rounded-xl border border-[var(--border-subtle)]">
          <h3 className="font-semibold text-[var(--text-primary)] mb-2">Gallery</h3>
          <p className="text-sm text-[var(--text-muted)]">Curate photos and videos for the community gallery.</p>
        </div>
      </div>
    </div>
  );
}
