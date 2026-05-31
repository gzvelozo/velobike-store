import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

interface CheckoutItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  hsaEligible: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const { items } = (await request.json()) as { items: CheckoutItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            metadata: {
              slug: item.slug,
              hsaEligible: String(item.hsaEligible),
            },
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      metadata: {
        hasHsaItems: String(items.some((i) => i.hsaEligible)),
        itemSlugs: items.map((i) => i.slug).join(","),
      },
      success_url: `${appUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
