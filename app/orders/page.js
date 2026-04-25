"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const STATUS_CONFIG = {
  delivered: { label: "Delivered", color: "#00C781", bg: "#F0FDF4", icon: "✓" },
  processing: { label: "Processing", color: "#F5A623", bg: "#FEF3C7", icon: "⟳" },
  shipped: { label: "Shipped", color: "#007AFF", bg: "#E3F2FD", icon: "🚚" },
  cancelled: { label: "Cancelled", color: "#FF3B30", bg: "#FEF2F2", icon: "✕" },
};


function BookCoverFallback({ title = "" }) {
  const initials = title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      style={{
        width: 64,
        height: 80,
        borderRadius: 10,
        background: "linear-gradient(135deg, #fed7aa, #f97316)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        gap: 4,
      }}
    >
      <span style={{ fontSize: 22 }}>📚</span>
      {initials && (
        <span
          style={{
            fontSize: 10,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "0.05em",
          }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}


function BookCover({ src, title }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <BookCoverFallback title={title} />;
  }

  return (
    <div
      style={{
        width: 64,
        height: 80,
        borderRadius: 10,
        overflow: "hidden",
        flexShrink: 0,
        background: "#f3f4f6",
      }}
    >
   
      <img
        src={src}
        alt={title || "Book cover"}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        onError={() => setFailed(true)}
        loading="lazy"
      />
    </div>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(
    (order) => activeTab === "all" || order.status === activeTab
  );

  const tabCount = (tab) =>
    orders.filter((o) => (tab === "all" ? true : o.status === tab)).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
        * { font-family: "Inter", sans-serif; }
      `}</style>

      {/* ── HEADER ── */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
                <p className="text-sm text-gray-500">{orders.length} total orders</p>
              </div>
            </div>
            <Link
              href="/"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── FILTER TABS ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex space-x-1 overflow-x-auto pb-2">
            {["all", "processing", "shipped", "delivered", "cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center px-4 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                    : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                }`}
              >
                <span className="mr-2 font-bold text-lg">
                  {STATUS_CONFIG[tab]?.icon || "●"}
                </span>
                {STATUS_CONFIG[tab]?.label || tab.charAt(0).toUpperCase() + tab.slice(1)}
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                    activeTab === tab
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {tabCount(tab)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── ORDERS LIST ── */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-200">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-3xl">📦</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-8">
              You haven't placed any orders in this category yet.
            </p>
            <Link
              href="/"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const sc = STATUS_CONFIG[order.status];
              const statusClass =
                order.status === "delivered"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : order.status === "processing"
                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                  : order.status === "shipped"
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-red-50 text-red-700 border-red-200";

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all"
                >
                  {/* Order Header */}
                  <div className="p-6 lg:p-8 border-b border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
                      <div className="flex flex-wrap items-start gap-4 lg:gap-6 flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
                          <span className="font-mono text-sm font-bold text-gray-900">
                            #{order.id}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Placed on</p>
                          <p className="font-semibold text-gray-900">{order.date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Payment</p>
                          <p className="font-semibold text-gray-900">{order.paymentMethod}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Total</p>
                          <p className="text-2xl font-bold text-orange-600">
                            ₹{(order.total || 0).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold border ${statusClass}`}>
                          {sc?.icon} {sc?.label}
                        </span>
                        <Link
                          href={`/order-tracking/${order.trackingNumber}`}
                          className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 hover:underline text-sm"
                        >
                          Track Order →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6 lg:p-8">
                    <div className="flex justify-between mb-5">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {order.itemsCount} {order.itemsCount === 1 ? "item" : "items"}
                      </h3>
                      <span className="text-sm text-gray-500 truncate max-w-xs">
                        {order.deliveryAddress}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {(order.items || []).map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl"
                        >
                          {/* ── BOOK COVER IMAGE ── */}
                          <BookCover src={item.image} title={item.title} />

                          {/* Book details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-500">by {item.author}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-sm font-bold text-gray-800">
                                ₹{item.price?.toLocaleString("en-IN")}
                              </span>
                              <span className="text-xs text-gray-400">×</span>
                              <span className="text-xs bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full">
                                Qty {item.qty}
                              </span>
                              <span className="text-sm font-bold text-orange-600 ml-auto">
                                ₹{((item.price || 0) * (item.qty || 1)).toLocaleString("en-IN")}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order footer actions */}
                    <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
                      <span className="text-sm text-gray-500">
                        {order.status === "delivered"
                          ? "✅ Delivered successfully"
                          : order.status === "shipped"
                          ? "🚚 On the way to you"
                          : order.status === "processing"
                          ? "⏳ Being prepared"
                          : "❌ Order cancelled"}
                      </span>
                      <div className="flex gap-3">
                        {order.status === "delivered" && (
                          <button className="text-sm text-gray-600 border border-gray-200 rounded-lg px-4 py-2 hover:border-orange-400 hover:text-orange-600 transition-all font-medium">
                            Buy Again
                          </button>
                        )}
                        <Link
                          href={`/order-tracking/${order.trackingNumber}`}
                          className="text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg px-4 py-2 font-semibold hover:from-orange-600 hover:to-orange-700 transition-all"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}