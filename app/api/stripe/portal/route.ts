import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  const body = await request.json();
  const customerId = String(body.customerId ?? "");

  if (!customerId) {
    return NextResponse.json({ error: "customerId is required" }, { status: 400 });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${env.appUrl}/dashboard`
  });

  return NextResponse.json({ url: session.url });
}
