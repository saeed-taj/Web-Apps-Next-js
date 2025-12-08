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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lawyerId = searchParams.get("lawyerId");
    const clientId = searchParams.get("clientId");

    let filteredReviews = reviews;

    if (lawyerId) {
      filteredReviews = filteredReviews.filter(
        (review) => review.lawyerId === lawyerId
      );
    }

    if (clientId) {
      filteredReviews = filteredReviews.filter(
        (review) => review.clientId === clientId
      );
    }

    // Sort by most recent first
    filteredReviews.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    // Calculate average rating if lawyerId is provided
    let averageRating = 0;
    if (lawyerId && filteredReviews.length > 0) {
      const sum = filteredReviews.reduce((acc, rev) => acc + rev.rating, 0);
      averageRating = sum / filteredReviews.length;
    }

    return NextResponse.json(
      {
        reviews: filteredReviews,
        count: filteredReviews.length,
        averageRating: averageRating > 0 ? parseFloat(averageRating.toFixed(1)) : 0,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("List reviews error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



