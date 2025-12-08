'use client'
import { useMemo, useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/auth";

type NavbarVariant = "public" | "lawyer" | "client";

interface NavbarProps {
  variant?: NavbarVariant;
}

export default function Navbar({ variant = "public" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const links = useMemo(() => {
    if (variant === "lawyer") {
      return [
        { href: "/dashboardLawyers", label: "Dashboard" },
        { href: "/appointmentsLawyers", label: "Appointments" },
        { href: "/reviewsLawyers", label: "Reviews" },
        { href: "/schedule", label: "Schedule" },
      ];
    }

    return [
      { href: "/", label: "Home" },
      { href: "/LawyersOverview", label: "Lawyers" },
      { href: "#about", label: "About" },
      { href: "#contact", label: "Contact" },
    ];
  }, [variant]);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-gray-900 border-b border-white/5 sticky top-0 z-30 backdrop-blur">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <img alt="LawMate Logo" src="/images/logo.svg" className="h-12 w-20" />
            <span className="text-white text-xl font-bold italic font-serif tracking-wide">LawMate</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
          >
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* Main Links */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-white hover:text-blue-400 transition"
            >
              {link.label}
            </Link>
          ))}
        </PopoverGroup>

        {/* Desktop Actions */}
        <div className="hidden lg:flex lg:gap-4 lg:flex-1 lg:justify-end items-center">
          {user ? (
            <>
              <span className="text-sm font-semibold text-white bg-white/10 px-4 py-2 rounded-lg">
                {user.name} • {user.role}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-white border border-gray-400 px-5 py-2.5 rounded-lg hover:bg-white/10 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login?role=client"
                className="text-sm font-semibold text-white border border-gray-400 px-5 py-2.5 rounded-lg hover:bg-white/10 transition"
              >
                Client Login
              </Link>
              <Link
                href="/login?role=lawyer"
                className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-lg shadow-md transition"
              >
                Lawyer Login →
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* MOBILE MENU */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-black/40" />

        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm">
          {/* Mobile Header */}
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <img alt="LawMate Logo" src="/images/logo.svg" className="h-8 w-auto" />
              <span className="text-white text-xl font-bold">LawMate</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
            >
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* Mobile Menu Options */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              {/* Regular Navigation */}
              <div className="space-y-2 py-6">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Logins */}
              <div className="py-6 space-y-4">
                {user ? (
                  <>
                    <div className="text-white font-semibold px-3">Signed in as {user.name}</div>
                    <button
                      onClick={handleLogout}
                      className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold text-white border border-gray-400 hover:bg-white/5 w-full text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login?role=client"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold text-white border border-gray-400 hover:bg-white/5"
                    >
                      Client Login
                    </Link>
                    <Link
                      href="/login?role=lawyer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500"
                    >
                      Lawyer Login →
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
