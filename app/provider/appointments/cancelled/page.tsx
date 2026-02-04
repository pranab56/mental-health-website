"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Filter, Search, XCircle } from "lucide-react"
import { useState } from "react"

const cancelledAppointments = [
  { id: 1, clientName: "Jane Doe", clientId: "#C-29402", date: "Oct 24, 2023", time: "2:00 PM - 3:00 PM", reason: "Canceled by Client" },
  { id: 2, clientName: "Jane Doe", clientId: "#C-29402", date: "Oct 24, 2023", time: "2:00 PM - 3:00 PM", reason: "No-Show" },
  { id: 3, clientName: "Jane Doe", clientId: "#C-29402", date: "Oct 24, 2023", time: "2:00 PM - 3:00 PM", reason: "Canceled by Client" },
  { id: 4, clientName: "Jane Doe", clientId: "#C-29402", date: "Oct 24, 2023", time: "2:00 PM - 3:00 PM", reason: "Canceled by Client" },
  { id: 5, clientName: "Jane Doe", clientId: "#C-29402", date: "Oct 24, 2023", time: "2:00 PM - 3:00 PM", reason: "Canceled by Client" },
  { id: 6, clientName: "Jane Doe", clientId: "#C-29402", date: "Oct 24, 2023", time: "2:00 PM - 3:00 PM", reason: "No-Show" },
  { id: 7, clientName: "Jane Doe", clientId: "#C-29402", date: "Oct 24, 2023", time: "2:00 PM - 3:00 PM", reason: "Canceled by Client" },
  { id: 8, clientName: "Jane Doe", clientId: "#C-29402", date: "Oct 24, 2023", time: "2:00 PM - 3:00 PM", reason: "Canceled by Client" },
  { id: 9, clientName: "Jane Doe", clientId: "#C-29402", date: "Oct 24, 2023", time: "2:00 PM - 3:00 PM", reason: "No-Show" },
]

const reasonStyles: Record<string, string> = {
  "Canceled by Client": "bg-[#E9F2F2] text-[#3D9690] hover:bg-[#E9F2F2]",
  "No-Show": "bg-[#F1F1F1] text-[#717171] hover:bg-[#F1F1F1]",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
}

export default function CancelledAppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAppointments = cancelledAppointments.filter(app =>
    app.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.clientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.reason.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* Search & Filter Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by client name ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 bg-white border-none shadow-sm rounded-xl focus-visible:ring-2 focus-visible:ring-[#9785BA]/20"
          />
        </div>
        <Button className="h-12 px-8 bg-[#9785BA] hover:bg-[#8674A9] text-white rounded-xl flex items-center gap-2 shadow-none cursor-pointer">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </motion.div>

      {/* Cancelled List Table */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100"
      >
        <Table>
          <TableHeader className="bg-[#E9F2F2]">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="py-5 px-8 font-semibold text-slate-500 uppercase text-xs tracking-wider">Client Name</TableHead>
              <TableHead className="py-5 px-8 font-semibold text-slate-500 uppercase text-xs tracking-wider">Original Date & Time</TableHead>
              <TableHead className="py-5 px-8 font-semibold text-slate-500 uppercase text-xs tracking-wider text-right">Reason</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="popLayout">
              {filteredAppointments.map((app) => (
                <motion.tr
                  key={app.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                >
                  <TableCell className="py-5 px-8">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 text-base">{app.clientName}</span>
                      <span className="text-slate-400 text-sm font-medium">ID: {app.clientId}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 px-8">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-700 text-sm">{app.date}</span>
                      <span className="text-slate-500 text-xs font-medium">{app.time}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 px-8 text-right">
                    <Badge className={cn(
                      "px-5 py-1.5 rounded-full text-sm font-medium border-none shadow-none",
                      reasonStyles[app.reason]
                    )}>
                      {app.reason}
                    </Badge>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
            {filteredAppointments.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="h-48 text-center text-slate-500 space-y-3">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <XCircle className="h-10 w-10 text-slate-200" />
                    <p>No cancelled appointments found.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>

      {/* Centered Pagination */}
      <motion.div variants={itemVariants} className="flex justify-center items-center gap-2 py-4">
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-slate-400 hover:bg-slate-100">
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button className="rounded-full h-10 w-10 bg-[#6EB2AA] hover:bg-[#5FA199] text-white shadow-none font-medium">1</Button>
        <Button variant="ghost" className="rounded-full h-10 w-10 text-slate-500 hover:bg-slate-100 font-medium">2</Button>
        <Button variant="ghost" className="rounded-full h-10 w-10 text-slate-500 hover:bg-slate-100 font-medium">3</Button>
        <span className="text-slate-400 px-1">...</span>
        <Button variant="ghost" className="rounded-full h-10 w-10 text-slate-500 hover:bg-slate-100 font-medium">12</Button>

        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-slate-400 hover:bg-slate-100">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </motion.div>
    </motion.div>
  )
}