"use client";

import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";
import SearchBar from "./Searchbar";
import TransitionalText from "./TransitionalText";
import { Gavel } from "lucide-react";

export default function Hero() {
  return (
    <header className="bg-white py-16 lg:py-6">
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
            <span className="text-orange-400">
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

            <div className="flex flex-col md:flex-row gap-4">

              <Button
                color="white"
                className="w-full md:w-48 border border-gray-300 text-gray-800 
                flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 
                 hover:bg-gray-100 cursor-pointer"
              >
                Client
              </Button>

              <Button
  className="w-full md:w-48 
  bg-gray-900 hover:bg-gray-700 active:bg-blue-900 
  text-white flex items-center justify-center gap-2 
  shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
>
  <Gavel className="h-5 w-5" />
  Lawyer
</Button>

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
