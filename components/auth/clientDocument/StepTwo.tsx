"use client";

import { cn, Label, SelectDropdown } from "./FormPrimitives";

export default function StepTwo({ data, setData, errors }: { data: any, setData: any, errors: Record<string, string> }) {
  const genders = ["Male", "Female", "Other", "No Preference"];
  const therapyTypes = [
    { key: "Individual", sub: "For myself" },
    { key: "Couple", sub: "For us" },
    { key: "Family", sub: "Shared setting" },
    { key: "Group", sub: "Shared setting" },
  ];

  return (
    <div key="prefs">
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-5 mb-2">
        <p className="text-sm font-semibold text-gray-700 mb-1">Therapy Preferences</p>
        <p className="text-xs text-gray-400">
          Tell us your preferences to help us find the best therapist for you. These choices will help us tailor the matching process to your specific needs.
        </p>
      </div>

      {/* Therapist Gender */}
      <div className="mt-5">
        <Label className={cn(errors.thGender && "text-red-500")}>Therapist Gender</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1.5">
          {genders.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setData((d: any) => ({ ...d, thGender: g }))}
              className={cn(
                "rounded-xl border p-3 flex flex-col items-center gap-1.5 text-xs font-medium transition-all duration-200",
                data.thGender === g
                  ? "border-violet-500 bg-violet-50 text-primary shadow-sm"
                  : errors.thGender
                    ? "border-red-200 text-red-400 hover:border-red-300 bg-red-50/30"
                    : "border-gray-200 text-gray-500 hover:border-violet-200 hover:bg-violet-50"
              )}
            >
              <span className="text-lg">{g === "Male" ? "♂" : g === "Female" ? "♀" : g === "Other" ? "⚧" : "⬡"}</span>
              {g}
            </button>
          ))}
        </div>
        {errors.thGender && <p className="text-[10px] text-red-500 mt-1.5 font-medium">{errors.thGender}</p>}
      </div>

      {/* Therapy Type */}
      <div className="mt-5">
        <Label className={cn(errors.thType && "text-red-500")}>Therapy Type</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1.5">
          {therapyTypes.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setData((d: any) => ({ ...d, thType: t.key }))}
              className={cn(
                "rounded-xl border p-3 flex flex-col items-center gap-1 text-xs font-medium transition-all duration-200",
                data.thType === t.key
                  ? "border-violet-500 bg-violet-50 text-primary shadow-sm"
                  : errors.thType
                    ? "border-red-200 text-red-400 hover:border-red-300 bg-red-50/30"
                    : "border-gray-200 text-gray-500 hover:border-violet-200 hover:bg-violet-50"
              )}
            >
              <span className="text-lg">{t.key === "Individual" ? "👤" : t.key === "Couple" ? "👫" : t.key === "Family" ? "👨‍👩‍👧" : "👥"}</span>
              <span>{t.key}</span>
              <span className="text-gray-400 font-normal">{t.sub}</span>
            </button>
          ))}
        </div>
        {errors.thType && <p className="text-[10px] text-red-500 mt-1.5 font-medium">{errors.thType}</p>}
      </div>

      {/* Dropdowns row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div>
          <Label>Session Format</Label>
          <SelectDropdown value={data.sessionFmt} onChange={(v) => setData((d: any) => ({ ...d, sessionFmt: v }))} placeholder="Online (Video call)" options={["Online (Video call)", "In-Person", "Phone Call", "Hybrid"]} error={errors.sessionFmt} />
        </div>
        <div>
          <Label>Preferred Approach</Label>
          <SelectDropdown value={data.approach} onChange={(v) => setData((d: any) => ({ ...d, approach: v }))} placeholder="No Preference / Let therapist decide" options={["No Preference / Let therapist decide", "CBT", "DBT", "Psychodynamic", "Humanistic", "EMDR"]} error={errors.approach} />
        </div>
      </div>
      <div className="mt-4">
        <Label>Session Frequency</Label>
        <SelectDropdown value={data.frequency} onChange={(v) => setData((d: any) => ({ ...d, frequency: v }))} placeholder="Online" options={["Online", "Weekly", "Bi-weekly", "Monthly"]} error={errors.frequency} />
      </div>
    </div>
  );
}
