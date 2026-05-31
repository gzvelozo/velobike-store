"use client";

import { useState } from "react";

export function HsaBadge({ compact = false }: { compact?: boolean }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
        <svg className="h-5 w-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm text-emerald-800">
          {compact ? "HSA/FSA eligible" : "HSA/FSA eligible for qualified customers"}{" "}
          <span className="text-emerald-500">· VeloMED</span>
        </span>
        <button
          onClick={() => setShowModal(true)}
          className="ml-auto text-sm font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-900"
        >
          Learn more
        </button>
      </div>

      {showModal && <HsaLearnMoreModal onClose={() => setShowModal(false)} />}
    </>
  );
}

function HsaLearnMoreModal({ onClose }: { onClose: () => void }) {
  const steps = [
    {
      number: "1",
      title: "Buy with your regular card",
      description: "Complete your purchase with any credit or debit card. No HSA/FSA card needed at checkout.",
    },
    {
      number: "2",
      title: "Complete a short health survey",
      description: "After purchase, you'll answer a brief survey reviewed by a licensed healthcare provider.",
    },
    {
      number: "3",
      title: "Get your Letter of Medical Necessity",
      description: "If approved, you'll receive an LMN to submit to your HSA/FSA for reimbursement.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">How HSA/FSA Reimbursement Works</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                {step.number}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg bg-gray-50 p-3 text-center text-xs text-gray-500">
          Powered by <span className="font-semibold text-emerald-600">VeloMED</span> — Licensed healthcare providers review every request
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-emerald-600 py-2.5 font-semibold text-white hover:bg-emerald-700"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
