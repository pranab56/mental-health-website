"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Input, Label, pageAnim, SectionHeader, SelectDropdown } from "./FormPrimitives";

export default function StepOne({ data, setData, errors }: { data: any, setData: any, errors: Record<string, string> }) {
  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => setData((d: any) => ({ ...d, [key]: e.target.value }));

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((d: any) => ({ ...d, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div key="profile" {...pageAnim}>
      {/* Photo */}
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex items-center gap-4 mb-5">
        <div className="relative w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center shrink-0 overflow-hidden border border-gray-100 shadow-sm">
          {data.profilePhoto ? (
            <img src={data.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User size={24} className="text-gray-400" />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">Profile Photo</p>
          <p className="text-xs text-gray-400 mb-1.5">JPG or PNG, max 2 MB. A clear face photo is recommended.</p>
          <div className="flex gap-2">
            <label className="text-xs bg-primary text-white font-medium px-3 py-1 rounded-md hover:bg-primary/80 transition-colors cursor-pointer">
              Update Photo
              <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
            </label>
            {data.profilePhoto && (
              <button
                type="button"
                onClick={() => setData((d: any) => ({ ...d, profilePhoto: null }))}
                className="text-xs text-red-500 font-medium hover:text-red-700 transition-colors cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <SectionHeader>Personal Information</SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div><Label>Full Name</Label><Input value={data.name} onChange={set("name")} placeholder="Sarah Jenkins" error={errors.name} /></div>
        <div><Label>Email Address</Label><Input value={data.email} onChange={set("email")} placeholder="sarah.jenkins@example.com" error={errors.email} /></div>
        <div><Label>Phone Number</Label><Input value={data.phone} onChange={set("phone")} placeholder="+1 (555) 000-0000" error={errors.phone} /></div>
        <div><Label>Date of Birth</Label><Input value={data.dob} onChange={set("dob")} placeholder="04/12/1992" error={errors.dob} /></div>
        <div>
          <Label>Gender Identity</Label>
          <SelectDropdown value={data.gender} onChange={(v) => setData((d: any) => ({ ...d, gender: v }))} placeholder="Select Gender" options={["Male", "Female", "Non-binary", "Other", "Prefer not to say"]} error={errors.gender} />
        </div>
        <div>
          <Label>Preferred Language</Label>
          <SelectDropdown value={data.language} onChange={(v) => setData((d: any) => ({ ...d, language: v }))} placeholder="English" options={["English", "Spanish", "French", "German", "Bengali", "Other"]} />
        </div>
      </div>

      {/* Emergency */}
      <SectionHeader>Emergency Contact</SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div><Label>Contact Full Name</Label><Input value={data.ecName} onChange={set("ecName")} placeholder="Jane Doe" error={errors.ecName} /></div>
        <div><Label>Phone Number</Label><Input value={data.ecPhone} onChange={set("ecPhone")} placeholder="+1 (555) 000-0000" error={errors.ecPhone} /></div>
      </div>
      <div className="mb-5">
        <Label>Relationship</Label>
        <SelectDropdown value={data.ecRel} onChange={(v) => setData((d: any) => ({ ...d, ecRel: v }))} placeholder="Select Relationship" options={["Spouse", "Parent", "Sibling", "Friend", "Other"]} error={errors.ecRel} />
      </div>

      {/* Billing */}
      <SectionHeader>Billing Address</SectionHeader>
      <div className="mb-3"><Label>Street Address</Label><Input value={data.street} onChange={set("street")} placeholder="742 Evergreen Terrace" error={errors.street} /></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div><Label>City</Label><Input value={data.city} onChange={set("city")} placeholder="Springfield" error={errors.city} /></div>
        <div><Label>Zip Code</Label><Input value={data.zip} onChange={set("zip")} placeholder="62704" error={errors.zip} /></div>
        <div><Label>Country</Label><Input value={data.country} onChange={set("country")} placeholder="United States" error={errors.country} /></div>
      </div>
    </motion.div>
  );
}
