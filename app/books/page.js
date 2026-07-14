"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import BookCard from "@/components/BookCard";
import { useBooks } from "@/context/BooksContext";

const books = [
  {
    id: 1,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    price: 399,
    oldPrice: 599,
    image: "/images/image9.png",
    rating: 4.7,
    reviews: 1823,
    genre: "Spirituality",
  },
  {
    id: 2,
    title: "Start With Why",
    author: "Simon Sinek",
    price: 239,
    oldPrice: 399,
    image: "/images/image10.png",
    rating: 4.6,
    reviews: 2140,
    genre: "Business",
  },
  {
    id: 3,
    title: "Can't Hurt Me",
    author: "David Goggins",
    price: 349,
    oldPrice: 549,
    image: "/images/image11.png",
    rating: 4.9,
    reviews: 3401,
    genre: "Self-Help",
  },
  {
    id: 4,
    title: "Every Thing is F*cked",
    author: "Mark Manson",
    price: 599,
    oldPrice: 799,
    image: "/images/image12.png",
    rating: 4.5,
    reviews: 4912,
    genre: "Self-Help",
  },
  {
    id: 5,
    title: "Zero to One",
    author: "Peter Thiel",
    price: 499,
    oldPrice: 699,
    image: "/images/image13.png",
    rating: 4.7,
    reviews: 1654,
    genre: "Business",
  },
  {
    id: 6,
    title: "Do Epic Shit",
    author: "Ankur Warikoo",
    price: 499,
    oldPrice: 799,
    image: "/images/image14.png",
    rating: 4.6,
    reviews: 987,
    genre: "Motivation",
  },
  {
    id: 7,
    title: "You Can Win",
    author: "Shiv Khera",
    price: 399,
    oldPrice: 549,
    image: "/images/image15.png",
    rating: 4.4,
    reviews: 2203,
    genre: "Motivation",
  },
];

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
];

const GENRES = ["All", "Self-Help", "Business", "Motivation", "Spirituality"];

export default function Books() {


  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [genre, setGenre] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const { books } = useBooks();


  
  const filtered = useMemo(() => {
    let list = [...books];
    if (search.trim())
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.author.toLowerCase().includes(search.toLowerCase()),
      );
    if (genre !== "All") list = list.filter((b) => b.genre === genre);
    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, sort, genre]);

  const displayed = showAll ? filtered : filtered.slice(0, 6);
  
  

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }*
        body { font-family: 'DM Sans', sans-serif; }

        :root {
          --acc:    #c2440e;
          --acc2:   #e8622a;
          --bg:     #fdf8f4;
          --border: #f0ebe3;
          --text:   #1a1410;
          --muted:  #000000;
          --card:   #ffffff;
        }

        .bz-books-page { background: var(--bg); min-height: 100vh; }

       .bz-bks-hero {
  position: relative;
  overflow: hidden;
  grid-area: hero;
  background: linear-gradient(135deg, rgba(253, 248, 244, 0) 0%, rgba(255, 255, 255, 0.18) 50%, rgba(253, 248, 244, 0.1) 100%),
              url('/images/imaged.png');
  background-size: cover;
  background-position: center 20%;
  background-blend-mode: soft-light;
  box-shadow: 0 12px 48px rgba(194, 68, 14, 0.15);
  padding: 56px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  border-bottom: 1.5px solid #8afdf5;
  cursor: pointer;
  transition: transform 0.15s;
  
}
        .bz-bks-hero::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(232,98,42,0.18) 0%, transparent 70%);
        }
        .bz-bks-hero::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(232,98,42,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .bz-bks-hero-left { position: relative; z-index: 2; }
        .bz-bks-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(194,68,14,0.10);
          color: var(--acc);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          padding: 5px 13px;
          border-radius: 99px;
          border: 1px solid rgba(194,68,14,0.20);
          margin-bottom: 16px;
          
        }
        .bz-bks-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          color: var(--text);
          line-height: 1.08;
          margin: 0 0 6px;
        }
        .bz-bks-hero-title em { color: var(--acc); font-style: normal; }
        .bz-bks-hero-disc {
          font-size: clamp(28px, 4vw, 44px);
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: var(--acc2);
          letter-spacing: -0.02em;
          margin: 0 0 20px;
          
        }
        .bz-bks-hero-sub { font-size: 15px; color: var(--muted); margin: 0 0 28px; line-height: 1.6; }
        .bz-bks-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--acc);
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          padding: 13px 28px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(194,68,14,0.28);
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .bz-bks-hero-cta:hover { background: var(--acc2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(194,68,14,0.35); }
        .bz-bks-hero-img {
          position: relative;
          z-index: 2;
          flex-shrink: 0;
        }
        .bz-bks-hero-img img {
          height: 180px;
          width: auto;
          filter: drop-shadow(0 12px 28px rgba(60,30,5,0.18));
          animation: bzFloat 3.5s ease-in-out infinite;
        }
        @keyframes bzFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
        @media (max-width: 600px) { .bz-bks-hero { padding: 40px 24px; } .bz-bks-hero-img { display: none; } }

        /* ── TRUST STRIP ── */
        .bz-trust-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          background: var(--text);
          overflow: hidden;
          border-radius:10px;
          margin:10px;
        }
        .bz-trust-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 13px 28px;
          color: rgba(255,255,255,0.80);
          font-size: 12.5px;
          font-weight: 500;
          border-right: 1px solid rgba(255,255,255,0.10);
          white-space: nowrap;
          
        }
        .bz-trust-item:last-child { border-right: none; }
        .bz-trust-icon { font-size: 16px; }
        @media (max-width: 640px) { .bz-trust-strip { flex-wrap: wrap; } .bz-trust-item { border: none; padding: 10px 20px; } }

        /* ── TOOLBAR ── */
        .bz-toolbar {
          padding: 24px 40px 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
          
        }
        @media (max-width: 600px) { .bz-toolbar { padding: 20px 20px 0; } }

        /* SEARCH BAR */
        .bz-search-bar {
          display: flex;
          align-items: center;
          background: var(--card);
          border: 1.5px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(60,30,5,0.06);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .bz-search-bar:focus-within {
          border-color: #fdd5bc;
          box-shadow: 0 2px 16px rgba(194,68,14,0.12);
        }
        .bz-search-ico { padding: 0 14px; color: var(--muted); display: flex; align-items: center; }
        .bz-search-input {
          flex: 1;
          padding: 14px 8px 14px 0;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px;
          color: var(--text);
          background: transparent;
          caret-color: var(--acc);
        }
        .bz-search-input::placeholder { color: #c4b8ac; }
        .bz-search-btn {
          margin: 6px;
          padding: 0 22px;
          height: 42px;
          background: linear-gradient(135deg, var(--acc), var(--acc2));
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          white-space: nowrap;
          transition: opacity 0.2s, transform 0.15s;
        }
        .bz-search-btn:hover { opacity: 0.90; transform: scale(0.98); }

        /* CONTROLS ROW */
        .bz-controls-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        .bz-genre-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .bz-genre-pill {
          padding: 7px 16px;
          border-radius: 99px;
          font-size: 13px;
          font-weight: 600;
          border: 1.5px solid var(--border);
          background: var(--card);  
          color: var(--muted);
          cursor: pointer;
          transition: all 0.18s;
        }
        .bz-genre-pill:hover { border-color: #fdd5bc; color: var(--acc); background: #fff3ed; }
        .bz-genre-pill.active { background: var(--acc); color: #fff; border-color: var(--acc); box-shadow: 0 3px 12px rgba(194,68,14,0.28); }

        .bz-sort-select {
          padding: 9px 36px 9px 14px;
          border-radius: 10px;
          border: 1.5px solid var(--border);
          background: var(--card);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
          cursor: pointer;
          outline: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239c8878' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          transition: border-color 0.2s;
        }
        .bz-sort-select:focus { border-color: #fdd5bc; }

        /* ── SECTION HEADER ── */
        .bz-books-header {
          padding: 28px 40px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        @media (max-width: 600px) { .bz-books-header { padding: 20px 20px 8px; } }

        .bz-books-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }
        .bz-books-count {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--muted);
          background: var(--card);
          border: 1.5px solid var(--border);
          padding: 5px 14px;
          border-radius: 99px;
        }
        .bz-count-dot { width: 7px; height: 7px; background: var(--acc); border-radius: 99px; }

        /* ── GRID ── */
        .bz-books-grid-wrap { padding: 16px 40px 48px; }
        @media (max-width: 600px) { .bz-books-grid-wrap { padding: 12px 20px 40px; } }

        .bz-books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          margin: 30px 0; 
        }
        .hero   

        /* ── EMPTY STATE ── */
        .bz-empty {
          text-align: center;
          padding: 80px 24px;
          color: var(--muted);
        }
        .bz-empty-icon { font-size: 52px; margin-bottom: 16px; }
        .bz-empty-title { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--text); margin: 0 0 8px; }
        .bz-empty-sub { font-size: 14px; margin: 0; }

        /* ── SHOW ALL BUTTON ── */
        .bz-show-all-wrap { display: flex; justify-content: center; padding-bottom: 48px; }
        .bz-show-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 36px;
          border-radius: 12px;
          border: 1.5px solid var(--border);
          background: var(--card);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.15s;
          box-shadow: 0 2px 10px rgba(60,30,5,0.06);
        }
        .bz-show-all-btn:hover { background: #fff3ed; border-color: #fdd5bc; color: var(--acc); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(194,68,14,0.14); }
      `}</style>

      <div className="bz-books-page">
        {/* ── HERO ── */}
        <div className="bz-bks-hero">
          <div className="bz-bks-hero-left">
            <div className="bz-bks-hero-tag">📚 Reading Fest 2025</div>
            <h1 className="bz-bks-hero-title">
              Books That
              <br />
              <em>Change Lives</em>
            </h1>
            <p className="bz-bks-hero-disc">Up to 25% Off</p>
            <p className="bz-bks-hero-sub">
              Explore our handpicked collection of bestsellers,
              <br />
              memoirs, and must-reads.
            </p>
            <button
              className="bz-bks-hero-cta"
              onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })}
            >
              Browse Books →
            </button>
          </div>
          <div className="bz-bks-hero-img">
            <img
              src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
              alt="Books"
            />
          </div>
        </div>

        {/* ── TRUST STRIP ── */}
        <div className="bz-trust-strip">
          {[
            { icon: "🚚", text: "Free Delivery over ₹499" },
            { icon: "✅", text: "100% Authentic Books" },
            { icon: "↩️", text: "7-Day Easy Returns" },
            { icon: "💳", text: "Secure Payments" },
          ].map(({ icon, text }) => (
            <div className="bz-trust-item" key={text}>
              <span className="bz-trust-icon">{icon}</span>
              {text}
            </div>
          ))}
        </div>

        {/* ── TOOLBAR ── */}
        <div className="bz-toolbar">
          {/* SEARCH */}
          <div className="bz-search-bar">
            <span className="bz-search-ico">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              className="bz-search-input"
              type="text"
              placeholder="Search by title, author, or genre…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bz-search-btn">Search</button>
          </div>

          {/* GENRE + SORT */}
          <div className="bz-controls-row">
            <div className="bz-genre-pills">
              {GENRES.map((g) => (
                <button
                  key={g}
                  className={`bz-genre-pill${genre === g ? " active" : ""}`}
                  onClick={() => setGenre(g)}
                >
                  {g}
                </button>
              ))}
            </div>
            <select
              className="bz-sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── SECTION HEADER ── */}
        <div className="bz-books-header">
          <h2 className="bz-books-title">Trending Now</h2>
          <span className="bz-books-count">
            <span className="bz-count-dot" />
            {filtered.length} book{filtered.length !== 1 ? "s" : ""} found
          </span>
        </div>

        {/* ── GRID ── */}
        <div className="bz-books-grid-wrap">
          {filtered.length === 0 ? (
            <div className="bz-empty">
              <div className="bz-empty-icon">📭</div>
              <p className="bz-empty-title">No books found</p>
              <p className="bz-empty-sub">
                Try a different search term or clear your filters.
              </p>
            </div>
          ) : (
            <div className="bz-books-grid">
              {displayed.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>

        {/* ── SHOW ALL / LESS ── */}
        {filtered.length > 6 && (
          <div className="bz-show-all-wrap">
            <button
              className="bz-show-all-btn"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? "↑ Show Less" : `Show All ${filtered.length} Books →`}
            </button>
          </div>
        )}
      </div>
      
    </>
  );
}
