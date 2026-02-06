"use client"

import FAQList from "@/components/Landing/FAQ/FAQList"
import { motion } from "framer-motion"
import FAQCard from '../../../components/Landing/FAQ/FAQCard'

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-sidebar py-12 md:py-10">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 font-display font-comic"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-md md:text-lg max-w-2xl mx-auto"
          >
            We&apos;re here to support you 24/7 with any questions you may have about your mental health journey.
          </motion.p>
        </div>

        {/* FAQ List Content */}
        <FAQList />
        <FAQCard />

      </div>
    </main>
  )
}