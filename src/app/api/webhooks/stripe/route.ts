import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  // In test mode without webhook secret, we can skip signature verification
  // In production, set STRIPE_WEBHOOK_SECRET
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      event = JSON.parse(body);
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Save order to Supabase
    const { error } = await supabaseAdmin.from("orders").insert({
      stripe_session_id: session.id,
      stripe_payment_intent: session.payment_intent,
      customer_email: session.customer_details?.email || null,
      amount_total: session.amount_total,
      currency: session.currency,
      payment_status: session.payment_status,
      item_slugs: session.metadata?.itemSlugs || "",
      has_hsa_items: session.metadata?.hasHsaItems === "true",
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Failed to save order:", error);
    } else {
      console.log("Order saved:", session.id);
    }
  }

  return NextResponse.json({ received: true });
}
