"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/lib/store/auth";

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [localError, setLocalError] = useState("");

  const { login, loading, error, user } = useAuthStore();

  useEffect(() => {
  if (searchParams.get("registered") === "true") {
    setSuccess("Registration successful! Please log in.");
  }
}, [searchParams]);

  useEffect(() => {
    if (user) {
      const role = user.role === "lawyer" ? "/dashboardLawyers" : "/dashboardClients";
      router.push(role);
    }
  }, [user, router]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLocalError("");
  setSuccess("");

  try {
    await login(email, password);
    const nextUser = useAuthStore.getState().user;
    if (nextUser) {
      const role = nextUser.role === "lawyer" ? "/dashboardLawyers" : "/dashboardClients";
      router.push(role);
    }
  } catch (err: any) {
    setLocalError(err.message || "An error occurred during login");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center gap-2 bg-blue-950 py-4 rounded-2xl">
           <img
              alt="LawMate Logo"
              src="/images/logo.svg" 
              className="h-10 w-10 text-primary bg-blue-950" />
            <span className="text-3xl font-bold text-foreground text-white">LawMate</span>
            
          </div>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Log in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          {(localError || error) && (
            <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {localError || error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
              {success}
            </div>
          )}
  
      <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              variant="hero"
              className="w-full bg-blue-950"
              size="lg"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Log In"}
            </Button>
          </form>
      
          
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>
          <Link href="/" className="text-sm text-primary hover:underline text-center">
            Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
