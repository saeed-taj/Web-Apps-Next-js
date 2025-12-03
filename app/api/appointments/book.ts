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
    const { lawyerId, clientId, date, time, type } = body;

    // Validation
    if (!lawyerId || !clientId || !date || !time) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Check for conflicts
    const conflictingAppointment = appointments.find(
      (apt) =>
        apt.lawyerId === lawyerId &&
        apt.date === date &&
        apt.time === time &&
        apt.status !== "cancelled"
    );

    if (conflictingAppointment) {
      return NextResponse.json(
        { error: "This time slot is already booked" },
        { status: 409 }
      );
    }

    // Create appointment
    const newAppointment = {
      id: `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      lawyerId,
      clientId,
      date,
      time,
      type: type || "Consultation",
      status: "pending" as const,
      createdAt: new Date(),
    };

    appointments.push(newAppointment);

    return NextResponse.json(
      {
        message: "Appointment booked successfully",
        appointment: newAppointment,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lawyerId = searchParams.get("lawyerId");
    const clientId = searchParams.get("clientId");

    let filteredAppointments = appointments;

    if (lawyerId) {
      filteredAppointments = filteredAppointments.filter(
        (apt) => apt.lawyerId === lawyerId
      );
    }

    if (clientId) {
      filteredAppointments = filteredAppointments.filter(
        (apt) => apt.clientId === clientId
      );
    }

    return NextResponse.json(
      {
        appointments: filteredAppointments,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get appointments error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

