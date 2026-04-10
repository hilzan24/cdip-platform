import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";

const priceMap: Record<string, string> = {
  basic: env.stripePriceBasic,
  pro: env.stripePricePro,
  enterprise: env.stripePriceEnterprise
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const plan = String(formData.get("plan") ?? "basic");
  const price = priceMap[plan];

  if (!price) {
    return NextResponse.json({ error: "Missing Stripe price for selected plan." }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price, quantity: 1 }],
    success_url: `${env.appUrl}/dashboard?checkout=success`,
    cancel_url: `${env.appUrl}/pricing?checkout=cancelled`,
    billing_address_collection: "auto",
    allow_promotion_codes: true
  });

  return NextResponse.redirect(session.url!, 303);
}
