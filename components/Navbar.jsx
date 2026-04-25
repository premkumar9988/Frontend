"use client";
import Link from "next/link";
import { ShoppingCart, User, Search, X, BookOpen, Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext"; // 👈 add your auth context import

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logoutUser } = useAuth(); // 👈 get user and logoutUser from auth context
  const searchRef = useRef(null);
  const router = useRouter();



  /* ── scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── focus search input when it opens ── */
  useEffect(() => {
    if (showSearch) searchRef.current?.focus();
  }, [showSearch]);

  /* ── close mobile menu on resize ── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    router.push(`/books?search=${encodeURIComponent(query.trim())}`);
    setShowSearch(false);
    setQuery("");
    setMobileOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/books", label: "Books" },
    { href: "/orders", label: "Orders" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
 
        :root {
          --bz-bg:       #ffffff92;
          --bz-border:   #ffffff;
          --bz-text:     #1a1410;
          --bz-muted:    #000000;
          --bz-accent:   #f24a02;
          --bz-accent2:  #e7591c;
          --bz-warm:     #fdf8f4;
          --bz-shadow:   0 4px 24px -4px rgba(60,30,5,0.10);
          --bz-radius:   14px;
          font-family: 'DM Sans', sans-serif;
        }
 
        /* ── BASE ── */
        .bz-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          font-family: 'DM Sans', sans-serif;
        }
 
        /* ── TOP STRIP ── */
        .bz-strip {
          background: var(--bz-accent);
          color: #fff;
          text-align: center;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          padding: 6px 24px;
        }
 
        /* ── MAIN BAR ── */
        .bz-bar {
          background: var(--bz-bg);
          border-bottom: 1.5px solid var(--bz-border);
          padding: 0 32px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          transition: box-shadow 0.3s ease;
          border-radius:10px;
          margin:10px;
        }
        .bz-bar.scrolled { box-shadow: var(--bz-shadow); }
 
        /* ── LOGO ── */
        .bz-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .bz-logo-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--bz-accent), var(--bz-accent2));
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          box-shadow: 0 2px 10px rgba(194,68,14,0.30);
          flex-shrink: 0;
        }
        .bz-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--bz-accent);
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .bz-logo-text span { color: var(--bz-text); }
 
        /* ── DESKTOP LINKS ── */
        .bz-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        @media (max-width: 767px) { .bz-links { display: none; } }
 
        .bz-link {
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          color: var(--bz-muted);
          padding: 6px 14px;
          border-radius: 8px;
          transition: color 0.2s, background 0.2s;
          position: relative;
        }
        .bz-link::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 14px;
          right: 14px;
          height: 2px;
          background: var(--bz-accent);
          border-radius: 2px;
          transform: scaleX(0);
          transition: transform 0.22s ease;
        }
        .bz-link:hover { color: var(--bz-accent); background: #fdf4ef; }
        .bz-link:hover::after { transform: scaleX(1); }
 
        /* ── RIGHT ACTIONS ── */
        .bz-actions {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
 
        .bz-icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: none;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--bz-muted);
          transition: color 0.2s, background 0.2s;
          text-decoration: none;
          position: relative;
        }
        .bz-icon-btn:hover { color: var(--bz-accent); background: #fdf4ef; }
 
        .bz-cart-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background: var(--bz-accent);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          min-width: 17px;
          height: 17px;
          border-radius: 99px;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          padding: 0 3px;
          pointer-events: none;
          box-shadow: 0 0 0 2px #fff;
        }
 
        /* ── LOGIN BUTTON ── */
        .bz-login-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          background: var(--bz-accent);
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          padding: 0 16px;
          height: 38px;
          border-radius: 10px;
          letter-spacing: 0.01em;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
          flex-shrink: 0;
        }
        .bz-login-btn:hover {
          background: var(--bz-accent2);
          box-shadow: 0 4px 14px rgba(194,68,14,0.35);
          transform: translateY(-1px);
        }
        @media (max-width: 480px) { .bz-login-btn span { display: none; } }

        /* ── PROFILE AVATAR ── */
        .bz-avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: orange;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          cursor: pointer;
          text-decoration: none;
          font-size: 14px;
          flex-shrink: 0;
          transition: opacity 0.2s;
        }
        .bz-avatar:hover { opacity: 0.85; }

        /* ── LOGOUT BUTTON ── */
        .bz-logout-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1.5px solid var(--bz-border);
          color: var(--bz-text);
          font-size: 13px;
          font-weight: 600;
          padding: 0 14px;
          height: 38px;
          border-radius: 10px;
          cursor: pointer;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
          flex-shrink: 0;
          font-family: 'DM Sans', sans-serif;
        }
        .bz-logout-btn:hover {
          color: var(--bz-accent);
          border-color: var(--bz-accent);
          background: #fdf4ef;
        }
        @media (max-width: 480px) { .bz-logout-btn span { display: none; } }
 
        /* ── DIVIDER ── */
        .bz-divider {
          width: 1px;
          height: 26px;
          background: var(--bz-border);
          border-radius: 1px;
          flex-shrink: 0;
        }
 
        /* ── HAMBURGER ── */
        .bz-hamburger {
          display: none;
        }
        @media (max-width: 767px) { .bz-hamburger { display: flex; } }
 
        /* ── SEARCH OVERLAY ── */
        .bz-search-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 80px;
          background: rgba(26,20,16,0.55);
          backdrop-filter: blur(6px);
          animation: bzFadeIn 0.18s ease;
        }
        @keyframes bzFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
 
        .bz-search-box {
          background: var(--bz-bg);
          border-radius: 16px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          width: min(580px, calc(100vw - 40px));
          box-shadow: 0 20px 60px rgba(60,30,5,0.20);
          animation: bzSlideDown 0.2s ease;
          border: 1.5px solid var(--bz-border);
        }
        @keyframes bzSlideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
 
        .bz-search-input {
          flex: 1;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          color: var(--bz-text);
          background: transparent;
          caret-color: var(--bz-accent);
        }
        .bz-search-input::placeholder { color: #c4b8ac; }
 
        .bz-search-submit {
          background: var(--bz-accent);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 8px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .bz-search-submit:hover { background: var(--bz-accent2); }
 
        .bz-search-close {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: none;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--bz-muted);
          transition: color 0.2s, background 0.2s;
          flex-shrink: 0;
        }
        .bz-search-close:hover { color: var(--bz-accent); background: #fdf4ef; }
 
        /* ── MOBILE DRAWER ── */
        .bz-mobile-drawer {
          background: var(--bz-bg);
          border-top: 1.5px solid var(--bz-border);
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s ease, padding 0.3s ease;
        }
        .bz-mobile-drawer.open {
          max-height: 320px;
        }
 
        .bz-mobile-inner {
          padding: 12px 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
 
        .bz-mobile-link {
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          color: var(--bz-text);
          padding: 11px 12px;
          border-radius: 10px;
          transition: color 0.2s, background 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .bz-mobile-link:hover { color: var(--bz-accent); background: #fdf4ef; }
 
        .bz-mobile-sep {
          height: 1px;
          background: var(--bz-border);
          margin: 6px 0;
        }
          
      `}</style>

      <nav className="bz-nav">
        {/* ── ANNOUNCEMENT STRIP ── */}
        <div className="bz-strip">
          📚 Free shipping on orders over ₹499 &nbsp;·&nbsp; New arrivals every
          week
        </div>

        {/* ── MAIN BAR ── */}
        <div className={`bz-bar${scrolled ? " scrolled" : ""}`}>
          {/* LOGO */}
          <Link href="/" className="bz-logo">
            <div className="bz-logo-icon">
              <BookOpen size={18} strokeWidth={2.2} />
            </div>
            <span className="bz-logo-text">
              Book<span>store</span>
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <ul className="bz-links">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="bz-link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT ACTIONS */}
          <div className="bz-actions">
            {/* SEARCH */}
            <button
              className="bz-icon-btn"
              onClick={() => setShowSearch(true)}
              aria-label="Open search"
              title="Search books"
            >
              <Search size={19} strokeWidth={2} />
            </button>

            <div className="bz-divider" />

            {/* CART */}
            <Link
              href="/cart"
              className="bz-icon-btn"
              aria-label="Cart"
              title="Shopping cart"
            >
              <ShoppingCart size={19} strokeWidth={2} />
              {totalItems > 0 && (
                <span className="bz-cart-badge">{totalItems}</span>
              )}
            </Link>

            {/* AUTH — Sign in OR Profile + Logout */}
            {!user ? (
              <Link href="/auth/login" className="bz-login-btn" aria-label="Sign in">
                <User size={16} strokeWidth={2.2} />
                <span>Sign in</span>
              </Link>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Profile Avatar */}
                <Link href="/profile" className="bz-avatar">
                  {user.name?.charAt(0)}
                </Link>
                {/* Logout */}
                <button
                  className="bz-logout-btn"
                  onClick={() => {
                    logoutUser();
                    window.location.reload();
                  }}
                >
                  <span>Logout</span>
                </button>
              </div>
            )}

            {/* HAMBURGER — mobile only */}
            <button
              className="bz-icon-btn bz-hamburger"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={20} strokeWidth={2} />
              ) : (
                <Menu size={20} strokeWidth={2} />
              )}
            </button>
          </div>
        </div>

        {/* ── MOBILE DRAWER ── */}
        <div className={`bz-mobile-drawer${mobileOpen ? " open" : ""}`}>
          <div className="bz-mobile-inner">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="bz-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="bz-mobile-sep" />
            <Link
              href="/cart"
              className="bz-mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              <ShoppingCart size={17} /> Cart
              {totalItems > 0 && (
                <span
                  style={{
                    marginLeft: "auto",
                    background: "var(--bz-accent)",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: 99,
                    padding: "1px 8px",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* ── SEARCH OVERLAY ── */}
      {showSearch && (
        <div
          className="bz-search-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSearch(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <form className="bz-search-box" onSubmit={handleSearch}>
            <Search
              size={18}
              style={{ color: "var(--bz-muted)", flexShrink: 0 }}
            />
            <input
              ref={searchRef}
              className="bz-search-input"
              type="text"
              placeholder="Search for books, authors, genres…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search query"
            />
            <button type="submit" className="bz-search-submit">
              Search
            </button>
            <button
              type="button"
              className="bz-search-close"
              onClick={() => setShowSearch(false)}
              aria-label="Close search"
            >
              <X size={17} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}