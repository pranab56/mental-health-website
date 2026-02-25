"use client"

import { ChevronRight } from "lucide-react"
import { useState } from "react"
import CreateFormModal from "./CreateFormModal"

const formItems = [
  "Informed Consent",
  "Practice Policies",
  "Privacy Practices",
  "Consent Forms",
  "Telehealth Informed Consent",
  "Consent to Treat & Guarantee of Payment"
]

export default function FormLibraryContent() {
  const [selectedForm, setSelectedForm] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleItemClick = (title: string) => {
    setSelectedForm(title)
    setIsModalOpen(true)
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-sm border border-[#F1F5F9] overflow-hidden">
        {formItems.map((item, index) => (
          <button
            key={item}
            onClick={() => handleItemClick(item)}
            className={`w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50 group ${index !== formItems.length - 1 ? "border-b border-[#F1F5F9]" : ""
              }`}
          >
            <span className="text-[15px] font-medium text-[#222222]">
              {item}
            </span>
            <ChevronRight className="w-5 h-5 text-[#64748B] group-hover:translate-x-1 transition-transform" />
          </button>
        ))}
      </div>

      <CreateFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedForm || ""}
      />
    </div>
  )
}
