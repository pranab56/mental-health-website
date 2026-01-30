"use client"

import { motion } from "framer-motion"
import { Calendar, Puzzle, UserPlus, Video } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your private profile and tell us about your needs.",
  },
  {
    icon: Puzzle,
    title: "Match",
    description: "Our algorithm finds the best therapist for your unique situation.",
  },
  {
    icon: Calendar,
    title: "Book",
    description: "Schedule a session that fits your busy lifestyle perfectly.",
  },
  {
    icon: Video,
    title: "Attend",
    description: "Join secure, private video sessions from anywhere.",
  },
]

export default function ItsWork() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 font-sans"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Your path to mental wellness in four simple steps
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">

          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-primary/20 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon Circle */}
              <div className="w-24 h-24 rounded-full bg-sidebar-primary/5 flex items-center justify-center mb-6 group-hover:bg-sidebar-primary/10 transition-colors duration-300 relative group-hover:scale-110 transform ease-in-out">
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center relative z-10">
                  <step.icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-300" strokeWidth={1.5} />
                </div>
                {/* Pulse Effect */}
                <div className="absolute inset-0 rounded-full bg-sidebar-primary/5 scale-0 group-hover:scale-100 transition-transform duration-500" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed max-w-[250px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}