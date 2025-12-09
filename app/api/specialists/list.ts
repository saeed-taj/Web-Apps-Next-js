import { NextRequest, NextResponse } from "next/server";

// Mock specialists data - replace with database query
const specialists = [
  {
    icon: "⚖️",
    image: "/images/lawyer.jpg",
    title: "Criminal Law",
    desc: "Expert lawyers in criminal cases",
    slug: "criminal-law",
    count: 45,
    category: "Criminal Law",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    image: "/images/lawyer.jpg",
    title: "Family Law",
    desc: "Divorce, custody, and family matters",
    slug: "family-law",
    count: 32,
    category: "Family Law",
  },
  {
    icon: "🏢",
    image: "/images/lawyer.jpg",
    title: "Corporate Law",
    desc: "Business and corporate legal services",
    slug: "corporate-law",
    count: 28,
    category: "Corporate Law",
  },
  {
    icon: "🏠",
    image: "/images/lawyer.jpg",
    title: "Property Law",
    desc: "Property disputes and transactions",
    slug: "property-law",
    count: 25,
    category: "Property Law",
  },
  {
    icon: "🛂",
    image: "/images/lawyer.jpg",
    title: "Immigration",
    desc: "Visa and immigration services",
    slug: "immigration",
    count: 18,
    category: "Immigration",
  },
  {
    icon: "💼",
    image: "/images/lawyer.jpg",
    title: "Employment Law",
    desc: "Workplace and employment disputes",
    slug: "employment-law",
    count: 22,
    category: "Employment Law",
  },
  {
    icon: "📜",
    image: "/images/lawyer.jpg",
    title: "Civil Law",
    desc: "Civil litigation and disputes",
    slug: "civil-law",
    count: 30,
    category: "Civil Law",
  },
  {
    icon: "💻",
    image: "/images/lawyer.jpg",
    title: "Cyber Crime",
    desc: "Online fraud and cybercrime cases",
    slug: "cyber-crime",
    count: 15,
    category: "Cyber Crime",
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");

    let filteredSpecialists = specialists;

    if (category) {
      filteredSpecialists = filteredSpecialists.filter((s) =>
        s.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    return NextResponse.json(
      {
        specialists: filteredSpecialists,
        count: filteredSpecialists.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get specialists error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

