import { LeadForm } from "@/components/lead-form";

export default function LeadCapturePage() {
  return (
    <div className="container-app py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">Request access or custom research</h1>
        <p className="mt-2 text-slate-600">
          This form saves leads in Supabase, then optionally forwards them to n8n and WhatsApp.
        </p>
        <div className="mt-8">
          <LeadForm />
        </div>
      </div>
    </div>
  );
}
