"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Calendar, Loader2 } from "lucide-react";
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

export default function LawyersTab() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/lawyers/search")
      .then((res) => res.json())
      .then((data) => {
        setLawyers(data.lawyers || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching lawyers:", err);
        setLoading(false);
      });
  }, []);

  const handleBookAppointment = (lawyerId: string) => {
    if (!user || user.role !== "client") {
      router.push(`/login?redirect=/lawyers/${lawyerId}&role=client`);
      return;
    }
    router.push(`/lawyers/${lawyerId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (lawyers.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
        No lawyers available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {lawyers.slice(0, 8).map((lawyer) => (
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
            <div className="text-lg font-semibold text-foreground">Rs. {lawyer.fees.toLocaleString()}/hour</div>
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
  );
}

