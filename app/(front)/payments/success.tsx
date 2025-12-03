"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Frontend/Navbar";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const appointmentId = searchParams.get("appointmentId");

  useEffect(() => {
    // Redirect after 5 seconds if needed
    // const timer = setTimeout(() => {
    //   router.push("/dashboardClients");
    // }, 5000);
    // return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <CheckCircle className="h-20 w-20 text-green-500" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Payment Successful!
                  </h1>
                  <p className="text-gray-600">
                    Your appointment has been confirmed and payment has been processed successfully.
                  </p>
                  {appointmentId && (
                    <p className="text-sm text-gray-500 mt-2">
                      Appointment ID: {appointmentId}
                    </p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/dashboardClients">
                    <Button>Go to Dashboard</Button>
                  </Link>
                  <Link href="/appointmentsClients">
                    <Button variant="outline">View Appointments</Button>
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
