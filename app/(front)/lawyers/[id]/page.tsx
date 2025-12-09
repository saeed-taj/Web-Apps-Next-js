"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Phone, Mail, Calendar, Loader2 } from "lucide-react";
import Navbar from "@/components/Frontend/Navbar";
import { useAuthStore } from "@/lib/store/auth";
import Link from "next/link";

type Lawyer = {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  reviews: number;
  location: string;
  phone: string;
  email: string;
  fees: number;
  available?: boolean;
};

export default function LawyerDetail() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lawyerId = params?.id as string;
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    if (lawyerId) {
      fetchLawyer();
    }
  }, [lawyerId]);

  useEffect(() => {
    // Check if redirected from login
    const redirect = searchParams.get("redirect");
    if (redirect && user && user.role === "client") {
      // User just logged in, they can now book
    }
  }, [user, searchParams]);

  const fetchLawyer = async () => {
    try {
      const response = await fetch(`/api/lawyers/search`);
      const data = await response.json();
      const foundLawyer = data.lawyers?.find((l: Lawyer) => l.id === lawyerId);
      if (foundLawyer) {
        setLawyer(foundLawyer);
      }
    } catch (error) {
      console.error("Error fetching lawyer:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async () => {
    if (!user || user.role !== "client") {
      router.push(`/login?redirect=/lawyers/${lawyerId}&role=client`);
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time");
      return;
    }

    setBooking(true);
    try {
      const response = await fetch("/api/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lawyerId: lawyerId,
          clientId: user.id,
          date: selectedDate,
          time: selectedTime,
          type: "Consultation",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to book appointment");
      }

      alert("Appointment booked successfully!");
      router.push("/appointmentsClients");
    } catch (error: any) {
      alert(error.message || "Failed to book appointment");
    } finally {
      setBooking(false);
    }
  };

  // Generate available slots (mock - replace with API call)
  const generateAvailableSlots = () => {
    const slots = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const times = ["10:00 AM", "2:00 PM", "4:00 PM"];
      slots.push({
        date: date.toISOString().split("T")[0],
        times,
      });
    }
    return slots;
  };

  const availableSlots = generateAvailableSlots();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-600">Lawyer not found</p>
              <Link href="/LawyersOverview">
                <Button className="mt-4">Back to Lawyers</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Lawyer Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="shrink-0">
                    <Image
                      src="/images/lawyer.jpg"
                      alt={lawyer.name}
                      width={200}
                      height={200}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{lawyer.name}</h1>
                    <p className="text-gray-600 mb-4">{lawyer.specialization}</p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{lawyer.rating}</span>
                        <span className="text-gray-500">({lawyer.reviews} reviews)</span>
                      </div>
                      <Badge variant="secondary">{lawyer.experience} years experience</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{lawyer.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Phone className="h-4 w-4" />
                      <span>{lawyer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{lawyer.email}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Experienced lawyer specializing in {lawyer.specialization} with over {lawyer.experience} years of
                  practice. Committed to providing excellent legal representation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b pb-4 last:border-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">Client {i}</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">Excellent service! Very professional and helpful.</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Book Appointment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Consultation Fee</label>
                  <p className="text-2xl font-bold text-primary">Rs. {lawyer.fees.toLocaleString()}</p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Select Date
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Choose a date</option>
                    {availableSlots.map((slot) => (
                      <option key={slot.date} value={slot.date}>
                        {new Date(slot.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedDate && (
                  <div>
                    <label className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Select Time
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableSlots
                        .find((slot) => slot.date === selectedDate)
                        ?.times.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-2 border rounded-md text-sm transition-colors ${
                              selectedTime === time
                                ? "bg-primary text-primary-foreground border-primary"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {!user || user.role !== "client" ? (
                  <Link href={`/login?redirect=/lawyers/${lawyerId}&role=client`}>
                    <Button className="w-full">Login to Book Appointment</Button>
                  </Link>
                ) : (
                  <Button className="w-full" onClick={handleBookAppointment} disabled={booking}>
                    {booking ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      <>
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Appointment
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
