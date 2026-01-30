"use client"

import { motion } from "framer-motion"
import { Calendar, Puzzle, UserPlus, Video } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "1. Sign Up",
    description: "Create your private profile and tell us about your needs.",
  },
  {
    icon: Puzzle,
    title: "2. Match",
    description: "Our algorithm finds the best therapist for your unique situation.",
  },
  {
    icon: Calendar,
    title: "3. Book",
    description: "Schedule a session that fits your busy lifestyle perfectly.",
  },
  {
    icon: Video,
    title: "4. Attend",
    description: "Join secure, private video sessions from anywhere.",
  },
]

export default function TimelineSection() {
  return (
    <section className="py-10 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-20 md:mb-20 ">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 font-sans"
          >
            Your Journey to Wellness
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Guidance, care, and balance—made for you.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto pb-10">
          {/* Central Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 md:translate-x-0" />

          <div className="space-y-12 md:space-y-32">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
              >
                {/* Content Side */}
                <div className={`flex-1 w-full pl-12 md:pl-0 ${index % 2 === 0 ? "md:text-right md:pr-12 md:-ml-16" : "md:text-left md:ml-28"}`}>
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {/* Icon Marker */}
                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white border-2 border-primary/20 shadow-sm flex items-center justify-center z-10">
                    <step.icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                  </div>
                </div>

                {/* Empty Side for layout balance on Desktop */}
                <div className="hidden md:block flex-1" />

              </motion.div>
            ))}
          </div>

          {/* Bottom Gradient Fade for Line */}
          <div className="absolute bottom-0 left-[20px] md:left-1/2 -translate-x-1/2 w-1 h-24 bg-gradient-to-t from-background to-transparent md:translate-x-0" />
        </div>

      </div>
    </section>
  )
}
