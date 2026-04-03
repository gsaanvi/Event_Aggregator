"use client";

import { AdminNavbar } from "../../admin_dashboard/components/admin-navbar";
import { StatsCards } from "../../admin_dashboard/components/stats-cards";
import { EventsTable } from "../../admin_dashboard/components/events-table";
import { useAuth } from "../../admin_dashboard/hooks/useAuth";

export default function AdminDashboard() {
  const { profile, loading } = useAuth({ requiredRole: "admin" });

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your campus events and track engagement
          </p>
        </div>
        <div className="space-y-8">
          <StatsCards />
          <EventsTable />
        </div>
      </main>
    </div>
  );
}
