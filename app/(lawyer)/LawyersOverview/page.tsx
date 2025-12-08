"use client";

import { useState } from "react";
import Navbar from "@/components/Frontend/Navbar";
import Footer from "@/components/Frontend/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Calendar } from "lucide-react";

// Mock data - will be replaced with real data from backend
const mockLawyers = [
  {
    id: "1",
    name: "Sarah Ahmed",
    specialization: "Family Law",
    city: "Karachi",
    rating: 4.8,
    reviews: 156,
    experience: 12,
    hourlyRate: 5000,
    avatar: "",
  },
  {
    id: "2",
    name: "Ali Hassan",
    specialization: "Corporate Law",
    city: "Lahore",
    rating: 4.9,
    reviews: 203,
    experience: 15,
    hourlyRate: 7000,
    avatar: "",
  },
  {
    id: "3",
    name: "Fatima Khan",
    specialization: "Criminal Law",
    city: "Islamabad",
    rating: 4.7,
    reviews: 134,
    experience: 10,
    hourlyRate: 6000,
    avatar: "",
  },
];

export default function FindLawyers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar variant="lawyer" />
      <main className="flex-1 bg-muted">
        <div className="container mx-auto px-4 py-8">
          {/* Search Section */}
          <div className="bg-background rounded-lg p-6 shadow-sm mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-6">Find Your Lawyer</h1>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by specialization or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              {mockLawyers.length} Lawyers Available
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockLawyers.map((lawyer) => (
                <Card key={lawyer.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={lawyer.avatar} alt={lawyer.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                          {lawyer.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground">{lawyer.name}</h3>
                        <Badge variant="secondary" className="mt-1">
                          {lawyer.specialization}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {lawyer.city}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{lawyer.rating}</span>
                      <span className="text-muted-foreground">({lawyer.reviews} reviews)</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {lawyer.experience} years experience
                    </div>
                    <div className="text-lg font-semibold text-foreground">
                      Rs. {lawyer.hourlyRate.toLocaleString()}/hour
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="hero" className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Appointment
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
