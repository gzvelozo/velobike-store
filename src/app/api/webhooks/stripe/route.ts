import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (session.payment_status !== "paid") {
      return NextResponse.json({ received: true, skipped: "not_paid" });
    }

    // Idempotent upsert — relies on unique constraint on stripe_session_id
    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin.from("orders").upsert(
      {
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent,
        customer_email: session.customer_details?.email || null,
        amount_total: session.amount_total,
        currency: session.currency,
        payment_status: session.payment_status,
        item_slugs: session.metadata?.itemSlugs || "",
        has_hsa_items: session.metadata?.hasHsaItems === "true",
        created_at: new Date().toISOString(),
      },
      { onConflict: "stripe_session_id", ignoreDuplicates: true }
    );

    if (error) {
      console.error("Failed to save order:", error);
      return NextResponse.json(
        { error: "Failed to save order" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
