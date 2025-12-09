import { NextRequest, NextResponse } from "next/server";

// Mock legal issues data - replace with database query
const legalIssues = [
  {
    icon: "💔",
    image: "/images/lawyer.jpg",
    title: "Divorce & Separation",
    desc: "Legal help for divorce proceedings",
    slug: "divorce-separation",
    count: 42,
    urgent: false,
  },
  {
    icon: "🏠",
    image: "/images/lawyer.jpg",
    title: "Property Dispute",
    desc: "Resolve property ownership issues",
    slug: "property-dispute",
    count: 38,
    urgent: false,
  },
  {
    icon: "🚨",
    image: "/images/lawyer.jpg",
    title: "Police Case/FIR",
    desc: "Help with police cases and FIR",
    slug: "police-case-fir",
    count: 35,
    urgent: true,
  },
  {
    icon: "💸",
    image: "/images/lawyer.jpg",
    title: "Cheque Bounce",
    desc: "Recover bounced cheque amounts",
    slug: "cheque-bounce",
    count: 28,
    urgent: false,
  },
  {
    icon: "🏚️",
    image: "/images/lawyer.jpg",
    title: "Tenant Issues",
    desc: "Landlord-tenant disputes",
    slug: "tenant-issues",
    count: 31,
    urgent: false,
  },
  {
    icon: "📉",
    image: "/images/lawyer.jpg",
    title: "Business Dispute",
    desc: "Resolve business conflicts",
    slug: "business-dispute",
    count: 24,
    urgent: false,
  },
  {
    icon: "💼",
    image: "/images/lawyer.jpg",
    title: "Employment Termination",
    desc: "Wrongful termination cases",
    slug: "employment-termination",
    count: 19,
    urgent: false,
  },
  {
    icon: "🌍",
    image: "/images/lawyer.jpg",
    title: "Immigration Issues",
    desc: "Visa and immigration problems",
    slug: "immigration-issues",
    count: 16,
    urgent: false,
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const urgent = searchParams.get("urgent");

    let filteredIssues = legalIssues;

    if (urgent === "true") {
      filteredIssues = filteredIssues.filter((i) => i.urgent);
    }

    return NextResponse.json(
      {
        issues: filteredIssues,
        count: filteredIssues.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get legal issues error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

