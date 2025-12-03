"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Phone, Mail, Calendar } from "lucide-react";
import Navbar from "@/components/Frontend/Navbar";
import Link from "next/link";

export default function LawyerDetail() {
  const params = useParams();
  const lawyerId = params?.id as string;
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Mock lawyer data - replace with API call
  const lawyer = {
    id: lawyerId,
    name: "Dr. Ahmed Khan",
    specialization: "Criminal Law, Family Law",
    experience: "15 years",
    rating: 4.8,
    reviews: 127,
    location: "Karachi, Pakistan",
    phone: "+92 300 1234567",
    email: "ahmed.khan@lawmate.com",
    bio: "Experienced lawyer specializing in criminal and family law with over 15 years of practice. Committed to providing excellent legal representation.",
    fees: "Rs. 5,000",
    availableSlots: [
      { date: "2024-01-15", times: ["10:00 AM", "2:00 PM", "4:00 PM"] },
      { date: "2024-01-16", times: ["11:00 AM", "3:00 PM"] },
      { date: "2024-01-17", times: ["10:00 AM", "2:00 PM", "4:00 PM", "5:00 PM"] },
    ],
  };

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time");
      return;
    }
    // Navigate to booking page or show booking modal
    console.log("Booking appointment:", { lawyerId, selectedDate, selectedTime });
  };

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
                  <div className="flex-shrink-0">
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
                      <Badge variant="secondary">{lawyer.experience} experience</Badge>
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
                <p className="text-gray-700">{lawyer.bio}</p>
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
                                star <= 5
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">
                        Excellent service! Very professional and helpful.
                      </p>
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
                  <p className="text-2xl font-bold text-primary">{lawyer.fees}</p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Select Date
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Choose a date</option>
                    {lawyer.availableSlots.map((slot) => (
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
                    <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Select Time
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {lawyer.availableSlots
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

                <Link href="/login">
                  <Button className="w-full" onClick={handleBookAppointment}>
                    Book Appointment
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
