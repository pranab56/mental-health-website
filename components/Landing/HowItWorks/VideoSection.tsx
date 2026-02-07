"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    setIsPlaying(true)
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play()
      }
    }, 100)
  }

  return (
    <section className="py-10 md:py-10 bg-sidebar w-full">
      <div className="container mx-auto px-4 md:px-8 text-center">
        {/* Header */}
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-bold text-foreground mb-6 font-sans"
          >
            How Mynder Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-md leading-relaxed"
          >
            Four simple steps to personalized mental health support. We&apos;ve designed a seamless
            journey so you can focus on what matters: your well-being
          </motion.p>
        </div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-5xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl aspect-video group cursor-pointer bg-black"
          onClick={!isPlaying ? handlePlay : undefined}
        >
          {!isPlaying ? (
            <>
              <Image
                src="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=2600&auto=format&fit=crop"
                alt="Mynder Experience Video"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>

              {/* Video Controls Mockup (Visible only in thumb mode) */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-4">
                  <span className="text-white text-xs font-medium">0:42 / 2:15</span>
                  <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
                    <div className="w-[30%] h-full bg-primary rounded-full relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
                    </div>
                  </div>
                  <span className="text-white text-xs font-medium">Inside the Mynder Experience</span>
                </div>
              </div>
            </>
          ) : (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              autoPlay
              src="https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </motion.div>

      </div>
    </section>
  )
}
