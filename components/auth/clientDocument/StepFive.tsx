"use client";

import { motion } from "framer-motion";
import { Label, pageAnim, Textarea } from "./FormPrimitives";

export default function StepFive({ data, setData, errors }: { data: any, setData: any, errors: Record<string, string> }) {
  const set = (key: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => setData((d: any) => ({ ...d, [key]: e.target.value }));
  return (
    <motion.div key="concerns" {...pageAnim}>
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 mb-5">
        <p className="text-sm font-semibold text-gray-700 mb-1">Concerns & Goals</p>
        <p className="text-xs text-gray-400">
          This final section helps us understand the nuances of your experience so we can find a therapist who specialises in exactly what you need.
        </p>
      </div>
      <div className="mb-4">
        <Label>Reason for Seeking Therapy</Label>
        <Textarea value={data.reason} onChange={set("reason")} placeholder="I've been feeling a bit overwhelmed lately with …" error={errors.reason} />
      </div>
      <div>
        <Label>Primary Goal</Label>
        <Textarea value={data.goal} onChange={set("goal")} placeholder="This has been affecting my sleep and my ability to focus at …" error={errors.goal} />
      </div>
    </motion.div>
  );
}
