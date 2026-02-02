"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  Clock,
  MessageCircle,
  Stethoscope,
  Target
} from "lucide-react";
import Link from "next/link";

const sessionHistory = [
  { id: 1, date: "Oct 24, 2023", type: "Video Call", status: "Completed" },
  { id: 2, date: "Oct 24, 2023", type: "Video Call", status: "Completed" },
  { id: 3, date: "Oct 24, 2023", type: "Video Call", status: "Completed" },
];

const careTeam = [
  { id: 1, name: "Dr. Sarah Smith", role: "Lead Therapist", initials: "SS" },
  { id: 2, name: "Dr. Alan Ritch", role: "Psychiatrist", initials: "AR" },
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

export default function ClientProfilePage({ params }: { params: { id: string } }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-slate-400 font-medium">
        <Link href="/provider" className="hover:text-[#6BB9BA] transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/provider/clients" className="hover:text-[#6BB9BA] transition-colors">Clients</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#9B85C1]">Jane Cooper</span>
      </div>

      {/* Profile Header */}
      <motion.div variants={itemVariants}>
        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 rounded-3xl">
                  <AvatarFallback className="bg-[#EDF7F7] text-[#6BB9BA] font-bold text-3xl">JC</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#4ADE80] border-4 border-white rounded-full shadow-sm" />
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-[#1e293b]">Jane Cooper</h1>
                <div className="flex flex-wrap items-center gap-6 text-slate-500 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    <span>Last Session: Oct 24, 2023</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <span>Next Session: Nov 01, 2023</span>
                  </div>
                </div>
              </div>
            </div>
            <Button className="bg-[#9B85C1] hover:bg-[#8a74b0] text-white px-8 h-14 rounded-2xl font-bold text-lg shadow-sm transition-all">
              Message Client
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Intake and Sessions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Intake Summary */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#9B85C1]/10 rounded-lg text-[#9B85C1]">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e293b]">Intake Summary</h2>
            </div>

            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-8 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#9B85C1]">
                    <MessageCircle className="w-6 h-6 fill-[#9B85C1]/20" />
                    <h3 className="font-bold text-lg text-[#1e293b]">Reason For Therapy</h3>
                  </div>
                  <p className="text-slate-500 leading-relaxed text-lg">
                    Client reports high levels of . Develop stress management workplace anxiety and difficulty maintaining work-life balance since a . Improve sleep hygiene and duration promotion 3 months ago. Experiences . Establish healthy professional frequent insomnia and intrusive boundaries thoughts about performance.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#9B85C1]">
                    <Stethoscope className="w-6 h-6 fill-[#9B85C1]/20" />
                    <h3 className="font-bold text-lg text-[#1e293b]">Primary Goals</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Develop stress management workplace anxiety and difficulty techniques",
                      "Improve sleep hygiene and duration",
                      "Establish healthy professional frequent insomnia and intrusive boundaries"
                    ].map((goal, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-[#EDF7F7] flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#6BB9BA]" />
                        </div>
                        <span className="text-slate-500 text-lg leading-relaxed">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Session History */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-2xl font-bold text-[#1e293b]">Session History</h2>
            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <Table>
                <TableHeader className="bg-[#EDF7F7]/30">
                  <TableRow className="border-none">
                    <TableHead className="py-6 px-8 text-slate-500 font-bold uppercase tracking-wider">Date</TableHead>
                    <TableHead className="py-6 px-8 text-slate-500 font-bold uppercase tracking-wider">Type</TableHead>
                    <TableHead className="py-6 px-8 text-slate-500 font-bold uppercase tracking-wider text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessionHistory.map((session) => (
                    <TableRow key={session.id} className="border-slate-50 hover:bg-slate-50/50">
                      <TableCell className="py-8 px-8 font-bold text-[#1e293b] text-lg">{session.date}</TableCell>
                      <TableCell className="py-8 px-8 font-bold text-[#1e293b] text-lg">{session.type}</TableCell>
                      <TableCell className="py-8 px-8 text-right">
                        <Badge className="bg-[#EDF7F7] text-[#6BB9BA] hover:bg-[#EDF7F7] border-none px-6 py-2 rounded-full font-bold text-sm">
                          {session.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </motion.div>
        </div>

        {/* Right Column: Sidebar info */}
        <div className="space-y-8">
          {/* Demographics */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-[#1e293b] mb-6">Demographics</h2>
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-8 space-y-8">
                {[
                  { label: "Age", value: "32 Years" },
                  { label: "Gender Identity", value: "Female" },
                  { label: "Location", value: "San Francisco, CA" },
                  { label: "Occupation", value: "Product Manager" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-lg">
                    <span className="text-slate-500 font-medium">{item.label}</span>
                    <span className="text-[#1e293b] font-bold">{item.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Care Team */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-[#1e293b] mb-6">Care Team</h2>
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-8 space-y-8">
                {careTeam.map((member) => (
                  <div key={member.id} className="flex items-center gap-4">
                    <div className="p-3 bg-[#EDF7F7] rounded-xl text-[#6BB9BA]">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-[#1e293b]">{member.name}</p>
                      <p className="text-[#9B85C1] font-bold text-sm">{member.role}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
