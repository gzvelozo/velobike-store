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
  const { clearCart } = useCart();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [handoffToken, setHandoffToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) return;

    async function loadOrder() {
      try {
        const res = await fetch(`/api/checkout/session?session_id=${sessionId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load order");

        setOrder(data);
        clearCart();

        if (data.hasHsaItems) {
          const handoffRes = await fetch("/api/handoff", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              merchantName: "VELOBIKE",
              orderReference: sessionId,
              productSku: data.itemSlugs?.split(",")[0] || "unknown",
              productName: data.itemSlugs || "VELOBIKE Purchase",
              amount: Math.round(data.amountTotal / 100),
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
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-stone-500">No order found.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-[3px] border-stone-200 border-t-emerald-600" />
        <p className="mt-4 text-sm text-stone-500">Loading your order…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const qualifyUrl = process.env.NEXT_PUBLIC_VELOMED_QUALIFY_URL || "/qualify";

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      {/* Success header */}
      <div className="text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
          ✓
        </span>
        <h1 className="mt-5 text-2xl font-bold text-stone-900">Order confirmed</h1>
        <p className="mt-2 text-sm text-stone-500">
          {order?.customerEmail
            ? `Confirmation sent to ${order.customerEmail}`
            : "Your payment was successful"}
        </p>
      </div>

      {/* Order details */}
      <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200/60">
        <div className="flex items-center justify-between text-sm">
          <span className="text-stone-500">Order reference</span>
          <span className="font-mono text-xs text-stone-400">{sessionId?.slice(0, 24)}…</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-stone-500">Amount paid</span>
          <span className="text-lg font-bold text-stone-900">
            {formatPrice(order?.amountTotal || 0)}
          </span>
        </div>
      </div>

      {/* VeloMED HSA/FSA handoff */}
      {order?.hasHsaItems && (
        <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-emerald-200">
          {/* Green header */}
          <div className="bg-emerald-600 px-6 py-5 text-center text-white">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200">
              Next Step
            </p>
            <h2 className="mt-1 text-lg font-bold">
              Get HSA/FSA Reimbursement
            </h2>
          </div>

          {/* Content */}
          <div className="bg-emerald-50/40 px-6 py-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">1</span>
                <p className="text-sm text-stone-600">
                  Complete a short health survey (2 min)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">2</span>
                <p className="text-sm text-stone-600">
                  A licensed provider reviews your qualification
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">3</span>
                <p className="text-sm text-stone-600">
                  Receive your LMN and submit for reimbursement
                </p>
              </div>
            </div>

            <a
              href={handoffToken ? `${qualifyUrl}?token=${handoffToken}` : "#"}
              className={`btn-press mt-6 block w-full rounded-xl py-4 text-center text-base font-bold text-white shadow-lg transition ${
                handoffToken
                  ? "bg-emerald-600 hover:bg-emerald-700 hover:shadow-xl"
                  : "cursor-wait bg-stone-400"
              }`}
            >
              {handoffToken ? "Continue to VeloMED →" : "Preparing…"}
            </a>

            <p className="mt-4 text-center text-[11px] text-stone-400">
              Powered by VeloMED · HIPAA compliant · Licensed providers
            </p>
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
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-[3px] border-stone-200 border-t-emerald-600" />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
