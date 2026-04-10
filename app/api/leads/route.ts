import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validators";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = leadSchema.parse(json);

    const payload = {
      full_name: parsed.full_name,
      email: parsed.email || null,
      phone: parsed.phone || null,
      company_name: parsed.company_name || null,
      service_needed: parsed.service_needed,
      source: parsed.source,
      message: parsed.message || null,
      estimated_value: parsed.estimated_value || null,
      status: "new"
    };

    const { data, error } = await supabaseAdmin
      .from("leads")
      .insert(payload)
      .select("id")
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Could not save lead." }, { status: 500 });
    }

    if (env.n8nLeadWebhookUrl) {
      fetch(env.n8nLeadWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead_id: data.id, ...payload })
      }).catch((err) => console.error("n8n webhook failed", err));
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
