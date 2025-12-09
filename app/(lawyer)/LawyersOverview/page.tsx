"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Frontend/Navbar";
import Footer from "@/components/Frontend/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Calendar, Loader2 } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth";
import { useRouter } from "next/navigation";

type Lawyer = {
  id: string;
  name: string;
  specialization: string;
  location: string;
  rating: number;
  reviews: number;
  experience: number;
  fees: number;
  available?: boolean;
};

export default function FindLawyers() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchLawyers();
  }, [searchQuery, city]);

  const fetchLawyers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      if (city) params.set("location", city);

      const response = await fetch(`/api/lawyers/search?${params.toString()}`);
      const data = await response.json();
      setLawyers(data.lawyers || []);
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (lawyerId: string) => {
    if (!user || user.role !== "client") {
      router.push(`/login?redirect=/lawyers/${lawyerId}&role=client`);
      return;
    }
    router.push(`/lawyers/${lawyerId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar variant="public" />
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
              {loading ? "Loading..." : `${lawyers.length} Lawyers Available`}
            </h2>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : lawyers.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
                No lawyers found matching your search criteria.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lawyers.map((lawyer) => (
                  <Card key={lawyer.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="" alt={lawyer.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                            {lawyer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-foreground">{lawyer.name}</h3>
                          <Badge variant="secondary" className="mt-1">
                            {lawyer.specialization.split(",")[0]}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {lawyer.location.split(",")[0]}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{lawyer.rating}</span>
                        <span className="text-muted-foreground">({lawyer.reviews} reviews)</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{lawyer.experience} years experience</div>
                      <div className="text-lg font-semibold text-foreground">
                        Rs. {lawyer.fees.toLocaleString()}/hour
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="hero"
                        className="w-full"
                        onClick={() => handleBookAppointment(lawyer.id)}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Appointment
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
