"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface OrderDetails {
  customerEmail: string | null;
  amountTotal: number | null;
}

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/checkout/session?id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.customerEmail || data.amountTotal) {
            setOrder(data);
          }
        })
        .catch(() => {
          // Session retrieval is optional; page still works without it
        });
    }
  }, [sessionId]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Checkmark Icon */}
        <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-cream"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
          ORDER CONFIRMED
        </h1>

        <p className="text-lg text-neutral-400">
          Thank you for your order!
        </p>

        {order && order.amountTotal && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 space-y-2 text-sm">
            {order.customerEmail && (
              <p className="text-neutral-300">
                Confirmation sent to{" "}
                <span className="text-cream font-medium">
                  {order.customerEmail}
                </span>
              </p>
            )}
            <p className="text-neutral-300">
              Total:{" "}
              <span className="text-cream font-medium">
                ${(order.amountTotal / 100).toFixed(2)}
              </span>
            </p>
          </div>
        )}

        <p className="text-sm text-neutral-500">
          You&apos;ll receive an email with tracking info once your order ships.
        </p>

        <Link
          href="/shop"
          className="inline-block mt-4 px-8 py-3 bg-cream text-black font-bold uppercase tracking-wider text-sm hover:bg-neutral-200 transition-colors"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    </main>
  );
}
