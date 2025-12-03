"use client";

import Sidebar from "@/components/Dashboard/Sidebar";
import StatsCards from "@/components/Dashboard/StatsCards";
import AppointmentTable from "@/components/Dashboard/AppointmentTable";

export default function DashboardLawyers() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="lawyer" />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lawyer Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your practice and appointments.</p>
        </div>
        <div className="space-y-6">
          <StatsCards role="lawyer" />
          <AppointmentTable role="lawyer" />
        </div>
      </main>
    </div>
  );
}
