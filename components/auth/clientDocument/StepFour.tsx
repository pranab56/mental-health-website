"use client";

import { Input, Label, SectionHeader, Textarea } from "./FormPrimitives";

export default function StepFour({ data, setData, errors }: { data: any, setData: any, errors: Record<string, string> }) {
  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setData((d: any) => ({ ...d, [key]: e.target.value }));
  return (
    <div key="health">
      <SectionHeader>Medical History</SectionHeader>
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div><Label>Primary Physician Name</Label><Input value={data.physician} onChange={set("physician")} placeholder="Dr. Jane Smith" error={errors.physician} /></div>
          <div><Label>Physician Phone Number</Label><Input value={data.physPhone} onChange={set("physPhone")} placeholder="(555) 000-0000" error={errors.physPhone} /></div>
        </div>
        <div>
          <Label>Current Medications</Label>
          <Textarea value={data.meds} onChange={set("meds")} placeholder="Please list medication name, dosage, and frequency …" />
        </div>
      </div>

      <SectionHeader>Mental Health History</SectionHeader>
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
        <div className="mb-3">
          <Label>Previous Mental Health Diagnoses</Label>
          <Textarea value={data.diagnoses} onChange={set("diagnoses")} placeholder="Example: Generalized Anxiety Disorder, 2018 …" />
        </div>
        <div>
          <Label>Past Therapy Experience</Label>
          <Textarea value={data.pastTherapy} onChange={set("pastTherapy")} placeholder="Describe what has been helpful or unhelpful in the past …" />
        </div>
      </div>
    </div>
  );
}
