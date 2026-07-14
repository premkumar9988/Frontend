"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";




const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    price: 499,
    oldPrice: 699,
    image: "/images/image1.png",
    rating: 4.8,
    reviews: 2841,
    badge: "Bestseller",
    genre: "Self-Help",
  },
  {
    id: 2,
    title: "Ikigai",
    author: "Héctor García",
    price: 299,
    oldPrice: 499,
    image: "/images/image2.png",
    rating: 4.6,
    reviews: 1523,
    badge: "Popular",
    genre: "Philosophy",
  },
  {
    id: 3,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: 399,
    oldPrice: 599,
    image: "/images/image3.png",
    rating: 4.7,
    reviews: 3210,
    badge: "Classic",
    genre: "Finance",
  },
  {
    id: 4,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 349,
    oldPrice: 549,
    image: "/images/image4.png",
    rating: 4.9,
    reviews: 4102,
    badge: "Top Rated",
    genre: "Fiction",
  },
  {
    id: 5,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: 279,
    oldPrice: 399,
    image: "/images/image5.png",
    rating: 4.5,
    reviews: 987,
    badge: null,
    genre: "Finance",
  },
  {
    id: 6,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 459,
    oldPrice: 699,
    image: "/images/image6.png",
    rating: 4.8,
    reviews: 2204,
    badge: "New",
    genre: "Finance",
  },
  {
    id: 7,
    title: "Deep Work",
    author: "Cal Newport",
    price: 379,
    oldPrice: 599,
    image: "/images/image7.png",
    rating: 4.6,
    reviews: 1340,
    badge: null,
    genre: "Self-Help",
  },
  {
    id: 8,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 499,
    oldPrice: 799,
    image: "/images/image8.png",
    rating: 4.7,
    reviews: 5671,
    badge: "Must Read",
    genre: "History",
  },
];

const badgeConfig = {
  Bestseller: {
    bg: "#fff3ed",
    color: "#c2440e",
    border: "#fdd5bc",
    dot: "#c2440e",
  },
  Popular: {
    bg: "#fef9ee",
    color: "#b45309",
    border: "#fde68a",
    dot: "#b45309",
  },
  Classic: {
    bg: "#f0fdf4",
    color: "#15803d",
    border: "#bbf7d0",
    dot: "#15803d",
  },
  "Top Rated": {
    bg: "#fdf4ff",
    color: "#7e22ce",
    border: "#e9d5ff",
    dot: "#7e22ce",
  },
  New: { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe", dot: "#1d4ed8" },
  "Must Read": {
    bg: "#fff1f2",
    color: "#be123c",
    border: "#fecdd3",
    dot: "#be123c",
  },
};

function StarRating({ rating }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((s) => {
        const filled = rating >= s;
        const half = !filled && rating >= s - 0.5;
        return (
          <svg key={s} width="11" height="11" viewBox="0 0 24 24">
            {half ? (
              <>
                <defs>
                  <linearGradient id={`h${s}`}>
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="#d1d5db" />
                  </linearGradient>
                </defs>
                <path
                  fill={`url(#h${s})`}
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </>
            ) : (
              <path
                fill={filled ? "#f59e0b" : "#e2e8f0"}
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            )}
          </svg>
        );
      })}
    </span>
  );
}


function BookCard({ book, featured = false }) {
  // ✅ FIX: Declare addItem from cart context and router inside BookCard
  const { addItem } = useCart();
  const router = useRouter();
  const { user } = useAuth();

  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const discount = Math.round(
    ((book.oldPrice - book.price) / book.oldPrice) * 100,
  );
  const badge = badgeConfig[book.badge];

  // ✅ FIX: Add to cart then navigate to /cart
  const handleAdd = (e) => {
    e.stopPropagation();
    addItem({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      router.push("/cart");
    }, 800);
  };

  // ✅ FIX: Buy Now → /signin?redirect=/payment
 const handleBuyNow = (e) => {
  e.stopPropagation();

  // ✅ Add selected book to cart
  addItem({
    id: book.id,
    title: book.title,
    author: book.author,
    price: book.price,
    image: book.image,
  });

  // ✅ Redirect properly
  if (!user) {
    router.push("/auth/login?redirect=/checkout");
  } else {
    router.push("/checkout");
  }
};
  if (featured) {
    return (
      <div className="bz-card-featured">
        <div className="bz-cf-img">
          <img src={book.image} alt={book.title} loading="lazy" />
          <span className="bz-cf-disc">{discount}% OFF</span>
        </div>
        <div className="bz-cf-body">
          {badge && (
            <span
              className="bz-cf-badge"
              style={{
                background: badge.bg,
                color: badge.color,
                borderColor: badge.border,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: badge.dot,
                  display: "inline-block",
                  marginRight: 5,
                }}
              />
              {book.badge}
            </span>
          )}
          <p className="bz-cf-genre">{book.genre}</p>
          <h3 className="bz-cf-title">{book.title}</h3>
          <p className="bz-cf-author">by {book.author}</p>
          <div className="bz-cf-rating">
            <StarRating rating={book.rating} />
            <span className="bz-cf-rnum">{book.rating}</span>
            <span className="bz-cf-rev">
              ({book.reviews.toLocaleString()} reviews)
            </span>
          </div>
          <div className="bz-cf-price-row">
            <span className="bz-cf-price">₹{book.price}</span>
            <span className="bz-cf-old">₹{book.oldPrice}</span>
            <span className="bz-cf-save">
              Save ₹{book.oldPrice - book.price}
            </span>
          </div>
          <div className="bz-cf-actions">
            {/* ✅ Add to Cart → goes to /cart */}
            <button
              className={`bz-cf-btn${added ? " added" : ""}`}
              onClick={handleAdd}
            >
              {added ? "✓ Added!" : "Add to Cart"}
            </button>
            {/* ✅ Buy Now → /signin?redirect=/payment */}
            <button className="bz-cf-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button
              className={`bz-cf-wish${wishlisted ? " active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setWishlisted((v) => !v);
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={wishlisted ? "#c2440e" : "none"}
                stroke="#c2440e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bz-card">
      <div className="bz-img-wrap">
        <img src={book.image} alt={book.title} loading="lazy" />
        <div className="bz-card-hover-overlay">
          {/* ✅ Quick Add → goes to /cart */}
          <button
            className={`bz-quick-add${added ? " added" : ""}`}
            onClick={handleAdd}
          >
            {added ? "✓ Added!" : "+ Quick Add"}
          </button>
        </div>
        <span className="bz-disc-pill">{discount}%</span>
        {badge && (
          <span
            className="bz-badge-pill"
            style={{
              background: badge.bg,
              color: badge.color,
              borderColor: badge.border,
            }}
          >
            {book.badge}
          </span>
        )}
        <button
          className={`bz-wish-btn${wishlisted ? " active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setWishlisted((v) => !v);
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill={wishlisted ? "#c2440e" : "none"}
            stroke="#c2440e"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="bz-card-body">
        <span className="bz-genre-tag">{book.genre}</span>
        <p className="bz-title">{book.title}</p>
        <p className="bz-author">by {book.author}</p>
        <div className="bz-rating-row">
          <StarRating rating={book.rating} />
          <span className="bz-rnum">{book.rating}</span>
          <span className="bz-rcount">({book.reviews.toLocaleString()})</span>
        </div>
        <div className="bz-price-row">
          <span className="bz-price">₹{book.price}</span>
          <span className="bz-old-price">₹{book.oldPrice}</span>
          <span className="bz-save-tag">{discount}% off</span>
        </div>
        <div className="flex gap-3 mt-3">
          {/* ✅ Buy Now → /signin?redirect=/payment */}
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-yellow-500 text-black py-2 text-sm rounded-lg hover:bg-yellow-800 transition font-medium"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Bestseller", "New", "Top Rated", "Classic"];

  const filtered = books.filter(
    (b) => activeFilter === "All" || b.badge === activeFilter,
  );
  const [featuredBook, ...restBooks] = filtered;

  const router = useRouter();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
 .home-page *{box-sizing:border-box;}
.home-page h1,.home-page h2,.home-page h3,
.home-page p,.home-page ul,.home-page li{margin:0;padding:0;}
        body { font-family: 'DM Sans', sans-serif; }
        .bz-page { background: #fdf8f4; min-height: 100vh; }

        /* ══ HERO — CSS GRID LAYOUT ══ */
        .bz-hero {
          grid-area: hero;
          background: url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1800&auto=format&fit=crop&q=80');
          background-size: cover;
          box-shadow: 0 4px 15px ;
          background-position: center;
          position: relative;
          overflow: hidden;
          min-height: 500px;
          cursor: pointer;
          transition: transform 0.15s;

          display: grid;
          grid-template-areas: "content stats";
          grid-template-columns: 2fr 1fr;
          align-items: center;

          background-image: url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1800&auto=format&fit=crop&q=80');
          background-size: cover;
          background-position: center 40%;
          background-attachment: fixed;
        }

        .bz-hero-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 45%, rgba(5,2,1,0.55) 100%);
          z-index: 2; pointer-events: none;
          grid-area: 1 / 1 / 2 / 3;
        }
        .bz-hero-noise {
          position: absolute; inset: 0; opacity: .03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          z-index: 2; pointer-events: none;
          grid-area: 1 / 1 / 2 / 3;
        }

        .bz-hero-content {
          grid-area: content;
          position: relative; z-index: 3;
          padding: 88px 0 88px 56px;
          max-width: 600px;
        }

        .bz-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.10); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.18); color: #fdd5bc;
          font-size: 11px; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; padding: 6px 16px;
          border-radius: 99px; margin-bottom: 22px;
        }
        .bz-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(38px, 4.8vw, 62px); font-weight: 800; color: #fff;
          line-height: 1.08; margin: 0 0 18px;
          text-shadow: 0 3px 28px rgba(0,0,0,0.50);
        }
        .bz-hero-title span { color: #f9a46a; }
        .bz-hero-sub {
          font-size: 15.5px; color: rgba(255,255,255,0.68);
          margin: 0 0 36px; line-height: 1.7; max-width: 420px;
        }
        .bz-hero-cta-row { display: flex; gap: 14px; flex-wrap: wrap; }
        .bz-hero-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #c2440e, #e8622a); color: #fff;
          font-size: 14px; font-weight: 700; padding: 14px 30px;
          border-radius: 12px; text-decoration: none; border: none; cursor: pointer;
          transition: transform .18s, box-shadow .18s;
          box-shadow: 0 6px 24px rgba(194,68,14,0.50);
        }
        .bz-hero-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(194,68,14,0.60); }
        .bz-hero-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.10); backdrop-filter: blur(8px);
          color: rgba(255,255,255,0.90); font-size: 14px; font-weight: 600;
          padding: 14px 26px; border-radius: 12px;
          border: 1.5px solid rgba(255,255,255,0.28);
          cursor: pointer; text-decoration: none; transition: background .18s, transform .18s;
        }
        .bz-hero-btn-ghost:hover { background: rgba(255,255,255,0.18); transform: translateY(-2px); }

        .bz-hero-stats {
          grid-area: stats;
          position: relative; z-index: 3;
          display: flex; flex-direction: column; gap: 16px;
          padding: 88px 48px 88px 24px;
          align-self: stretch;
          justify-content: center;
          background: rgba(0,0,0,0.18);
          backdrop-filter: blur(4px);
          border-left: 1px solid rgba(255,255,255,0.07);
        }

        .bz-stat-card {
          background: rgba(255,255,255,0.09);
          border: 1px solid rgba(255,255,255,0.13);
          border-radius: 16px; padding: 24px 28px;
          backdrop-filter: blur(20px);
          text-align: center;
          transition: background .2s, transform .2s, box-shadow .2s;
          cursor: default;
        }
        .bz-stat-card:hover {
          background: rgba(255,255,255,0.15);
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.20);
        }
        .bz-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 34px; font-weight: 800; color: #fff;
          line-height: 1; margin-bottom: 7px;
        }
        .bz-stat-num span { color: #f9a46a; }
        .bz-stat-label {
          font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.50);
          letter-spacing: .10em; text-transform: uppercase;
        }

        .bz-scroll-hint {
          position: absolute; bottom: 20px; left: 33%; transform: translateX(-50%);
          z-index: 4; display: flex; flex-direction: column; align-items: center; gap: 5px;
          color: rgba(255,255,255,0.32); font-size: 10px; letter-spacing: .10em;
          text-transform: uppercase; animation: bzBounce 2.2s ease-in-out infinite; cursor: pointer;
          grid-area: 1 / 1 / 2 / 3;
        }
        @keyframes bzBounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(7px)} }

        @media(max-width:800px){
          .bz-hero {
            grid-template-areas: "content" "stats";
            grid-template-columns: 1fr;
            background-attachment: scroll;
          }
          .bz-hero-content { padding: 60px 28px 28px; max-width:100%; }
          .bz-hero-stats {
            flex-direction: row; padding: 20px 28px 52px;
            background: none; border-left: none;
            border-top: 1px solid rgba(255,255,255,0.08);
          }
          .bz-stat-card { flex: 1; padding: 16px 10px; }
          .bz-stat-num { font-size: 24px; }
          .bz-scroll-hint { left: 50%; }
        }

        .bz-section { padding: 64px 48px; }
        @media(max-width:640px){ .bz-section { padding: 40px 20px; } }

        .bz-section-header { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:10px; gap:16px; flex-wrap:wrap; }
        .bz-section-kicker { display:inline-flex; align-items:center; gap:7px; font-size:11px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:#c2440e; background:#fff3ed; border:1px solid #fdd5bc; padding:4px 12px; border-radius:99px; margin-bottom:10px; }
        .bz-section-title { font-family:'Playfair Display',serif; font-size:clamp(26px,3vw,34px); font-weight:800; color:#1a1410; margin:0 0 5px; line-height:1.15; }
        .bz-section-sub { font-size:14px; color:#9c8878; margin:0; }
        .bz-view-all { display:inline-flex; align-items:center; gap:6px; color:#c2440e; font-size:13px; font-weight:700; text-decoration:none; padding:10px 20px; border:1.5px solid #fdd5bc; border-radius:10px; background:#fff; transition:background .2s,transform .15s; white-space:nowrap; cursor:pointer; }
        .bz-view-all:hover { background:#fff3ed; transform:translateX(3px); }

        .bz-filter-bar { display:flex; align-items:center; gap:0; border-bottom:2px solid #f0ebe3; margin-bottom:32px; margin-top:6px; overflow-x:auto; }
        .bz-filter-tab { padding:12px 20px; font-size:13.5px; font-weight:600; color:#9c8878; background:transparent; border:none; border-bottom:2.5px solid transparent; margin-bottom:-2px; cursor:pointer; white-space:nowrap; transition:color .18s,border-color .18s; }
        .bz-filter-tab:hover { color:#c2440e; }
        .bz-filter-tab.active { color:#c2440e; border-bottom-color:#c2440e; font-weight:700; }

        .bz-results-bar { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; gap:12px; }
        .bz-results-count { font-size:13px; color:#9c8878; font-weight:500; }
        .bz-results-count strong { color:#1a1410; }
        .bz-sort-select { padding:8px 32px 8px 12px; border-radius:8px; border:1.5px solid #f0ebe3; background:#fff; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600; color:#1a1410; cursor:pointer; outline:none; appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%239c8878' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 10px center; }

        .bz-featured-row { margin-bottom: 32px; }
        .bz-card-featured { display:flex; gap:0; background:#fff; border-radius:20px; border:1.5px solid #f0ebe3; overflow:hidden; transition:box-shadow .25s,transform .25s; box-shadow:0 4px 24px rgba(60,30,5,.07); }
        .bz-card-featured:hover { box-shadow:0 20px 60px rgba(60,30,5,.13); transform:translateY(-3px); }
        .bz-cf-img { position:relative; flex-shrink:0; width:260px; background:linear-gradient(160deg,#fdf8f4,#fef3eb); display:flex; align-items:center; justify-content:center; overflow:hidden; }
        .bz-cf-img img { width:100%; height:100%; object-fit:contain; padding:28px; transition:transform .4s; }
        .bz-card-featured:hover .bz-cf-img img { transform:scale(1.05); }
        .bz-cf-disc { position:absolute; top:14px; left:14px; background:linear-gradient(135deg,#c2440e,#e8622a); color:#fff; font-size:11px; font-weight:800; padding:4px 10px; border-radius:8px; box-shadow:0 3px 10px rgba(194,68,14,.35); letter-spacing:.04em; }
        .bz-cf-body { flex:1; padding:36px 40px; display:flex; flex-direction:column; justify-content:center; gap:10px; }
        .bz-cf-badge { display:inline-flex; align-items:center; font-size:10.5px; font-weight:700; padding:3px 10px; border-radius:6px; border-width:1px; border-style:solid; width:fit-content; letter-spacing:.04em; }
        .bz-cf-genre { font-size:11px; font-weight:700; color:#c2440e; letter-spacing:.10em; text-transform:uppercase; margin:0; }
        .bz-cf-title { font-family:'Playfair Display',serif; font-size:28px; font-weight:800; color:#1a1410; margin:0; line-height:1.2; }
        .bz-cf-author { font-size:13px; color:#9c8878; margin:0; font-weight:500; }
        .bz-cf-rating { display:flex; align-items:center; gap:6px; }
        .bz-cf-rnum { font-size:13px; font-weight:700; color:#b45309; }
        .bz-cf-rev { font-size:12px; color:#bbb0a4; }
        .bz-cf-price-row { display:flex; align-items:baseline; gap:10px; flex-wrap:wrap; }
        .bz-cf-price { font-size:30px; font-weight:800; color:#c2440e; }
        .bz-cf-old { font-size:15px; color:#c4b8ac; text-decoration:line-through; }
        .bz-cf-save { font-size:12px; font-weight:700; color:#15803d; background:#f0fdf4; border:1px solid #bbf7d0; padding:2px 8px; border-radius:6px; }
        .bz-cf-actions { display:flex; gap:10px; align-items:center; margin-top:4px; }
        .bz-cf-btn { padding:13px 30px; border-radius:10px; font-size:14px; font-weight:700; border:none; cursor:pointer; background:linear-gradient(135deg,#c2440e,#e8622a); color:#fff; box-shadow:0 4px 16px rgba(194,68,14,.28); transition:opacity .2s,transform .15s; }
        .bz-cf-btn:hover { opacity:.90; transform:translateY(-1px); }
        .bz-cf-btn.added { background:linear-gradient(135deg,#15803d,#16a34a); }
        .bz-cf-wish { width:44px; height:44px; border-radius:10px; border:1.5px solid #f0ebe3; background:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:border-color .2s,background .2s; }
        .bz-cf-wish:hover,.bz-cf-wish.active { border-color:#fdd5bc; background:#fff3ed; }
        @media(max-width:700px){ .bz-card-featured{flex-direction:column} .bz-cf-img{width:100%;height:200px} .bz-cf-body{padding:20px} .bz-cf-title{font-size:20px} }

        .bz-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:22px; }
        .bz-card { background:#fff; border-radius:18px; border:1.5px solid #f0ebe3; overflow:hidden; display:flex; flex-direction:column; transition:box-shadow .25s,transform .25s,border-color .25s; cursor:pointer; position:relative; }
        .bz-card:hover { box-shadow:0 20px 56px -8px rgba(60,30,5,.16); transform:translateY(-5px); border-color:#fdd5bc; }
        .bz-img-wrap { position:relative; height:230px; background:linear-gradient(160deg,#fdf8f4,#fef3eb); display:flex; align-items:center; justify-content:center; overflow:hidden; }
        .bz-img-wrap img { height:100%; width:100%; object-fit:contain; padding:20px; transition:transform .35s; }
        .bz-card:hover .bz-img-wrap img { transform:scale(1.06); }
        .bz-card-hover-overlay { position:absolute; inset:0; background:rgba(26,20,16,.55); display:flex; align-items:flex-end; justify-content:center; padding-bottom:18px; opacity:0; transition:opacity .25s; }
        .bz-card:hover .bz-card-hover-overlay { opacity:1; }
        .bz-quick-add { padding:9px 22px; border-radius:8px; font-size:13px; font-weight:700; border:none; cursor:pointer; background:#fff; color:#c2440e; box-shadow:0 4px 14px rgba(0,0,0,.18); transition:transform .15s; }
        .bz-quick-add:hover { transform:scale(1.04); }
        .bz-quick-add.added { background:#c2440e; color:#fff; }
        .bz-disc-pill { position:absolute; top:10px; left:10px; background:linear-gradient(135deg,#c2440e,#e8622a); color:#fff; font-size:10.5px; font-weight:800; padding:3px 9px; border-radius:7px; letter-spacing:.03em; box-shadow:0 2px 8px rgba(194,68,14,.32); }
        .bz-badge-pill { position:absolute; top:10px; right:10px; font-size:9.5px; font-weight:700; padding:3px 8px; border-radius:6px; letter-spacing:.04em; border-width:1px; border-style:solid; }
        .bz-wish-btn { position:absolute; top:48px; right:10px; width:28px; height:28px; border-radius:8px; background:#fff; border:1.5px solid #f0ebe3; display:flex; align-items:center; justify-content:center; cursor:pointer; opacity:0; transform:translateY(4px); transition:opacity .2s,transform .2s,border-color .2s; }
        .bz-card:hover .bz-wish-btn { opacity:1; transform:translateY(0); }
        .bz-wish-btn:hover,.bz-wish-btn.active { border-color:#fdd5bc; background:#fff3ed; }
        .bz-card-body { padding:16px 18px 18px; display:flex; flex-direction:column; gap:5px; flex:1; }
        .bz-genre-tag { font-size:10px; font-weight:700; letter-spacing:.10em; text-transform:uppercase; color:#c2440e; opacity:.75; }
        .bz-title { font-family:'Playfair Display',serif; font-size:14.5px; font-weight:700; color:#1a1410; line-height:1.35; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; margin:0; }
        .bz-author { font-size:11.5px; color:#9c8878; font-weight:500; }
        .bz-rating-row { display:flex; align-items:center; gap:5px; margin-top:2px; }
        .bz-rnum { font-size:11.5px; font-weight:700; color:#b45309; }
        .bz-rcount { font-size:10.5px; color:#c4b8ac; }
        .bz-price-row { display:flex; align-items:center; gap:7px; margin-top:4px; flex-wrap:wrap; }
        .bz-price { font-size:18px; font-weight:800; color:#c2440e; }
        .bz-old-price { font-size:12px; color:#c4b8ac; text-decoration:line-through; font-weight:500; }
        .bz-save-tag { font-size:10px; font-weight:700; color:#15803d; background:#f0fdf4; border:1px solid #bbf7d0; padding:1px 7px; border-radius:5px; }
        .bz-add-btn { margin-top:10px; width:100%; padding:11px 0; border-radius:10px; font-size:13px; font-weight:700; border:none; cursor:pointer; background:linear-gradient(135deg,#c2440e,#e8622a); color:#fff; box-shadow:0 4px 14px rgba(194,68,14,.22); transition:opacity .2s,transform .15s,box-shadow .2s; }
        .bz-add-btn:hover { opacity:.91; transform:translateY(-1px); box-shadow:0 7px 20px rgba(194,68,14,.32); }
        .bz-add-btn.added { background:linear-gradient(135deg,#15803d,#16a34a); box-shadow:0 4px 14px rgba(21,128,61,.25); }

        .bz-empty { text-align:center; padding:80px 24px; color:#9c8878; }
        .bz-empty-icon { font-size:52px; margin-bottom:16px; }
        .bz-empty-title { font-family:'Playfair Display',serif; font-size:22px; color:#1a1410; margin:0 0 8px; }
        .bz-empty-sub { font-size:14px; margin:0; }

        .bz-promo-section { padding: 0 48px 64px; }
        @media(max-width:640px){ .bz-promo-section { padding: 0 20px 48px; } }
        .bz-promo { border-radius:22px; background:linear-gradient(135deg,#1a1410 0%,#3d1a06 55%,#c2440e 100%); padding:48px 56px; display:flex; align-items:center; justify-content:space-between; gap:28px; flex-wrap:wrap; position:relative; overflow:hidden; box-shadow:0 16px 48px rgba(194,68,14,.22); }
        @media(max-width:600px){ .bz-promo { padding:32px 28px; } }
        .bz-promo::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 80% 50%,rgba(232,98,42,.28) 0%,transparent 65%); pointer-events:none; }
        .bz-promo::after { content:'📚'; position:absolute; right:56px; top:50%; transform:translateY(-50%); font-size:100px; opacity:.09; pointer-events:none; }
        .bz-promo-left { position:relative; z-index:1; }
        .bz-promo-eyebrow { display:inline-block; font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:#f9a46a; margin-bottom:10px; background:rgba(249,164,106,.12); border:1px solid rgba(249,164,106,.25); padding:3px 10px; border-radius:99px; }
        .bz-promo-title { font-family:'Playfair Display',serif; font-size:clamp(20px,3vw,28px); color:#fff; font-weight:800; margin:0 0 8px; }
        .bz-promo-sub { font-size:14px; color:rgba(255,255,255,.62); margin:0; line-height:1.6; }
        .bz-promo-code { display:inline-block; font-family:monospace; background:rgba(255,255,255,.12); border:1.5px dashed rgba(255,255,255,.30); color:#fdd5bc; padding:2px 10px; border-radius:6px; font-size:14px; font-weight:700; letter-spacing:.08em; margin:0 2px; }
        .bz-promo-btn { position:relative; z-index:1; background:#e8622a; color:#fff; font-size:14px; font-weight:700; padding:14px 32px; border-radius:12px; border:none; cursor:pointer; white-space:nowrap; flex-shrink:0; transition:background .2s,transform .15s,box-shadow .2s; box-shadow:0 6px 20px rgba(232,98,42,.40); }
        .bz-promo-btn:hover { background:#fff; color:#c2440e; transform:translateY(-2px); }
      `}</style>

      <div className="bz-page">
        {/* ══ HERO ══ */}
        <div className="bz-hero">
          <div className="bz-hero-vignette" />
          <div className="bz-hero-noise" />

          <div className="bz-hero-content">
            <div className="bz-hero-eyebrow">
              <span>⭐</span> 2026 Bestsellers Collection
            </div>
            <h1 className="bz-hero-title">
              Discover Your
              <br />
              <span>Next Great</span> Read
            </h1>
            <p className="bz-hero-sub">
              Handpicked bestsellers, timeless classics, and new arrivals — all
              at unbeatable prices.
            </p>
            <div className="bz-hero-cta-row">
              <Link href="/books" className="bz-hero-btn-primary">
                Explore Books →
              </Link>
              <Link href="/orders" className="bz-hero-btn-ghost">
                My Orders
              </Link>
            </div>
          </div>

          <div className="bz-hero-stats">
            {[
              { num: "10K", suffix: "+", label: "Books Available" },
              { num: "50K", suffix: "+", label: "Happy Readers" },
              { num: "4.8", suffix: "★", label: "Average Rating" },
            ].map(({ num, suffix, label }) => (
              <div className="bz-stat-card" key={label}>
                <div className="bz-stat-num">
                  {num}
                  <span>{suffix}</span>
                </div>
                <div className="bz-stat-label">{label}</div>
              </div>
            ))}
          </div>

          <div
            className="bz-scroll-hint"
            onClick={() => window.scrollTo({ top: 520, behavior: "smooth" })}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            Scroll
          </div>
        </div>

        {/* ══ FEATURED BOOKS ══ */}
        <div className="bz-section">
          <div className="bz-section-header">
            <div>
              <div className="bz-section-kicker">✦ Handpicked for You</div>
              <h2 className="bz-section-title">Featured Books</h2>
              <p className="bz-section-sub">
                Curated picks to fuel your next chapter
              </p>
            </div>
            <Link href="/books" className="bz-view-all">
              View All →
            </Link>
          </div>

          <div className="bz-filter-bar">
            {filters.map((f) => (
              <button
                key={f}
                className={`bz-filter-tab${activeFilter === f ? " active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="bz-results-bar">
            <span className="bz-results-count">
              Showing <strong>{filtered.length}</strong> book
              {filtered.length !== 1 ? "s" : ""}
            </span>
            <select className="bz-sort-select" defaultValue="featured">
              <option value="featured">Featured</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="bz-empty">
              <div className="bz-empty-icon">📭</div>
              <p className="bz-empty-title">No books found</p>
              <p className="bz-empty-sub">Try a different filter.</p>
            </div>
          ) : (
            <>
              {featuredBook && (
                <div className="bz-featured-row">
                  <BookCard book={featuredBook} featured />
                </div>
              )}
              {restBooks.length > 0 && (
                <div className="bz-grid">
                  {restBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* ══ PROMO BANNER ══ */}
        <div className="bz-promo-section">
          <div className="bz-promo">
            <div className="bz-promo-left">
              <div className="bz-promo-eyebrow">Limited Time Offer</div>
              <p className="bz-promo-title">Get ₹100 Off Your First Order</p>
              <p className="bz-promo-sub">
                Use code <span className="bz-promo-code">BOOKSHOP100</span> at
                checkout.
              </p>
            </div>
            <button
              className="bz-promo-btn"
              onClick={() => router.push("/books")}
            >
              Shop Now →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}