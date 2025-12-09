// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import clientPromise, { dbName } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "All fields are required" }, 
        { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const usersCollection = db.collection("users");


    // Check if email already exists
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser == email) {
      return NextResponse.json(
        { error: "Email already registered" }, 
        { status: 409 });
    }

    const newUser = {
      name,
      email,
      password, // In production, hash this!
      role,
      createdAt: new Date()
    };

    const result = await usersCollection.insertOne(newUser);

    return NextResponse.json({ message: "User registered successfully", user: { ...newUser, id: result.insertedId } }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
