"use client";

import { useState } from "react";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    setState("submitting");
    setMessage("");

    const payload = Object.fromEntries(formData.entries());

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      setState("error");
      setMessage(data.error ?? "Something went wrong.");
      return;
    }

    setState("success");
    setMessage("Thanks. Your request was submitted.");
  }

  return (
    <form action={onSubmit} className="card space-y-4 p-6">
      <div>
        <label className="mb-1 block text-sm font-medium">Full name</label>
        <input name="full_name" required className="w-full rounded-xl border px-3 py-2" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input name="email" type="email" className="w-full rounded-xl border px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Phone</label>
          <input name="phone" className="w-full rounded-xl border px-3 py-2" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Company name</label>
        <input name="company_name" className="w-full rounded-xl border px-3 py-2" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Service needed</label>
        <select name="service_needed" className="w-full rounded-xl border px-3 py-2" defaultValue="car-rental-leads">
          <option value="car-rental-leads">Car rental leads</option>
          <option value="market-intelligence">Market intelligence</option>
          <option value="custom-research">Custom research</option>
          <option value="hoa-analytics">HOA analytics</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Estimated monthly value (USD)</label>
        <input name="estimated_value" type="number" min="0" className="w-full rounded-xl border px-3 py-2" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Message</label>
        <textarea name="message" rows={5} className="w-full rounded-xl border px-3 py-2" />
      </div>
      <input type="hidden" name="source" value="website" />
      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded-xl bg-brand-orange px-4 py-2 font-medium text-white"
      >
        {state === "submitting" ? "Submitting..." : "Submit request"}
      </button>
      {message ? (
        <p className={`text-sm ${state === "error" ? "text-red-600" : "text-emerald-700"}`}>{message}</p>
      ) : null}
    </form>
  );
}
