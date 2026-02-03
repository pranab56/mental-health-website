"use client";

import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { cn, Input, Label, pageAnim, SectionHeader } from "./FormPrimitives";

export default function StepThree({ data, setData, errors }: { data: any, setData: any, errors: Record<string, string> }) {
  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => setData((d: any) => ({ ...d, [key]: e.target.value }));

  const handleCardPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((d: any) => ({ ...d, insCardPhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div key="insurance" {...pageAnim}>
      <SectionHeader>Insurance & Payment</SectionHeader>
      <p className="text-xs text-gray-400 -mt-3 mb-4">Almost finished! Just a few more details.</p>

      <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 mb-5">
        <div className="mb-3"><Label>Insurance Provider</Label><Input value={data.insProvider} onChange={set("insProvider")} placeholder="Blue Cross Blue Shield" error={errors.insProvider} /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Member ID</Label><Input value={data.memberId} onChange={set("memberId")} placeholder="ABC123456789" error={errors.memberId} /></div>
          <div><Label>Group Number</Label><Input value={data.groupNum} onChange={set("groupNum")} placeholder="62704" error={errors.groupNum} /></div>
        </div>

        {/* Card photo upload */}
        <div className="mt-4">
          <Label>Insurance Card Photo</Label>
          <label className="relative overflow-hidden border-2 border-dashed border-violet-200 rounded-xl p-6 flex flex-col items-center gap-1 bg-violet-50 cursor-pointer hover:border-violet-400 transition-colors">
            {data.insCardPhoto ? (
              <div className="absolute inset-0 w-full h-full">
                <img src={data.insCardPhoto} alt="Insurance Card" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-xs font-semibold">Change Photo</p>
                </div>
              </div>
            ) : (
              <>
                <Upload size={22} className="text-primary" />
                <p className="text-xs font-medium text-gray-600">Click to upload card photo</p>
                <p className="text-xs text-gray-400">Front and back recommended</p>
              </>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={handleCardPhotoChange} />
          </label>
        </div>
      </div>

      {/* Payment */}
      <SectionHeader>Payment</SectionHeader>
      <div className="grid grid-cols-2 gap-4">
        {["Credit Card", "PayPal"].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setData((d: any) => ({ ...d, payment: m }))}
            className={cn(
              "rounded-xl border p-4 flex flex-col items-center gap-2 text-xs font-medium transition-all duration-200",
              data.payment === m
                ? "border-violet-500 bg-violet-50 text-primary shadow-sm"
                : errors.payment
                  ? "border-red-200 text-red-400 hover:border-red-300 bg-red-50/30"
                  : "border-gray-200 text-gray-500 hover:border-violet-200 hover:bg-violet-50"
            )}
          >
            <span className="text-xl">{m === "Credit Card" ? "💳" : "🅿️"}</span>
            {m}
          </button>
        ))}
      </div>
      {errors.payment && <p className="text-[10px] text-red-500 mt-2 font-medium">{errors.payment}</p>}
    </motion.div>
  );
}
