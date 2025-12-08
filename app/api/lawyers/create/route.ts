import { NextRequest, NextResponse } from "next/server";

// Mock lawyers storage - replace with database
const lawyers: Array<{
  id: string;
  name: string;
  email: string;
  specialization: string;
  experience: number;
  location: string;
  phone: string;
  fees: number;
  bio?: string;
  createdAt: Date;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, specialization, experience, location, phone, fees, bio } = body;

    // Validation
    if (!name || !email || !specialization || !location || !phone) {
      return NextResponse.json(
        { error: "Required fields: name, email, specialization, location, phone" },
        { status: 400 }
      );
    }

    // Check if lawyer already exists
    const existingLawyer = lawyers.find((lawyer) => lawyer.email === email);
    if (existingLawyer) {
      return NextResponse.json(
        { error: "Lawyer with this email already exists" },
        { status: 409 }
      );
    }

    // Create lawyer profile
    const newLawyer = {
      id: `lawyer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      specialization,
      experience: experience || 0,
      location,
      phone,
      fees: fees || 5000,
      bio: bio || "",
      createdAt: new Date(),
    };

    lawyers.push(newLawyer);

    return NextResponse.json(
      {
        message: "Lawyer profile created successfully",
        lawyer: newLawyer,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create lawyer error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

