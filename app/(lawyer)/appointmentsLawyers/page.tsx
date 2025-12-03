"use client";

import Sidebar from "@/components/Dashboard/Sidebar";
import AppointmentTable from "@/components/Dashboard/AppointmentTable";

export default function LawyerAppointment() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="lawyer" />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600 mt-2">Manage your client appointments</p>
        </div>
        <AppointmentTable role="lawyer" />
      </main>
    </div>
  );
}
