export type LeadStatus =
  | "new"
  | "qualified"
  | "contacted"
  | "sold"
  | "closed_lost";

export interface LeadInsert {
  full_name: string;
  email?: string | null;
  phone?: string | null;
  company_name?: string | null;
  service_needed: string;
  source: string;
  message?: string | null;
  estimated_value?: number | null;
}
