import { NextRequest, NextResponse } from "next/server";

// In a real application, you would query a database
// This is a mock implementation - replace with actual database queries
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
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user (in production, query database and verify hashed password)
    const user = users.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // In production, compare hashed password
    if (user.password !== password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate token (in production, use JWT or similar)
    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "Login successful",
        token,
        user: userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

