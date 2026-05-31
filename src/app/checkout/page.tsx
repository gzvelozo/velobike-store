"use client";

import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { HsaBadge } from "@/components/HsaBadge";
import { useState } from "react";
import Link from "next/link";

const categoryEmoji: Record<string, string> = {
  "fitness-equipment": "🚴‍♂️",
  "health-monitoring": "⌚",
  supplements: "🧬",
  "recovery-devices": "🔋",
};

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasHsaItems = items.some((i) => i.product.hsaEligible);

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            slug: i.product.slug,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
            hsaEligible: i.product.hsaEligible,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-stone-500">Nothing to check out. <Link href="/" className="text-emerald-700 underline underline-offset-2">Add items first</Link>.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold text-stone-900">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        {/* Items */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200/60">
            <h2 className="text-sm font-semibold text-stone-900">Order summary</h2>
            <div className="mt-4 space-y-4">
              {items.map((item) => (
                <div key={item.product.slug} className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-stone-50 text-2xl">
                    {categoryEmoji[item.product.category] || "📦"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-stone-900">{item.product.name}</p>
                    <p className="text-xs text-stone-400">Qty {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-stone-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200/60">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Shipping</span>
                <span className="font-medium text-emerald-600">Free</span>
              </div>
              <div className="border-t border-stone-100 pt-3 flex justify-between text-base font-bold text-stone-900">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-200">
                {error}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-press mt-6 w-full rounded-xl bg-stone-900 py-4 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Redirecting…
                </span>
              ) : (
                `Pay ${formatPrice(totalPrice)}`
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Secured by Stripe · Test mode
            </div>
          </div>

          {hasHsaItems && (
            <div className="mt-4">
              <HsaBadge />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
