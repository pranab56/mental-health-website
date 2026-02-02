"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  SlidersHorizontal
} from "lucide-react"
import { useState } from "react"

// --- Types ---
type PaymentStatus = "Completed" | "Pending" | "Failed"

interface Transaction {
  id: string
  date: string
  description: string
  therapist: string
  paymentMethod: string
  amount: string
  status: PaymentStatus
}

// --- Mock Data ---
const TRANSACTIONS: Transaction[] = Array(9).fill({
  date: "Oct 24, 2023",
  description: "Individual Session",
  therapist: "Dr. Sarah Jenkins",
  paymentMethod: "Oct 24, 2023", // Image shows date in payment method column? Or maybe it's a generic label.
  amount: "$120.00",
  status: "Completed",
}).map((item, index) => ({ ...item, id: (index + 1).toString() }))

export default function BillingPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="">
      <div className="space-y-8">

        {/* Header Section */}
        <div className="space-y-1">
          <h1 className="text-2xl font-medium text-[#2D2D2D]">Billing & Payment History</h1>
          <p className="text-slate-500 font-medium">Manage your invoices and track your therapy investments.</p>
        </div>

        {/* Summary Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white border-none rounded-2xl shadow-sm overflow-hidden group">
              <CardContent className="p-8 space-y-2">
                <p className="text-slate-500 font-medium text-lg leading-tight">Total Past Due This Year</p>
                <p className="text-4xl font-medium text-[#2D2D2D]">$2,450.00</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white border-none rounded-2xl shadow-sm overflow-hidden group">
              <CardContent className="p-8 space-y-2">
                <p className="text-slate-500 font-medium text-lg leading-tight">Upcoming Payments 2/2/2026</p>
                <p className="text-4xl font-medium text-[#2D2D2D]">$120.00</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Search, Filter & Export Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-3 shadow-sm flex flex-col md:flex-row gap-4 items-center"
        >
          <div className="relative w-full md:max-w-xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search transactions by provider or service ..."
              className="pl-14 h-12 bg-[#F5F7FA] border-none rounded-xl focus-visible:ring-2 focus-visible:ring-[#9B8FC7]/20 text-slate-600 transition-all text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Button className="h-12 px-8 bg-[#9B8FC7] cursor-pointer hover:bg-[#8A79B8] text-white rounded-xl flex items-center gap-2 transition-all text-base font-medium shadow-lg shadow-[#9B8FC7]/10 w-full md:w-auto">
              <SlidersHorizontal className="h-5 w-5" />
              Filter
            </Button>
            <Button className="h-12 px-8 bg-[#71B7AF] cursor-pointer hover:bg-[#5E9E96] text-white rounded-xl flex items-center gap-2 transition-all text-base font-medium shadow-lg shadow-[#71B7AF]/10 w-full md:w-auto">
              <Download className="h-5 w-5" />
              Export
            </Button>
          </div>
        </motion.div>

        {/* Transactions Table Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
        >
          <div className="overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EBF1F3] text-[#718096] text-[13px] tracking-[0.05em] font-medium uppercase">
                  <th className="px-10 py-5">Date</th>
                  <th className="px-10 py-5">Description</th>
                  <th className="px-10 py-5">Payment Method</th>
                  <th className="px-10 py-5">Amount</th>
                  <th className="px-10 py-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence>
                  {TRANSACTIONS.map((tx, index) => (
                    <motion.tr
                      key={tx.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      {/* Date */}
                      <td className="px-10 py-4">
                        <span className="font-medium  text-[#2D2D2D] text-[15px]">{tx.date}</span>
                      </td>

                      {/* Description */}
                      <td className="px-10 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium text-[#2D2D2D] text-[15px]">{tx.description}</span>
                          <span className="text-[13px] text-slate-400 font-medium">{tx.therapist}</span>
                        </div>
                      </td>

                      {/* Payment Method */}
                      <td className="px-10 py-4">
                        <span className="font-medium text-[#2D2D2D] text-[15px]">{tx.paymentMethod}</span>
                      </td>

                      {/* Amount */}
                      <td className="px-10 py-4">
                        <span className="font-medium text-[#2D2D2D] text-[15px]">{tx.amount}</span>
                      </td>

                      {/* Status */}
                      <td className="px-10 py-5">
                        <Badge
                          className={cn(
                            "px-5 py-2 rounded-xl font-medium border-none text-[12px]",
                            tx.status === "Completed" && "bg-[#E6F4F1] text-[#71B7AF]",
                            tx.status === "Pending" && "bg-[#FEF6E6] text-[#F3C13F]",
                            tx.status === "Failed" && "bg-[#FFEDED] text-[#F36960]"
                          )}
                        >
                          {tx.status}
                        </Badge>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Pagination Section */}
        <div className="flex justify-center items-center gap-3 pb-12">
          <Button variant="ghost" size="icon" className="h-11 cursor-pointer w-11 rounded-xl  bg-white hover:bg-slate-50 border border-slate-100 group transition-all">
            <ChevronLeft className="h-6 w-6 text-slate-400 group-hover:text-slate-600" />
          </Button>

          <Button variant="ghost" size="icon" className="h-11 cursor-pointer w-11 rounded-xl bg-[#71B7AF] text-white hover:bg-[#5E9E96] font-medium text-lg  shadow-[#71B7AF]/20">
            1
          </Button>
          <Button variant="ghost" size="icon" className="h-11 cursor-pointer w-11 rounded-xl bg-white text-slate-600 hover:bg-slate-50 border border-slate-100 font-medium transition-all text-lg">
            2
          </Button>
          <Button variant="ghost" size="icon" className="h-11 cursor-pointer w-11 rounded-xl bg-white text-slate-600 hover:bg-slate-50 border border-slate-100 font-medium transition-all text-lg">
            3
          </Button>

          <span className="px-2 text-slate-300 font-medium text-lg">...</span>

          <Button variant="ghost" size="icon" className="h-11 cursor-pointer w-11 rounded-xl bg-white text-slate-600 hover:bg-slate-50 border border-slate-100 font-medium transition-all text-lg">
            12
          </Button>

          <Button variant="ghost" size="icon" className="h-11 cursor-pointer w-11 rounded-xl bg-white hover:bg-slate-50 border border-slate-100 group transition-all">
            <ChevronRight className="h-6 w-6 text-slate-400 group-hover:text-slate-600" />
          </Button>
        </div>

      </div>
    </div>
  )
}