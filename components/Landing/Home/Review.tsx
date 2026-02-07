"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Image from "next/image"

const reviews = [
  {
    content: "Finding a therapist who truly understands me was so easy with Mynder. The matching process was spot on.",
    author: "Sarah J.",
    role: "Member Since 2023",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    content: "Finding a therapist who truly understands me was so easy with Mynder. The matching process was spot on.",
    author: "Sarah J.",
    role: "Member Since 2023",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    content: "Finding a therapist who truly understands me was so easy with Mynder. The matching process was spot on.",
    author: "Sarah J.",
    role: "Member Since 2023",
    image: "https://i.pravatar.cc/150?img=13",
  },
]

export default function Review() {
  return (
    <section className="py-16 md:py-24 bg-sidebar">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 font-sans"
          >
            What Our Clients Say
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center gap-1.5"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 text-warning fill-warning" />
            ))}
          </motion.div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-sm flex flex-col justify-between min-h-[280px]"
            >
              <div className="mb-8">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  &quot;{review.content}&quot;
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={review.image}
                    alt={review.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">
                    {review.author}
                  </h4>
                  <p className="text-sm text-foreground/60">
                    {review.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}