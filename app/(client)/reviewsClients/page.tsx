"use client";

import Sidebar from "@/components/Dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, User } from "lucide-react";
import { useState } from "react";

export default function ReviewsClients() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const reviews = [
    {
      id: 1,
      lawyerName: "Dr. Ahmed Khan",
      rating: 5,
      comment: "Excellent service! Very professional and helpful.",
      date: "2024-01-10",
    },
    {
      id: 2,
      lawyerName: "Adv. Sarah Ali",
      rating: 4,
      comment: "Good consultation, would recommend.",
      date: "2024-01-05",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting review:", { rating, review });
    // Add review submission logic here
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="client" />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Reviews</h1>
          <p className="text-gray-600 mt-2">View and manage your reviews</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Write a Review</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Review</label>
                  <Textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Share your experience..."
                    rows={4}
                    className="w-full"
                  />
                </div>
                <Button type="submit">Submit Review</Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Reviews</h2>
            {reviews.map((rev) => (
              <Card key={rev.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-gray-500" />
                      <span className="font-semibold">{rev.lawyerName}</span>
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
