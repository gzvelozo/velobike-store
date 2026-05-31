import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      customerEmail: session.customer_details?.email || null,
      amountTotal: session.amount_total || 0,
      itemSlugs: session.metadata?.itemSlugs || "",
      hasHsaItems: session.metadata?.hasHsaItems === "true",
      paymentStatus: session.payment_status,
    });
  } catch (err) {
    console.error("Session retrieval error:", err);
    return NextResponse.json(
      { error: "Failed to retrieve session" },
      { status: 500 }
    );
  }
}
