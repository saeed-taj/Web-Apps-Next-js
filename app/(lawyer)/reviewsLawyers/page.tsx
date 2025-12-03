"use client";

import Sidebar from "@/components/Dashboard/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Star, User } from "lucide-react";

export default function ReviewsLawyers() {
  const reviews = [
    {
      id: 1,
      clientName: "John Doe",
      rating: 5,
      comment: "Excellent service! Very professional and helpful. Highly recommend!",
      date: "2024-01-10",
    },
    {
      id: 2,
      clientName: "Jane Smith",
      rating: 4,
      comment: "Good consultation, clear explanations. Thank you!",
      date: "2024-01-05",
    },
    {
      id: 3,
      clientName: "Ahmed Ali",
      rating: 5,
      comment: "Best lawyer I've worked with. Very knowledgeable.",
      date: "2024-01-01",
    },
  ];

  const averageRating =
    reviews.reduce((sum, rev) => sum + rev.rating, 0) / reviews.length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="lawyer" />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Client Reviews</h1>
          <p className="text-gray-600 mt-2">View feedback from your clients</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.round(averageRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Based on {reviews.length} reviews
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">All Reviews</h2>
            {reviews.map((rev) => (
              <Card key={rev.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-gray-500" />
                      <span className="font-semibold">{rev.clientName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= rev.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{rev.comment}</p>
                  <p className="text-sm text-gray-500">{rev.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
