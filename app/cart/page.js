'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function CartPage() {
  const { user } = useAuth();
  const router = useRouter();

  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const isEmpty = items.length === 0;
  const discount = Math.round(totalPrice * 0.1);
  const finalTotal = totalPrice - discount;

  const handleCheckout = () => {
    if (!user) {
      router.push('/auth/login?redirect=/checkout');
    } else {
      localStorage.setItem('cart', JSON.stringify(items));
      router.push('/checkout');
    }
  };

  return (
    <div style={s.page}>

      {/* PAGE HEADER */}
      <div style={s.headerRow}>
        <span style={s.cartIcon}>🛒</span>
        <h1 style={s.pageTitle}>Shopping Cart ({totalItems})</h1>
      </div>

      {/* EMPTY STATE */}
      {isEmpty && (
        <div style={s.emptyBox}>
          <p style={s.emptyText}>Your cart is empty</p>
          <Link href="/books">
            <button style={s.browseBtn}>Browse Books</button>
          </Link>
        </div>
      )}

      {/* CART CONTENT */}
      {!isEmpty && (
        <div style={s.grid}>

          {/* LEFT — ITEM CARDS */}
          <div style={s.itemsCol}>
            {items.map((item) => (
              <div key={item.id} style={s.itemCard}>

                {/* Book Cover */}
                <div style={s.coverWrap}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover', borderRadius: 10 }}
                  />
                </div>

                {/* Book Info */}
                <div style={s.infoCol}>
                  <p style={s.itemTitle}>{item.title}</p>
                  <p style={s.itemAuthor}>{item.author}</p>
                  <p style={s.itemPrice}>₹{item.price.toLocaleString('en-IN')}</p>

                  {/* Qty Controls */}
                  <div style={s.qtyRow}>
                    <button
                      style={s.qtyBtn}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
                      onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
                    >
                      −
                    </button>
                    <span style={s.qtyNum}>{item.quantity}</span>
                    <button
                      style={s.qtyBtn}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
                      onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Right — Total + Remove */}
                <div style={s.rightCol}>
                  <span style={s.itemTotal}>
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                  <button
                    style={s.removeBtn}
                    onClick={() => removeItem(item.id)}
                    onMouseEnter={e => e.currentTarget.style.color = '#b91c1c'}
                    onMouseLeave={e => e.currentTarget.style.color = '#ef4444'}
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* RIGHT — ORDER SUMMARY */}
          <div style={s.summaryCard}>
            <h2 style={s.summaryTitle}>Order Summary</h2>

            <div style={s.summaryRows}>
              <div style={s.summaryRow}>
                <span style={s.summaryLabel}>Items ({totalItems})</span>
                <span style={s.summaryVal}>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div style={s.summaryRow}>
                <span style={s.summaryLabel}>Discount (10%)</span>
                <span style={{ ...s.summaryVal, color: '#16a34a' }}>
                  − ₹{discount.toLocaleString('en-IN')}
                </span>
              </div>
              <div style={s.summaryRow}>
                <span style={s.summaryLabel}>Shipping</span>
                <span style={{ ...s.summaryVal, color: '#16a34a', fontWeight: 700 }}>Free</span>
              </div>
            </div>

            <div style={s.divider} />

            <div style={s.totalRow}>
              <span style={s.totalLabel}>Total</span>
              <span style={s.totalAmt}>₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>

            <button
              style={s.checkoutBtn}
              onClick={handleCheckout}
              onMouseEnter={e => e.currentTarget.style.background = '#ea580c'}
              onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(135deg,#f97316,#ea580c)'}
            >
              Proceed to Checkout →
            </button>

            <button
              style={s.clearBtn}
              onClick={clearCart}
              onMouseEnter={e => e.currentTarget.style.color = '#b91c1c'}
              onMouseLeave={e => e.currentTarget.style.color = '#ef4444'}
            >
              Clear Cart
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

/* ── STYLES ── */
const s = {
  page: {
    minHeight: '100vh',
    background: '#f3f4f6',
    padding: '40px 24px 80px',
    fontFamily: "'DM Sans', sans-serif",
    boxSizing: 'border-box',
  },

  headerRow: {
    maxWidth: 1160,
    margin: '0 auto 28px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  cartIcon: { fontSize: 28, opacity: 0.55 },
  pageTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: '#6b7280',
    letterSpacing: '-0.02em',
  },

  emptyBox: {
    textAlign: 'center',
    padding: '80px 20px',
  },
  emptyText: { fontSize: 18, color: '#6b7280', marginBottom: 20 },
  browseBtn: {
    background: '#f97316',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    padding: '12px 28px',
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
  },

  grid: {
    maxWidth: 1160,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 320px',
    gap: 24,
    alignItems: 'start',
  },

  itemsCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },

  itemCard: {
    background: '#fff',
    borderRadius: 16,
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
    padding: '20px 24px',
    display: 'flex',
    gap: 20,
    alignItems: 'flex-start',
  },

  coverWrap: {
    position: 'relative',
    width: 80,
    height: 110,
    flexShrink: 0,
    borderRadius: 10,
    overflow: 'hidden',
    background: '#e5e7eb',
  },

  infoCol: {
    flex: 1,
    minWidth: 0,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 4,
  },
  itemAuthor: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: 700,
    color: '#f97316',
    marginBottom: 14,
  },

  qtyRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    border: '1.5px solid #e5e7eb',
    background: '#f3f4f6',
    fontSize: 18,
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#374151',
    padding: 0,
    lineHeight: 1,
    transition: 'background 0.15s',
  },
  qtyNum: {
    width: 28,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 700,
    color: '#111827',
  },

  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minWidth: 80,
    height: 110,
  },
  itemTotal: {
    fontSize: 17,
    fontWeight: 800,
    color: '#111827',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    padding: 0,
    transition: 'color 0.15s',
  },

  /* Summary Card */
  summaryCard: {
    background: '#fff',
    borderRadius: 16,
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
    padding: '24px 26px',
    position: 'sticky',
    top: 84,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 20,
    letterSpacing: '-0.01em',
  },
  summaryRows: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 16,
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: { fontSize: 14, color: '#6b7280' },
  summaryVal:   { fontSize: 14, fontWeight: 600, color: '#111827' },

  divider: {
    height: 1,
    background: '#f3f4f6',
    margin: '4px 0 18px',
  },

  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  totalLabel: { fontSize: 16, fontWeight: 700, color: '#111827' },
  totalAmt:   { fontSize: 24, fontWeight: 800, color: '#f97316', letterSpacing: '-0.02em' },

  checkoutBtn: {
    width: '100%',
    background: 'linear-gradient(135deg,#f97316,#ea580c)',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    padding: '14px',
    fontSize: 15,
    fontWeight: 800,
    cursor: 'pointer',
    letterSpacing: '0.01em',
    marginBottom: 10,
    boxShadow: '0 4px 14px rgba(249,115,22,0.32)',
    fontFamily: 'inherit',
    transition: 'background 0.2s',
  },

  clearBtn: {
    width: '100%',
    background: 'none',
    border: 'none',
    color: '#ef4444',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    padding: '8px 0',
    fontFamily: 'inherit',
    transition: 'color 0.15s',
  },
};