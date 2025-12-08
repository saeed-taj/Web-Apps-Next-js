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
  updatedAt?: Date;
}> = [];

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, specialization, experience, location, phone, fees, bio } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Lawyer ID is required" },
        { status: 400 }
      );
    }

    const lawyer = lawyers.find((law) => law.id === id);

    if (!lawyer) {
      return NextResponse.json(
        { error: "Lawyer not found" },
        { status: 404 }
      );
    }

    // Update fields
    if (name) lawyer.name = name;
    if (specialization) lawyer.specialization = specialization;
    if (experience !== undefined) lawyer.experience = experience;
    if (location) lawyer.location = location;
    if (phone) lawyer.phone = phone;
    if (fees !== undefined) lawyer.fees = fees;
    if (bio !== undefined) lawyer.bio = bio;
    lawyer.updatedAt = new Date();

    return NextResponse.json(
      {
        message: "Lawyer profile updated successfully",
        lawyer,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update lawyer error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



