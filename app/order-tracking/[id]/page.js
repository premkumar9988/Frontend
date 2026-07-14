"use client";



import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const STEPS = [
  { key: "placed",    label: "Order Placed",     desc: "We received your order and payment.",           icon: "📋" },
  { key: "confirmed", label: "Confirmed",          desc: "Your order is confirmed and being prepared.",   icon: "✅" },
  { key: "shipped",   label: "Shipped",             desc: "Your books are packed and with the courier.",   icon: "📦" },
  { key: "out",       label: "Out for Delivery",   desc: "Your package is out for delivery today.",       icon: "🚚" },
  { key: "delivered", label: "Delivered",           desc: "Package delivered. Enjoy your reading!",       icon: "🎉" },
];


const STATUS_TO_STEP = {
  "Order Placed":     0,
  "Confirmed":        1,
  "Processing":       1,
  "Shipped":          2,
  "Out for Delivery": 3,
  "Delivered":        4,
};


const toStep   = (status = "") => STATUS_TO_STEP[status] ?? 1;
const isFmt    = (d) => { try { return new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }); } catch { return d; } };
const rupee    = (n) => `₹${Number(n ?? 0).toLocaleString("en-IN")}`;
const addrStr  = (a) =>
  typeof a === "string" ? a :
  a ? [a.line1, a.city, a.state && `${a.state} – ${a.pin ?? a.zip ?? ""}`].filter(Boolean).join(", ") : "";


export default function OrderTrackingPage() {
  const { id }  = useParams();
  const router  = useRouter();

  const [order,   setOrder]   = useState(null);
  const [status,  setStatus]  = useState("idle");  
  const [search,  setSearch]  = useState("");

  
  useEffect(() => {
    if (!id) return;
    load(id);
  }, [id]);

  async function load(trackId) {
    setStatus("loading");
    try {
     
      const res  = await fetch(`/api/orders?tracking=${encodeURIComponent(trackId)}`);
      const json = await res.json();


      const found =
        json.order ??
        (Array.isArray(json.orders)
          ? json.orders.find((o) => o.trackingNumber === trackId || o.id === trackId)
          : null);

      if (!found) throw new Error("not-found");
      setOrder(found);
      setStatus("found");
    } catch {
      setOrder(null);
      setStatus("error");
    }
  }

  const onSearch = (e) => {
    e.preventDefault();
    const val = search.trim();
    if (val) router.push(`/track/${val}`);
  };

  /* ── Derived ── */
  const stepIdx     = order ? toStep(order.status) : -1;
  const cancelled   = order?.status === "Cancelled";
  const fillPct     = cancelled ? 0 : (stepIdx / (STEPS.length - 1)) * 100;

  
  return (
    <div style={s.page}>
      <style>{CSS}</style>

      {/*  HEADER */}
      <header style={s.header}>
        <div style={s.headerInner}>

          {/* Logo */}
          <div style={s.logoWrap} onClick={() => router.push("/")}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <rect width="30" height="30" rx="8" fill="#f97316"/>
              <rect x="7" y="8" width="10" height="14" rx="2" fill="white"/>
              <rect x="13" y="8" width="10" height="14" rx="2" fill="rgba(255,255,255,0.5)"/>
            </svg>
            <span style={s.logoText}>PageTurn</span>
          </div>

          {/* Breadcrumb */}
          <nav style={s.breadcrumb}>
            <span onClick={() => router.push("/")}         style={s.crumbLink}>Home</span>
            <span style={s.crumbSep}>›</span>
            <span onClick={() => router.push("/orders")}   style={s.crumbLink}>My Orders</span>
            <span style={s.crumbSep}>›</span>
            <span style={s.crumbActive}>Track Order</span>
          </nav>

          {/* SSL */}
          <div style={s.ssl}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" style={{ marginRight: 5 }}>
              <path d="M7 1L1.5 3.2v3.8c0 3.2 2.2 5.6 5.5 6.5 3.3-.9 5.5-3.3 5.5-6.5V3.2L7 1z" fill="#22c55e"/>
              <path d="M4.5 7l2 2 3-3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ color: "#16a34a", fontSize: 12, fontWeight: 600 }}>SSL Secure</span>
          </div>
        </div>
      </header>

      <main style={s.main}>

        {/* PAGE HERO*/}
        <div style={s.hero}>
          <div>
            <h1 style={s.h1}>Track Your Order</h1>
            <p style={s.heroSub}>Real-time delivery updates for your books</p>
          </div>

          {/* Search */}
          <form style={s.searchForm} onSubmit={onSearch}>
            <input
              className="trk-input"
              style={s.searchInput}
              placeholder="Enter Tracking ID or Order ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="cta" type="submit" style={s.searchBtn}>Search →</button>
          </form>
        </div>

        {/*  LOADING */}
        {status === "loading" && (
          <div style={s.center}>
            <div style={s.spinner}/>
            <p style={s.loaderText}>Fetching order details…</p>
          </div>
        )}

        {/*  IDLE (no ID yet) */}
        {status === "idle" && (
          <div style={s.emptyCard} className="up">
            <span style={s.emptyIcon}>📦</span>
            <h2 style={s.emptyTitle}>Enter a Tracking ID</h2>
            <p style={s.emptySub}>Type your Order ID or Tracking Number above to see real-time delivery status.</p>
          </div>
        )}

        {/*  NOT FOUND */}
        {status === "error" && (
          <div style={s.emptyCard} className="up">
            <span style={s.emptyIcon}>🔍</span>
            <h2 style={s.emptyTitle}>Order Not Found</h2>
            <p style={s.emptySub}>
              No order matched <strong style={{ color: "#374151" }}>{id}</strong>.
              Please check the ID and try again.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 4, flexWrap: "wrap", justifyContent: "center" }}>
              <button style={s.outlineBtn} onClick={() => router.push("/orders")}>My Orders</button>
              <button className="cta" style={s.ctaBtn} onClick={() => router.push("/")}>Continue Shopping</button>
            </div>
          </div>
        )}

        {/*  ORDER FOUND  */}
        {status === "found" && order && (
          <div className="up">

            {/* Success / Cancelled banner */}
            <div style={{
              ...s.banner,
              background:   cancelled ? "linear-gradient(135deg,#fef2f2,#fee2e2)" : "linear-gradient(135deg,#fff7ed,#fef3c7)",
              border:       `1px solid ${cancelled ? "#fecaca" : "#fed7aa"}`,
            }}>
              <div className={cancelled ? "" : "pop"}>
                {cancelled
                  ? <svg width="44" height="44" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="22" fill="#ef4444"/><path d="M14 14l16 16M30 14L14 30" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>
                  : <svg width="44" height="44" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="22" fill="#f97316"/><path d="M12 22l7 7 13-14" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                }
              </div>
              <div>
                <h2 style={s.bannerTitle}>
                  {cancelled ? "Order Cancelled" : `Status: ${order.status || "In Progress"}`}
                </h2>
                <p style={s.bannerSub}>
                  {cancelled
                    ? "This order was cancelled. Prepaid refunds process in 5–7 business days."
                    : `Tracking: ${order.trackingNumber || id}  ·  ${order.carrier || "Blue Dart Express"}`
                  }
                </p>
              </div>
            </div>

            {/* Meta strip */}
            <div style={s.metaStrip}>
              {[
                { lbl: "Order ID",       val: order.id || order.orderId || "—",                              mono:  true  },
                { lbl: "Tracking No.",   val: order.trackingNumber || id,                                     mono:  true  },
                { lbl: "Placed On",      val: isFmt(order.date || order.createdAt) || "—"                                  },
                { lbl: "Payment",        val: order.paymentMethod || "Online"                                               },
                { lbl: "Est. Delivery",  val: isFmt(order.estimatedDelivery) || "3–5 business days",          green: true  },
              ].map(({ lbl, val, mono, green }) => (
                <div key={lbl} style={s.metaCell}>
                  <p style={s.metaLbl}>{lbl}</p>
                  <p style={{ ...s.metaVal, ...(mono ? { fontFamily: "monospace", letterSpacing: "0.04em", fontSize: 13 } : {}), ...(green ? { color: "#16a34a" } : {}) }}>{val}</p>
                </div>
              ))}
            </div>

            {/* Two-column body */}
            <div style={s.grid}>

              {/* ── LEFT: Tracking timeline ── */}
              <div style={s.card}>
                <div style={s.cardHead}>
                  <h2 style={s.cardTitle}>Live Tracking</h2>
                  {cancelled
                    ? <span style={s.badgeRed}>🚫 Cancelled</span>
                    : <span style={s.badgeGreen}><span style={s.dot}/>Live</span>
                  }
                </div>

                {/* Tracking meta bar */}
                <div style={s.trkMeta}>
                  <div>
                    <p style={s.miniLbl}>Tracking Number</p>
                    <p style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: "#111827", marginTop: 3 }}>{order.trackingNumber || id}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={s.miniLbl}>Carrier</p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginTop: 3 }}>{order.carrier || "Blue Dart Express"}</p>
                  </div>
                </div>

                {/* Horizontal progress fill */}
                {!cancelled && (
                  <>
                    <div style={s.fillWrap}>
                      <div style={{ ...s.fill, width: `${fillPct}%` }}/>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 28 }}>
                      {STEPS.map((_, i) => (
                        <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i <= stepIdx ? "#f97316" : "#e5e7eb", transition: "background 0.5s" }}/>
                      ))}
                    </div>
                  </>
                )}

                {/* Cancelled note */}
                {cancelled && (
                  <div style={s.cancelNote}>
                    <span style={{ fontSize: 20 }}>🚫</span>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#dc2626", marginBottom: 3 }}>Order cancelled</p>
                      <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65 }}>If you were charged, a refund will be processed within 5–7 business days.</p>
                    </div>
                  </div>
                )}

                {/* Step list */}
                {!cancelled && (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {STEPS.map((step, i) => {
                      const done    = i < stepIdx;
                      const active  = i === stepIdx;
                      const pending = i > stepIdx;
                      const date    = order.trackingDates?.[step.key];

                      return (
                        <div key={step.key} style={{ display: "flex", gap: 16, position: "relative" }}>

                          {/* Connector line */}
                          {i < STEPS.length - 1 && (
                            <div style={{ position: "absolute", left: 16, top: 34, width: 2, height: "calc(100% - 6px)", background: done ? "#f97316" : "#e5e7eb", transition: "background 0.6s", zIndex: 0 }}/>
                          )}

                          {/* Circle */}
                          <div style={{ flexShrink: 0, zIndex: 1 }}>
                            <div style={{
                              width: 34, height: 34, borderRadius: "50%",
                              background:  done ? "#f97316" : active ? "#fff" : "#f3f4f6",
                              border:      active ? "2.5px solid #f97316" : done ? "none" : "2px solid #e5e7eb",
                              display:     "flex", alignItems: "center", justifyContent: "center",
                              boxShadow:   active ? "0 0 0 4px rgba(249,115,22,0.18)" : "none",
                              transition:  "all 0.5s",
                            }}>
                              {done
                                ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3.5 3.5 5-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                : active
                                  ? <span style={{ fontSize: 14 }}>{step.icon}</span>
                                  : <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#d1d5db", display: "block" }}/>
                              }
                            </div>
                          </div>

                          {/* Content */}
                          <div style={{ flex: 1, paddingBottom: 24, paddingTop: 4, opacity: pending ? 0.38 : 1, transition: "opacity 0.5s" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
                              <p style={{ fontSize: 14, fontWeight: active ? 800 : done ? 700 : 500, color: active ? "#f97316" : done ? "#111827" : "#9ca3af" }}>
                                {step.label}
                                {active && <span style={s.activePill}>In Progress</span>}
                              </p>
                              {(done || active) && date && (
                                <p style={{ fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap", flexShrink: 0 }}>{isFmt(date)}</p>
                              )}
                            </div>
                            <p style={{ fontSize: 12, color: active ? "#6b7280" : "#9ca3af", lineHeight: 1.6 }}>{step.desc}</p>

                            {/* Shipment detail */}
                            {active && step.key === "shipped" && (
                              <div style={s.shipDetail}>
                                <p style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 3 }}>Shipment Details</p>
                                <p style={{ fontSize: 12, color: "#b45309" }}>{order.trackingNumber || id} · {order.carrier || "Blue Dart Express"}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* ── RIGHT column ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Ordered items */}
                {Array.isArray(order.items) && order.items.length > 0 && (
                  <div style={s.card}>
                    <h2 style={{ ...s.cardTitle, marginBottom: 16 }}>Items Ordered</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {order.items.map((item, i) => (
                        <div key={i} style={s.itemRow}>
                         <div style={s.coverBox}>
  {(item.cover || item.image) && (
    <img
      src={item.cover || item.image}
      alt={item.title}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      onError={(e) => { e.target.parentElement.style.display = "none"; }}
    />
  )}
</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 13, fontWeight: 700, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</p>
                            {item.author && <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>by {item.author}</p>}
                            <p style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>Qty: {item.qty ?? item.quantity ?? 1}</p>
                          </div>
                          <p style={{ fontSize: 14, fontWeight: 800, color: "#111827", flexShrink: 0, alignSelf: "center" }}>
                            {rupee((item.price ?? 0) * (item.qty ?? item.quantity ?? 1))}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Pricing breakdown */}
                    {order.total != null && (
                      <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid #f3f4f6", display: "flex", flexDirection: "column", gap: 9 }}>
                        {[
                          order.subtotal != null && { l: "Subtotal",  v: rupee(order.subtotal),  green: false },
                          order.discount != null && { l: "Discount",  v: `− ${rupee(order.discount)}`, green: true },
                          order.delivery != null && { l: "Delivery",  v: order.delivery === 0 ? "FREE" : rupee(order.delivery), green: order.delivery === 0 },
                        ].filter(Boolean).map((r) => (
                          <div key={r.l} style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontSize: 13, color: "#6b7280" }}>{r.l}</span>
                            <span style={{ fontSize: 13, fontWeight: 600, color: r.green ? "#16a34a" : "#111827" }}>{r.v}</span>
                          </div>
                        ))}
                        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1.5px solid #f3f4f6", paddingTop: 10, marginTop: 4 }}>
                          <span style={{ fontSize: 15, fontWeight: 800 }}>Total Paid</span>
                          <span style={{ fontSize: 20, fontWeight: 800, color: "#f97316" }}>{rupee(order.total)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Delivery address */}
                {(order.address || order.shippingAddress) && (
                  <div style={s.card}>
                    <h2 style={{ ...s.cardTitle, marginBottom: 14 }}>Delivery Address</h2>
                    <div style={s.addrBox}>
                      <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>📍</span>
                      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, fontWeight: 500 }}>
                        {addrStr(order.address || order.shippingAddress)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Support */}
                <div style={s.card}>
                  <h2 style={{ ...s.cardTitle, marginBottom: 14 }}>Need Help?</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                    {[
                      { icon: "📞", t: "Call Support",     s: "Mon–Fri · 9AM–8PM IST"    },
                      { icon: "💬", t: "Live Chat",         s: "Available 24/7"            },
                      { icon: "📧", t: "Email Us",          s: "support@pageturn.in"       },
                      { icon: "↩️", t: "Returns & Refunds", s: "30-day easy return policy" },
                    ].map((h) => (
                      <div key={h.t} style={s.helpRow}>
                        <span style={{ fontSize: 18 }}>{h.icon}</span>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{h.t}</p>
                          <p style={{ fontSize: 11, color: "#9ca3af" }}>{h.s}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <button className="cta" style={s.ctaBtn} onClick={() => router.push("/")}>Continue Shopping</button>
                  <button style={s.outlineBtn} onClick={() => router.push("/orders")}>View All Orders</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ─── Global CSS ──────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body, input, button { font-family: 'DM Sans', sans-serif; }
  body { background: #f5f5f0; }

  @keyframes spin   { to { transform: rotate(360deg); } }
  @keyframes up     { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
  @keyframes pop    { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
  @keyframes pulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.5)} }

  .up  { animation: up  0.35s ease both; }
  .pop { animation: pop 0.5s  ease both; }

  .cta:hover      { transform: translateY(-1px) !important; box-shadow: 0 6px 22px rgba(249,115,22,0.42) !important; }
  .trk-input:focus { border-color: #f97316 !important; outline: none; box-shadow: 0 0 0 3px rgba(249,115,22,0.12) !important; }
`;

/* ─── Style tokens ────────────────────────────────────────── */
const s = {
  page:   { minHeight: "100vh", background: "#f5f5f0", fontFamily: "'DM Sans',sans-serif", color: "#111827" },

  /* Header */
  header:      { background: "#fff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 5px rgba(0,0,0,0.05)" },
  headerInner: { maxWidth: 1100, margin: "0 auto", padding: "13px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" },
  logoWrap:    { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" },
  logoText:    { fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "#111827", letterSpacing: "-0.02em" },
  breadcrumb:  { display: "flex", alignItems: "center", gap: 6, fontSize: 12 },
  crumbLink:   { color: "#6b7280", fontWeight: 500, cursor: "pointer" },
  crumbSep:    { color: "#d1d5db" },
  crumbActive: { color: "#f97316", fontWeight: 700 },
  ssl:         { display: "flex", alignItems: "center", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 20, padding: "5px 12px" },

  /* Main */
  main: { maxWidth: 1100, margin: "0 auto", padding: "28px 24px 60px" },

  /* Hero */
  hero:        { display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 26 },
  h1:          { fontSize: 26, fontWeight: 700, color: "#111827", fontFamily: "'Playfair Display',serif", letterSpacing: "-0.03em" },
  heroSub:     { fontSize: 14, color: "#9ca3af", marginTop: 4 },
  searchForm:  { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
  searchInput: { padding: "11px 16px", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 14, color: "#111827", background: "#fff", width: 270, transition: "all 0.2s", outline: "none" },
  searchBtn:   { padding: "11px 20px", background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 3px 12px rgba(249,115,22,0.28)", transition: "transform 0.15s,box-shadow 0.15s", whiteSpace: "nowrap" },

  /* States */
  center:      { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 340 },
  spinner:     { width: 36, height: 36, border: "3px solid #e5e7eb", borderTopColor: "#f97316", borderRadius: "50%", animation: "spin 0.7s linear infinite" },
  loaderText:  { color: "#9ca3af", fontSize: 14, marginTop: 16 },
  emptyCard:   { background: "#fff", borderRadius: 18, border: "1px solid #e5e7eb", padding: "60px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, maxWidth: 480, margin: "40px auto", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" },
  emptyIcon:   { fontSize: 52 },
  emptyTitle:  { fontSize: 20, fontWeight: 700, color: "#111827" },
  emptySub:    { fontSize: 14, color: "#9ca3af", maxWidth: 300, textAlign: "center", lineHeight: 1.7 },

  /* Banner */
  banner:      { display: "flex", alignItems: "center", gap: 20, borderRadius: 16, padding: "22px 28px", marginBottom: 20 },
  bannerTitle: { fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 5 },
  bannerSub:   { fontSize: 14, color: "#6b7280", lineHeight: 1.6 },

  /* Meta strip */
  metaStrip: { display: "flex", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", marginBottom: 24, flexWrap: "wrap" },
  metaCell:  { flex: 1, padding: "16px 20px", borderRight: "1px solid #f3f4f6", minWidth: 110 },
  metaLbl:   { fontSize: 10, color: "#9ca3af", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 },
  metaVal:   { fontSize: 14, fontWeight: 700, color: "#111827" },

  /* Grid */
  grid: { display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, alignItems: "start" },

  /* Card */
  card:     { background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", padding: "24px 26px", boxShadow: "0 1px 5px rgba(0,0,0,0.04)" },
  cardHead: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  cardTitle:{ fontSize: 17, fontWeight: 700, color: "#111827", letterSpacing: "-0.01em" },

  /* Badges */
  badgeGreen: { display: "inline-flex", alignItems: "center", gap: 6, background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#16a34a", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700 },
  badgeRed:   { display: "inline-flex", alignItems: "center", gap: 6, background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700 },
  dot:        { width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 1.5s ease-in-out infinite" },
  activePill: { display: "inline-block", background: "#fff7ed", color: "#f97316", border: "1px solid #fed7aa", borderRadius: 20, fontSize: 10, fontWeight: 700, padding: "1px 8px", marginLeft: 8 },

  /* Tracking */
  trkMeta:    { display: "flex", justifyContent: "space-between", background: "#fafafa", border: "1px solid #f3f4f6", borderRadius: 10, padding: "12px 16px", marginBottom: 16 },
  miniLbl:    { fontSize: 10, color: "#9ca3af", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.07em" },
  fillWrap:   { height: 5, background: "#f3f4f6", borderRadius: 4, marginBottom: 8, overflow: "hidden" },
  fill:       { height: "100%", background: "linear-gradient(90deg,#f97316,#ea580c)", borderRadius: 4, transition: "width 0.8s ease" },
  cancelNote: { display: "flex", gap: 14, alignItems: "flex-start", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "14px 16px", marginBottom: 20 },
  shipDetail: { marginTop: 8, background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 8, padding: "8px 12px" },

  /* Items */
  itemRow:  { display: "flex", gap: 12, padding: 12, background: "#fafafa", borderRadius: 10, border: "1px solid #f3f4f6", alignItems: "flex-start" },
  coverBox: { width: 48, height: 64, borderRadius: 7, overflow: "hidden", background: "#e5e7eb", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e5e7eb" },
  addrBox:  { display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", background: "#fafafa", borderRadius: 10, border: "1px solid #f3f4f6" },
  helpRow:  { display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: "#fafafa", border: "1px solid #f3f4f6", borderRadius: 9 },

  /* Buttons */
  ctaBtn:    { width: "100%", background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", border: "none", borderRadius: 13, padding: "14px", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 16px rgba(249,115,22,0.30)", transition: "transform 0.15s,box-shadow 0.15s", display: "block" },
  outlineBtn:{ width: "100%", background: "#fff", border: "1.5px solid #e5e7eb", color: "#374151", borderRadius: 13, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "block" },
};