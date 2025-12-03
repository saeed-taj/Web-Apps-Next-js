"use client";

import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";
import SearchBar from "./Searchbar";
import TransitionalText from "./TransitionalText";
import { Gavel, User } from "lucide-react";
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  return (
    <header className="bg-white py-16 lg:py-6 ">
      <div className="container mx-auto px-4 grid w-full min-h-[60vh] grid-cols-1 items-center gap-14 lg:grid-cols-2">

        {/* Left Section */}
        <div className="order-2 lg:order-1 flex flex-col gap-8">

          {/* FIXED SEARCH BAR SPACING + WIDTH */}
          <div className="w-full md:w-10/12 lg:w-9/12 xl:w-8/12">
            <SearchBar />
          </div>

          <Typography
            variant="h1"
            className="text-3xl lg:text-5xl font-bold !leading-tight text-blue-gray-900"
          >
            Find and Book the <br />
            <span className="text-orange-400 mb-0.6">
              <TransitionalText />
            </span>{" "}
            near you
          </Typography>

          <Typography
            variant="lead"
            className="text-gray-600 md:pr-16 xl:pr-28"
          >
            Connect with experienced legal professionals in Pakistan.
            Browse qualified lawyers, read reviews, and book consultations
            with ease – all in one place.
          </Typography>

          {/* Join as */}
          <div className="flex flex-col gap-3">

            <Typography
              variant="small"
              className="font-medium text-gray-700 uppercase"
            >
              Join as
            </Typography>

            <div className="flex align-center justify-center flex-col md:flex-row gap-4">
              <Link href="/register?role=client" className="w-full md:w-48">
                <Button
                  color="white"
                  className="w-full border border-gray-300 text-gray-800 
                  flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 
                  hover:bg-gray-100 cursor-pointer"
                >
                  <User className="h-5 w-5"/>
                  Client
                </Button>
              </Link>

              <Link href="/register" className="w-full md:w-48">
                <Button
                  className="w-full 
                  bg-gray-900 hover:bg-gray-700 active:bg-blue-900 
                  text-white flex items-center justify-center gap-2 
                  shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <Gavel className="h-5 w-5" />
                  Lawyer
                </Button>
              </Link>
            </div>
          </div>

<div className="py-4 flex gap-6 align-center justify-center ">
  <div className="flex flex-col items-center gap-2">
    <span className="font-bold text-lg">
      67+
    </span>
    <span className="text-sm text-gray-600 font-bold">
      Active Lawyers
    </span>
  </div>
    <div className="flex flex-col align-center justify-center items-center gap-2">
    <span className="font-bold text-lg">
      130+
    </span>
    <span className="text-sm text-gray-600 font-bold">
      Active Clients
    </span>
  </div>
</div>

        </div>

        {/* Right Image */}
        <div className="order-1 lg:order-2 flex justify-center">
          <Image
            width={1024}
            height={1024}
            alt="Professional legal consultation"
            src="/images/hero.jpg"
            className="h-[28rem] w-full max-w-md rounded-2xl object-cover shadow-xl lg:h-[40rem]"
          />
        </div>
      </div>
    </header>
  );
}
