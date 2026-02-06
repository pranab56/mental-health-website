"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const clients = Array(9).fill(null).map((_, i) => ({
  id: i + 1,
  name: "Jane Cooper",
  age: 28,
  gender: "Female",
  tags: ["ANXIETY", "CBT", "DEPRESSION"],
  primaryConcern: "Anxiety",
  lastSession: "Oct 24, 2025",
  avatar: "/avatars/jane.png",
  initials: "JC",
}));

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

export default function ClientsPage() {
  const [activePage, setActivePage] = useState(1);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Search and Filter Header */}
      <Card className="border-none shadow-sm bg-white">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search by client name or ID ..."
                className="pl-12 h-14 bg-[#F8FAFC] border-none rounded-xl text-base focus-visible:ring-1 focus-visible:ring-[#9B85C1]"
              />
            </div>
            <Button className="h-14 px-8 bg-[#9B85C1] hover:bg-[#8a74b0] text-white rounded-xl flex items-center gap-2 font-bold text-base transition-colors w-full md:w-auto">
              <Filter className="w-5 h-5" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats and Sort */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-1">
        <p className="text-[#64748b] font-medium text-base sm:text-lg text-center sm:text-left">
          Showing <span className="font-bold text-[#1e293b]">128</span> clients in your area
        </p>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[#64748b] font-medium text-sm sm:text-base whitespace-nowrap">Sort by:</span>
          <Select defaultValue="highest">
            <SelectTrigger className="w-[140px] sm:w-[180px] h-10 border-none bg-transparent shadow-none font-bold text-[#1e293b] focus:ring-0 text-sm sm:text-base">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-100">
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <motion.div key={client.id} variants={itemVariants}>
            <Card className="border-none shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow">
              <CardContent className="p-5 sm:p-8">
                <div className="flex gap-3 sm:gap-4 mb-6">
                  <Avatar className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl sm:rounded-2xl">
                    <AvatarFallback className="bg-[#EDF7F7] text-[#6BB9BA] font-bold text-xl sm:text-2xl rounded-xl sm:rounded-2xl">
                      {client.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1e293b]">{client.name}</h3>
                    <p className="text-[#9B85C1] font-bold text-sm">
                      Age:{client.age} / {client.gender}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {client.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-bold text-[#64748b] bg-[#F1F5F9] px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748b] font-medium">Primary Concern</span>
                    <Badge className="bg-[#EDF7F7] text-[#6BB9BA] hover:bg-[#EDF7F7] border-none px-4 py-1.5 rounded-lg font-bold text-xs uppercase">
                      {client.primaryConcern}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748b] font-medium">Last Session</span>
                    <span className="font-bold text-[#1e293b]">{client.lastSession}</span>
                  </div>
                </div>

                <Link href={`/provider/clients/${client.id}`}>
                  <Button className="w-full bg-[#9B85C1] hover:bg-[#8a74b0] text-white h-12 rounded-xl font-bold text-base transition-colors">
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-center gap-2 py-8">
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-white shadow-sm text-slate-400 hover:bg-slate-50 shrink-0">
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
        <div className="flex items-center gap-1 sm:gap-2">
          {[1, 2, 3, "...", 12].map((page, i) => (
            <Button
              key={i}
              variant={activePage === page ? "default" : "ghost"}
              onClick={() => typeof page === "number" && setActivePage(page)}
              className={`h-9 w-9 sm:h-12 sm:w-12 rounded-full font-bold text-base sm:text-lg transition-all p-0 shrink-0 ${activePage === page
                ? "bg-[#6BB9BA] text-white hover:bg-[#5aa8a9]"
                : "text-[#64748b] hover:bg-white hover:shadow-sm"
                }`}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-white shadow-sm text-slate-400 hover:bg-slate-50 shrink-0">
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      </div>
    </motion.div>
  );
}