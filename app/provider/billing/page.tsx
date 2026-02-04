"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react"
import { useState } from "react"

const payouts = [
  { id: "#CLM- 9021", date: "Oct 24, 2023", amount: "$175.00", status: "Paid" },
  { id: "#CLM- 9021", date: "Oct 24, 2023", amount: "$175.00", status: "Pending" },
  { id: "#CLM- 9021", date: "Oct 24, 2023", amount: "$175.00", status: "Paid" },
  { id: "#CLM- 9021", date: "Oct 24, 2023", amount: "$175.00", status: "Paid" },
  { id: "#CLM- 9021", date: "Oct 24, 2023", amount: "$175.00", status: "Pending" },
  { id: "#CLM- 9021", date: "Oct 24, 2023", amount: "$175.00", status: "Paid" },
  { id: "#CLM- 9021", date: "Oct 24, 2023", amount: "$175.00", status: "Paid" },
  { id: "#CLM- 9021", date: "Oct 24, 2023", amount: "$175.00", status: "Pending" },
  { id: "#CLM- 9021", date: "Oct 24, 2023", amount: "$175.00", status: "Paid" },
]

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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function BillingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPayouts = payouts.filter((payout) => {
    const matchesSearch = payout.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || payout.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 bg-[#F8FAFC] min-h-screen"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <p className="text-gray-500 text-lg font-medium mb-2">Total Paid YTD</p>
              <h2 className="text-3xl font-medium text-slate-900">$42,850.50</h2>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <p className="text-gray-500 text-lg font-medium mb-2">Accrued Earnings</p>
              <h2 className="text-3xl font-medium text-slate-900">Nov 15, 2025</h2>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by Client Name or Claim ID ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-white border-none rounded-xl shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-12 w-[140px] py-6 cursor-pointer bg-[#9785BA] hover:bg-[#8674A9] rounded-xl flex items-center gap-2 text-white border-none shadow-none text-white focus:ring-0">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Button className="h-11 px-6 bg-[#6EB2AA] cursor-pointer hover:bg-[#5FA199] rounded-xl flex items-center gap-2 text-white border-none shadow-none">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Payout Table */}
      <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
        <Table>
          <TableHeader className="bg-[#E9F2F2]">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="py-5 px-6 font-semibold text-gray-600 uppercase text-xs tracking-wider">Payout ID</TableHead>
              <TableHead className="py-5 px-6 font-semibold text-gray-600 uppercase text-xs tracking-wider">Date</TableHead>
              <TableHead className="py-5 px-6 font-semibold text-gray-600 uppercase text-xs tracking-wider">Amount</TableHead>
              <TableHead className="py-5 px-6 font-semibold text-gray-600 uppercase text-xs tracking-wider text-right md:text-left">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {filteredPayouts.map((payout, index) => (
                <motion.tr
                  key={`${payout.id}-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <TableCell className="py-5 px-6 font-medium text-slate-700">{payout.id}</TableCell>
                  <TableCell className="py-5 px-6 text-slate-600">{payout.date}</TableCell>
                  <TableCell className="py-5 px-6 font-semibold text-slate-700">{payout.amount}</TableCell>
                  <TableCell className="py-5 px-6 text-right md:text-left">
                    <Badge
                      className={cn(
                        "px-4 py-1 rounded-full text-[13px] font-medium border-none shadow-none",
                        payout.status === "Paid"
                          ? "bg-[#D1F1EF] text-[#3D9690] hover:bg-[#D1F1EF]"
                          : "bg-[#FEF0D6] text-[#FFA114] hover:bg-[#FEF0D6]"
                      )}
                    >
                      {payout.status}
                    </Badge>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
            {filteredPayouts.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-gray-500">
                  No payouts found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>

      {/* Pagination */}
      <motion.div variants={itemVariants} className="flex justify-center items-center gap-2 py-4">
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-gray-400 hover:bg-gray-100">
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button className="rounded-full h-10 w-10 bg-[#6EB2AA] hover:bg-[#5FA199] text-white shadow-none font-medium">1</Button>
        <Button variant="ghost" className="rounded-full h-10 w-10 text-gray-500 hover:bg-gray-100 font-medium">2</Button>
        <Button variant="ghost" className="rounded-full h-10 w-10 text-gray-500 hover:bg-gray-100 font-medium">3</Button>
        <span className="text-gray-400 px-1">...</span>
        <Button variant="ghost" className="rounded-full h-10 w-10 text-gray-500 hover:bg-gray-100 font-medium">12</Button>

        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-gray-400 hover:bg-100">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
