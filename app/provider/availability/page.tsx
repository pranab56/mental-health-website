"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Ban,
  CalendarDays
} from "lucide-react";
import { useState } from "react";

const days = [
  { name: "MON", date: 7, slots: ["9:00 AM", "9:00 AM"], status: "available" },
  { name: "TUE", date: 8, slots: ["9:00 AM", "11:30 AM", "9:00 AM", "9:00 AM"], status: "active" },
  { name: "WED", date: 9, slots: ["9:00 AM", "9:00 AM"], status: "available" },
  { name: "THU", date: 10, slots: ["9:00 AM", "9:00 AM", "9:00 AM", "9:00 AM"], status: "available" },
  { name: "FRI", date: 11, slots: [], status: "booked" },
  { name: "SAT", date: 12, slots: [], status: "weekend" },
  { name: "SUN", date: 13, slots: [], status: "weekend" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function AvailabilityPage() {
  const [duration, setDuration] = useState("60 mins");
  const [selectedSlot, setSelectedSlot] = useState("11:30 AM");
  console.log("Selected Slot:", selectedSlot);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-[#1e293b]">Manage Schedule & Availability</h1>
        <p className="text-slate-500 font-medium text-sm sm:text-base">Set your weekly availability and session preferences for clients to book.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Availability Settings Sidebar */}
        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-50 px-5 sm:px-8 py-4 sm:py-5">
              <CardTitle className="text-lg sm:text-xl font-bold text-[#1e293b]">Availability Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-5 sm:p-8 space-y-6 sm:space-y-8">
              {/* Session Duration */}
              <div className="space-y-4">
                <h3 className="font-bold text-[#1e293b]">Session Duration</h3>
                <div className="flex bg-[#EDF7F7]/50 p-1 rounded-xl gap-1">
                  {["30 mins", "60 mins", "90 mins"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${duration === d
                        ? "bg-white text-[#6BB9BA] shadow-sm"
                        : "text-slate-400 hover:text-slate-600"
                        }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Session Type */}
              <div className="space-y-4">
                <h3 className="font-bold text-[#1e293b]">Session Type</h3>
                <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-[#6BB9BA] bg-[#EDF7F7]">
                  <div className="flex items-center gap-3 text-[#6BB9BA]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#6BB9BA]" />
                    <span className="font-bold">Online Session</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-[#6BB9BA] bg-white flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#6BB9BA]" />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <Button className="w-full cursor-pointer bg-[#9B85C1] hover:bg-[#8a74b0] text-white h-12 sm:h-14 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-sm transition-all mt-4">
                Save Availability
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Schedule Grid */}
        <motion.div variants={itemVariants} className="lg:col-span-8">
          <Card className="border-none shadow-sm bg-white overflow-hidden min-h-[600px]">
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                <div className="grid grid-cols-7 border-b border-slate-50">
                  {days.map((day) => (
                    <div
                      key={day.name}
                      className={`py-6 flex flex-col items-center gap-1 transition-colors ${day.status === "active"
                        ? "bg-[#F3E8FF] text-[#9B85C1]"
                        : "bg-[#EDF7F7]/50 text-slate-500"
                        }`}
                    >
                      <span className="text-xs font-bold tracking-wider">{day.name}</span>
                      <span className="text-2xl font-bold leading-none">{day.date}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 h-full">
                  {days.map((day, i) => (
                    <div key={day.name} className={`px-2 py-6 flex flex-col gap-3 items-center min-h-[500px] ${i !== 6 ? "border-r border-slate-50" : ""}`}>
                      {day.slots.map((slot, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedSlot(slot)}
                          className={`w-full max-w-[90px] py-3 rounded-xl font-bold text-[13px] transition-all text-center ${day.status === "active" && slot === "11:30 AM"
                            ? "border-2 border-[#6BB9BA] bg-[#EDF7F7] text-[#1e293b]"
                            : "bg-[#F8FAFC] text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                            }`}
                        >
                          {slot}
                        </button>
                      ))}

                      {day.status === "booked" && (
                        <div className="flex flex-col items-center justify-center gap-3 pt-10 text-center">
                          <div className="w-12 h-12 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-300">
                            <Ban className="w-6 h-6" />
                          </div>
                          <span className="text-slate-300 font-bold text-sm">Fully Booked</span>
                        </div>
                      )}

                      {day.status === "weekend" && (
                        <div className="flex flex-col items-center justify-center gap-3 pt-40 text-center">
                          <CalendarDays className="w-6 h-6 text-slate-200" />
                          <span className="text-slate-300 font-bold text-sm">Weekend</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}