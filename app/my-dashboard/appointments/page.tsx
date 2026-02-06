"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal
} from "lucide-react"
import { useState } from "react"

// --- Types ---
type SessionStatus = "Completed" | "Pending" | "Canceled"

interface Session {
  id: string
  date: string
  time: string
  therapist: {
    name: string
    image: string
  }
  status: SessionStatus
}

// --- Mock Data ---
const SESSIONS: Session[] = [
  {
    id: "1",
    date: "Oct 17, 2025",
    time: "10:00 AM - 11:00 AM",
    therapist: { name: "Dr. Sarah Jenkins", image: "https://i.pravatar.cc/150?u=1" },
    status: "Completed",
  },
  {
    id: "2",
    date: "Oct 17, 2025",
    time: "10:00 AM - 11:00 AM",
    therapist: { name: "Dr. Sarah Jenkins", image: "https://i.pravatar.cc/150?u=2" },
    status: "Pending",
  },
  {
    id: "3",
    date: "Oct 17, 2025",
    time: "10:00 AM - 11:00 AM",
    therapist: { name: "Dr. Sarah Jenkins", image: "https://i.pravatar.cc/150?u=3" },
    status: "Canceled",
  },
  {
    id: "4",
    date: "Oct 17, 2025",
    time: "10:00 AM - 11:00 AM",
    therapist: { name: "Dr. Sarah Jenkins", image: "https://i.pravatar.cc/150?u=4" },
    status: "Completed",
  },
  {
    id: "5",
    date: "Oct 17, 2025",
    time: "10:00 AM - 11:00 AM",
    therapist: { name: "Dr. Sarah Jenkins", image: "https://i.pravatar.cc/150?u=5" },
    status: "Pending",
  },
  {
    id: "6",
    date: "Oct 17, 2025",
    time: "10:00 AM - 11:00 AM",
    therapist: { name: "Dr. Sarah Jenkins", image: "https://i.pravatar.cc/150?u=6" },
    status: "Completed",
  },
  {
    id: "7",
    date: "Oct 17, 2025",
    time: "10:00 AM - 11:00 AM",
    therapist: { name: "Dr. Sarah Jenkins", image: "https://i.pravatar.cc/150?u=7" },
    status: "Pending",
  },
  {
    id: "8",
    date: "Oct 17, 2025",
    time: "10:00 AM - 11:00 AM",
    therapist: { name: "Dr. Sarah Jenkins", image: "https://i.pravatar.cc/150?u=8" },
    status: "Canceled",
  },
  {
    id: "9",
    date: "Oct 17, 2025",
    time: "10:00 AM - 11:00 AM",
    therapist: { name: "Dr. Sarah Jenkins", image: "https://i.pravatar.cc/150?u=9" },
    status: "Completed",
  },
]

export default function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="overflow-hidden">
      <div className="space-y-8 sm:space-y-10">

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row gap-4 sm:gap-5 items-stretch sm:items-center relative z-10"
        >
          <div className="relative w-full md:max-w-lg">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search here ..."
              className="pl-14 h-12 bg-[#F5F7FA] border-none rounded-xl focus-visible:ring-2 focus-visible:ring-[#9B8FC7]/20 text-slate-600 transition-all text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="h-12 px-8 sm:px-10 bg-[#9B8FC7] hover:bg-[#8A79B8] text-white rounded-xl flex items-center justify-center gap-3 transition-all text-base sm:text-lg font-medium shadow-lg shadow-[#9B8FC7]/20 w-full sm:w-auto">
            <SlidersHorizontal className="h-5 w-5 sm:h-6 sm:w-6" />
            Filter
          </Button>
        </motion.div>

        {/* Title Section */}
        <div className="px-2">
          <h1 className="text-2xl font-medium text-[#2D2D2D]">Past Sessions</h1>
        </div>

        {/* Sessions Table Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="bg-[#EBF1F3] text-[#718096] text-[13px] tracking-[0.15em] font-medium">
                  <th className="px-6 sm:px-10 py-5">Session Date</th>
                  <th className="px-6 sm:px-10 py-5">Therapist</th>
                  <th className="px-6 sm:px-10 py-5 text-center">Status</th>
                  <th className="px-6 sm:px-10 py-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence>
                  {SESSIONS.map((session, index) => (
                    <motion.tr
                      key={session.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: index * 0.03,
                        duration: 0.3,
                        ease: "easeOut"
                      }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      {/* Date & Time */}
                      <td className="px-10 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-medium text-[#2D2D2D] text-[16px]">{session.date}</span>
                          <span className="text-[14px] text-slate-400 font-medium">{session.time}</span>
                        </div>
                      </td>

                      {/* Therapist */}
                      <td className="px-10 py-4">
                        <div className="flex items-center gap-5">
                          <Avatar className="h-12 w-12 border-2 border-white shadow-md ring-1 ring-slate-100">
                            <AvatarImage src={session.therapist.image} />
                            <AvatarFallback>{session.therapist.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-[#2D2D2D] text-[16px]">{session.therapist.name}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-10 py-4 text-center">
                        <Badge
                          className={cn(
                            "px-6 py-2 rounded-xl font-medium border-none text-[13px]",
                            session.status === "Completed" && "bg-[#E6F4F1] text-[#71B7AF]",
                            session.status === "Pending" && "bg-[#FEF6E6] text-[#F3C13F]",
                            session.status === "Canceled" && "bg-[#FFEDED] text-[#F36960]"
                          )}
                        >
                          {session.status}
                        </Badge>
                      </td>

                      {/* Action */}
                      <td className="px-10 py-4 text-center">
                        <Button
                          className={cn(
                            "h-12 px-10 rounded-xl font-medium transition-all",
                            session.status === "Pending"
                              ? "bg-[#9B8FC7] hover:bg-[#8A79B8] text-white"
                              : "bg-[#9B8FC7] hover:bg-[#8A79B8] text-white"
                          )}
                        >
                          {session.status === "Pending" ? "Reschedule" : "Book Again"}
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Pagination Section */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 pb-16">
          <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl shadow-sm bg-white hover:bg-slate-50 border border-slate-100 group transition-all shrink-0">
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400 group-hover:text-slate-600" />
          </Button>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-[#71B7AF] text-white hover:bg-[#5E9E96] font-medium text-base sm:text-lg shadow-xl shadow-[#71B7AF]/20">
              1
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-white shadow-sm text-slate-600 hover:bg-slate-50 border border-slate-100 font-medium transition-all text-base sm:text-lg">
              2
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-white shadow-sm text-slate-600 hover:bg-slate-50 border border-slate-100 font-medium transition-all text-base sm:text-lg">
              3
            </Button>
          </div>

          <span className="px-1 sm:px-3 text-slate-300 font-medium text-xl sm:text-2xl hidden xs:inline">...</span>

          <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-white shadow-sm text-slate-600 hover:bg-slate-50 border border-slate-100 font-extrabold transition-all text-base sm:text-lg">
            12
          </Button>

          <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl shadow-sm bg-white hover:bg-slate-50 border border-slate-100 group transition-all shrink-0">
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400 group-hover:text-slate-600" />
          </Button>
        </div>

      </div>
    </div>
  )
}