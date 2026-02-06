"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Calendar, ChevronRight, Clock, FileText, MessageSquare, Video } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock Data
const appointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Jenkins",
    role: "Clinical Psychologist",
    date: "Tomorrow, Oct 12",
    time: "10:00 AM (45 min)",
    type: "Video Call",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 2,
    doctor: "Dr. Sarah Jenkins",
    role: "Clinical Psychologist",
    date: "Tomorrow, Oct 12",
    time: "10:00 AM (45 min)",
    type: "Video Call",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
  }
]

const summaries = [
  { id: 1, title: "Session Summary - Oct 5", desc: "Anxiety management & breathing exercises" },
  { id: 2, title: "Session Summary - Oct 5", desc: "Anxiety management & breathing exercises" },
]

const notifications = [
  { id: 1, title: "Session Summary - Oct 5", desc: "Anxiety management & breathing exercises" },
  { id: 2, title: "Session Summary - Oct 5", desc: "Anxiety management & breathing exercises" },
  { id: 3, title: "Session Summary - Oct 5", desc: "Anxiety management & breathing exercises" },
  { id: 4, title: "Session Summary - Oct 5", desc: "Anxiety management & breathing exercises" },
  { id: 5, title: "Session Summary - Oct 5", desc: "Anxiety management & breathing exercises" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-8 py-2 sm:py-4 px-1 sm:px-0">

      {/* Top Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center p-4 sm:p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="p-4 h-16 rounded-2xl bg-gray-50 flex items-center gap-4 w-full px-6 transition-colors hover:bg-violet-50 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#8B5CF6] shrink-0 group-hover:bg-white transition-colors">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="font-semibold text-base sm:text-lg text-gray-800">Book New Session</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="p-4 h-16 rounded-2xl bg-gray-50 flex items-center gap-4 w-full px-6 transition-colors hover:bg-violet-50 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#8B5CF6] shrink-0 group-hover:bg-white transition-colors">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="font-semibold text-base sm:text-lg text-gray-800">Message Therapist</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

        {/* Main Left Column (Appointments & Summaries) */}
        <div className="lg:col-span-2 space-y-8 sm:space-y-10">

          {/* Upcoming Appointments */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Upcoming Appointment Snapshot</h2>
            <div className="space-y-6">
              {appointments.map((apt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-50 flex flex-col sm:flex-row gap-5 sm:gap-6 sm:items-center"
                >
                  {/* Doctor Image */}
                  <div className="relative shrink-0">
                    <div className="w-full sm:w-32 h-48 sm:h-36 rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={apt.image}
                        alt={apt.doctor}
                        width={1000}
                        height={1000}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-[#22C55E] border-2 border-white rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-[#1A1A1A]">{apt.doctor}</h3>
                      <p className="text-[#8B5CF6] font-medium text-sm">{apt.role}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-4 text-[10px] sm:text-xs font-medium text-gray-500">
                      <div className="flex items-center gap-1.5 bg-[#F8FAFC] px-3 py-1.5 rounded-lg">
                        <Calendar className="w-4 h-4 text-gray-400" /> {apt.date}
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#F8FAFC] px-3 py-1.5 rounded-lg">
                        <Clock className="w-4 h-4 text-gray-400" /> {apt.time}
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#F8FAFC] px-3 py-1.5 rounded-lg">
                        <Video className="w-4 h-4 text-gray-400" /> {apt.type}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-1">
                      <Button className="bg-[#9B85C1] hover:bg-[#8A74B0] text-white rounded-xl h-11 px-6 font-medium shadow-sm w-full sm:w-auto">
                        <Video className="w-4 h-4 mr-2" /> Join Session
                      </Button>
                      <Button variant="outline" className="border-[#6BB9BA] text-[#1A1A1A] hover:bg-[#6BB9BA]/5 rounded-xl h-11 px-6 font-medium border-2 w-full sm:w-auto">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Past Session Summaries */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Past Session Summaries</h2>
            <div className="space-y-3 sm:space-y-4">
              {summaries.map((summary, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#8B5CF6] shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-[#1A1A1A]">{summary.title}</h4>
                    <p className="text-sm text-gray-500">{summary.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </motion.div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column (Notifications) */}
        <div className="lg:col-span-1">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Notifications</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[1rem] p-4 sm:p-6 shadow-sm h-full max-h-[500px] lg:max-h-[600px] flex flex-col"
          >
            <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {notifications.map((notif, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="mt-2 w-2.5 h-2.5 rounded-full bg-[#8B5CF6] shrink-0" />
                  <div>
                    <h4 className="font-medium text-[#1A1A1A] text-sm md:text-base">{notif.title}</h4>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">{notif.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-center">
              <Link href="#" className="text-[#9B85C1] font-medium text-sm flex items-center gap-2 hover:underline">
                View all activity <span className="text-lg">→</span>
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}