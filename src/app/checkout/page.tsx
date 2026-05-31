"use client";

import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { HsaBadge } from "@/components/HsaBadge";
import { useState } from "react";

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

      // Redirect to Stripe Checkout hosted page
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-lg text-gray-500">Your cart is empty. Add items first.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

        <div className="mt-4 divide-y divide-gray-100">
          {items.map((item) => (
            <div key={item.product.slug} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">{item.product.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                  {item.product.hsaEligible && (
                    <span className="ml-2 text-emerald-600">· HSA/FSA eligible</span>
                  )}
                </p>
              </div>
              <p className="font-semibold text-gray-900">
                {formatPrice(item.product.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between text-xl font-bold text-gray-900">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>

      {hasHsaItems && (
        <div className="mt-6 space-y-3">
          <HsaBadge />
          <p className="text-sm text-gray-500">
            Pay with any credit or debit card. After purchase, you&apos;ll complete a short
            health survey reviewed by a licensed provider to determine HSA/FSA eligibility.
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-gray-900 py-4 text-lg font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Redirecting to payment..." : `Pay ${formatPrice(totalPrice)}`}
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Secured by Stripe · Test Mode
      </div>
    </div>
  );
}
