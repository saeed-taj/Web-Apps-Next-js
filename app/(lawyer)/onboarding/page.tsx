"use client";

import { useState } from "react";
import React from "react";
import { Scale, Mail, Phone, MapPin, Briefcase, Clock, DollarSign, FileText } from "lucide-react";

export default function LawyerOnboarding() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    specialization: "",
    experience: "",
    location: "",
    phone: "",
    fees: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/lawyer/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setMessage("Onboarding submitted successfully!");

      setForm({
        name: "",
        email: "",
        specialization: "",
        experience: "",
        location: "",
        phone: "",
        fees: "",
        bio: "",
      });
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-800 rounded-full mb-4">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Lawyer Onboarding</h1>
          <p className="text-gray-600 text-lg">Join our network of legal professionals</p>
        </div>

        {/* Form Section */}
        <div className="bg-white shadow-2xl rounded-2xl border border-gray-100 p-8 space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-6">
            <div className="border-l-4 border-blue-800 pl-4">
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
            </div>

            {/* Full Name */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all outline-none"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="phone"
                  placeholder="+92 300 1234567"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all outline-none"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City/Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="location"
                  placeholder="Islamabad, Pakistan"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="space-y-6 pt-6 border-t border-gray-200">
            <div className="border-l-4 border-blue-800 pl-4">
              <h2 className="text-xl font-semibold text-gray-900">Professional Details</h2>
            </div>

            {/* Specialization */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialization <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Scale className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="specialization"
                  placeholder="e.g., Civil Law, Corporate Law, Criminal Law"
                  value={form.specialization}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all outline-none"
                  required
                />
              </div>
            </div>

            {/* Experience and Fees Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Experience */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="experience"
                    placeholder="5"
                    value={form.experience}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all outline-none"
                    required
                    min="0"
                  />
                </div>
              </div>

              {/* Fees */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consultation Fee (PKR) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="fees"
                    placeholder="5000"
                    value={form.fees}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all outline-none"
                    required
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Bio <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  name="bio"
                  placeholder="Tell us about your experience, expertise, and what makes you stand out..."
                  value={form.bio}
                  onChange={handleChange}
                  rows={5}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all outline-none resize-none"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 50 characters recommended</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>

          {/* Success/Error Message */}
          {message && (
            <div className={`p-4 rounded-lg ${message.includes("success") ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
              <p className={`text-center text-sm font-medium ${message.includes("success") ? "text-green-800" : "text-red-800"}`}>
                {message}
              </p>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-8">
          By submitting this form, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}