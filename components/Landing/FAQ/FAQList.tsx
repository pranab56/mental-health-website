"use client"

import { Input } from "@/components/ui/input"
import { AnimatePresence, motion } from "framer-motion"
import { Plus, Search, X } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    question: "Is therapy covered by my insurance?",
    answer: "Yes, simply visit our website and log in or create an account. Search for a doctor based on location, or availability & confirm your booking.",
  },
  {
    question: "How do I know if my therapist is right for me?",
    answer: "Yes, simply visit our website and log in or create an account. Search for a doctor based on location, or availability & confirm your booking.",
  },
  {
    question: "Is my data and conversation private?",
    answer: "Yes, simply visit our website and log in or create an account. Search for a doctor based on location, or availability & confirm your booking.",
  },
  {
    question: "What happens if I need to reschedule a session?",
    answer: "Yes, simply visit our website and log in or create an account. Search for a doctor based on location, or availability & confirm your booking.",
  },
  {
    question: "Is Mynder Therapy covered by insurance?",
    answer: "Yes, simply visit our website and log in or create an account. Search for a doctor based on location, or availability & confirm your booking.",
  },
  {
    question: "What equipment do I need for a session?",
    answer: "Yes, simply visit our website and log in or create an account. Search for a doctor based on location, or availability & confirm your booking.",
  },
  {
    question: "Can I change my therapist at any time?",
    answer: "Yes, simply visit our website and log in or create an account. Search for a doctor based on location, or availability & confirm your booking.",
  },
  {
    question: "How secure is my personal health information?",
    answer: "Yes, simply visit our website and log in or create an account. Search for a doctor based on location, or availability & confirm your booking.",
  },
]

export default function FAQList() {
  const [openIndex, setOpenIndex] = useState<number | null>(1) // Default 2nd item open as per design example
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* Search Input */}
      <div className="relative mb-8 md:mb-12 max-w-xl mx-auto">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search className="w-5 h-5" />
        </div>
        <Input
          type="text"
          placeholder="How can we help?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 md:h-14 pl-12 rounded-lg bg-white border-0 shadow-sm text-base focus-visible:ring-1 focus-visible:ring-primary placeholder:text-muted-foreground/70"
        />
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={false}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between cursor-pointer p-4 md:p-6 text-left"
              >
                <span className="text-base md:text-lg font-bold text-foreground pr-4 md:pr-8">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${isOpen ? "bg-red-100" : "bg-primary/20"
                  }`}>
                  {isOpen ? (
                    <X className="w-5 h-5 text-red-500" />
                  ) : (
                    <Plus className="w-5 h-5 text-primary" />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-4 pb-4 md:px-6 md:pb-6 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
