"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

interface OrderDetails {
  customerEmail: string | null;
  amountTotal: number;
  itemSlugs: string;
  hasHsaItems: boolean;
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart, items } = useCart();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [handoffToken, setHandoffToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) return;

    async function loadOrder() {
      try {
        // Fetch session details from Stripe via our API
        const res = await fetch(`/api/checkout/session?session_id=${sessionId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to load order");

        setOrder(data);
        clearCart();

        // If order has HSA items, create a handoff token
        if (data.hasHsaItems) {
          const handoffRes = await fetch("/api/handoff", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              merchantName: "VELOBIKE",
              orderReference: sessionId,
              productSku: data.itemSlugs?.split(",")[0] || "unknown",
              productName: data.itemSlugs || "VELOBIKE Purchase",
              amount: data.amountTotal,
              currency: "usd",
              customerEmail: data.customerEmail,
            }),
          });

          const handoffData = await handoffRes.json();
          if (handoffRes.ok) {
            setHandoffToken(handoffData.token);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  if (!sessionId) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-gray-500">No order found. Please complete checkout first.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-emerald-600" />
        <p className="mt-4 text-gray-500">Loading your order...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const qualifyUrl = process.env.NEXT_PUBLIC_VELOMED_QUALIFY_URL || "/qualify";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* Order confirmation */}
      <div className="text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Thank you for your order!</h1>
        <p className="mt-2 text-gray-600">
          {order?.customerEmail
            ? `A confirmation has been sent to ${order.customerEmail}`
            : "Your payment was successful"}
        </p>
      </div>

      {/* Order details */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Order Details</h2>
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Order Reference</span>
            <span className="font-mono text-xs">{sessionId?.slice(0, 20)}...</span>
          </div>
          <div className="flex justify-between">
            <span>Total Paid</span>
            <span className="font-semibold text-gray-900">
              {formatPrice(order?.amountTotal || 0)}
            </span>
          </div>
        </div>
      </div>

      {/* HSA/FSA reimbursement CTA */}
      {order?.hasHsaItems && (
        <div className="mt-8 rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h2 className="mt-4 text-xl font-bold text-gray-900">
            Eligible for HSA/FSA Reimbursement
          </h2>

          <p className="mt-2 text-gray-600">
            Your purchase may qualify for HSA/FSA reimbursement. Complete a short
            health survey reviewed by a licensed healthcare provider.
          </p>

          <p className="mt-3 text-xs text-gray-500">
            You&apos;ll be asked to complete a short health survey reviewed by a
            licensed provider. If approved, you&apos;ll receive a Letter of Medical
            Necessity (LMN) for reimbursement.
          </p>

          <a
            href={handoffToken ? `${qualifyUrl}?token=${handoffToken}` : "#"}
            className={`mt-6 inline-block rounded-lg px-8 py-4 text-lg font-bold text-white shadow-lg transition ${
              handoffToken
                ? "bg-emerald-600 hover:bg-emerald-700 hover:shadow-xl"
                : "cursor-not-allowed bg-gray-400"
            }`}
          >
            CONTINUE TO VELOMED →
          </a>

          <div className="mt-4 flex items-center justify-center gap-1 text-xs text-gray-400">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Powered by VeloMED · HIPAA compliant
          </div>
        </div>
      )}
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-emerald-600" />
          <p className="mt-4 text-gray-500">Loading...</p>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
