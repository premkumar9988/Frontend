"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OrderSuccess() {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const id = "ORD" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(id);
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4 p-8">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full animate-ping opacity-75"></div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-emerald-800">Processing your order...</h2>
            <p className="text-emerald-600 mt-2">This won't take long</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-sm border-b border-emerald-100">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-medium transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Continue Shopping</span>
            </Link>
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Order Successful
              </h1>
              <p className="text-sm text-gray-500 mt-1">Order #{orderId}</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Success Celebration */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-emerald-400 to-green-500 rounded-3xl shadow-2xl mb-8 animate-bounce">
            <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent mb-4">
            Thank You!
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Your order has been successfully placed and is being processed. 
            You'll receive an email confirmation shortly.
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-10 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Order ID */}
            <div className="text-center p-8 bg-gradient-to-b from-emerald-50 to-green-50 rounded-2xl border-2 border-emerald-100 hover:border-emerald-200 transition-all duration-300 group">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 font-mono tracking-wide">{orderId}</h3>
              <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">Order ID</p>
            </div>

            {/* Delivery Estimate */}
            <div className="text-center p-8 bg-gradient-to-b from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-100 hover:border-blue-200 transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                3-5 Days
              </h3>
              <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">Estimated Delivery</p>
            </div>

            {/* Payment Status */}
            <div className="text-center p-8 bg-gradient-to-b from-green-50 to-emerald-50 rounded-2xl border-2 border-green-100 hover:border-green-200 transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <span className="text-2xl font-bold text-green-600">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">Confirmed</h3>
              <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">Payment Successful</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Track Order - Primary */}
          <Link 
            href={`/order-tracking/${orderId}`}
            className="group bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-6 px-8 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 text-lg flex items-center justify-center space-x-3 relative overflow-hidden"
          >
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m0 0h3M3 12h3m0 0V9m0 3v3" />
            </svg>
            <span>Track Order</span>
            <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-3xl"></div>
          </Link>

          {/* View Orders */}
          <Link 
            href="/orders"
            className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-gray-300 text-gray-900 font-bold py-6 px-8 rounded-3xl shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-300 text-lg flex items-center justify-center space-x-3 group"
          >
            <svg className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>View Orders</span>
          </Link>

          {/* Download Invoice */}
          <button 
            onClick={() => window.print()}
            className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 font-bold py-6 px-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg flex items-center justify-center space-x-3 group"
          >
            <svg className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Invoice</span>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 p-8 text-center">
          <div className="flex items-center justify-center space-x-8 flex-wrap gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Order Confirmed</p>
                <p className="text-sm text-gray-600">24/7 Support</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Fast Delivery</p>
                <p className="text-sm text-gray-600">3-5 Business Days</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Secure Payment</p>
                <p className="text-sm text-gray-600">SSL Protected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📧</span>
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Check Email</h4>
              <p className="text-gray-600">Confirmation & invoice sent to your email</p>
            </div>
            <div className="p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Track Package</h4>
              <p className="text-gray-600">Real-time updates via SMS & app notifications</p>
            </div>
            <div className="p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Rate Products</h4>
              <p className="text-gray-600">Help others by sharing your experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}