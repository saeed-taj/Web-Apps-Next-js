import { NextRequest, NextResponse } from "next/server";

// In a real application, you would use a database
// For now, we'll use a simple in-memory store (replace with actual database)
const users: Array<{
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    // Validation
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    if (!["client", "lawyer"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be 'client' or 'lawyer'" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Create new user (in production, hash the password!)
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      password, // In production, hash this with bcrypt or similar
      role,
      createdAt: new Date(),
    };

    users.push(newUser);

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

