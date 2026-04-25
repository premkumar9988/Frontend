'use client';

import { useAuth } from '@/context/AuthContext'; 
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Link from "next/link";


const MOCK_ORDERS = [
  {
    id: "ORD-2841",
    date: "Apr 12, 2025",
    status: "Delivered",
    total: 1247,
    items: [
      { title: "Can't Hurt Me", author: "David Goggins", image: "/images/image11.png", price: 349 },
      { title: "Zero to One", author: "Peter Thiel", image: "/images/image13.png", price: 499 },
      { title: "The Power of Now", author: "Eckhart Tolle", image: "/images/image9.png", price: 399 },
    ],
  },
  {
    id: "ORD-2756",
    date: "Mar 28, 2025",
    status: "Delivered",
    total: 838,
    items: [
      { title: "Start With Why", author: "Simon Sinek", image: "/images/image10.png", price: 239 },
      { title: "Do Epic Shit", author: "Ankur Warikoo", image: "/images/image14.png", price: 499 },
      { title: "You Can Win", author: "Shiv Khera", image: "/images/image15.png", price: 399 },
    ],
  },
  {
    id: "ORD-2901",
    date: "Apr 17, 2025",
    status: "In Transit",
    total: 599,
    items: [
      { title: "Every Thing is F*cked", author: "Mark Manson", image: "/images/image12.png", price: 599 },
    ],
  },
];

const WISHLIST = [
  { title: "Atomic Habits", author: "James Clear", price: 449, image: "/images/image9.png" },
  { title: "Deep Work", author: "Cal Newport", price: 399, image: "/images/image10.png" },
  { title: "The Alchemist", author: "Paulo Coelho", price: 299, image: "/images/image11.png" },
];

const STATUS_COLORS = {
  Delivered:   { bg: "#ecfdf5", color: "#059669", dot: "#10b981" },
  "In Transit":{ bg: "#fff7ed", color: "#c2440e", dot: "#e8622a" },
  Processing:  { bg: "#eff6ff", color: "#2563eb", dot: "#3b82f6" },
};

/* ── Tiny SVG icons ── */
const Icon = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export default function Profile() {
  const { user, logout } = useAuth();        
  const router = useRouter();                

  const [activeTab, setActiveTab] = useState("orders");
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "Book Lover",
    email: user?.email || "reader@example.com",
    phone: user?.phone || "+91 98765 43210",
    address: user?.address || "123, Anna Nagar, Chennai, Tamil Nadu - 600040",
  });
  const [tempData, setTempData] = useState({ ...profileData });


  if (!user) {
    return (
      <div className="pf-no-auth">
        <div className="pf-no-auth-icon">📚</div>
        <h2>Please sign in to view your profile</h2>
        <p>Access your orders, wishlist, and account settings.</p>
        <Link href="/auth/login" className="pf-signin-btn">Sign In →</Link>
        <style>{noAuthStyles}</style>
      </div>
    );
  }

  const handleSave = () => {
    setProfileData({ ...tempData });
    setEditMode(false);
  };

  const totalSpent = MOCK_ORDERS.reduce((s, o) => s + o.total, 0);
  const initials = profileData.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <>
      <style>{styles}</style>
      <div className="pf-page">

        {/* ── TOP BANNER ── */}
        <div className="pf-banner">
          <div className="pf-banner-blob pf-blob-1" />
          <div className="pf-banner-blob pf-blob-2" />
          <div className="pf-banner-inner">
            <div className="pf-avatar-wrap">
              <div className="pf-avatar">{initials}</div>
              <button className="pf-avatar-edit" title="Change photo">
                <Icon d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              </button>
            </div>
            <div className="pf-banner-info">
              <h1 className="pf-banner-name">{profileData.name}</h1>
              <p className="pf-banner-email">{profileData.email}</p>
              <div className="pf-banner-badges">
                <span className="pf-badge pf-badge-reader">📖 Avid Reader</span>
                <span className="pf-badge pf-badge-member">⭐ Member since 2024</span>
              </div>
            </div>
            <div className="pf-banner-stats">
              <div className="pf-stat">
                <span className="pf-stat-num">{MOCK_ORDERS.length}</span>
                <span className="pf-stat-label">Orders</span>
              </div>
              <div className="pf-stat-div" />
              <div className="pf-stat">
                <span className="pf-stat-num">{WISHLIST.length}</span>
                <span className="pf-stat-label">Wishlist</span>
              </div>
              <div className="pf-stat-div" />
              <div className="pf-stat">
                <span className="pf-stat-num">₹{totalSpent.toLocaleString()}</span>
                <span className="pf-stat-label">Total Spent</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── TABS + CONTENT ── */}
        <div className="pf-body">

          {/* Tab Bar */}
          <div className="pf-tabs">
            {[
              { key: "orders",   icon: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2", label: "My Orders" },
              { key: "wishlist", icon: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z", label: "Wishlist" },
              { key: "account",  icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", label: "Account" },
            ].map(({ key, icon, label }) => (
              <button
                key={key}
                className={`pf-tab${activeTab === key ? " active" : ""}`}
                onClick={() => setActiveTab(key)}
              >
                <Icon d={icon} size={15} />
                {label}
              </button>
            ))}
          </div>

          {/* ── ORDERS ── */}
          {activeTab === "orders" && (
            <div className="pf-panel">
              <div className="pf-section-header">
                <h2 className="pf-section-title">Order History</h2>
                <span className="pf-pill">{MOCK_ORDERS.length} orders</span>
              </div>
              <div className="pf-orders-list">
                {MOCK_ORDERS.map((order) => {
                  const sc = STATUS_COLORS[order.status] || STATUS_COLORS.Processing;
                  return (
                    <div className="pf-order-card" key={order.id}>
                      <div className="pf-order-top">
                        <div className="pf-order-meta">
                          <span className="pf-order-id">{order.id}</span>
                          <span className="pf-order-date">
                            <Icon d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" size={13} />
                            {order.date}
                          </span>
                        </div>
                        <div className="pf-order-right">
                          <span className="pf-status-badge"
                            style={{ background: sc.bg, color: sc.color }}>
                            <span className="pf-status-dot" style={{ background: sc.dot }} />
                            {order.status}
                          </span>
                          <span className="pf-order-total">₹{order.total.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="pf-order-books">
                        {order.items.map((item) => (
                          <div className="pf-order-book" key={item.title}>
                            <div className="pf-book-thumb">
                              <img src={item.image} alt={item.title} />
                            </div>
                            <div className="pf-book-info">
                              <p className="pf-book-title">{item.title}</p>
                              <p className="pf-book-author">{item.author}</p>
                            </div>
                            <span className="pf-book-price">₹{item.price}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pf-order-actions">
                        <button className="pf-btn-ghost">View Invoice</button>
                        {order.status === "Delivered" && (
                          <button className="pf-btn-ghost">Write a Review</button>
                        )}
                        {order.status === "In Transit" && (
                          <button className="pf-btn-primary">Track Order →</button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── WISHLIST ── */}
          {activeTab === "wishlist" && (
            <div className="pf-panel">
              <div className="pf-section-header">
                <h2 className="pf-section-title">My Wishlist</h2>
                <span className="pf-pill">{WISHLIST.length} books</span>
              </div>
              <div className="pf-wishlist-grid">
                {WISHLIST.map((book) => (
                  <div className="pf-wish-card" key={book.title}>
                    <button className="pf-wish-remove" title="Remove">×</button>
                    <div className="pf-wish-img">
                      <img src={book.image} alt={book.title} />
                    </div>
                    <div className="pf-wish-info">
                      <p className="pf-wish-title">{book.title}</p>
                      <p className="pf-wish-author">{book.author}</p>
                      <p className="pf-wish-price">₹{book.price}</p>
                    </div>
                    <button className="pf-wish-cart-btn">Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ACCOUNT ── */}
          {activeTab === "account" && (
            <div className="pf-panel">
              <div className="pf-section-header">
                <h2 className="pf-section-title">Account Details</h2>
                {!editMode ? (
                  <button className="pf-edit-btn" onClick={() => { setTempData({ ...profileData }); setEditMode(true); }}>
                    <Icon d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" size={14} />
                    Edit Profile
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button className="pf-btn-ghost" onClick={() => setEditMode(false)}>Cancel</button>
                    <button className="pf-btn-primary" onClick={handleSave}>Save Changes</button>
                  </div>
                )}
              </div>

              <div className="pf-account-grid">
                {[
                  { label: "Full Name", key: "name", type: "text", icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" },
                  { label: "Email Address", key: "email", type: "email", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" },
                  { label: "Phone Number", key: "phone", type: "tel", icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" },
                  { label: "Delivery Address", key: "address", type: "text", icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" },
                ].map(({ label, key, type, icon }) => (
                  <div className="pf-field" key={key}>
                    <label className="pf-field-label">
                      <Icon d={icon} size={13} />
                      {label}
                    </label>
                    {editMode ? (
                      <input
                        className="pf-field-input"
                        type={type}
                        value={tempData[key]}
                        onChange={(e) => setTempData((p) => ({ ...p, [key]: e.target.value }))}
                      />
                    ) : (
                      <p className="pf-field-value">{profileData[key]}</p>
                    )}
                  </div>
                ))}
              </div>

           
              <div className="pf-danger-zone">
                <h3 className="pf-danger-title">Danger Zone</h3>
                <div className="pf-danger-actions">
                  <button className="pf-danger-btn" onClick={handleLogout}>
                    <Icon d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" size={14} />
                    Sign Out
                  </button>
                  <button className="pf-danger-btn pf-danger-delete">
                    <Icon d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" size={14} />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}


const noAuthStyles = `
  .pf-no-auth {
    min-height: 60vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding: 48px 24px;
    font-family: 'DM Sans', sans-serif;
    color: #9c8878;
  }
  .pf-no-auth-icon { font-size: 56px; margin-bottom: 16px; }
  .pf-no-auth h2 { font-family: 'Playfair Display', serif; font-size: 24px; color: #1a1410; margin: 0 0 8px; }
  .pf-no-auth p  { font-size: 15px; margin: 0 0 24px; }
  .pf-signin-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: #c2440e; color: #fff;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700;
    padding: 13px 28px; border-radius: 12px; border: none; cursor: pointer;
    text-decoration: none; box-shadow: 0 6px 20px rgba(194,68,14,0.28);
  }
`;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --acc:    #c2440e;
    --acc2:   #e8622a;
    --bg:     #fdf8f4;
    --border: #f0ebe3;
    --text:   #1a1410;
    --muted:  #9c8878;
    --card:   #ffffff;
  }

  .pf-page {
    background: var(--bg);
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
  }

  /* ── BANNER ── */
  .pf-banner {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #1a1410 0%, #2d1f15 60%, #3a2418 100%);
    padding: 48px 48px 40px;
  }
  .pf-banner-blob {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }
  .pf-blob-1 {
    width: 400px; height: 400px;
    top: -120px; right: -80px;
    background: radial-gradient(circle, rgba(232,98,42,0.18) 0%, transparent 70%);
  }
  .pf-blob-2 {
    width: 280px; height: 280px;
    bottom: -80px; left: 10%;
    background: radial-gradient(circle, rgba(194,68,14,0.12) 0%, transparent 70%);
  }
  .pf-banner-inner {
    position: relative; z-index: 2;
    display: flex;
    align-items: center;
    gap: 32px;
    flex-wrap: wrap;
  }

  /* Avatar */
  .pf-avatar-wrap { position: relative; flex-shrink: 0; }
  .pf-avatar {
    width: 88px; height: 88px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--acc), var(--acc2));
    color: #fff;
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 800;
    display: flex; align-items: center; justify-content: center;
    border: 3px solid rgba(255,255,255,0.15);
    box-shadow: 0 8px 28px rgba(0,0,0,0.35);
  }
  .pf-avatar-edit {
    position: absolute; bottom: 0; right: 0;
    width: 28px; height: 28px;
    background: var(--card);
    border: 2px solid #f0ebe3;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--acc);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    transition: transform 0.15s;
  }
  .pf-avatar-edit:hover { transform: scale(1.1); }

  /* Banner info */
  .pf-banner-info { flex: 1; min-width: 180px; }
  .pf-banner-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px, 3vw, 32px);
    font-weight: 800;
    color: #fff;
    margin-bottom: 4px;
  }
  .pf-banner-email { font-size: 14px; color: rgba(255,255,255,0.55); margin-bottom: 12px; }
  .pf-banner-badges { display: flex; gap: 8px; flex-wrap: wrap; }
  .pf-badge {
    font-size: 11.5px; font-weight: 600;
    padding: 4px 12px; border-radius: 99px;
  }
  .pf-badge-reader  { background: rgba(232,98,42,0.18); color: #fba97a; border: 1px solid rgba(232,98,42,0.25); }
  .pf-badge-member  { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.65); border: 1px solid rgba(255,255,255,0.12); }

  /* Banner stats */
  .pf-banner-stats {
    display: flex; align-items: center; gap: 20px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 16px;
    padding: 18px 28px;
    flex-shrink: 0;
  }
  .pf-stat { text-align: center; }
  .pf-stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 22px; font-weight: 800;
    color: #fff; display: block; line-height: 1;
  }
  .pf-stat-label { font-size: 11px; color: rgba(255,255,255,0.45); margin-top: 4px; display: block; text-transform: uppercase; letter-spacing: 0.06em; }
  .pf-stat-div { width: 1px; height: 36px; background: rgba(255,255,255,0.12); }

  @media (max-width: 640px) {
    .pf-banner { padding: 32px 20px 28px; }
    .pf-banner-stats { width: 100%; justify-content: space-around; }
  }

  /* ── BODY ── */
  .pf-body { max-width: 860px; margin: 0 auto; padding: 32px 24px 64px; }

  /* ── TABS ── */
  .pf-tabs {
    display: flex; gap: 4px;
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 14px;
    padding: 5px;
    margin-bottom: 28px;
    box-shadow: 0 2px 10px rgba(60,30,5,0.06);
  }
  .pf-tab {
    flex: 1;
    display: flex; align-items: center; justify-content: center; gap: 7px;
    padding: 10px 16px;
    border-radius: 10px;
    border: none; background: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px; font-weight: 600;
    color: var(--muted);
    cursor: pointer;
    transition: background 0.18s, color 0.18s;
    white-space: nowrap;
  }
  .pf-tab:hover { color: var(--acc); background: #fff5ef; }
  .pf-tab.active { background: var(--acc); color: #fff; box-shadow: 0 3px 12px rgba(194,68,14,0.28); }

  /* ── PANEL ── */
  .pf-panel { animation: pfFadeIn 0.25s ease; }
  @keyframes pfFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

  .pf-section-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 20px; flex-wrap: wrap; gap: 12px;
  }
  .pf-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 21px; font-weight: 700; color: var(--text);
  }
  .pf-pill {
    font-size: 12px; font-weight: 600; color: var(--muted);
    background: var(--card); border: 1.5px solid var(--border);
    padding: 4px 12px; border-radius: 99px;
  }

  /* ── ORDER CARDS ── */
  .pf-orders-list { display: flex; flex-direction: column; gap: 16px; }
  .pf-order-card {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(60,30,5,0.05);
    transition: box-shadow 0.2s;
  }
  .pf-order-card:hover { box-shadow: 0 6px 24px rgba(60,30,5,0.10); }

  .pf-order-top {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 20px 14px; flex-wrap: wrap; gap: 10px;
    border-bottom: 1px solid var(--border);
  }
  .pf-order-meta { display: flex; align-items: center; gap: 14px; }
  .pf-order-id { font-size: 13.5px; font-weight: 700; color: var(--text); }
  .pf-order-date {
    display: flex; align-items: center; gap: 5px;
    font-size: 12.5px; color: var(--muted); font-weight: 500;
  }
  .pf-order-right { display: flex; align-items: center; gap: 14px; }
  .pf-status-badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px; font-weight: 700;
    padding: 4px 12px; border-radius: 99px;
  }
  .pf-status-dot { width: 6px; height: 6px; border-radius: 50%; }
  .pf-order-total { font-size: 15px; font-weight: 700; color: var(--text); }

  .pf-order-books { padding: 14px 20px; display: flex; flex-direction: column; gap: 12px; }
  .pf-order-book { display: flex; align-items: center; gap: 14px; }
  .pf-book-thumb {
    width: 44px; height: 58px; border-radius: 5px; overflow: hidden;
    background: #f5ede3; flex-shrink: 0;
    border: 1px solid var(--border);
  }
  .pf-book-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .pf-book-info { flex: 1; }
  .pf-book-title { font-size: 13.5px; font-weight: 600; color: var(--text); }
  .pf-book-author { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .pf-book-price { font-size: 13.5px; font-weight: 700; color: var(--acc); flex-shrink: 0; }

  .pf-order-actions {
    display: flex; gap: 10px; padding: 12px 20px 16px;
    border-top: 1px solid var(--border);
    flex-wrap: wrap;
  }

  /* ── BUTTONS ── */
  .pf-btn-ghost {
    padding: 8px 16px; border-radius: 9px;
    border: 1.5px solid var(--border); background: var(--card);
    font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600;
    color: var(--text); cursor: pointer;
    transition: border-color 0.18s, color 0.18s, background 0.18s;
  }
  .pf-btn-ghost:hover { border-color: #fdd5bc; color: var(--acc); background: #fff5ef; }

  .pf-btn-primary {
    padding: 8px 18px; border-radius: 9px;
    border: none; background: var(--acc);
    font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 700;
    color: #fff; cursor: pointer;
    box-shadow: 0 3px 12px rgba(194,68,14,0.24);
    transition: background 0.18s, transform 0.15s;
  }
  .pf-btn-primary:hover { background: var(--acc2); transform: translateY(-1px); }

  /* ── WISHLIST ── */
  .pf-wishlist-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;
  }
  .pf-wish-card {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 16px;
    padding: 16px;
    display: flex; flex-direction: column; gap: 10px;
    position: relative;
    box-shadow: 0 2px 10px rgba(60,30,5,0.05);
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .pf-wish-card:hover { box-shadow: 0 8px 24px rgba(60,30,5,0.10); transform: translateY(-2px); }
  .pf-wish-remove {
    position: absolute; top: 10px; right: 12px;
    background: none; border: none; font-size: 18px;
    color: var(--muted); cursor: pointer; line-height: 1;
    transition: color 0.15s;
  }
  .pf-wish-remove:hover { color: #e53935; }
  .pf-wish-img {
    width: 100%; height: 140px; border-radius: 8px;
    overflow: hidden; background: #f5ede3;
    border: 1px solid var(--border);
  }
  .pf-wish-img img { width: 100%; height: 100%; object-fit: cover; }
  .pf-wish-title { font-size: 13.5px; font-weight: 700; color: var(--text); }
  .pf-wish-author { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .pf-wish-price { font-size: 15px; font-weight: 800; color: var(--acc); margin-top: 2px; }
  .pf-wish-cart-btn {
    width: 100%; padding: 9px;
    border-radius: 9px; border: 1.5px solid var(--border);
    background: var(--card); font-family: 'DM Sans', sans-serif;
    font-size: 12.5px; font-weight: 700; color: var(--text); cursor: pointer;
    transition: background 0.18s, border-color 0.18s, color 0.18s;
  }
  .pf-wish-cart-btn:hover { background: var(--acc); border-color: var(--acc); color: #fff; }

  /* ── ACCOUNT ── */
  .pf-edit-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px; border-radius: 10px;
    border: 1.5px solid var(--border); background: var(--card);
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
    color: var(--text); cursor: pointer;
    transition: border-color 0.18s, color 0.18s, background 0.18s;
  }
  .pf-edit-btn:hover { border-color: #fdd5bc; color: var(--acc); background: #fff5ef; }

  .pf-account-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 16px; margin-bottom: 32px;
  }
  @media (max-width: 560px) { .pf-account-grid { grid-template-columns: 1fr; } }

  .pf-field {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 12px; padding: 16px 18px;
  }
  .pf-field-label {
    display: flex; align-items: center; gap: 6px;
    font-size: 11.5px; font-weight: 700; color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.06em;
    margin-bottom: 8px;
  }
  .pf-field-value { font-size: 14.5px; font-weight: 500; color: var(--text); }
  .pf-field-input {
    width: 100%; border: none; outline: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 14.5px; font-weight: 500; color: var(--text);
    background: transparent; caret-color: var(--acc);
    border-bottom: 2px solid #fdd5bc;
    padding-bottom: 4px;
  }

  /* Danger zone */
  .pf-danger-zone {
    border: 1.5px solid #fee2e2;
    background: #fff8f8;
    border-radius: 14px; padding: 20px 22px;
  }
  .pf-danger-title {
    font-size: 13px; font-weight: 700; color: #b91c1c;
    text-transform: uppercase; letter-spacing: 0.07em;
    margin-bottom: 14px;
  }
  .pf-danger-actions { display: flex; gap: 10px; flex-wrap: wrap; }
  .pf-danger-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px; border-radius: 9px;
    border: 1.5px solid #fecaca; background: #fff;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
    color: #b91c1c; cursor: pointer;
    transition: background 0.18s, border-color 0.18s;
  }
  .pf-danger-btn:hover { background: #fee2e2; border-color: #fca5a5; }
  .pf-danger-delete { color: #7f1d1d; }
  .pf-danger-delete:hover { background: #fecaca; }
`;