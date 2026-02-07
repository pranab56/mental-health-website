"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function BookingSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.8
        }}
        className="mb-8"
      >
        <div className="w-24 h-24 rounded-full bg-action/10 flex items-center justify-center text-action mx-auto">
          <CheckCircle2 size={56} />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="space-y-4 max-w-md"
      >
        <h1 className="text-3xl font-bold text-foreground">Booking Confirmed!</h1>
        <p className="text-muted-foreground text-lg">
          You&apos;re all set for your session with <span className="text-foreground font-bold">Dr. Sarah Jenkins</span>. We&apos;ve sent a confirmation email with all the details and meeting links.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 mt-12 w-full max-w-sm"
      >
        <Button className="flex-1 h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold text-base shadow-lg shadow-primary/20" asChild>
          <Link href="/my-dashboard">
            Go to Dashboard
          </Link>
        </Button>
        <Button variant="outline" className="flex-1 h-14 border-primary text-primary hover:bg-primary/5 rounded-2xl font-bold text-base" asChild>
          <Link href="/my-dashboard/messages">
            Message Therapist
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
