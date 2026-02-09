export interface ClientIntakeFormData {
  // Step 1
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  language: string;
  ecName: string;
  ecPhone: string;
  ecRel: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  profilePhoto?: string | null;

  // Step 2
  thGender: string;
  thType: string;
  sessionFmt: string;
  approach: string;
  frequency: string;

  // Step 3
  insProvider: string;
  memberId: string;
  groupNum: string;
  insCardPhoto?: string | null;
  payment: string;

  // Step 4
  physician: string;
  physPhone: string;
  meds: string;
  diagnoses: string;
  pastTherapy: string;

  // Step 5
  reason: string;
  goal: string;
}
