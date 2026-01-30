"use client"

import { motion } from "framer-motion"
import { BadgeCheck, Clock, Lock, Wallet } from "lucide-react"

const features = [
  {
    icon: BadgeCheck,
    title: "Licensed Providers",
    description: "All therapists are fully accredited, vetted, and specialized in various fields.",
    borderColor: "border-secondary", // Purple
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Book morning, evening, or weekend sessions that work for your schedule.",
    borderColor: "border-secondary", // Purple
  },
  {
    icon: Lock,
    title: "Encrypted Chat",
    description: "Your privacy is our priority with end-to-end encryption for all messages.",
    borderColor: "border-action", // Teal
  },
  {
    icon: Wallet,
    title: "Affordable Pricing",
    description: "Quality mental care at a fraction of the cost of traditional in-person therapy.",
    borderColor: "border-secondary", // Purple
  },
]

export default function WhyChooseMynder() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 font-sans"
          >
            Why Choose Mynder?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl leading-relaxed"
          >
            We provide the professional tools and compassionate support <br className="hidden md:block" />
            you need for your mental wellness journey.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 ${feature.borderColor}`}
            >
              <div className="mb-4">
                <feature.icon className="w-8 h-8 text-action" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}