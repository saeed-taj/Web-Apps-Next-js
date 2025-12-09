import { NextRequest, NextResponse } from "next/server";

// Mock services data - replace with database query
const services = [
  {
    icon: "🎥",
    image: "/images/lawyer.jpg",
    title: "Video Consultation",
    desc: "Instant legal advice through video call",
    slug: "video-consultation",
    count: 45,
    popular: true,
  },
  {
    icon: "⚖️",
    image: "/images/lawyer.jpg",
    title: "Legal Notice Drafting",
    desc: "Draft & send legal notice",
    slug: "legal-notice",
    count: 32,
    popular: true,
  },
  {
    icon: "🔓",
    image: "/images/lawyer.jpg",
    title: "Bail Application",
    desc: "Emergency bail filing",
    slug: "bail-application",
    count: 28,
    popular: true,
  },
  {
    icon: "📝",
    image: "/images/lawyer.jpg",
    title: "Will Writing",
    desc: "Create legally valid will",
    slug: "will-writing",
    count: 25,
    popular: true,
  },
  {
    icon: "✍️",
    image: "/images/lawyer.jpg",
    title: "Power of Attorney",
    desc: "Create POA document",
    slug: "power-of-attorney",
    count: 38,
    popular: true,
  },
  {
    icon: "🚨",
    image: "/images/lawyer.jpg",
    title: "FIR Quashing",
    desc: "Remove police case/FIR",
    slug: "fir-quashing",
    count: 22,
    popular: true,
  },
  {
    icon: "🛒",
    image: "/images/lawyer.jpg",
    title: "Consumer Complaint",
    desc: "File consumer court case",
    slug: "consumer-complaint",
    count: 19,
    popular: true,
  },
  {
    icon: "💔",
    image: "/images/lawyer.jpg",
    title: "Divorce Consultation",
    desc: "Divorce & separation advice",
    slug: "divorce-consultation",
    count: 35,
    popular: true,
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const popular = searchParams.get("popular");

    let filteredServices = services;

    if (popular === "true") {
      filteredServices = filteredServices.filter((s) => s.popular);
    }

    if (category) {
      // Filter by category if needed
      filteredServices = filteredServices.filter((s) =>
        s.slug.toLowerCase().includes(category.toLowerCase())
      );
    }

    return NextResponse.json(
      {
        services: filteredServices,
        count: filteredServices.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get services error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

