"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Navbar from "@/components/Frontend/Navbar";

export default function PaymentFailed() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <XCircle className="h-20 w-20 text-red-500" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Payment Failed
                  </h1>
                  <p className="text-gray-600">
                    Unfortunately, your payment could not be processed. Please try again or contact support if the problem persists.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => window.history.back()}>
                    Try Again
                  </Button>
                  <Link href="/dashboardClients">
                    <Button variant="outline">Go to Dashboard</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
