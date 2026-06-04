"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function HsaBadge({ compact = false }: { compact?: boolean }) {
  const [showModal, setShowModal] = useState(false);

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[13px] text-emerald-700">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600">
          <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>
        HSA/FSA eligible
      </span>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3 rounded-lg border border-emerald-100 bg-emerald-50/60 px-4 py-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600">
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium text-stone-800">
            HSA/FSA eligible for qualified customers
          </p>
          <p className="text-xs text-stone-500">
            Powered by VeloMED ·{" "}
            <button
              onClick={() => setShowModal(true)}
              className="font-medium text-emerald-700 underline-offset-2 hover:underline"
            >
              How it works
            </button>
          </p>
        </div>
      </div>

      {showModal && <HsaLearnMoreModal onClose={() => setShowModal(false)} />}
    </>
  );
}

function HsaLearnMoreModal({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled"));

        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (!dialogRef.current.contains(active)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    document.addEventListener("keydown", handleKeyDown);
    // Focus the dialog on open
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocusRef.current?.isConnected) {
        previousFocusRef.current.focus();
      }
    };
  }, [handleKeyDown]);

  const steps = [
    {
      icon: "💳",
      title: "Purchase with any card",
      description: "Complete checkout normally with your credit or debit card — no HSA/FSA card needed.",
    },
    {
      icon: "📋",
      title: "Quick health survey",
      description: "Answer a 2-minute survey reviewed by a licensed healthcare provider.",
    },
    {
      icon: "📄",
      title: "Get your LMN",
      description: "If qualified, receive a Letter of Medical Necessity and submit it to your HSA/FSA administrator for reimbursement.",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="hsa-modal-title"
        tabIndex={-1}
        className="w-full max-w-lg rounded-t-2xl bg-white p-8 shadow-2xl sm:rounded-2xl outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 id="hsa-modal-title" className="text-lg font-semibold text-stone-900">HSA/FSA Reimbursement</h2>
            <p className="mt-1 text-sm text-stone-500">3 simple steps to get reimbursed</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="btn-press -mr-2 -mt-2 rounded-full p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
          >
            <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-xl" aria-hidden="true">
                {step.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-stone-900">{step.title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-stone-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={onClose}
            className="btn-press w-full rounded-xl bg-stone-900 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
          >
            Got it
          </button>
          <p className="text-center text-[11px] text-stone-400">
            Licensed providers review every request · HIPAA compliant
          </p>
        </div>
      </div>
    </div>
  );
}
