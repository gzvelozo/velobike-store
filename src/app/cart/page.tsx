"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { HsaBadge } from "@/components/HsaBadge";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-6xl">🛒</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-2 text-gray-500">Add some products to get started</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-800"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const hasHsaItems = items.some((i) => i.product.hsaEligible);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>

      <div className="mt-8 divide-y divide-gray-200">
        {items.map((item) => (
          <div key={item.product.slug} className="flex items-center gap-4 py-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100 text-3xl">
              {item.product.category === "fitness-equipment" && "🚴"}
              {item.product.category === "health-monitoring" && "📡"}
              {item.product.category === "supplements" && "🥤"}
              {item.product.category === "recovery-devices" && "💆"}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
              <p className="text-sm text-gray-500">{item.product.brand}</p>
              {item.product.hsaEligible && (
                <span className="mt-1 inline-block text-xs text-emerald-600">✓ HSA/FSA eligible</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                −
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <p className="w-24 text-right font-semibold text-gray-900">
              {formatPrice(item.product.price * item.quantity)}
            </p>
            <button
              onClick={() => removeItem(item.product.slug)}
              className="text-gray-400 hover:text-red-500"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {hasHsaItems && (
        <div className="mt-6">
          <HsaBadge />
        </div>
      )}

      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between text-xl font-bold text-gray-900">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>

        {hasHsaItems && (
          <p className="mt-2 text-sm text-gray-500">
            After checkout, you&apos;ll be asked to complete a short health survey
            reviewed by a licensed provider for HSA/FSA reimbursement eligibility.
          </p>
        )}

        <Link
          href="/checkout"
          className="mt-6 block w-full rounded-lg bg-gray-900 py-3 text-center text-lg font-semibold text-white hover:bg-gray-800"
        >
          Proceed to Checkout
        </Link>

        <Link
          href="/"
          className="mt-3 block text-center text-sm text-gray-500 hover:text-gray-700"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
