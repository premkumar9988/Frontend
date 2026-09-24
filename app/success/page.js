"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CheckCircle,
  Package,
  Home,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function OrderSuccessPage() {
  const router = useRouter();

  const [trackingId, setTrackingId] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("trackingNumber");

    if (id) {
      setTrackingId(id);
    }

    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleTrack = () => {
    if (!trackingId) return;

    setIsNavigating(true);

    setTimeout(() => {
      router.push(`/order-tracking/${trackingId}`);
    }, 300);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-green-50 px-4 py-12">

      {/* Background Animation */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-72 w-72 animate-pulse rounded-full bg-green-200/30 blur-3xl" />

        <div
          className="absolute -bottom-24 -right-24 h-80 w-80 animate-pulse rounded-full bg-blue-200/30 blur-3xl"
          style={{ animationDelay: "1s" }}
        />

        <div className="absolute right-1/4 top-1/4 h-3 w-3 animate-ping rounded-full bg-green-400" />

        <div
          className="absolute bottom-1/3 left-1/4 h-2 w-2 animate-ping rounded-full bg-blue-400"
          style={{ animationDelay: "700ms" }}
        />
      </div>

      {/* Main Card */}
      <div
        className={`relative z-10 w-full max-w-lg rounded-3xl border border-gray-100 bg-white/95 p-8 text-center shadow-[0_25px_70px_rgba(0,0,0,0.10)] backdrop-blur-xl transition-all duration-700 ease-out sm:p-10 ${
          showContent
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-8 scale-95 opacity-0"
        }`}
      >

        {/* Badge */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
          <Sparkles className="h-4 w-4" />
          Order Confirmed
        </div>

        {/* Success Icon */}
        <div className="mb-7 flex justify-center">
          <div className="relative">

            {/* Glow */}
            <div className="absolute inset-0 animate-ping rounded-full bg-green-400/20" />

            {/* Icon Circle */}
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-8 border-white bg-gradient-to-br from-green-50 to-green-100 shadow-lg">
              <CheckCircle
                className="h-16 w-16 animate-bounce text-green-500"
                strokeWidth={1.8}
              />
            </div>

          </div>
        </div>

        {/* Heading */}
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Payment Successful
        </h1>

        <p className="mx-auto mb-8 max-w-md leading-relaxed text-gray-500">
          Thank you for your purchase. Your order has been confirmed and is
          now being processed.
        </p>

        {/* Order Status */}
        <div className="mb-7 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-left">
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <Package className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Order Status
              </p>

              <p className="text-sm font-semibold text-gray-900">
                Order confirmed
              </p>
            </div>

            <div className="ml-auto">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                Processing
              </span>
            </div>

          </div>
        </div>

        {/* Tracking Information */}
        {trackingId ? (
          <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-500">
              Tracking Number
            </p>

            <p className="text-lg font-bold tracking-wide text-blue-900">
              {trackingId}
            </p>
          </div>
        ) : (
          <div className="mb-6 rounded-2xl border border-yellow-100 bg-yellow-50 p-4">
            <p className="text-sm text-yellow-800">
              Tracking information will be sent to your email shortly.
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-3">

          {/* Track Order */}
          {trackingId && (
            <button
              onClick={handleTrack}
              disabled={isNavigating}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 font-semibold text-white shadow-lg shadow-gray-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              <Package className="h-5 w-5" />

              <span>
                {isNavigating
                  ? "Opening Order..."
                  : "Track Your Order"}
              </span>

              {!isNavigating && (
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </button>
          )}

          {/* Home */}
          <button
            onClick={() => router.push("/")}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 px-5 py-3.5 font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-200"
          >
            <Home className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />

            Return to Home
          </button>

        </div>

        {/* Footer */}
        <p className="mt-7 text-xs text-gray-400">
          A confirmation has been recorded for your order.
        </p>

      </div>
    </main>
  );
}