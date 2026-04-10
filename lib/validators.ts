import { z } from "zod";

export const leadSchema = z.object({
  full_name: z.string().min(2).max(120),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(7).max(40).optional().or(z.literal("")),
  company_name: z.string().max(120).optional().or(z.literal("")),
  service_needed: z.string().min(2).max(120),
  source: z.string().min(2).max(60).default("website"),
  message: z.string().max(2000).optional().or(z.literal("")),
  estimated_value: z.coerce.number().min(0).optional()
});
