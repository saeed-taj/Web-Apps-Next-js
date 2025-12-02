'use client'
import Image from "next/image";
import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
// fixed top-0 border-b w-full border-gray-400/30 
  return (
    <header className="bg-gray-900 ">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
            <img
              alt="LawMate Logo"
              src="/images/logo.svg"
              className="h-12 w-20"
            />
            <span className="text-white text-xl font-bold italic font-serif tracking-wide">LawMate</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* Main Links */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a href="#" className="text-sm font-semibold text-white">Home</a>
          <a href="#" className="text-sm font-semibold text-white">Lawyers</a>
          <a href="#" className="text-sm font-semibold text-white">About</a>
          <a href="#" className="text-sm font-semibold text-white">Contact</a>
        </PopoverGroup>

        {/* Desktop Login Buttons */}
        <div className="hidden lg:flex lg:gap-4 lg:flex-1 lg:justify-end">
          
          {/* Client Login */}
          <a
            href="#"
            className="text-sm font-semibold text-white border border-gray-400 px-5 py-2.5 rounded-lg hover:bg-white/10 transition"
          >
            Client Login
          </a>

          {/* Lawyer Login */}
          <a
            href="#"
            className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-lg shadow-md transition"
          >
            Lawyer Login →
          </a>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />

        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm">
          
          {/* Mobile Header */}
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
              <img
                alt="LawMate Logo"
                src="/images/logo.svg"
                className="h-8 w-auto"
              />
              <span className="text-white text-xl font-bold">LawMate</span>
            </a>

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
                <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5">Home</a>
                <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5">Lawyers</a>
                <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5">About</a>
                <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5">Contact</a>
              </div>

              {/* Mobile Logins */}
              <div className="py-6 space-y-4">

                {/* Client Login */}
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold text-white border border-gray-400 hover:bg-white/5"
                >
                  Client Login
                </a>

                {/* Lawyer Login */}
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500"
                >
                  Lawyer Login →
                </a>

              </div>
            </div>
          </div>

        </DialogPanel>
      </Dialog>
    </header>
  )
}
