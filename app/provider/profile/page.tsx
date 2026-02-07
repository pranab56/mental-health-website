"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import {
  Camera,
  Check,
  Plus,
  Upload
} from "lucide-react"
import React, { KeyboardEvent, useRef, useState } from "react"

const therapeuticApproaches = [
  "Cognitive Behavioral Therapy (CBT)",
  "Dialectical Behavior Therapy (DBT)",
  "Psychodynamic",
  "EMDR",
  "Mindfulness-Based (MBCT)",
  "Acceptance & Commitment (ACT)",
  "Humanistic",
  "Solution Focused Brief (SFBT)",
  "Internal Family Systems (IFS)"
]

const clientPopulations = [
  { id: "children", label: "Children (0-12)" },
  { id: "adolescents", label: "Adolescents (13-17)" },
  { id: "adults", label: "Adults (18+)" },
  { id: "seniors", label: "Seniors (65+)" },
  { id: "lgbtq", label: "LGBTQ+ Affirming" },
  { id: "trauma", label: "Trauma & PTSD" },
  { id: "neurodivergence", label: "Neurodivergence" },
  { id: "grief", label: "Grief & Bereavement" }
]

const sessionFormats = [
  { id: "online", label: "Online (Video)" },
  { id: "session30", label: "Session Lengths (min) 30 min" },
  { id: "session60", label: "Session Lengths (min) 60 min" },
  { id: "session90", label: "Session Lengths (min) 90 min" }
]

export default function ProfileSettings() {
  const [formData, setFormData] = useState({
    fullName: "Sarah Jenkins",
    licenseNumber: "",
    state: "",
    phone: "(555) 000-0000",
    email: "dr.smith@example.com",
    officeAddress: "123 Clinical Way",
    city: "San Francisco",
    degreeName: "",
    universityName: "",
    graduationYear: "",
    approaches: ["Cognitive Behavioral Therapy (CBT)", "Dialectical Behavior Therapy (DBT)"],
    populations: ["adolescents", "adults", "lgbtq"],
    formats: ["online"],
    profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop"
  })

  const [availableApproaches, setAvailableApproaches] = useState(therapeuticApproaches)
  const [isAddingOther, setIsAddingOther] = useState(false)
  const [otherInput, setOtherInput] = useState("")

  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const toggleApproach = (approach: string) => {
    setFormData(prev => ({
      ...prev,
      approaches: prev.approaches.includes(approach)
        ? prev.approaches.filter(a => a !== approach)
        : [...prev.approaches, approach]
    }))
  }

  const handleAddOther = () => {
    const trimmed = otherInput.trim()
    if (trimmed) {
      if (!availableApproaches.includes(trimmed)) {
        setAvailableApproaches(prev => [...prev, trimmed])
      }
      if (!formData.approaches.includes(trimmed)) {
        setFormData(prev => ({
          ...prev,
          approaches: [...prev.approaches, trimmed]
        }))
      }
      setOtherInput("")
      setIsAddingOther(false)
    }
  }

  const handleOtherKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddOther()
    } else if (e.key === "Escape") {
      setIsAddingOther(false)
      setOtherInput("")
    }
  }

  const togglePopulation = (id: string) => {
    setFormData(prev => ({
      ...prev,
      populations: prev.populations.includes(id)
        ? prev.populations.filter(p => p !== id)
        : [...prev.populations, id]
    }))
  }

  const toggleFormat = (id: string) => {
    setFormData(prev => ({
      ...prev,
      formats: prev.formats.includes(id)
        ? prev.formats.filter(f => f !== id)
        : [...prev.formats, id]
    }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePhoto: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.fullName) newErrors.fullName = "Full name is required"
    if (!formData.licenseNumber) newErrors.licenseNumber = "License number is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.state) newErrors.state = "State is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Saving changes:", formData)
      // Show success toast or notification
      alert("Changes saved successfully!")
    } else {
      // Scroll to first error
      const firstError = Object.keys(errors)[0]
      const element = document.getElementsByName(firstError)[0]
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }



  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">My Profile Settings</h1>
          <p className="text-slate-500">Manage your personal information, and account security.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Photo Card */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative group">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                    <AvatarImage src={formData.profilePhoto} />
                    <AvatarFallback className="bg-slate-100 text-slate-400">
                      <Camera className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer"
                  >
                    <Upload className="text-white h-6 w-6" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                </div>
                <div className="flex-1 text-center md:text-left space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-slate-800">Profile Photo</h3>
                    <p className="text-sm text-slate-500">JPG or PNG, max 2MB. A clear face photo is recommended.</p>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-xl border-[#E2E8F0] text-slate-600 hover:bg-[#F8FAFC] h-10 px-6 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Update Photo
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-[#9785BA] hover:text-[#8674A9] hover:bg-transparent px-2 font-medium cursor-pointer"
                      onClick={() => setFormData(prev => ({ ...prev, profilePhoto: "" }))}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Provider Profile Section */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Provider Profile</h2>
            </div>
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-600">Full Name</Label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className={cn(
                      "h-12 rounded-xl bg-white border-[#E2E8F0] focus:ring-[#9785BA]/20",
                      errors.fullName && "border-red-500 focus:ring-red-500/20"
                    )}
                  />
                  {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-600">License Number</Label>
                  <Input
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. LCSW-123456"
                    className={cn(
                      "h-12 rounded-xl bg-white border-[#E2E8F0] focus:ring-[#9785BA]/20",
                      errors.licenseNumber && "border-red-500 focus:ring-red-500/20"
                    )}
                  />
                  {errors.licenseNumber && <p className="text-xs text-red-500 mt-1">{errors.licenseNumber}</p>}
                </div>
                <div className="space-y-2 md:col-span-2 w-full">
                  <Label className="text-sm font-medium text-slate-600">State/Province of Licensure</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(val) => handleSelectChange("state", val)}
                  >
                    <SelectTrigger className={cn(
                      "h-12 rounded-xl bg-white border-[#E2E8F0] focus:ring-[#9785BA]/20 pr-4 w-full py-6",
                      errors.state && "border-red-500"
                    )}>
                      <SelectValue placeholder="Select Location" className="w-full" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="california">California</SelectItem>
                      <SelectItem value="new-york">New York</SelectItem>
                      <SelectItem value="texas">Texas</SelectItem>
                      <SelectItem value="florida">Florida</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-600">Phone</Label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 000-0000"
                    className="h-12 rounded-xl bg-white border-[#E2E8F0] focus:ring-[#9785BA]/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-600">Email Address</Label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="dr.smith@example.com"
                    className={cn(
                      "h-12 rounded-xl bg-white border-[#E2E8F0] focus:ring-[#9785BA]/20",
                      errors.email && "border-red-500 focus:ring-red-500/20"
                    )}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Location & Contact Section */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Location & Contact</h2>
            </div>
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-600">Office Address</Label>
                  <Input
                    name="officeAddress"
                    value={formData.officeAddress}
                    onChange={handleInputChange}
                    placeholder="123 Clinical Way"
                    className="h-12 rounded-xl bg-white border-[#E2E8F0] focus:ring-[#9785BA]/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-600">City</Label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="San Francisco"
                    className="h-12 rounded-xl bg-white border-[#E2E8F0] focus:ring-[#9785BA]/20"
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Academic History Section */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Academic History</h2>
            </div>
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-600">Degree Name</Label>
                  <Input
                    name="degreeName"
                    value={formData.degreeName}
                    onChange={handleInputChange}
                    placeholder="e.g. Master of Psychology"
                    className="h-12 rounded-xl bg-white border-[#E2E8F0] focus:ring-[#9785BA]/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-600">University Name</Label>
                  <Input
                    name="universityName"
                    value={formData.universityName}
                    onChange={handleInputChange}
                    placeholder="e.g. Stanford University"
                    className="h-12 rounded-xl bg-white border-[#E2E8F0] focus:ring-[#9785BA]/20"
                  />
                </div>
                <div className="space-y-2 md:col-span-2 w-full">
                  <Label className="text-sm font-medium text-slate-600">Graduation Year</Label>
                  <Select
                    value={formData.graduationYear}
                    onValueChange={(val) => handleSelectChange("graduationYear", val)}
                  >
                    <SelectTrigger className="h-12 rounded-xl bg-white border-[#E2E8F0] w-full py-6 focus:ring-[#9785BA]/20 pr-4">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 30 }, (_, i) => 2024 - i).map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Therapeutic Approaches Section */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Therapeutic Approaches</h2>
            </div>
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden p-8">
              <div className="flex flex-wrap gap-3">
                {availableApproaches.map((approach) => (
                  <button
                    key={approach}
                    type="button"
                    onClick={() => toggleApproach(approach)}
                    className={cn(
                      "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
                      formData.approaches.includes(approach)
                        ? "bg-[#9785BA] text-white shadow-md shadow-[#9785BA]/20 border-transparent"
                        : "bg-white text-slate-600 border border-slate-100 hover:border-[#9785BA]/50"
                    )}
                  >
                    {approach}
                  </button>
                ))}

                {isAddingOther ? (
                  <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                    <Input
                      autoFocus
                      value={otherInput}
                      onChange={(e) => setOtherInput(e.target.value)}
                      onKeyDown={handleOtherKeyPress}
                      placeholder="Enter approach..."
                      className="h-10 w-48 rounded-full px-4 border-[#9785BA]/30 focus:ring-[#9785BA]/20"
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleAddOther}
                      className="bg-[#9785BA] hover:bg-[#8674A9] text-white rounded-full px-4 h-10 cursor-pointer"
                    >
                      Add
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsAddingOther(false)}
                      className="text-slate-400 hover:text-slate-600 px-2 h-10 cursor-pointer"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAddingOther(true)}
                    className="px-5 py-2.5 rounded-full text-sm font-medium border-2 border-dashed border-[#9785BA]/30 text-[#9785BA] flex items-center gap-2 hover:bg-[#9785BA]/5 transition-colors cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    Add Other
                  </button>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Client Population Section */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Client Population</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clientPopulations.map((pop) => (
                <div
                  key={pop.id}
                  onClick={() => togglePopulation(pop.id)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-200",
                    formData.populations.includes(pop.id)
                      ? "bg-[#EFEAFF] border-[#9785BA]/30"
                      : "bg-white border-transparent shadow-sm hover:border-slate-200"
                  )}
                >
                  <span className={cn(
                    "text-sm font-medium",
                    formData.populations.includes(pop.id) ? "text-[#9785BA]" : "text-slate-600"
                  )}>
                    {pop.label}
                  </span>
                  <div className={cn(
                    "h-6 w-6 rounded-md flex items-center justify-center transition-colors",
                    formData.populations.includes(pop.id) ? "bg-[#9785BA]" : "bg-slate-50 border border-slate-200"
                  )}>
                    {formData.populations.includes(pop.id) && <Check className="h-4 w-4 text-white" />}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Session Formats Section */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Session Formats</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sessionFormats.map((format) => (
                <div
                  key={format.id}
                  onClick={() => toggleFormat(format.id)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-200",
                    formData.formats.includes(format.id)
                      ? "bg-[#EFEAFF] border-[#9785BA]/30"
                      : "bg-white border-transparent shadow-sm hover:border-slate-200"
                  )}
                >
                  <span className={cn(
                    "text-sm font-medium",
                    formData.formats.includes(format.id) ? "text-[#9785BA]" : "text-slate-600"
                  )}>
                    {format.label}
                  </span>
                  <div className={cn(
                    "h-6 w-6 rounded-md flex items-center justify-center transition-colors",
                    formData.formats.includes(format.id) ? "bg-[#9785BA]" : "bg-slate-50 border border-slate-200"
                  )}>
                    {formData.formats.includes(format.id) && <Check className="h-4 w-4 text-white" />}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-end pt-4 pb-10"
          >
            <Button
              type="submit"
              className="bg-[#9785BA] hover:bg-[#8674A9] text-white px-10 h-12 rounded-xl text-md font-medium shadow-lg shadow-[#9785BA]/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Save Changes
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  )
}