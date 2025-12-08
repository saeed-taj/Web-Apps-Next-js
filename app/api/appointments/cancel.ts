import { NextRequest, NextResponse } from "next/server";

// Mock appointments storage - replace with database
const appointments: Array<{
  id: string;
  lawyerId: string;
  clientId: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  type: string;
  createdAt: Date;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { appointmentId } = body;

    if (!appointmentId) {
      return NextResponse.json(
        { error: "Appointment ID is required" },
        { status: 400 }
      );
    }

    const appointment = appointments.find((apt) => apt.id === appointmentId);

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    if (appointment.status === "cancelled") {
      return NextResponse.json(
        { error: "Appointment is already cancelled" },
        { status: 400 }
      );
    }

    if (appointment.status === "completed") {
      return NextResponse.json(
        { error: "Cannot cancel a completed appointment" },
        { status: 400 }
      );
    }

    appointment.status = "cancelled";

    return NextResponse.json(
      {
        message: "Appointment cancelled successfully",
        appointment,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Cancel appointment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



