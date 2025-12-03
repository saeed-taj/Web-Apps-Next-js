"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  User, 
  LogOut,
  Gavel,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  role?: "client" | "lawyer";
}

export default function Sidebar({ role = "client" }: SidebarProps) {
  const pathname = usePathname();

  const clientLinks = [
    { href: "/dashboardClients", label: "Dashboard", icon: LayoutDashboard },
    { href: "/appointmentsClients", label: "Appointments", icon: Calendar },
    { href: "/reviewsClients", label: "Reviews", icon: MessageSquare },
    { href: "/profile", label: "Profile", icon: User },
  ];

  const lawyerLinks = [
    { href: "/dashboardLawyers", label: "Dashboard", icon: LayoutDashboard },
    { href: "/appointmentsLawyers", label: "Appointments", icon: Calendar },
    { href: "/schedule", label: "Schedule", icon: Calendar },
    { href: "/reviewsLawyers", label: "Reviews", icon: MessageSquare },
    { href: "/profile", label: "Profile", icon: User },
  ];

  const links = role === "lawyer" ? lawyerLinks : clientLinks;

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Gavel className="h-6 w-6" />
          <span className="text-xl font-bold">LawMate</span>
        </div>
        <p className="text-sm text-gray-400 capitalize">{role} Portal</p>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white w-full transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

