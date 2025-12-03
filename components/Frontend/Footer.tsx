"use client";
import Link from "next/link"
import { Scale, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Scale className="h-8 w-8" />
              <span className="text-2xl font-bold">LawMate</span>
            </div>
            <p className="text-primary-foreground/80">
              Connecting clients with experienced legal professionals across Pakistan.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/LawyersOverview" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Find Lawyers
              </Link>
              <Link href="/how-it-works" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                How It Works
              </Link>
              <Link href="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* For Lawyers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Lawyers</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/register?role=lawyer" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Join as Lawyer
              </Link>
              <Link href="/lawyer-benefits" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Benefits
              </Link>
              <Link href="/lawyer-resources" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Resources
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Mail className="h-4 w-4" />
                <span>support@lawmate.com</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4" />
                <span>Karachi, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/80">
          <p>&copy; {new Date().getFullYear()} LawMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
