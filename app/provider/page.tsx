"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Video
} from "lucide-react";

const appointments = [
  {
    id: 1,
    name: "Sarah Miller",
    type: "Individual Therapy",
    time: "10:00 AM-10:50 AM",
    avatar: "/avatars/sarah.png",
    initials: "SM",
  },
  {
    id: 2,
    name: "James & Emily Wilson",
    type: "Couples Session",
    time: "01:00 PM-02:30 PM",
    avatar: "/avatars/couples.png",
    initials: "JE",
    isGroup: true,
  },
  {
    id: 3,
    name: "Michael Chen",
    type: "Follow-up",
    time: "04:00 PM-04:50 PM",
    avatar: "/avatars/michael.png",
    initials: "MC",
  },
];

const matches = [
  {
    id: 1,
    name: "Michael Chen",
    age: 28,
    tags: ["Work Stress", "Anxiety"],
    match: "94% MATCH",
    avatar: "/avatars/michael.png",
    initials: "MC",
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 28,
    tags: ["Work Stress", "Anxiety"],
    match: "94% MATCH",
    avatar: "/avatars/michael.png",
    initials: "MC",
  },
  {
    id: 3,
    name: "Michael Chen",
    age: 28,
    tags: ["Work Stress", "Anxiety"],
    match: "94% MATCH",
    avatar: "/avatars/michael.png",
    initials: "MC",
  },
];

const notifications = [
  { id: 1, title: "Session Summary - Oct 5", description: "Anxiety management & breathing exercises" },
  { id: 2, title: "Session Summary - Oct 5", description: "Anxiety management & breathing exercises" },
  { id: 3, title: "Session Summary - Oct 5", description: "Anxiety management & breathing exercises" },
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

export default function ProviderPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Quick Actions */}
      <div className="grid grid-cols-1 p-3 bg-white shadow sm:grid-cols-2 rounded-lg lg:flex lg:flex-row gap-4">
        <motion.div variants={itemVariants} className="w-full lg:max-w-[240px]">
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white p-0">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F5F3FF] flex items-center justify-center text-[#9B85C1]">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="font-bold text-[#1e293b]">Set Availability</span>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants} className="w-full lg:max-w-[240px]">
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white p-0">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EDF7F7] flex items-center justify-center text-[#6BB9BA]">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="font-bold text-[#1e293b]">Message Client</span>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Appointments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#1e293b]">Today's Appointments</h2>
            <Badge variant="secondary" className="bg-[#EDF7F7] text-[#6BB9BA] border-none px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#EDF7F7]">
              3 Sessions Today
            </Badge>
          </div>

          <div className="space-y-4">
            {appointments.map((apt) => (
              <motion.div key={apt.id} variants={itemVariants}>
                <Card className="border-none shadow-sm overflow-hidden bg-white">
                  <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <Avatar className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl">
                        <AvatarFallback className="bg-[#EDF7F7] text-[#6BB9BA] font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl">
                          {apt.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#1e293b]">{apt.name}</h3>
                        <p className="text-xs sm:text-sm md:text-[#64748b] font-medium text-slate-500">
                          {apt.type} . <span className="text-slate-400 sm:text-[#64748b]/80">{apt.time}</span>
                        </p>
                      </div>
                    </div>
                    <Button className="w-full sm:w-auto bg-[#9B85C1] hover:bg-[#8a74b0] text-white px-6 h-11 sm:h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-sm sm:text-base transition-colors shrink-0">
                      <Video className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                      Join Session
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#1e293b]">Notifications</h2>
          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-6 sm:p-8 space-y-6 sm:space-y-8">
                {notifications.map((note) => (
                  <div key={note.id} className="flex gap-4">
                    <div className="mt-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#9B85C1]" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-[#1e293b] text-base">{note.title}</p>
                      <p className="text-[#64748b] text-sm leading-relaxed">{note.description}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-4 text-center">
                  <button className="text-[#9B85C1] font-bold flex items-center gap-2 mx-auto hover:underline transition-all">
                    View all activity
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* New Client Matches */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#1e293b]">New Client Matches</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-white shadow-sm text-slate-400 hover:bg-slate-50">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-white shadow-sm text-slate-400 hover:bg-slate-50">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="border-none shadow-sm overflow-hidden bg-white">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <Avatar className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl sm:rounded-2xl">
                      <AvatarFallback className="bg-[#EDF7F7] text-[#6BB9BA] font-bold text-lg sm:text-xl rounded-xl sm:rounded-2xl">
                        {match.initials}
                      </AvatarFallback>
                    </Avatar>
                    <Badge className="bg-[#EDF7F7] text-[#6BB9BA] border-none px-3 py-1 font-bold text-[10px] tracking-wider rounded-md">
                      {match.match}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-[#1e293b] mb-4">{match.name}</h3>

                  <div className="flex flex-wrap gap-2 mb-8">
                    <Badge variant="secondary" className="bg-[#f1f5f9] text-[#64748b] hover:bg-[#f1f5f9] border-none px-4 py-1.5 rounded-full font-bold text-xs">
                      Age {match.age}
                    </Badge>
                    {match.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-[#f1f5f9] text-[#64748b] hover:bg-[#f1f5f9] border-none px-4 py-1.5 rounded-full font-bold text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full bg-[#9B85C1] hover:bg-[#8a74b0] text-white h-11 sm:h-12 rounded-xl font-bold text-sm sm:text-base shadow-sm transition-colors">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}