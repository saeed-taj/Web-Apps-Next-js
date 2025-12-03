"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import { useIsMobile } from "./hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const megaMenus = [
  {
    Title : "Top Booked",
    Services : [
       {
    title: "Power of Attorney",
    icon: "✍️",
    description: "Create POA document",
    popular: true,
    urgency: "normal",
    category: "documentation"
  },
  {
    title: "FIR Quashing",
    icon: "🚨",
    description: "Remove police case/FIR",
    urgent: true,
    category: "criminal"
  },
  {
    title: "Consumer Complaint",
    icon: "🛒",
    description: "File consumer court case",
    popular: true,
    category: "civil"
  },
  {
    title: "Video Consultation",
    icon: "🎥",
    description: "Instant video call with lawyer",
    popular: true,
    category: "general"
  },
  {
    title: "Legal Notice Drafting",
    icon: "⚖️",
    description: "Draft & send legal notice",
    popular: true,
    category: "documentation"
  },
  {
    title: "Bail Application",
    icon: "🔓",
    description: "Emergency bail filing",
    urgent: true,
    category: "criminal"
  },
  {
    title: "Divorce Consultation",
    icon: "💔",
    description: "Divorce & separation advice",
    popular: true,
    category: "family"
  },
  {
    title: "Will Writing",
    icon: "📝",
    description: "Create legally valid will",
    popular: true,
    category: "documentation"
  },
  {
    title: "Property Mutation",
    icon: "🏠",
    description: "Transfer property ownership",
    popular: true,
    category: "property"
  },
  {
    title: "Company Registration",
    icon: "🏢",
    description: "Register new business/company",
    popular: true,
    category: "corporate"
  },
  {
    title: "Court Case Filing",
    icon: "🏛️",
    description: "File new case in court",
    popular: true,
    category: "general"
  },
  {
    title: "Marriage Certificate",
    icon: "💍",
    description: "Register marriage legally",
    popular: true,
    category: "family"
  },
  {
    title: "Tenant Eviction",
    icon: "🏚️",
    description: "Legal eviction process",
    urgent: true,
    category: "property"
  },
  {
    title: "Cheque Bounce Case",
    icon: "💸",
    description: "Recover bounced cheque amount",
    popular: true,
    category: "civil"
  },
  {
    title: "Child Custody",
    icon: "👶",
    description: "Child custody legal advice",
    urgent: true,
    category: "family"
  },
  {
    title: "Visa Application",
    icon: "🛂",
    description: "Visa documentation & filing",
    popular: true,
    category: "immigration"
  },
  {
    title: "Labour Dispute",
    icon: "👷",
    description: "Workplace dispute resolution",
    popular: true,
    category: "employment"
  },
  {
    title: "Affidavit Drafting",
    icon: "📜",
    description: "Create legal affidavits",
    popular: true,
    category: "documentation"
  },
  {
    title: "Rental Agreement",
    icon: "📃",
    description: "Create rental/lease agreement",
    popular: true,
    category: "property"
  },
  {
    title: "Cyber Crime Complaint",
    icon: "💻",
    description: "Online fraud/harassment cases",
    urgent: true,
    category: "criminal"
  },
  {
    title: "Trademark Registration",
    icon: "™️",
    description: "Register trademark/brand",
    popular: true,
    category: "corporate"
  },
  {
    title: "Domestic Violence Case",
    icon: "🚫",
    description: "Protection from domestic abuse",
    urgent: true,
    category: "family"
  },
  {
    title: "Medical Negligence",
    icon: "🏥",
    description: "Medical malpractice case",
    urgent: true,
    category: "civil"
  },
  {
    title: "Pension Case",
    icon: "👵",
    description: "Pension claim & disputes",
    popular: true,
    category: "employment"
  },
  {
    title: "Deportation Defense",
    icon: "🛬",
    description: "Fight deportation orders",
    urgent: true,
    category: "immigration"
  },
  {
    title: "Partnership Dissolution",
    icon: "🤝",
    description: "Close business partnership",
    popular: true,
    category: "corporate"
  },
  {
    title: "Inheritance Dispute",
    icon: "🏘️",
    description: "Property inheritance cases",
    urgent: true,
    category: "family"
  },
  {
    title: "Loan Recovery",
    icon: "💰",
    description: "Recover loans legally",
    popular: true,
    category: "civil"
  },
  {
    title: "Name Change",
    icon: "📛",
    description: "Legal name change process",
    popular: true,
    category: "documentation"
  },
  {
    title: "Sexual Harassment Case",
    icon: "🚺",
    description: "Workplace harassment complaint",
    urgent: true,
    category: "employment"
  }
    ]
  },
  {
    Title : "Lawyers",
    Services : [
       {
    title: "Power of Attorney",
    icon: "✍️",
    description: "Create POA document",
    popular: true,
    urgency: "normal",
    category: "documentation"
  },
  {
    title: "FIR Quashing",
    icon: "🚨",
    description: "Remove police case/FIR",
    urgent: true,
    category: "criminal"
  },
  {
    title: "Consumer Complaint",
    icon: "🛒",
    description: "File consumer court case",
    popular: true,
    category: "civil"
  },
  {
    title: "Video Consultation",
    icon: "🎥",
    description: "Instant video call with lawyer",
    popular: true,
    category: "general"
  },
  {
    title: "Legal Notice Drafting",
    icon: "⚖️",
    description: "Draft & send legal notice",
    popular: true,
    category: "documentation"
  },
  {
    title: "Bail Application",
    icon: "🔓",
    description: "Emergency bail filing",
    urgent: true,
    category: "criminal"
  },
  {
    title: "Divorce Consultation",
    icon: "💔",
    description: "Divorce & separation advice",
    popular: true,
    category: "family"
  },
  {
    title: "Will Writing",
    icon: "📝",
    description: "Create legally valid will",
    popular: true,
    category: "documentation"
  },
  {
    title: "Property Mutation",
    icon: "🏠",
    description: "Transfer property ownership",
    popular: true,
    category: "property"
  },
  {
    title: "Company Registration",
    icon: "🏢",
    description: "Register new business/company",
    popular: true,
    category: "corporate"
  },
  {
    title: "Court Case Filing",
    icon: "🏛️",
    description: "File new case in court",
    popular: true,
    category: "general"
  },
  {
    title: "Marriage Certificate",
    icon: "💍",
    description: "Register marriage legally",
    popular: true,
    category: "family"
  },
  {
    title: "Tenant Eviction",
    icon: "🏚️",
    description: "Legal eviction process",
    urgent: true,
    category: "property"
  },
  {
    title: "Cheque Bounce Case",
    icon: "💸",
    description: "Recover bounced cheque amount",
    popular: true,
    category: "civil"
  },
  {
    title: "Child Custody",
    icon: "👶",
    description: "Child custody legal advice",
    urgent: true,
    category: "family"
  },
  {
    title: "Visa Application",
    icon: "🛂",
    description: "Visa documentation & filing",
    popular: true,
    category: "immigration"
  },
  {
    title: "Labour Dispute",
    icon: "👷",
    description: "Workplace dispute resolution",
    popular: true,
    category: "employment"
  },
  {
    title: "Affidavit Drafting",
    icon: "📜",
    description: "Create legal affidavits",
    popular: true,
    category: "documentation"
  },
  {
    title: "Rental Agreement",
    icon: "📃",
    description: "Create rental/lease agreement",
    popular: true,
    category: "property"
  },
  {
    title: "Cyber Crime Complaint",
    icon: "💻",
    description: "Online fraud/harassment cases",
    urgent: true,
    category: "criminal"
  },
  {
    title: "Trademark Registration",
    icon: "™️",
    description: "Register trademark/brand",
    popular: true,
    category: "corporate"
  },
  {
    title: "Domestic Violence Case",
    icon: "🚫",
    description: "Protection from domestic abuse",
    urgent: true,
    category: "family"
  },
  {
    title: "Medical Negligence",
    icon: "🏥",
    description: "Medical malpractice case",
    urgent: true,
    category: "civil"
  },
  {
    title: "Pension Case",
    icon: "👵",
    description: "Pension claim & disputes",
    popular: true,
    category: "employment"
  },
  {
    title: "Deportation Defense",
    icon: "🛬",
    description: "Fight deportation orders",
    urgent: true,
    category: "immigration"
  },
  {
    title: "Partnership Dissolution",
    icon: "🤝",
    description: "Close business partnership",
    popular: true,
    category: "corporate"
  },
  {
    title: "Inheritance Dispute",
    icon: "🏘️",
    description: "Property inheritance cases",
    urgent: true,
    category: "family"
  },
  {
    title: "Loan Recovery",
    icon: "💰",
    description: "Recover loans legally",
    popular: true,
    category: "civil"
  },
  {
    title: "Name Change",
    icon: "📛",
    description: "Legal name change process",
    popular: true,
    category: "documentation"
  },
  {
    title: "Sexual Harassment Case",
    icon: "🚺",
    description: "Workplace harassment complaint",
    urgent: true,
    category: "employment"
  }
    ]
  },
  { 
    Title : "Specialities",
    type: "categories",
    columns: 4,
    Services: [
      {
        title: "Criminal Law",
        icon: "⚖️",
        description: [
          "Bail Applications",
          "FIR Quashing",
          "Appeal Filing",
          "Cyber Crime",
          "Drug Cases",
          "Murder/Trial",
          "White Collar Crime"
        ]
      },
      {
        title: "Family Law",
        icon: "👨‍👩‍👧‍👦",
        description: [
          "Divorce",
          "Child Custody",
          "Khula",
          "Maintenance",
          "Marriage Contracts",
          "Inheritance",
          "Guardianship"
        ]
      },
      {
        title: "Civil Law",
        icon: "📜",
        description: [
          "Property Disputes",
          "Rental Cases",
          "Cheque Bouncing",
          "Loan Recovery",
          "Consumer Cases",
          "Defamation",
          "Trespassing"
        ]
      },
      {
        title: "Corporate Law",
        icon: "🏢",
        description: [
          "Company Registration",
          "Contract Drafting",
          "Startup Legal",
          "Tax Compliance",
          "FBR Matters",
          "Mergers & Acquisitions",
          "Intellectual Property"
        ]
      },
      {
        title: "Immigration",
        icon: "🛂",
        description: [
          "Visa Applications",
          "Work Permits",
          "Citizenship",
          "Deportation Defense",
          "Family Sponsorship",
          "Asylum Cases",
          "Passport Issues"
        ]
      },
      {
        title: "Property Law",
        icon: "🏠",
        description: [
          "Property Mutation",
          "Sale Agreement",
          "Land Dispute",
          "Construction Law",
          "Zoning Issues",
          "Tenant Eviction",
          "Property Fraud"
        ]
      },
      {
        title: "Employment Law",
        icon: "💼",
        description: [
          "Wrongful Termination",
          "Salary Dispute",
          "Harassment Cases",
          "Labor Court",
          "Pension Matters",
          "Service Rules",
          "Employment Contracts"
        ]
      },
      {
        title: "Documentation",
        icon: "📝",
        description: [
          "Will Writing",
          "Power of Attorney",
          "Affidavit",
          "Agreement Drafting",
          "Legal Notices",
          "Deed Registration",
          "Notary Services"
        ]
  }]
  },
  {
    Title : "Legal Issues",  // Instead of "Symptoms"
    type: "problems",
    columns: 3,
    Services: [
      {
        title: "Urgent Help Needed",
        icon: "🚨",
        description: [
          "Arrested by Police",
          "Need Bail Immediately",
          "Court Date Tomorrow",
          "Eviction Notice Received",
          "Restraining Order Needed",
          "Urgent Injunction"
        ]
      },
      {
        title: "Family Problems",
        icon: "❤️‍🩹",
        description: [
          "Want Divorce",
          "Child Custody Issue",
          "Domestic Violence",
          "Property Inheritance",
          "Marriage Registration",
          "Maintenance Not Paid"
        ]
      },
      {
        title: "Business Issues",
        icon: "📉",
        description: [
          "Contract Breached",
          "Unpaid Debts",
          "Business Partner Dispute",
          "Tax Notice Received",
          "Company Registration",
          "Trademark Issue"
        ]
      },
      {
        title: "Property Matters",
        icon: "🔑",
        description: [
          "Land Dispute",
          "Tenant Not Paying Rent",
          "Property Fraud",
          "Mutation Transfer",
          "Construction Dispute",
          "Boundary Issue"
        ]
      },
      {
        title: "Personal Issues",
        icon: "🙍",
        description: [
          "Car Accident Injury",
          "Medical Malpractice",
          "Defamation Case",
          "Consumer Complaint",
          "Insurance Claim",
          "Harassment at Work"
        ]
      },
      {
        title: "Immigration Issues",
        icon: "🌍",
        description: [
          "Visa Rejected",
          "Work Permit Needed",
          "Citizenship Application",
          "Deportation Threat",
          "Family Visa",
          "Passport Problems"
        ]
      }
    ]
  }

];
    
  

export default function MegaMenu() {
  const isMobile = useIsMobile()

  return (
    <NavigationMenu className="cursor-pointer">
      <NavigationMenuList className="flex-wrap space-x-3">

        {
          megaMenus.map((item , i) => {
           return (
  <NavigationMenuItem key={i}>
    <NavigationMenuTrigger>{item.Title}</NavigationMenuTrigger>

    <NavigationMenuContent className="bg-white shadow-lg rounded-lg p-4 cursor-pointer">
      <ul className="grid gap-3 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">

        {item.Services.map((component) => (
          
          <ListItem
            key={component.title}
            title={component.title}
            href={`${component.title}`}
          >
            {component.icon}

            {/* If description is a string */}
            {!Array.isArray(component.description) && (
              <p>{component.description}</p>
            )}

            {/* If description is an array */}
            {Array.isArray(component.description) && (
              <ul className="ml-3 list-disc text-sm">
                {component.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            )}

          </ListItem>

        ))}

      </ul>
    </NavigationMenuContent>
  </NavigationMenuItem>
)

          })
        }
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white shadow-lg rounded-lg p-4">
            <ul className="grid gap-3 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full flex-col justify-end rounded-lg bg-gradient-to-b from-gray-50 to-white p-4 hover:shadow-md transition-shadow duration-200"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-semibold">shadcn/ui</div>
                    <p className="text-gray-500 text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>*/}

        

        {/* <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white shadow-lg rounded-lg p-4">
            <ul className="grid w-[200px] gap-3">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                    <CircleHelpIcon className="text-gray-400" /> Backlog
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                    <CircleIcon className="text-gray-400" /> To Do
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                    <CircleCheckIcon className="text-gray-400" /> Done
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
}: {
  title: string
  children: React.ReactNode
  href: string
})
{
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block rounded-lg p-2 hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="font-semibold text-sm">{title}</div>
          <p className="text-gray-500 text-xs mt-1">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
