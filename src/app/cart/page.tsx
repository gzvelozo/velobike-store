"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { HsaBadge } from "@/components/HsaBadge";

const categoryEmoji: Record<string, string> = {
  "fitness-equipment": "🚴‍♂️",
  "health-monitoring": "⌚",
  supplements: "🧬",
  "recovery-devices": "🔋",
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <span className="text-6xl">🛒</span>
        <h1 className="mt-6 text-2xl font-bold text-stone-900">Your bag is empty</h1>
        <p className="mt-2 text-stone-500">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/"
          className="btn-press mt-8 inline-block rounded-xl bg-stone-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const hasHsaItems = items.some((i) => i.product.hsaEligible);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold text-stone-900">
        Your bag <span className="text-stone-400 font-normal">({items.length})</span>
      </h1>

      <div className="mt-8 space-y-0 divide-y divide-stone-100">
        {items.map((item) => (
          <div key={item.product.slug} className="flex gap-5 py-6">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-stone-100 text-4xl">
              {categoryEmoji[item.product.category] || "📦"}
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-stone-900">{item.product.name}</h3>
                    <p className="mt-0.5 text-xs text-stone-400">{item.product.brand}</p>
                  </div>
                  <p className="text-sm font-bold text-stone-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
                {item.product.hsaEligible && (
                  <div className="mt-2">
                    <HsaBadge compact />
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center rounded-lg border border-stone-200">
                  <button
                    onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                    className="btn-press px-3 py-1.5 text-sm text-stone-500 transition hover:text-stone-900"
                  >
                    −
                  </button>
                  <span className="min-w-[2rem] text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                    className="btn-press px-3 py-1.5 text-sm text-stone-500 transition hover:text-stone-900"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.product.slug)}
                  className="text-xs text-stone-400 underline underline-offset-2 transition hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200/60">
        {hasHsaItems && (
          <div className="mb-6">
            <HsaBadge />
          </div>
        )}

        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-stone-500">
            <span>Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-stone-500">
            <span>Shipping</span>
            <span className="text-emerald-600 font-medium">Free</span>
          </div>
          <div className="border-t border-stone-100 pt-3 flex justify-between text-lg font-bold text-stone-900">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>

        {hasHsaItems && (
          <p className="mt-4 text-xs leading-relaxed text-stone-400">
            After checkout you&apos;ll complete a short health survey reviewed by a
            licensed provider to determine HSA/FSA reimbursement eligibility.
          </p>
        )}

        <Link
          href="/checkout"
          className="btn-press mt-6 block w-full rounded-xl bg-stone-900 py-4 text-center text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          Continue to checkout
        </Link>

        <Link
          href="/"
          className="mt-3 block text-center text-xs text-stone-400 transition hover:text-stone-600"
        >
          or continue shopping
        </Link>
      </div>
    </div>
  );
}
