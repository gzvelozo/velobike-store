"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🚲</span>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            VELO<span className="text-emerald-600">BIKE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Shop
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            Cart
            {totalItems > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile cart */}
        <Link href="/cart" className="relative md:hidden">
          <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
