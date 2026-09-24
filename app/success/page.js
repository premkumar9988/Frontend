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
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-green-50 flex items-center justify-center px-4 py-12">

      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-green-200/30 rounded-full blur-3xl animate-pulse" />

        <div
          className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-green-400 rounded-full animate-ping" />

        <div
          className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"
          style={{ animationDelay: "700ms" }}
        />
      </div>

      {/* Main Card */}
      <div
        className={`relative z-10 w-full max-w-lg bg-white/95 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.10)] p-8 sm:p-10 text-center transition-all duration-700 ease-out ${
          showContent
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
      >

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-7 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Order Confirmed
        </div>

        {/* Success Icon */}
        <div className="flex justify-center mb-7">
          <div className="relative">

            <div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping" />

            <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-green-50 to-green-100 border-8 border-white shadow-lg">
              <CheckCircle
                className="w-16 h-16 text-green-500 animate-success"
                strokeWidth={1.8}
              />
            </div>

          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-3">
          Payment Successful
        </h1>

        <p className="text-gray-500 leading-relaxed max-w-md mx-auto mb-8">
          Thank you for your purchase. Your order has been confirmed and is
          now being processed.
        </p>

        {/* Order Status */}
        <div className="mb-7 p-4 rounded-2xl bg-gray-50 border border-gray-100 text-left">
          <div className="flex items-center gap-3">

            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50">
              <Package className="w-5 h-5 text-blue-600" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                Order Status
              </p>

              <p className="text-sm font-semibold text-gray-900">
                Order confirmed
              </p>
            </div>

            <div className="ml-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Processing
              </span>
            </div>

          </div>
        </div>

        {/* Tracking Information */}
        {trackingId ? (
          <div className="mb-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
            <p className="text-xs text-blue-500 uppercase tracking-wider font-semibold mb-1">
              Tracking Number
            </p>

            <p className="text-lg font-bold text-blue-900 tracking-wide">
              {trackingId}
            </p>
          </div>
        ) : (
          <div className="mb-6 p-4 rounded-2xl bg-yellow-50 border border-yellow-100">
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
              className="group w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-semibold py-3.5 px-5 rounded-xl shadow-lg shadow-gray-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <Package className="w-5 h-5" />

              <span>
                {isNavigating ? "Opening Order..." : "Track Your Order"}
              </span>

              {!isNavigating && (
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </button>
          )}

          {/* Home */}
          <button
            onClick={() => router.push("/")}
            className="group w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 px-5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />

            Return to Home
          </button>

        </div>

        {/* Footer */}
        <p className="mt-7 text-xs text-gray-400">
          A confirmation has been recorded for your order.
        </p>

      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes success {
          0% {
            opacity: 0;
            transform: scale(0.3) rotate(-20deg);
          }

          60% {
            opacity: 1;
            transform: scale(1.15) rotate(5deg);
          }

          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        .animate-success {
          animation: success 0.7s ease-out forwards;
        }
      `}</style>
    </main>
  );
}