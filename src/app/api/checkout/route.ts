import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";

interface CheckoutRequestItem {
  slug: string;
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
    const { items } = (await request.json()) as {
      items: CheckoutRequestItem[];
    };

    const MAX_QUANTITY = 99;
    const MAX_LINE_ITEMS = 20;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    if (items.length > MAX_LINE_ITEMS) {
      return NextResponse.json({ error: "Too many items" }, { status: 400 });
    }

    // Validate, resolve server-side, and aggregate duplicate slugs
    const aggregated = new Map<string, { product: ReturnType<typeof getProduct> & {}; quantity: number }>();

    for (const item of items) {
      if (
        !item ||
        typeof item !== "object" ||
        typeof item.slug !== "string" ||
        !Number.isSafeInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > MAX_QUANTITY
      ) {
        throw new ValidationError("Invalid item in cart");
      }

      const product = getProduct(item.slug);
      if (!product) {
        throw new ValidationError(`Unknown product: ${item.slug}`);
      }

      const existing = aggregated.get(item.slug);
      const totalQty = (existing?.quantity ?? 0) + item.quantity;
      if (totalQty > MAX_QUANTITY) {
        throw new ValidationError(`Quantity too large for ${product.name}`);
      }
      aggregated.set(item.slug, { product, quantity: totalQty });
    }

    const resolvedItems = Array.from(aggregated.values());

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: resolvedItems.map(({ product, quantity }) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            metadata: {
              slug: product.slug,
              hsaEligible: String(product.hsaEligible),
            },
          },
          unit_amount: product.price,
        },
        quantity,
      })),
      metadata: {
        hasHsaItems: String(resolvedItems.some((i) => i.product.hsaEligible)),
        itemSlugs: resolvedItems.map((i) => i.product.slug).join(","),
      },
      success_url: `${appUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
