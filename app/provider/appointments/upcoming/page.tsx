"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AnimatePresence, motion } from "framer-motion"
import { Calendar as CalendarIcon, Search, Video } from "lucide-react"
import { useState } from "react"

const upcomingAppointments = [
  {
    id: 1,
    clientName: "James & Emily Wilson",
    sessionType: "Couples Session",
    time: "01:00 PM - 02:30 PM",
    avatar: "https://i.pravatar.cc/150?u=1"
  },
  {
    id: 2,
    clientName: "James & Emily Wilson",
    sessionType: "Couples Session",
    time: "01:00 PM - 02:30 PM",
    avatar: "https://i.pravatar.cc/150?u=2"
  },
  {
    id: 3,
    clientName: "James & Emily Wilson",
    sessionType: "Couples Session",
    time: "01:00 PM - 02:30 PM",
    avatar: "https://i.pravatar.cc/150?u=3"
  },
  {
    id: 4,
    clientName: "James & Emily Wilson",
    sessionType: "Couples Session",
    time: "01:00 PM - 02:30 PM",
    avatar: "https://i.pravatar.cc/150?u=4"
  },
  {
    id: 5,
    clientName: "James & Emily Wilson",
    sessionType: "Couples Session",
    time: "01:00 PM - 02:30 PM",
    avatar: "https://i.pravatar.cc/150?u=5"
  },
  {
    id: 6,
    clientName: "James & Emily Wilson",
    sessionType: "Couples Session",
    time: "01:00 PM - 02:30 PM",
    avatar: "https://i.pravatar.cc/150?u=6"
  },
  {
    id: 7,
    clientName: "James & Emily Wilson",
    sessionType: "Couples Session",
    time: "01:00 PM - 02:30 PM",
    avatar: "https://i.pravatar.cc/150?u=7"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
}

export default function UpcomingAppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAppointments = upcomingAppointments.filter(app =>
    app.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.sessionType.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleJoinSession = (id: number) => {
    console.log(`Joining session ${id}`)
    alert("Starting video session...")
  }

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 tracking-tight">Upcoming Appointments</h1>
          <p className="text-slate-500 text-xs sm:text-sm">You have {filteredAppointments.length} sessions scheduled for today.</p>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-white border-slate-200 rounded-xl focus-visible:ring-[#9785BA]/20 focus-visible:border-[#9785BA] text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Appointments List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredAppointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              variants={itemVariants}
              layout
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl overflow-hidden group">
                <CardContent className="p-4 sm:p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6">
                  <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
                    <Avatar className="h-14 w-14 sm:h-16 sm:w-16 border-2 border-white shadow-sm shrink-0">
                      <AvatarImage src={appointment.avatar} alt={appointment.clientName} />
                      <AvatarFallback className="bg-[#9785BA]/10 text-[#9785BA] font-semibold text-sm sm:text-base">
                        {appointment.clientName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-0.5 sm:space-y-1">
                      <h3 className="font-semibold text-slate-800 text-base sm:text-lg leading-tight group-hover:text-[#9785BA] transition-colors">
                        {appointment.clientName}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 text-slate-500 text-[11px] sm:text-xs md:text-sm">
                        <span className="font-medium text-slate-600">{appointment.sessionType}</span>
                        <span className="hidden sm:inline text-slate-300">•</span>
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <ClockAlert className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                          {appointment.time}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleJoinSession(appointment.id)}
                    className="w-full md:w-auto bg-[#9785BA] hover:bg-[#8674A9] text-white px-8 h-11 sm:h-12 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-[#9785BA]/15 transition-all duration-300 transform active:scale-95 cursor-pointer text-sm sm:text-base font-semibold"
                  >
                    <Video className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Join Session</span>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredAppointments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center space-y-4"
          >
            <div className="bg-slate-100 p-6 rounded-full">
              <CalendarIcon className="h-10 w-10 text-slate-300" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-slate-700">No appointments found</h3>
              <p className="text-slate-500">Try adjusting your search or check other categories.</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

// Simple ClockAlert replacement if not found in Lucide (usually it's Clock)
import { Clock as ClockAlert } from "lucide-react"

