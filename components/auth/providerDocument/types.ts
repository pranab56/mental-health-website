export interface ProviderIntakeFormData {
  // Step 1
  name?: string;
  email?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  office?: string;
  profilePhoto?: string | null;
  profPhotoMedia?: string | null;
  profVideoMedia?: string | null;

  // Step 2
  degree?: string;
  university?: string;
  gradYear?: string;
  affiliations?: string;
  certs?: string;
  employer?: string;
  jobTitle?: string;
  empStart?: string;
  empEnd?: string;
  responsibilities?: string;
  cvFile?: { name: string; data: string | null | ArrayBuffer } | null;
  licenseFile?: { name: string; data: string | null | ArrayBuffer } | null;

  // Step 3
  approaches?: string[];
  populations?: string[];
  sessions?: string[];

  // Misc/Implicit in page.tsx
  license?: string;
  state?: string;
  type?: string;
}
