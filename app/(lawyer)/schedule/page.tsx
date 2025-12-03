"use client";

import { useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock } from "lucide-react";

export default function ScheduleLawyers() {
  const [availableSlots, setAvailableSlots] = useState([
    { day: "Monday", start: "09:00", end: "17:00", enabled: true },
    { day: "Tuesday", start: "09:00", end: "17:00", enabled: true },
    { day: "Wednesday", start: "09:00", end: "17:00", enabled: true },
    { day: "Thursday", start: "09:00", end: "17:00", enabled: true },
    { day: "Friday", start: "09:00", end: "17:00", enabled: true },
    { day: "Saturday", start: "10:00", end: "14:00", enabled: false },
    { day: "Sunday", start: "10:00", end: "14:00", enabled: false },
  ]);

  const handleTimeChange = (index: number, field: "start" | "end", value: string) => {
    const updated = [...availableSlots];
    updated[index] = { ...updated[index], [field]: value };
    setAvailableSlots(updated);
  };

  const handleToggle = (index: number) => {
    const updated = [...availableSlots];
    updated[index] = { ...updated[index], enabled: !updated[index].enabled };
    setAvailableSlots(updated);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="lawyer" />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Schedule Management</h1>
          <p className="text-gray-600 mt-2">Set your availability for appointments</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableSlots.map((slot, index) => (
                <div
                  key={slot.day}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-2 w-32">
                    <input
                      type="checkbox"
                      checked={slot.enabled}
                      onChange={() => handleToggle(index)}
                      className="h-4 w-4"
                    />
                    <Label className="font-medium">{slot.day}</Label>
                  </div>
                  {slot.enabled ? (
                    <div className="flex items-center gap-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <Input
                          type="time"
                          value={slot.start}
                          onChange={(e) => handleTimeChange(index, "start", e.target.value)}
                          className="w-32"
                        />
                      </div>
                      <span className="text-gray-500">to</span>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <Input
                          type="time"
                          value={slot.end}
                          onChange={(e) => handleTimeChange(index, "end", e.target.value)}
                          className="w-32"
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400">Not available</span>
                  )}
                </div>
              ))}
              <Button className="w-full mt-6">Save Schedule</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
