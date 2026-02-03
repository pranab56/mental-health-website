"use client";

import { motion } from "framer-motion";
import {
  DocUploadIcon,
  Dropdown,
  GRAD_YEARS,
  Input,
  Label,
  PA,
  Section,
  Textarea
} from "./FormPrimitives";

export default function StepTwo({ d, s, errors }: { d: any, s: any, errors: Record<string, string> }) {
  const u = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => s((p: any) => ({ ...p, [k]: e.target.value }));

  const handleFileChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        s((p: any) => ({ ...p, [field]: { name: file.name, data: reader.result } }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div {...PA}>
      {/* Academic History */}
      <Section title="Academic History">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div><Label>Degree Name</Label><Input value={d.degree || ""} onChange={u("degree")} placeholder="e.g. Master of Psychology" error={errors.degree} /></div>
          <div><Label>University Name</Label><Input value={d.university || ""} onChange={u("university")} placeholder="e.g. Stanford University" /></div>
        </div>
        <Label>Graduation Year</Label>
        <Dropdown value={d.gradYear} onChange={(v) => s((p: any) => ({ ...p, gradYear: v }))} placeholder="Select Year" options={GRAD_YEARS} error={errors.gradYear} />
      </Section>

      {/* Affiliations & Certifications */}
      <Section title="Affiliations & Certifications">
        <div className="mb-3">
          <Label>Professional Affiliations</Label>
          <Textarea
            value={d.affiliations || ""}
            onChange={u("affiliations")}
            placeholder="e.g. Member of American Psychological Association (APA), National Board for Certified Counselors (NBCC)"
            rows={2}
          />
        </div>
        <Label>Additional Certifications</Label>
        <Textarea
          value={d.certs || ""}
          onChange={u("certs")}
          placeholder="e.g. Trauma-Informed Care, EMDR Level II, Specialized Grief Counseling"
          rows={2}
        />
      </Section>

      {/* Previous Employment */}
      <Section title="Previous Employment">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div><Label>Employer Name</Label><Input value={d.employer || ""} onChange={u("employer")} placeholder="e.g. City Mental Health Center" /></div>
          <div><Label>Job Title</Label><Input value={d.jobTitle || ""} onChange={u("jobTitle")} placeholder="e.g. Clinical Director" /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div><Label>Employment Start Date</Label><Input value={d.empStart || ""} onChange={u("empStart")} placeholder="mm/dd/yyyy" /></div>
          <div><Label>Employment End Date</Label><Input value={d.empEnd || ""} onChange={u("empEnd")} placeholder="mm/dd/yyyy" /></div>
        </div>
        <Label>Responsibilities</Label>
        <Textarea value={d.responsibilities || ""} onChange={u("responsibilities")} placeholder="Describe your key clinical roles and responsibilities …" rows={2} />
      </Section>

      {/* Document Verification */}
      <Section title="Document Verification">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>CV Upload</Label>
            <label className="relative block border-2 border-dashed border-violet-200 rounded-xl p-5 flex flex-col items-center gap-1.5 bg-violet-50 cursor-pointer hover:border-violet-400 transition-colors h-32 justify-center">
              {d.cvFile ? (
                <div className="text-center">
                  <div className="bg-violet-100 p-2 rounded-lg inline-block mb-1">
                    <DocUploadIcon />
                  </div>
                  <p className="text-[10px] font-semibold text-violet-700 truncate max-w-[150px]">{d.cvFile.name}</p>
                </div>
              ) : (
                <>
                  <DocUploadIcon />
                  <p className="text-xs font-medium text-gray-600">Click to upload CV</p>
                  <p className="text-[10px] text-gray-400">PDF or Word (max. 10MB)</p>
                </>
              )}
              <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange("cvFile")} />
            </label>
          </div>
          <div>
            <Label>Licensure Upload</Label>
            <label className="relative block border-2 border-dashed border-violet-200 rounded-xl p-5 flex flex-col items-center gap-1.5 bg-violet-50 cursor-pointer hover:border-violet-400 transition-colors h-32 justify-center">
              {d.licenseFile ? (
                <div className="text-center">
                  <div className="bg-violet-100 p-2 rounded-lg inline-block mb-1">
                    <DocUploadIcon />
                  </div>
                  <p className="text-[10px] font-semibold text-violet-700 truncate max-w-[150px]">{d.licenseFile.name}</p>
                </div>
              ) : (
                <>
                  <DocUploadIcon />
                  <p className="text-xs font-medium text-gray-600">Click to upload Licensure</p>
                  <p className="text-[10px] text-gray-400">PDF or Image (max 10MB)</p>
                </>
              )}
              <input type="file" className="hidden" accept=".pdf,image/*" onChange={handleFileChange("licenseFile")} />
            </label>
          </div>
        </div>
      </Section>
    </motion.div>
  );
}
