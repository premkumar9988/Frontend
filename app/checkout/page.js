'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '@/context/CartContext';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const STEPS = ['Cart', 'Address', 'Payment', 'Confirmation'];
const CURRENT_STEP = 1;

const ALL_ADDRESSES = [
  { id: 0, name: 'Arun Kumar', line1: '42, Gandhi Nagar, 3rd Cross Street', city: 'Coimbatore', state: 'Tamil Nadu', pin: '641001', phone: '9876543210', tag: 'Home' },
  { id: 1, name: 'Arun Kumar', line1: '12, Tech Park, Saravanampatti', city: 'Coimbatore', state: 'Tamil Nadu', pin: '641035', phone: '9876543210', tag: 'Office' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items: contextItems } = useCart();


  const [cart, setCart] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");

  useEffect(() => {
    if (contextItems && contextItems.length > 0) {
      const mapped = contextItems.map(item => ({
        id: item.id,
        title: item.title,
        author: item.author,
        price: item.price,
        qty: item.quantity,
        cover: item.image,
      }));
      setCart(mapped);
    } else {  
      try {
        const stored = localStorage.getItem('cart');
        if (stored) {
          const parsed = JSON.parse(stored);
          const mapped = parsed.map(item => ({
            id: item.id,
            title: item.title,
            author: item.author,
            price: item.price,
            qty: item.quantity ?? item.qty ?? 1,
            cover: item.image ?? item.cover,
          }));
          setCart(mapped);
        }
      } catch (e) {
        console.error('Failed to load cart from localStorage', e);
      }
    }
  }, [contextItems]);

  const subtotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount  = Math.round(subtotal * 0.1);
  const shipping  = subtotal - discount > 499 ? 0 : 50;
  const total     = subtotal - discount + shipping;
  const totalQty  = cart.reduce((n, i) => n + i.qty, 0);

  const updateQty = (id, delta) =>
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
          .filter(i => i.qty > 0)
    );

  const removeItem = id => setCart(prev => prev.filter(i => i.id !== id));

const saveOrder = async (trackingNumber) => {
  try {
   const res = await fetch("/api/orders", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    items: cart.map(item => ({
      id: item.id,
      title: item.title,
      author: item.author,
      price: item.price,
      qty: item.qty,
      image: item.cover || item.image || item.thumbnail || "https://via.placeholder.com/80x100?text=Book",
    })),
    total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    trackingNumber: "TRK" + Date.now(),
    status: "processing",
  }),
});

    const data = await res.json();
    if (!data.success) throw new Error("Failed");
  } catch (err) {
    console.error(err);
  }
};



const handlePayment = async () => {
  if (cart.length === 0) return;

  setLoading(true);

  try {
    const trackingNumber = "TRK" + Date.now();

  
    await saveOrder(trackingNumber);

    localStorage.setItem("trackingNumber", trackingNumber);

    const res = await fetch('/api/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: total }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }

};
  return (
    <div style={p.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');
       .checkout-page *{box-sizing:border-box;}
  .checkout-page h1,.checkout-page h2,.checkout-page h3,
  .checkout-page p,.checkout-page ul,.checkout-page li{margin:0;padding:0;}
        body{font-family:'DM Sans',sans-serif;background:#f9fafb;}
        .qty-btn:hover{border-color:#f97316!important;color:#f97316!important;}
        .cta-btn:hover{transform:translateY(-1px);box-shadow:0 6px 22px rgba(249,115,22,0.42)!important;}
        .addr-card:hover{box-shadow:0 2px 12px rgba(0,0,0,0.07);}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
      `}</style>

      {/*  HEADER*/}
      <header style={p.header}>
        <div style={p.headerInner}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <rect width="30" height="30" rx="8" fill="#f97316"/>
              <rect x="7" y="8" width="10" height="14" rx="2" fill="white"/>
              <rect x="13" y="8" width="10" height="14" rx="2" fill="rgba(255,255,255,0.5)"/>
            </svg>
            <span style={p.logoText}>checkout</span> 
          </div>
          <div style={p.secureBadge}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" style={{marginRight:5}}>
              <path d="M7 1L1.5 3.2v3.8c0 3.2 2.2 5.6 5.5 6.5 3.3-.9 5.5-3.3 5.5-6.5V3.2L7 1z" fill="#22c55e"/>
              <path d="M4.5 7l2 2 3-3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ color:'#16a34a', fontSize:12, fontWeight:600 }}>SSL Secure Checkout</span>
          </div>
        </div>
      </header>

      {/*  PROGRESS STEPS*/}
      <div style={p.progressWrap}>
        <div style={p.progressBar}>
          {STEPS.map((label, i) => (
            <div key={label} style={{ display:'flex', alignItems:'center', flex:1 }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
                <div style={{
                  width:36, height:36, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                  background: i < CURRENT_STEP ? '#f97316' : i === CURRENT_STEP ? '#fff' : '#f3f4f6',
                  border: i === CURRENT_STEP ? '2.5px solid #f97316' : i < CURRENT_STEP ? 'none' : '2px solid #d1d5db',
                  color: i < CURRENT_STEP ? '#fff' : i === CURRENT_STEP ? '#f97316' : '#9ca3af',
                }}>
                  {i < CURRENT_STEP
                    ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3.5 3.5 5-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : <span style={{ fontSize:12, fontWeight:700 }}>{i+1}</span>}
                </div>
                <span style={{ fontSize:11, fontWeight: i===CURRENT_STEP ? 700 : 500, color: i===CURRENT_STEP ? '#f97316' : i<CURRENT_STEP ? '#374151' : '#9ca3af' }}>{label}</span>
              </div>
              {i < STEPS.length-1 && (
                <div style={{ flex:1, height:3, borderRadius:2, margin:'0 6px', marginBottom:22, background: i < CURRENT_STEP ? '#f97316' : '#e5e7eb', transition:'background 0.3s' }}/>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN GRID  */}
      <div style={p.grid}>

        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>

          {/* ORDER SUMMARY */}
          <div style={p.card}>
            <div style={p.cardHead}>
              <h2 style={p.cardTitle}>Order Summary</h2>
              <span style={p.itemBadge}>{cart.length} {cart.length===1?'item':'items'}</span>
            </div>

            {cart.length === 0
              ? <p style={{ color:'#9ca3af', fontSize:14, textAlign:'center', padding:'20px 0' }}>Your cart is empty.</p>
              : <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {cart.map(item => (
                    <div key={item.id} style={p.bookRow}>

                      {/* Cover image */}
                      <div style={p.coverBox}>
                        <img
                          src={item.cover}
                          alt={item.title}
                          style={p.coverImg}
                          onError={e => { e.target.style.display='none'; e.target.parentNode.style.background='#e5e7eb'; }}
                        />
                      </div>

                      {/* Details */}
                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={p.bookTitle}>{item.title}</p>
                        <p style={p.bookAuthor}>by {item.author}</p>
                        <p style={p.unitPrice}>₹{item.price.toLocaleString('en-IN')} per copy</p>
                        <div style={p.qtyRow}>
                          <button className="qty-btn" style={p.qtyBtn} onClick={() => updateQty(item.id, -1)}>−</button>
                          <span style={p.qtyNum}>{item.qty}</span>
                          <button className="qty-btn" style={p.qtyBtn} onClick={() => updateQty(item.id, +1)}>+</button>
                          <button style={p.removeBtn} onClick={() => removeItem(item.id)}>Remove</button>
                        </div>
                      </div>

                      {/* Item total */}
                      <div style={p.itemTotalBox}>
                        <span style={p.itemTotalAmt}>₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                        <span style={p.itemTotalSub}>{item.qty} × ₹{item.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))}
                </div>
            }
          </div>

          {/* SHIPPING ADDRESS */}
          <div style={p.card}>
            <div style={p.cardHead}>
              <h2 style={p.cardTitle}>Shipping Address</h2>
              <button style={p.changeBtn} onClick={() => setShowModal(true)}>Change</button>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
              {ALL_ADDRESSES.map(addr => (
                <div key={addr.id} className="addr-card"
                  style={{ ...p.addrCard, border: selectedAddress===addr.id ? '2px solid #f97316' : '1.5px solid #e5e7eb', background: selectedAddress===addr.id ? '#fff7ed' : '#fff' }}
                  onClick={() => setSelectedAddress(addr.id)}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:7 }}>
                    <span style={p.addrTag}>{addr.tag}</span>
                    <span style={p.addrName}>{addr.name}</span>
                    {selectedAddress===addr.id && <span style={{ color:'#f97316', fontSize:13, fontWeight:800, marginLeft:'auto' }}>✓</span>}
                  </div>
                  <p style={p.addrLine}>{addr.line1}</p>
                  <p style={p.addrLine}>{addr.city}, {addr.state} – {addr.pin}</p>
                  <p style={{ ...p.addrLine, marginTop:6, color:'#9ca3af' }}>📞 {addr.phone}</p>
                </div>
              ))}
            </div>

            <button style={p.addAddrBtn}>＋  Add New Address</button>
          </div>
        </div>

        {/*  Price Details */}
        <div>
          <div style={{ ...p.card, position:'sticky', top:84 }}>
            <h2 style={{ ...p.cardTitle, marginBottom:20 }}>Price Details</h2>

            <div style={{ display:'flex', flexDirection:'column', gap:13, marginBottom:16 }}>
              <div style={p.priceRow}>
                <span style={p.priceLabel}>Price ({totalQty} {totalQty===1?'item':'items'})</span>
                <span style={p.priceVal}>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={p.priceRow}>
                <span style={p.priceLabel}>Discount (10%)</span>
                <span style={{ ...p.priceVal, color:'#16a34a' }}>− ₹{discount.toLocaleString('en-IN')}</span>
              </div>
              <div style={p.priceRow}>
                <span style={p.priceLabel}>Delivery Charges</span>
                {shipping === 0
                  ? <span style={{ ...p.priceVal, color:'#16a34a', fontWeight:700 }}>FREE</span>
                  : <span style={p.priceVal}>₹{shipping}</span>}
              </div>
            </div>

            {shipping === 0 && (
              <div style={p.freeBadge}>🎉 Free delivery on orders above ₹449!</div>
            )}

            <div style={{ height:1, background:'#f3f4f6', margin:'4px 0 18px' }}/>

            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:8 }}>
              <span style={{ fontSize:16, fontWeight:700 }}>Total Amount</span>
              <span style={{ fontSize:26, fontWeight:800, color:'#f97316', letterSpacing:'-0.03em' }}>₹{total.toLocaleString('en-IN')}</span>
            </div>

            <div style={p.savingsPill}>
              You save ₹{(discount + (shipping===0 ? 50 : 0)).toLocaleString('en-IN')} on this order 🎊
            </div>
  <button
              className="cta-btn"
              style={{ ...p.ctaBtn, opacity: cart.length === 0 || loading ? 0.6 : 1, cursor: cart.length === 0 || loading ? 'not-allowed' : 'pointer' }}
              onClick={handlePayment}
              disabled={cart.length === 0 || loading}
            >
              {loading ? 'Redirecting to Payment…' : 'Continue to Payment →'}
            </button>

            <div style={{ display:'flex', gap:6, justifyContent:'center', flexWrap:'wrap' }}>
              {['🔒 Secure Payment','✅ 100% Authentic','↩️ Easy Returns'].map(t => (
                <span key={t} style={{ fontSize:11, fontWeight:600, color:'#6b7280', background:'#f9fafb', border:'1px solid #f3f4f6', borderRadius:20, padding:'4px 9px' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ADDRESS MODAL */}
      {showModal && (
        <div style={p.overlay} onClick={() => setShowModal(false)}>
          <div style={p.modal} onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
              <h3 style={{ fontSize:17, fontWeight:700 }}>Select Delivery Address</h3>
              <button style={p.closeBtn} onClick={() => setShowModal(false)}>✕</button>
            </div>
            {ALL_ADDRESSES.map(addr => (
              <div key={addr.id} className="addr-card"
                style={{ ...p.addrCard, marginBottom:12, cursor:'pointer', border: selectedAddress===addr.id ? '2px solid #f97316' : '1.5px solid #e5e7eb', background: selectedAddress===addr.id ? '#fff7ed' : '#fff' }}
                onClick={() => { setSelectedAddress(addr.id); setShowModal(false); }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                  <span style={p.addrTag}>{addr.tag}</span>
                  <span style={p.addrName}>{addr.name}</span>
                  {selectedAddress===addr.id && <span style={{ color:'#f97316', fontWeight:800, marginLeft:'auto' }}>✓ Selected</span>}
                </div>
                <p style={p.addrLine}>{addr.line1}</p>
                <p style={p.addrLine}>{addr.city}, {addr.state} – {addr.pin}</p>
              </div>
            ))}
            <button className="cta-btn" style={p.ctaBtn} onClick={() => setShowModal(false)}>Confirm Address</button>
          </div>
        </div>
      )}
    </div>
  );
}
 

/*  STYLES  */
const p = {
  page:        { minHeight:'100vh', background:'#f9fafb', fontFamily:"'DM Sans',sans-serif", color:'#111827',overflowX:'hidden'  },
  header:      { background:'#fff', borderBottom:'1px solid #e5e7eb', position:'sticky', top:0, zIndex:50, boxShadow:'0 1px 5px rgba(0,0,0,0.05)' },
  headerInner: { maxWidth:1160, margin:'0 auto', padding:'14px 24px', display:'flex', alignItems:'center', justifyContent:'space-between' },
  logoText:    { fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:'#111827', letterSpacing:'-0.02em' },
  secureBadge: { display:'flex', alignItems:'center', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:20, padding:'5px 12px' },

  progressWrap: { background:'#fff', borderBottom:'1px solid #f3f4f6', padding:'20px 24px' },
  progressBar:  { maxWidth:560, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between' },

  grid: { maxWidth:1160, margin:'30px auto', padding:'0 24px', display:'grid', gridTemplateColumns:'1fr 340px', gap:24, alignItems:'start' },

  card:      { background:'#fff', borderRadius:16, border:'1px solid #e5e7eb', padding:'24px 26px', boxShadow:'0 1px 5px rgba(0,0,0,0.04)' },
  cardHead:  { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 },
  cardTitle: { fontSize:17, fontWeight:700, color:'#111827', letterSpacing:'-0.01em' },
  itemBadge: { background:'#fff7ed', color:'#f97316', border:'1px solid #fed7aa', borderRadius:20, padding:'3px 11px', fontSize:12, fontWeight:700 },

  bookRow:    { display:'flex', gap:14, padding:14, background:'#fafafa', borderRadius:12, border:'1px solid #f3f4f6', alignItems:'flex-start' },
  coverBox:   { width:68, height:92, borderRadius:8, overflow:'hidden', background:'#e5e7eb', flexShrink:0, border:'1px solid #e5e7eb' },
  coverImg:   { width:'100%', height:'100%', objectFit:'cover', display:'block' },
  bookTitle:  { fontSize:15, fontWeight:700, color:'#111827', marginBottom:3, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' },
  bookAuthor: { fontSize:12, color:'#6b7280', marginBottom:5 },
  unitPrice:  { fontSize:12, color:'#9ca3af', marginBottom:10 },
  qtyRow:     { display:'flex', alignItems:'center', gap:8 },
  qtyBtn:     { width:28, height:28, borderRadius:7, border:'1.5px solid #e5e7eb', background:'#fff', fontSize:16, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#374151', padding:0, lineHeight:1, transition:'border-color 0.2s,color 0.2s' },
  qtyNum:     { width:26, textAlign:'center', fontSize:14, fontWeight:700, color:'#111827' },
  removeBtn:  { background:'none', border:'none', color:'#ef4444', fontSize:12, fontWeight:600, cursor:'pointer', marginLeft:4, padding:'3px 6px', borderRadius:5 },
  itemTotalBox:{ flexShrink:0, textAlign:'right', display:'flex', flexDirection:'column', alignItems:'flex-end', justifyContent:'center', gap:4, minWidth:76 },
  itemTotalAmt:{ fontSize:16, fontWeight:800, color:'#111827' },
  itemTotalSub:{ fontSize:11, color:'#9ca3af' },

  addrCard:  { borderRadius:12, padding:'14px 16px', cursor:'pointer', transition:'all 0.2s' },
  addrTag:   { background:'#fff7ed', color:'#f97316', border:'1px solid #fed7aa', borderRadius:5, padding:'2px 7px', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.04em' },
  addrName:  { fontSize:13, fontWeight:700, color:'#111827', flex:1 },
  addrLine:  { fontSize:12, color:'#6b7280', lineHeight:1.55 },
  changeBtn: { background:'none', border:'1.5px solid #f97316', color:'#f97316', borderRadius:8, padding:'5px 14px', fontSize:12, fontWeight:700, cursor:'pointer' },
  addAddrBtn:{ width:'100%', background:'none', border:'2px dashed #e5e7eb', color:'#9ca3af', borderRadius:10, padding:'11px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" },

  priceRow:   { display:'flex', justifyContent:'space-between', alignItems:'center' },
  priceLabel: { fontSize:14, color:'#6b7280' },
  priceVal:   { fontSize:14, fontWeight:600, color:'#111827' },
  freeBadge:  { background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, padding:'8px 12px', fontSize:12, fontWeight:600, color:'#16a34a', textAlign:'center', marginBottom:14 },
  savingsPill:{ fontSize:12, color:'#16a34a', fontWeight:600, textAlign:'center', background:'#f0fdf4', borderRadius:8, padding:'8px', marginBottom:20 },

  ctaBtn: { width:'100%', background:'linear-gradient(135deg,#f97316,#ea580c)', color:'#fff', border:'none', borderRadius:13, padding:'15px', fontSize:16, fontWeight:800, cursor:'pointer', letterSpacing:'0.01em', marginBottom:16, boxShadow:'0 4px 16px rgba(249,115,22,0.32)', fontFamily:"'DM Sans',sans-serif", transition:'transform 0.15s,box-shadow 0.15s', display:'block' },

  overlay: { position:'fixed', inset:0, background:'rgba(0,0,0,0.42)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:999, padding:24 },
  modal:   { background:'#fff', borderRadius:20, padding:28, width:'100%', maxWidth:440, boxShadow:'0 20px 60px rgba(0,0,0,0.16)' },
  closeBtn:{ background:'#f3f4f6', border:'none', borderRadius:8, width:32, height:32, cursor:'pointer', fontSize:14, color:'#374151', fontWeight:700 },
};
