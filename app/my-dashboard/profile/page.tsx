"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import {
  AlertCircle,
  Camera,
  CheckCircle2,
  Image as ImageIcon
} from "lucide-react"
import React, { ChangeEvent, useRef, useState } from "react"

// --- Types ---
interface FormData {
  fullName: string
  email: string
  phone: string
  dob: string
  gender: string
  language: string
  insuranceProvider: string
  memberId: string
  groupNumber: string
  emergencyName: string
  emergencyPhone: string
  relationship: string
  street: string
  city: string
  zip: string
  country: string
}

interface FormErrors {
  [key: string]: string
}

export default function ProfilePage() {
  // --- Refs ---
  const fileInputRef = useRef<HTMLInputElement>(null)
  const insuranceInputRef = useRef<HTMLInputElement>(null)

  // --- State ---
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200")
  const [insuranceImage, setInsuranceImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    fullName: "Sarah Jenkins",
    email: "sarah.jenkins@example.com",
    phone: "+1 (555) 000-0000",
    dob: "1992-04-12",
    gender: "female",
    language: "english",
    insuranceProvider: "Blue Cross Blue Shield",
    memberId: "ABC123456789",
    groupNumber: "62704",
    emergencyName: "Jane Doe",
    emergencyPhone: "+1 (555) 000-0000",
    relationship: "spouse",
    street: "742 Evergreen Terrace",
    city: "Springfield",
    zip: "62704",
    country: "United States",
  })

  const [errors, setErrors] = useState<FormErrors>({})

  // --- Handlers ---
  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, profilePhoto: "Image size must be less than 2MB" })
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
        setErrors({ ...errors, profilePhoto: "" })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInsuranceClick = () => {
    insuranceInputRef.current?.click()
  }

  const handleInsuranceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setInsuranceImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validate = () => {
    const newErrors: FormErrors = {}

    // Required fields check
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.dob) newErrors.dob = "Date of birth is required"
    if (!formData.insuranceProvider.trim()) newErrors.insuranceProvider = "Insurance provider is required"
    if (!formData.memberId.trim()) newErrors.memberId = "Member ID is required"
    if (!formData.emergencyName.trim()) newErrors.emergencyName = "Emergency contact name is required"
    if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = "Emergency phone is required"
    if (!formData.street.trim()) newErrors.street = "Street address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.zip.trim()) {
      newErrors.zip = "Zip code is required"
    } else if (!/^\d+$/.test(formData.zip)) {
      newErrors.zip = "Zip code must be numeric"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (validate()) {
      setIsSubmitting(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSubmitting(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  return (
    <div className="font-sans pb-24 relative">
      <div className="space-y-8">

        {/* Header Section */}
        <div className="space-y-1">
          <h1 className="text-2xl font-medium text-[#2D2D2D]">Settings</h1>
          <p className="text-slate-500 font-medium text-sm">Manage your personal information, and account security.</p>
        </div>

        {/* Profile Photo Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="relative group">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Avatar className="h-24 w-24 md:h-28 md:w-28 rounded-xl ring-4 ring-slate-50 shadow-sm overflow-hidden transition-all group-hover:ring-[#9B8FC7]/30">
              <AvatarImage src={profileImage} className="object-cover" />
              <AvatarFallback className="bg-slate-100 text-[#9B8FC7] text-2xl font-bold">
                {formData.fullName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div
              onClick={handleImageClick}
              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all rounded-xl cursor-pointer"
            >
              <Camera className="text-white h-7 w-7" />
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-lg font-medium text-[#2D2D2D]">Profile Photo</h3>
              <p className="text-sm text-slate-400 font-medium max-w-xs leading-relaxed">JPG or PNG, max 2MB. A clear face photo is recommended.</p>
              {errors.profilePhoto && <p className="text-red-500 text-xs font-bold mt-1">{errors.profilePhoto}</p>}
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={handleImageClick}
                className="bg-[#E9F0FD] hover:bg-[#DDE7F9] text-[#2D2D2D] font-medium rounded-xl px-6 h-10 border-none transition-all cursor-pointer"
              >
                Update Photo
              </Button>
              <Button
                variant="ghost"
                onClick={() => setProfileImage("")}
                className="text-[#9B8FC7] hover:text-red-500 hover:bg-red-50 font-medium h-10 transition-all cursor-pointer"
              >
                Remove
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Personal Information Section */}
        <SectionWrapper title="Personal Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <InputGroup label="Full Name" error={errors.fullName}>
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={cn("h-11 bg-white border-slate-100 rounded-xl font-medium focus-visible:ring-[#9B8FC7]/20", errors.fullName && "border-red-300")}
              />
            </InputGroup>
            <InputGroup label="Email Address" error={errors.email}>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={cn("h-11 bg-white border-slate-100 rounded-xl font-medium focus-visible:ring-[#9B8FC7]/20", errors.email && "border-red-300")}
              />
            </InputGroup>
            <InputGroup label="Phone Number" error={errors.phone}>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={cn("h-11 bg-white border-slate-100 rounded-xl font-medium focus-visible:ring-[#9B8FC7]/20", errors.phone && "border-red-300")}
              />
            </InputGroup>
            <InputGroup label="Date of Birth" error={errors.dob}>
              <Input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className={cn("h-11 bg-white border-slate-100 rounded-xl font-medium focus-visible:ring-[#9B8FC7]/20", errors.dob && "border-red-300")}
              />
            </InputGroup>
            <InputGroup label="Gender Identity" >
              <Select
                value={formData.gender}
                onValueChange={(val) => setFormData({ ...formData, gender: val })}
              >
                <SelectTrigger className="h-11 bg-white border-slate-100 w-full rounded-xl font-medium focus:ring-[#9B8FC7]/20">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 w-full">
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </InputGroup>
            <InputGroup label="Preferred Language">
              <Select
                value={formData.language}
                onValueChange={(val) => setFormData({ ...formData, language: val })}
              >
                <SelectTrigger className="h-11 bg-white w-full border-slate-100 rounded-xl font-medium focus:ring-[#9B8FC7]/20">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 w-full">
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectContent>
              </Select>
            </InputGroup>
          </div>
        </SectionWrapper>

        {/* Primary Insurance Section */}
        <SectionWrapper title="Primary Insurance">
          <div className="space-y-6 p-6">
            <InputGroup label="Insurance Provider" error={errors.insuranceProvider}>
              <Input
                value={formData.insuranceProvider}
                onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
                className={cn("h-11 bg-white border-slate-100 rounded-xl font-medium focus-visible:ring-[#9B8FC7]/20 w-full", errors.insuranceProvider && "border-red-300")}
              />
            </InputGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Member ID" error={errors.memberId}>
                <Input
                  value={formData.memberId}
                  onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                  className={cn("h-11 bg-white border-slate-100 rounded-xl font-medium focus-visible:ring-[#9B8FC7]/20", errors.memberId && "border-red-300")}
                />
              </InputGroup>
              <InputGroup label="Group Number">
                <Input
                  value={formData.groupNumber}
                  onChange={(e) => setFormData({ ...formData, groupNumber: e.target.value })}
                  className="h-11 bg-white border-slate-100 rounded-xl font-medium focus-visible:ring-[#9B8FC7]/20"
                />
              </InputGroup>
            </div>
            <InputGroup label="Insurance Card Photo">
              <input
                type="file"
                ref={insuranceInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleInsuranceChange}
              />
              <div
                onClick={handleInsuranceClick}
                className={cn(
                  "w-full h-40 border-2 border-dashed border-[#E5EAF2] bg-[#F9FBFF] rounded-xl flex flex-col items-center justify-center gap-3 group cursor-pointer hover:border-[#9B8FC7]/40 transition-all overflow-hidden relative",
                  insuranceImage && "border-solid border-[#9B8FC7]/40"
                )}
              >
                {insuranceImage ? (
                  <img src={insuranceImage} alt="Insurance" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="h-11 w-11 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-[#9B8FC7]" />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-sm font-medium text-[#2D2D2D]">Click to upload card photo</p>
                      <p className="text-[12px] text-slate-400 font-medium">Front and back recommended</p>
                    </div>
                  </>
                )}
                {insuranceImage && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-bold text-sm bg-black/40 px-4 py-2 rounded-full">Change Photo</p>
                  </div>
                )}
              </div>
            </InputGroup>
          </div>
        </SectionWrapper>

        {/* Emergency Contact Section */}
        <SectionWrapper title="Emergency Contact">
          <div className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Contact Full Name" error={errors.emergencyName}>
                <Input
                  value={formData.emergencyName}
                  onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                  className={cn("h-11 bg-white border-slate-100 rounded-xl font-medium focus-visible:ring-[#9B8FC7]/20", errors.emergencyName && "border-red-300")}
                />
              </InputGroup>
              <InputGroup label="Phone Number" error={errors.emergencyPhone}>
                <Input
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                  className={cn("h-11 bg-white border-slate-100 rounded-xl font-medium focus-visible:ring-[#9B8FC7]/20", errors.emergencyPhone && "border-red-300")}
                />
              </InputGroup>
            </div>
            <InputGroup label="Relationship">
              <Select
                value={formData.relationship}
                onValueChange={(val) => setFormData({ ...formData, relationship: val })}
              >
                <SelectTrigger className="h-11 bg-white border-slate-100 rounded-xl font-medium focus:ring-[#9B8FC7]/20">
                  <SelectValue placeholder="Select Relationship" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100">
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="friend">Friend</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </InputGroup>
          </div>
        </SectionWrapper>

        {/* Billing Address Section */}
        <SectionWrapper title="Billing Address">
          <div className="space-y-6 p-6">
            <InputGroup label="Street Address" error={errors.street}>
              <Input
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className={cn("h-11 bg-white border-slate-100 rounded-xl font-medium focus-visible:ring-[#9B8FC7]/20", errors.street && "border-red-300")}
              />
            </InputGroup>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputGroup label="City" error={errors.city}>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={cn("h-11 bg-white border-slate-100 rounded-xl font-medium focus-visible:ring-[#9B8FC7]/20", errors.city && "border-red-300")}
                />
              </InputGroup>
              <InputGroup label="Zip Code" error={errors.zip}>
                <Input
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className={cn("h-11 bg-white border-slate-100 rounded-xl font-medium focus-visible:ring-[#9B8FC7]/20", errors.zip && "border-red-300")}
                />
              </InputGroup>
              <InputGroup label="Country">
                <Input
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="h-11 bg-white border-slate-100 rounded-xl font-medium focus-visible:ring-[#9B8FC7]/20"
                />
              </InputGroup>
            </div>
          </div>
        </SectionWrapper>

        {/* Footer Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-end pt-4"
        >
          <Button
            onClick={handleSave}
            disabled={isSubmitting}
            className="bg-[#9B8FC7] hover:bg-[#8A79B8] text-white rounded-xl px-12 h-12 font-medium transition-all shadow-lg shadow-[#9B8FC7]/20 text-base cursor-pointer disabled:opacity-70 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : "Save Changes"}
          </Button>
        </motion.div>

      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-10 right-10 bg-[#2DC766] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 z-50 border-2 border-white/20"
          >
            <CheckCircle2 className="h-6 w-6" />
            <div className="flex flex-col">
              <span className="font-bold text-lg">Success!</span>
              <span className="text-sm opacity-90">Your profile has been updated.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SectionWrapper({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-slate-50 bg-[#FBFBFB]/50">
        <h2 className="text-lg font-medium text-[#2D2D2D]">{title}</h2>
      </div>
      <div className="bg-[#FBFBFB]/10">
        {children}
      </div>
    </motion.div>
  )
}

function InputGroup({ label, children, error }: { label: string, children: React.ReactNode, error?: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-1">
        <label className="text-[13px] font-medium text-slate-500">{label}</label>
        {error && (
          <span className="text-red-500 text-[11px] font-bold flex items-center gap-1 animate-in fade-in slide-in-from-right-1">
            <AlertCircle className="h-3 w-3" />
            {error}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}