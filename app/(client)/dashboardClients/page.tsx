"use client";

import Sidebar from "@/components/Dashboard/Sidebar";
import StatsCards from "@/components/Dashboard/StatsCards";
import AppointmentTable from "@/components/Dashboard/AppointmentTable";

export default function DashboardClients() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="client" />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your overview.</p>
        </div>
        <div className="space-y-6">
          <StatsCards role="client" />
          <AppointmentTable role="client" />
        </div>
      </main>
    </div>
  );
}
