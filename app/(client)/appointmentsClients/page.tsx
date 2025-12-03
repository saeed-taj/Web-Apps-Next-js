"use client";

import Sidebar from "@/components/Dashboard/Sidebar";
import AppointmentTable from "@/components/Dashboard/AppointmentTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function AppointmentsClientsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="client" />
      <main className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
            <p className="text-gray-600 mt-2">View and manage your appointments</p>
          </div>
          <Link href="/lawyers">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Book New Appointment
            </Button>
          </Link>
        </div>
        <AppointmentTable role="client" />
      </main>
    </div>
  );
}
