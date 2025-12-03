import { NextRequest, NextResponse } from "next/server";

// Mock reviews storage - replace with database
const reviews: Array<{
  id: string;
  lawyerId: string;
  clientId: string;
  clientName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lawyerId, clientId, clientName, rating, comment } = body;

    // Validation
    if (!lawyerId || !clientId || !rating) {
      return NextResponse.json(
        { error: "lawyerId, clientId, and rating are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Create review
    const newReview = {
      id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      lawyerId,
      clientId,
      clientName: clientName || "Anonymous",
      rating,
      comment: comment || "",
      createdAt: new Date(),
    };

    reviews.push(newReview);

    return NextResponse.json(
      {
        message: "Review added successfully",
        review: newReview,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Add review error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

