import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("saeedtaj00_db_user");

    const body = await request.json(); // catching the data from the frontend 

    const { name, email, specialization, experience, location, phone, fees, bio } = body;

    // Validation
    if (!name || !email || !specialization || !location || !phone) {
      return NextResponse.json(
        { error: "Required fields: name, email, specialization, location, phone" },
        { status: 400 }
      );
    }

    // Check in database
    const existingLawyer = await db.collection("lawyers").findOne({ email });

    if (existingLawyer) {
      return NextResponse.json(
        { error: "Lawyer with this email already exists" },
        { status: 409 }
      );
    }
      
    // Create lawyer object
    const newLawyer = {
      name,
      email,
      specialization,
      experience: experience || 0,
      location,
      phone,
      fees: fees || 2000, 
      bio: bio || "",
      createdAt: new Date(),
    };

    // Save to database
    const result = await db.collection("lawyers").insertOne(newLawyer);

    return NextResponse.json(
      {
        message: "Lawyer profile created successfully",
        lawyer: { ...newLawyer, id: result.insertedId },
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



export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("saeedtaj00_db_user");

    const lawyers = await db.collection("lawyers").find({}).toArray();
    return NextResponse.json(lawyers);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
