"use client"

import { AnimatedTooltip } from "@/components/ui/animated-tooltip"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Heart, Send } from "lucide-react"
import Image from "next/image"

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image: "https://i.pravatar.cc/150?img=13",
  },
];

export default function Hero() {
  return (
    <section className="bg-secondary relative w-full overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        {/* Left Content */}
        <div className="flex-1 w-full space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
              Accessible & Affordable <br />
              Therapy Anywhere
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-xl leading-relaxed">
              Professional mental health support from the comfort of your home. Connect with licensed therapists today and start your journey to wellness.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="bg-primary/90 hover:bg-primary text-white border-0 h-12 px-8 rounded-2xl text-lg font-medium shadow-lg shadow-black/5 w-full sm:w-auto"
            >
              <Send className="mr-2 w-5 h-5" /> Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border border-action cursor-pointer text-white hover:bg-white/10 hover:text-white h-12 px-8 rounded-2xl text-lg font-medium w-full sm:w-auto"
            >
              Learn More <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex  sm:gap-8 gap-3 pt-4"
          >
            {/* Stat 1 */}
            <div className="flex items-center gap-4 sm:w-auto w-full">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <Calendar className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">+92%</div>
                <div className="text-white/70 sm:text-sm text-xs">Client Satisfaction</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-4 sm:w-auto w-full">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <Heart className="w-6 h-6 text-rose-400 fill-rose-400/20" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">12k+</div>
                <div className="text-white/70 sm:text-sm text-xs ">Appointments booked</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 w-full relative"
        >
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-900/20 aspect-[4/3] w-full">
            <Image
              src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop"
              alt="Therapy Session"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>

          {/* Trusted Users Floating Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -bottom-6 w-[90%] left-1/2  -translate-x-1/2 md:w-auto md:translate-x-0 md:bottom-8  md:-left-20 bg-white/5 backdrop-blur border border-white/20 py-3 px-3 flex items-center gap-10 rounded-3xl shadow-xl"
          >
            <div className="flex flex-row items-center gap-2 justify-center items-center w-full">
              <AnimatedTooltip items={people} />
            </div>
            <div className="pr-4 w-full">
              <div className="text-white font-bold text-lg">14k+</div>
              <div className="text-white/80 text-xs">Trusted User</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
    </section>
  )
}