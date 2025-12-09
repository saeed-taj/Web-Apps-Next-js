"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Gavel, Lock, Mail, Scale, Type, User, UserCircle } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/lib/store/auth";

function RegisterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultRole = searchParams?.get("role") || "client";
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register, loading, error: storeError } = useAuthStore();

  const handleSubmit = (role: "client" | "lawyer") => async (e: React.FormEvent) => {

    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    

    try {
      
      const res = await fetch('/api/auth/register' , {
        method : "POST",
        headers : { "Content-Type" : "application/json" },
        body : JSON.stringify({name , email , password , role})
      })
      const data = await res.json()

      if(!res.ok) throw new Error(data.message || "Something went wrong!");

      
      await register({ name, email, password, role });
      
      if(role == "lawyer"){
        router.push('/onboarding')
      }
      else{
        router.push(`/login?registered=true&role=${role}`);
      }
      
    } 
    catch (err: any) {
      setError(err.message || "An error occurred during registration");
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <img
              alt="LawMate Logo"
              src="/images/logo.svg" 
              className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold text-foreground">LawMate</span>
          </div>
          <CardTitle className="text-2xl text-center">Create Your Account</CardTitle>
          <CardDescription className="text-center">
            Join as a client or lawyer to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}
          {storeError && !error && (
            <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {storeError}
            </div>
          )}
          <Tabs defaultValue={defaultRole} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="client" className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                Client
              </TabsTrigger>
              <TabsTrigger value="lawyer" className="flex items-center gap-2">
                <Gavel className="h-4 w-4" />
                Lawyer
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="client">
              <form onSubmit={handleSubmit("client")} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="client-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="client-name"
                      type="text"
                      placeholder=" Name "
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="client-email"
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
                  <Label htmlFor="client-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="client-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="client-confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" variant="hero" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Signing Up..." : "Sign Up as Client"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="lawyer">
              <form onSubmit={handleSubmit("lawyer")} className="space-y-4 mt-4">
                
                <div className="space-y-2">
                  <Label htmlFor="lawyer-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lawyer-name"
                      type="text"
                      placeholder="Lawyer Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lawyer-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lawyer-email"
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
                  <Label htmlFor="lawyer-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lawyer-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lawyer-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lawyer-confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" variant="professional" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Signing Up..." : "Sign Up as Lawyer"}
                </Button>
              </form>
            </TabsContent>


          </Tabs>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Log in
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

export default function Register() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
        <div className="text-center">
          <Scale className="h-10 w-10 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
