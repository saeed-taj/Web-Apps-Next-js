"use client";

import Image from "next/image";
import { Button } from "@material-tailwind/react";
import SearchBar from "./Searchbar";
import TransitionalText from "./TransitionalText";
import { Gavel, MapPin, ShieldCheck, Star, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type LawyerCard = {
  id: string;
  name: string;
  specialization: string;
  location: string;
  rating?: number;
};

const quickActions = [
  {
    title: "Consult Online Now",
    description: "Instantly connect with lawyers on video",
    badge: "Live",
    color: "from-amber-400 to-orange-500",
  },
  {
    title: "In-Office Visits",
    description: "Book a physical appointment",
    badge: "Top Choice",
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Case Reviews",
    description: "Get your documents reviewed fast",
    badge: "New",
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Legal Drafting",
    description: "Contracts, notices and more",
    badge: "Popular",
    color: "from-purple-500 to-fuchsia-500",
  },
];

export default function Hero() {
  const [results, setResults] = useState<LawyerCard[]>([]);

  return (
    <header className="bg-gradient-to-r from-indigo-950 via-purple-900 to-indigo-800 text-white py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Section */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-amber-300 font-semibold">
              <ShieldCheck className="h-5 w-5" />
              50K+ cases guided across Pakistan
            </div>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Find and Book the <br />
              <span className="text-amber-300">
                <TransitionalText />
              </span>{" "}
              near you
            </h1>

            <p className="text-lg text-white/80 max-w-2xl">
              Connect with verified lawyers across Pakistan for online consultations or in-clinic visits.
              Compare expertise, ratings, and availability in one place.
            </p>

            <SearchBar onResults={setResults} />

            <div className="flex flex-wrap gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-300" />
                Islamabad • Lahore • Karachi • Peshawar • Multan
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-300" />
                Rated by 9M+ consultations
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-sm uppercase tracking-wide text-white/60">Join as</span>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register?role=client" className="w-full sm:w-auto">
                  <Button
                    color="white"
                    className="w-full sm:w-40 border border-white/30 text-gray-900 bg-white font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                  >
                    <User className="h-5 w-5" />
                    Client
                  </Button>
                </Link>
                <Link href="/register?role=lawyer" className="w-full sm:w-auto">
                  <Button
                    className="w-full sm:w-40 bg-gray-900 hover:bg-gray-800 text-white font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                  >
                    <Gavel className="h-5 w-5" />
                    Lawyer
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center relative">
            <div className="absolute -top-8 -left-6 bg-amber-300/20 blur-3xl h-32 w-32 rounded-full" />
            <Image
              width={1024}
              height={1024}
              alt="Professional legal consultation"
              src="/images/hero.jpg"
              className="h-[28rem] w-full max-w-md rounded-3xl object-cover shadow-2xl ring-4 ring-white/10 lg:h-[36rem]"
            />
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((item) => (
            <div
              key={item.title}
              className={`rounded-xl p-4 bg-gradient-to-r ${item.color} text-white shadow-lg flex flex-col gap-2`}
            >
              <div className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full w-fit">{item.badge}</div>
              <div className="text-lg font-semibold">{item.title}</div>
              <p className="text-sm text-white/80">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Search results preview */}
        {results.length > 0 && (
          <div className="mt-10 bg-white/10 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Top matches</h2>
              <Link href="/LawyersOverview" className="text-sm text-amber-200 hover:text-white">
                View all
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.slice(0, 3).map((lawyer) => (
                <div key={lawyer.id} className="bg-white text-gray-900 rounded-xl p-4 shadow-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{lawyer.name}</h3>
                      <p className="text-sm text-gray-600">{lawyer.specialization}</p>
                    </div>
                    {lawyer.rating && (
                      <span className="text-sm font-semibold text-amber-600 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        {lawyer.rating}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-sm text-gray-700 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    {lawyer.location}
                  </div>
                  <Link
                    href={`/lawyers/${lawyer.id}`}
                    className="mt-3 inline-flex items-center gap-2 text-blue-600 font-semibold text-sm"
                  >
                    View profile →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
