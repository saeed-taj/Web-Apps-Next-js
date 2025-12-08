"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, MapPin } from "lucide-react";

interface Appointment {
  id: string;
  lawyerName?: string;
  clientName?: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  type: string;
  location?: string;
}

interface AppointmentTableProps {
  role?: "client" | "lawyer";
  appointments?: Appointment[];
}

export default function AppointmentTable({ 
  role = "client",
  appointments = []
}: AppointmentTableProps) {
  // Mock data if no appointments provided
  const mockAppointments: Appointment[] = appointments.length > 0 ? appointments : [
    {
      id: "1",
      lawyerName: role === "client" ? "Dr. Ahmed Khan" : undefined,
      clientName: role === "lawyer" ? "John Doe" : undefined,
      date: "2024-01-15",
      time: "10:00 AM",
      status: "upcoming",
      type: "Video Consultation",
      location: role === "client" ? "Online" : undefined,
    },
    {
      id: "2",
      lawyerName: role === "client" ? "Adv. Sarah Ali" : undefined,
      clientName: role === "lawyer" ? "Jane Smith" : undefined,
      date: "2024-01-12",
      time: "2:30 PM",
      status: "completed",
      type: "In-Person",
      location: role === "client" ? "Karachi Office" : "My Office",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      upcoming: "default",
      completed: "secondary",
      cancelled: "destructive",
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "default"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  {role === "client" && appointment.lawyerName && (
                    <>
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="font-semibold">{appointment.lawyerName}</span>
                    </>
                  )}
                  {role === "lawyer" && appointment.clientName && (
                    <>
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="font-semibold">{appointment.clientName}</span>
                    </>
                  )}
                  {getStatusBadge(appointment.status)}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{appointment.time}</span>
                  </div>
                  {appointment.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{appointment.location}</span>
                    </div>
                  )}
                  <span className="text-gray-500">{appointment.type}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {appointment.status === "upcoming" && (
                  <>
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button variant="destructive" size="sm">
                      Cancel
                    </Button>
                  </>
                )}
                {appointment.status === "completed" && (
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        {mockAppointments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No appointments found
          </div>
        )}
      </CardContent>
    </Card>
  );
}



