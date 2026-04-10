import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const signature = (await headers()).get("stripe-signature");

  if (!signature || !env.stripeWebhookSecret) {
    return NextResponse.json({ error: "Missing Stripe webhook configuration." }, { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, env.stripeWebhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const companyName = session.customer_details?.name ?? session.customer_email ?? "New Client";
        const email = session.customer_details?.email ?? session.customer_email ?? null;
        const subscriptionId = typeof session.subscription === "string" ? session.subscription : null;
        const customerId = typeof session.customer === "string" ? session.customer : null;

        await supabaseAdmin.from("clients").upsert({
          business_name: companyName,
          contact_email: email,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          subscription_plan: "active",
          status: "active"
        }, { onConflict: "stripe_customer_id" });

        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = typeof subscription.customer === "string" ? subscription.customer : null;

        if (customerId) {
          await supabaseAdmin
            .from("clients")
            .update({
              status: subscription.status,
              stripe_subscription_id: subscription.id
            })
            .eq("stripe_customer_id", customerId);
        }
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
