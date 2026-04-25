"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addToCart } from "@/utils/cart";
import { useAuth } from "@/context/AuthContext";

let useCartSafe  = () => ({ addItem: null });
let useToastSafe = () => ({ toast: null });

try {
  const cartMod  = require("@/context/CartContext");
  const toastMod = require("@/hooks/use-toast");
  if (cartMod?.useCart)   useCartSafe  = cartMod.useCart;
  if (toastMod?.useToast) useToastSafe = toastMod.useToast;
} catch (_) { /* context unavailable — that is fine */ }


export default function BookCard({ book }) {
  const router = useRouter();
  const { addItem } = useCartSafe();
  const { toast }   = useToastSafe();
  const [added, setAdded] = useState(false);
  const { user } = useAuth();
 



  const id       = book?.id     || book?.key   || Math.random().toString(36).slice(2);
  const title    = book?.title  || "Unknown Book";
  const author   = book?.author || book?.author_name?.[0] || "Unknown Author";
  const price    = Number(book?.price    || 299);
  const oldPrice = book?.oldPrice ? Number(book.oldPrice) : null;
  const genre    = book?.genre  || book?.subject?.[0]    || null;
  const rating   = Number(book?.rating  || (3.5 + Math.random() * 1.5).toFixed(1));
  const reviews  = book?.reviews || Math.floor(Math.random() * 900 + 50);
  const image    =
    book?.image ||
    (book?.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "/images/placeholder.png");

  // OpenLibrary slugs (/works/OL123W → OL123W), else plain id
  const workId   = book?.key ? book.key.replace("/works/", "") : id;
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const stars    = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));

  /* ── Shared add helper ───────────────────────────────────── */
  const _addItem = () => {
    const item = { id, title, author, price, image, genre };
    if (addItem) addItem(item);   // CartContext path
    else addToCart(item);         // localStorage path
    if (toast) toast({ title: "Added to cart ✓", description: title });
  };

  /* ── Button handlers ─────────────────────────────────────── */
  const handleAddToCart = (e) => {
    e.preventDefault();
    _addItem();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

const handleBuyNow = (e) => {
  e.stopPropagation();

  addItem({
    id: book.id,
    title: book.title,
    author: book.author,
    price: book.price,
    image: book.image,
  });

  if (!user) {
    router.push("/auth/login?redirect=/checkout");
  } else {
    router.push("/checkout");
  }
};

  /* ═══════════════════════ JSX ════════════════════════════ */
  return (
    <>
      <style>{cardStyles}</style>

      <div className="bc-card">

        {/* ── Discount badge ── */}
        {discount > 0 && (
          <span className="bc-discount-badge">-{discount}%</span>
        )}

        {/* ── Cover  (links to detail page) ── */}
        <div
  className="bc-cover-link cursor-pointer"
  onClick={handleAddToCart}
>
          <div className="bc-img-wrap">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
              className="bc-img"
              style={{ objectFit: "cover" }}
            />
            {/* Hover overlay */}
            <div className="bc-img-overlay">
              <span className="bc-quick-view">Quick View</span>
            </div>
          </div>
        </div>

        {/* ── Info ── */}
        <div className="bc-info">

          {genre && <span className="bc-genre">{genre}</span>}

         <div
  className="bc-title-link cursor-pointer"
  onClick={handleAddToCart}
>
            <h3 className="bc-title">{title}</h3>
          </div>

          <p className="bc-author">by {author}</p>

          {/* Star rating */}
          <div className="bc-rating-row">
            <div className="bc-stars-wrap">
              {stars.map((filled, i) => (
                <svg key={i} width="11" height="11" viewBox="0 0 12 12"
                  fill={filled ? "#f59e0b" : "#e5e0d8"}>
                  <path d="M6 1l1.4 2.8 3.1.4-2.2 2.2.5 3.1L6 8.1l-2.8 1.4.5-3.1L1.5 4.2l3.1-.4z"/>
                </svg>
              ))}
            </div>
            <span className="bc-rating-num">{rating}</span>
            <span className="bc-reviews">({Number(reviews).toLocaleString()})</span>
          </div>

          {/* Price row */}
          <div className="bc-price-row">
            <span className="bc-price">
              <span className="bc-rupee">₹</span>
              {price.toLocaleString("en-IN")}
            </span>
            {oldPrice && (
              <span className="bc-old-price">₹{oldPrice.toLocaleString("en-IN")}</span>
            )}
          </div>
        </div>

        {/* ── Action buttons ── */}
        <div className="bc-actions">
          <button
            className={`bc-btn-cart${added ? " bc-btn-added" : ""}`}
            onClick={handleAddToCart}
            disabled={added}
          >
            {added ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="3"
                  strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Add to Cart
              </>
            )}
          </button>

          <button className="bc-btn-buy" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>

      </div>
    </>
  );
}

/* ═══════════════════════ STYLES ═══════════════════════════ */
const cardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');

  /* ── Card shell ── */
  .bc-card {
    position: relative;
    background: #ffffff;
    border: 1.5px solid #f0ebe3;
    border-radius: 18px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 12px rgba(60,30,5,0.06);
    transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
  }
  .bc-card:hover {
    box-shadow: 0 12px 40px rgba(60,30,5,0.14);
    transform: translateY(-4px);
    border-color: #fdd5bc;
  }

  /* ── Discount badge ── */
  .bc-discount-badge {
    position: absolute;
    top: 12px; left: 12px; z-index: 5;
    background: #c2440e; color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 10.5px; font-weight: 800;
    padding: 3px 10px; border-radius: 99px;
    letter-spacing: 0.05em;
    box-shadow: 0 2px 8px rgba(194,68,14,0.30);
  }

  /* ── Cover ── */
  .bc-cover-link { display: block; text-decoration: none; flex-shrink: 0; }

  .bc-img-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 3 / 4;
    background: #fdf3ec;
    overflow: hidden;
  }

  /* next/image transition */
  .bc-img { transition: transform 0.4s ease !important; }
  .bc-card:hover .bc-img { transform: scale(1.05) !important; }

  /* Overlay appears on hover */
  .bc-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(26,20,16,0.62) 0%, transparent 55%);
    display: flex; align-items: flex-end; justify-content: center;
    padding-bottom: 18px;
    opacity: 0;
    transition: opacity 0.28s;
    pointer-events: none;
  }
  .bc-card:hover .bc-img-overlay { opacity: 1; pointer-events: auto; }

  .bc-quick-view {
    padding: 7px 22px;
    border-radius: 99px;
    border: 1.5px solid rgba(255,255,255,0.80);
    background: rgba(255,255,255,0.14);
    backdrop-filter: blur(5px);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.06em;
    cursor: pointer;
    transition: background 0.18s;
    pointer-events: auto;
    white-space: nowrap;
  }
  .bc-quick-view:hover { background: rgba(255,255,255,0.28); }

  /* ── Info block ── */
  .bc-info {
    padding: 13px 16px 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    border-top: 2px solid #f0ebe3;
    transition: border-color 0.25s;
  }
  .bc-card:hover .bc-info { border-top-color: #fdd5bc; }

  /* Genre pill */
  .bc-genre {
    display: inline-block; align-self: flex-start;
    font-family: 'DM Sans', sans-serif;
    font-size: 9.5px; font-weight: 700;
    color: #c2440e; text-transform: uppercase; letter-spacing: 0.09em;
    background: #fff3ed; padding: 2px 9px; border-radius: 99px;
    margin-bottom: 8px;
  }

  /* Title */
  .bc-title-link { text-decoration: none; }
  .bc-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 14.5px; font-weight: 700;
    color: #1a1410; line-height: 1.33;
    margin: 0 0 4px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.18s;
  }
  .bc-title-link:hover .bc-title { color: #c2440e; }

  /* Author */
  .bc-author {
    font-family: 'Playfair Display', serif;
    font-size: 12px; font-weight: 400; font-style: italic;
    color: #9c8878; margin: 0 0 9px;
  }

  /* Rating row */
  .bc-rating-row {
    display: flex; align-items: center; gap: 5px;
    margin-bottom: 9px;
  }
  .bc-stars-wrap { display: flex; gap: 2px; align-items: center; }
  .bc-rating-num { font-size: 12px; font-weight: 700; color: #1a1410; }
  .bc-reviews    { font-size: 11px; color: #9c8878; }

  /* Price */
  .bc-price-row {
    display: flex; align-items: baseline; gap: 8px;
    margin-top: auto;
    padding-top: 9px;
    border-top: 1px solid #f0ebe3;
  }
  .bc-price {
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 700;
    color: #2c1810; letter-spacing: -0.01em;
  }
  .bc-rupee {
    font-size: 13px; font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    vertical-align: super; font-style: normal;
    color: #6b4f3a;
  }
  .bc-old-price {
    font-family: 'DM Sans', sans-serif;
    font-size: 12.5px; color: #9c8878; text-decoration: line-through;
  }

  /* ── Action buttons ── */
  .bc-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 10px 14px 14px;
  }

  .bc-btn-cart {
    display: flex; align-items: center; justify-content: center; gap: 6px;
    padding: 9px 4px;
    border-radius: 10px;
    border: 1.5px solid #f0ebe3;
    background: #ffffff;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 700;
    color: #1a1410;
    cursor: pointer;
    transition: border-color 0.18s, color 0.18s, background 0.18s;
    white-space: nowrap;
  }
  .bc-btn-cart:hover:not(:disabled) {
    border-color: #fdd5bc; color: #c2440e; background: #fff5ef;
  }
  .bc-btn-cart.bc-btn-added {
    border-color: #10b981; color: #059669;
    background: #ecfdf5; cursor: default;
  }

  .bc-btn-buy {
    display: flex; align-items: center; justify-content: center;
    padding: 9px 4px;
    border-radius: 10px; border: none;
    background: #c2440e;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 700;
    color: #fff; cursor: pointer;
    box-shadow: 0 3px 12px rgba(194,68,14,0.26);
    transition: background 0.18s, transform 0.15s, box-shadow 0.18s;
    white-space: nowrap;
  }
  .bc-btn-buy:hover {
    background: #e8622a;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(194,68,14,0.34);
  }
`;