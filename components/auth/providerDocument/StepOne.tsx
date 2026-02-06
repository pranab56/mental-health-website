"use client";

import {
  Dropdown,
  Input,
  Label,
  Section,
  UploadIcon,
  VideoUploadIcon
} from "./FormPrimitives";

export default function StepOne({ d, s, errors }: { d: any, s: any, errors: Record<string, string> }) {
  const u = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => s((p: any) => ({ ...p, [k]: e.target.value }));

  const handleFileChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        s((p: any) => ({ ...p, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div key="step1">
      {/* Photo card */}
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex items-center gap-4 mb-4">
        <div className="relative w-14 h-14 rounded-full bg-gray-200 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
          {d.profilePhoto ? (
            <img src={d.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">Profile Photo</p>
          <p className="text-xs text-gray-400 mb-1.5">JPG or PNG, max 2MB. A clear face photo is recommended.</p>
          <div className="flex gap-2">
            <label className="text-xs bg-primary text-white font-medium px-3 py-1 rounded-md hover:bg-primary/80 transition-colors cursor-pointer">
              Update Photo
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange("profilePhoto")} />
            </label>
            {d.profilePhoto && (
              <button
                type="button"
                onClick={() => s((p: any) => ({ ...p, profilePhoto: null }))}
                className="text-xs text-red-500 font-medium hover:text-red-700 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Provider Profile */}
      <Section title="Provider Profile">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Full Name</Label><Input value={d.name || ""} onChange={u("name")} placeholder="Sarah Jenkins" error={errors.name} /></div>
          <div><Label>Phone</Label><Input value={d.phone || ""} onChange={u("phone")} placeholder="(555) 000-0000" error={errors.phone} /></div>
          <div><Label>Email Address</Label><Input value={d.email || ""} onChange={u("email")} placeholder="dr.smith@example.com" error={errors.email} /></div>
          <div><Label>Date of Birth</Label><Input value={d.dob || ""} onChange={u("dob")} placeholder="MM/DD/YYYY" error={errors.dob} /></div>
        </div>
        <div className="mt-4">
          <Label>Gender Identity</Label>
          <Dropdown value={d.gender} onChange={(v) => s((p: any) => ({ ...p, gender: v }))} placeholder="Select Gender" options={["Male", "Female", "Non-binary", "Other", "Prefer not to say"]} error={errors.gender} />
        </div>
      </Section>

      {/* Location & Contact */}
      <Section title="Location & Contact">
        <div className="mb-4">
          <Label>Office Address</Label>
          <Input value={d.office || ""} onChange={u("office")} placeholder="123 Clinical Way" error={errors.office} />
        </div>
      </Section>

      {/* Media & Presence */}
      <Section title="Media & Presence">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Professional Photo</Label>
            <label className="relative block border-2 border-dashed border-violet-200 rounded-xl p-5 flex flex-col items-center gap-1.5 bg-violet-50 cursor-pointer hover:border-violet-400 transition-colors overflow-hidden h-32">
              {d.profPhotoMedia ? (
                <div className="absolute inset-0 w-full h-full">
                  <img src={d.profPhotoMedia} alt="Professional" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-xs font-semibold">Change Photo</p>
                  </div>
                </div>
              ) : (
                <>
                  <UploadIcon />
                  <p className="text-xs font-medium text-gray-600">Click to upload photo</p>
                  <p className="text-xs text-gray-400">PNG or JPG, max 5MB</p>
                </>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange("profPhotoMedia")} />
            </label>
          </div>
          <div>
            <Label>Professional Video (Optional)</Label>
            <label className="relative block border-2 border-dashed border-violet-200 rounded-xl p-5 flex flex-col items-center gap-1.5 bg-violet-50 cursor-pointer hover:border-violet-400 transition-colors overflow-hidden h-32">
              {d.profVideoMedia ? (
                <div className="absolute inset-0 w-full h-full bg-violet-900 flex flex-col items-center justify-center gap-1">
                  <VideoUploadIcon />
                  <p className="text-white text-[10px] font-medium">Video Uploaded</p>
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-xs font-semibold">Change Video</p>
                  </div>
                </div>
              ) : (
                <>
                  <VideoUploadIcon />
                  <p className="text-xs font-medium text-gray-600">Click to upload Video</p>
                </>
              )}
              <input type="file" className="hidden" accept="video/*" onChange={handleFileChange("profVideoMedia")} />
            </label>
          </div>
        </div>
      </Section>
    </div>
  );
}
