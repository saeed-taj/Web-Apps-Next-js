import { NextRequest, NextResponse } from "next/server";

// Mock lawyers data - replace with database query
const lawyers = [
  {
    id: "1",
    name: "Dr. Ahmed Khan",
    specialization: "Criminal Law, Family Law",
    experience: 15,
    rating: 4.8,
    reviews: 127,
    location: "Karachi, Pakistan",
    phone: "+92 300 1234567",
    email: "ahmed.khan@lawmate.com",
    fees: 5000,
    available: true,
  },
  {
    id: "2",
    name: "Adv. Sarah Ali",
    specialization: "Corporate Law, Property Law",
    experience: 12,
    rating: 4.9,
    reviews: 203,
    location: "Lahore, Pakistan",
    phone: "+92 300 2345678",
    email: "sarah.ali@lawmate.com",
    fees: 7000,
    available: true,
  },
  {
    id: "3",
    name: "Dr. Fatima Khan",
    specialization: "Family Law, Immigration",
    experience: 10,
    rating: 4.7,
    reviews: 134,
    location: "Islamabad, Pakistan",
    phone: "+92 300 3456789",
    email: "fatima.khan@lawmate.com",
    fees: 6000,
    available: true,
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const specialization = searchParams.get("specialization");
    const location = searchParams.get("location");
    const minRating = searchParams.get("minRating");

    let filteredLawyers = lawyers;

    // Filter by search query
    if (query) {
      filteredLawyers = filteredLawyers.filter(
        (lawyer) =>
          lawyer.name.toLowerCase().includes(query.toLowerCase()) ||
          lawyer.specialization.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by specialization
    if (specialization) {
      filteredLawyers = filteredLawyers.filter((lawyer) =>
        lawyer.specialization.toLowerCase().includes(specialization.toLowerCase())
      );
    }

    // Filter by location
    if (location) {
      filteredLawyers = filteredLawyers.filter((lawyer) =>
        lawyer.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by minimum rating
    if (minRating) {
      const minRatingNum = parseFloat(minRating);
      filteredLawyers = filteredLawyers.filter(
        (lawyer) => lawyer.rating >= minRatingNum
      );
    }

    return NextResponse.json(
      {
        lawyers: filteredLawyers,
        count: filteredLawyers.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Search lawyers error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



