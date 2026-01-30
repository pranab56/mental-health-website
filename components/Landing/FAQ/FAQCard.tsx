"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function FAQCard() {
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-secondary rounded-[1.5rem] p-8 md:p-24 text-center overflow-hidden relative shadow-xl"
        >
          {/* Background Texture/Pattern Placeholder - kept subtle */}
          <div className="absolute inset-0 bg-white/5 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-3xl lg:text-4xl font-bold text-white font-sans tracking-tight"
            >
              Frequently Asked Questions
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-white/90 text-lg md:text-xl font-medium"
            >
              Your questions, thoughtfully answered.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-action hover:bg-action/90 text-white rounded-xl h-12 md:h-14 px-8 text-base md:text-lg font-medium shadow-lg transition-transform hover:scale-105 w-full sm:w-auto"
              >
                Start Your Free Assessment <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}