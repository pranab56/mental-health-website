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
import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react"
import { useState } from "react"

const completedAppointments = [
  { id: 1, date: "Oct 24, 2023", clientName: "Jane Doe", sessionType: "Individual Therapy", status: "Completed" },
  { id: 2, date: "Oct 24, 2023", clientName: "Jane Doe", sessionType: "Initial Consultation", status: "Completed" },
  { id: 3, date: "Oct 24, 2023", clientName: "Jane Doe", sessionType: "Follow-up", status: "Completed" },
  { id: 4, date: "Oct 24, 2023", clientName: "Jane Doe", sessionType: "CBT Session", status: "Completed" },
  { id: 5, date: "Oct 24, 2023", clientName: "Jane Doe", sessionType: "Individual Therapy", status: "Completed" },
  { id: 6, date: "Oct 24, 2023", clientName: "Jane Doe", sessionType: "Initial Consultation", status: "Completed" },
  { id: 7, date: "Oct 24, 2023", clientName: "Jane Doe", sessionType: "CBT Session", status: "Completed" },
  { id: 8, date: "Oct 24, 2023", clientName: "Jane Doe", sessionType: "Follow-up", status: "Completed" },
  { id: 9, date: "Oct 24, 2023", clientName: "Jane Doe", sessionType: "Individual Therapy", status: "Completed" },
]

const sessionTypeStyles: Record<string, string> = {
  "Individual Therapy": "bg-[#EFEAFF] text-[#9785BA] hover:bg-[#EFEAFF]",
  "Initial Consultation": "bg-[#E8F8F1] text-[#2D9B75] hover:bg-[#E8F8F1]",
  "Follow-up": "bg-[#FFF4E5] text-[#FF9933] hover:bg-[#FFF4E5]",
  "CBT Session": "bg-[#F0F2F9] text-[#717E95] hover:bg-[#F0F2F9]",
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
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
}

export default function CompletedAppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAppointments = completedAppointments.filter(app =>
    app.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.sessionType.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* Header & Search Area */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by client name ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 bg-white border-none shadow-sm rounded-xl focus-visible:ring-2 focus-visible:ring-[#9785BA]/20 placeholder:text-slate-400 text-sm sm:text-base"
          />
        </div>
        <Button className="h-12 px-8 bg-[#9785BA] hover:bg-[#8674A9] text-white rounded-xl flex items-center justify-center gap-2 shadow-none cursor-pointer font-medium">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </motion.div>

      {/* Appointments Table */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader className="bg-[#E9F2F2]">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="py-5 px-6 font-semibold text-slate-500 uppercase text-xs tracking-wider">Date</TableHead>
                <TableHead className="py-5 px-6 font-semibold text-slate-500 uppercase text-xs tracking-wider">Client Name</TableHead>
                <TableHead className="py-5 px-6 font-semibold text-slate-500 uppercase text-xs tracking-wider text-center">Session Type</TableHead>
                <TableHead className="py-5 px-6 font-semibold text-slate-500 uppercase text-xs tracking-wider text-right">Status</TableHead>
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
                    <TableCell className="py-5 px-6 font-medium text-slate-600">{app.date}</TableCell>
                    <TableCell className="py-5 px-6 font-medium text-slate-700">{app.clientName}</TableCell>
                    <TableCell className="py-5 px-6 text-center">
                      <Badge className={cn(
                        "px-5 py-1.5 rounded-xl text-sm font-medium border-none shadow-none",
                        sessionTypeStyles[app.sessionType]
                      )}>
                        {app.sessionType}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-5 px-6 text-right">
                      <Badge className="bg-[#E1F2F1] text-[#3D9690] hover:bg-[#E1F2F1] px-4 py-1.5 rounded-full text-sm font-medium border-none shadow-none">
                        {app.status}
                      </Badge>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredAppointments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-40 text-center text-slate-500">
                    No completed sessions found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      {/* Pagination */}
      <motion.div variants={itemVariants} className="flex flex-wrap justify-center items-center gap-2 py-4">
        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 sm:h-10 sm:w-10 text-slate-400 hover:bg-slate-100 shrink-0">
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <Button className="rounded-full h-9 w-9 sm:h-10 sm:w-10 bg-[#6EB2AA] hover:bg-[#5FA199] text-white shadow-none font-medium shrink-0">1</Button>
          <Button variant="ghost" className="rounded-full h-9 w-9 sm:h-10 sm:w-10 text-slate-500 hover:bg-slate-100 font-medium shrink-0">2</Button>
          <Button variant="ghost" className="rounded-full h-9 w-9 sm:h-10 sm:w-10 text-slate-500 hover:bg-slate-100 font-medium shrink-0">3</Button>
          <span className="text-slate-400 px-1">...</span>
          <Button variant="ghost" className="rounded-full h-9 w-9 sm:h-10 sm:w-10 text-slate-500 hover:bg-slate-100 font-medium shrink-0">12</Button>
        </div>

        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 sm:h-10 sm:w-10 text-slate-400 hover:bg-slate-100 shrink-0">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </motion.div>
    </motion.div>
  )
}