// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { getCart, clearCart } from "@/utils/cart";
// import { getUser, isLoggedIn } from "@/utils/auth";

// /* ───────────── CONSTANTS ───────────── */

// const STEPS = ["Delivery", "Payment", "Review"];

// const PROMO_CODES = {
//   READ20: 0.2,
//   BOOK10: 0.1,
//   FREE99: 0.05,
// };

// /* ───────────── COMPONENT ───────────── */

// export default function CheckoutPage() {
//   const router = useRouter();

//   const [mounted, setMounted] = useState(false);
//   const [cart, setCart] = useState([]);
//   const [user, setUser] = useState(null);
//   const [step, setStep] = useState(0);
//   const [placing, setPlacing] = useState(false);
//   const [placed, setPlaced] = useState(false);
//   const [promo, setPromo] = useState(null);

//   const [delivery, setDelivery] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     pincode: "",
//     state: "",
//   });

//   const [payment, setPayment] = useState({
//     method: "card",
//     cardNumber: "",
//     expiry: "",
//     cvv: "",
//     upiId: "",
//   });

//   /* ───────────── AUTH CHECK ───────────── */

//   useEffect(() => {
//     if (!isLoggedIn()) {
//       router.push("/auth/login?redirect=/checkout");
//       return;
//     }

//     const u = getUser();
//     setUser(u);

//     setDelivery((prev) => ({
//       ...prev,
//       name: u?.name || "",
//       email: u?.email || "",
//     }));

//     setCart(getCart());
//     setMounted(true);
//   }, [router]);

//   if (!mounted) return null;

//   /* ───────────── CALCULATIONS ───────────── */

//   const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

//   const discount = promo
//     ? Math.round(subtotal * PROMO_CODES[promo])
//     : Math.round(subtotal * 0.05);

//   const delivery_fee = subtotal >= 499 ? 0 : 49;

//   const total = subtotal + delivery_fee - discount;

//   /* ───────────── HANDLERS ───────────── */

//   const handleDeliveryChange = (e) =>
//     setDelivery((p) => ({ ...p, [e.target.name]: e.target.value }));

//   const handlePaymentChange = (e) =>
//     setPayment((p) => ({ ...p, [e.target.name]: e.target.value }));

//   const handleNext = () => setStep((s) => Math.min(s + 1, 2));
//   const handleBack = () => setStep((s) => Math.max(s - 1, 0));

//   const applyPromo = (code) => {
//     if (PROMO_CODES[code]) {
//       setPromo(code);
//       alert("Promo applied!");
//     } else {
//       alert("Invalid promo");
//     }
//   };

//   const handlePlaceOrder = async () => {
//     setPlacing(true);

//     await new Promise((r) => setTimeout(r, 2000));

//     clearCart();
//     setPlaced(true);
//     setPlacing(false);
//   };

//   /* ───────────── SUCCESS PAGE ───────────── */

//   if (placed) {
//     return (
//       <div className="text-center py-20">
//         <h1 className="text-3xl font-bold">🎉 Order Placed!</h1>
//         <p className="mt-3">Thanks {delivery.name}</p>

//         <Link href="/books">
//           <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded">
//             Continue Shopping
//           </button>
//         </Link>
//       </div>
//     );
//   }

//   /* ───────────── UI ───────────── */

//   return (
//     <div className="p-6 max-w-6xl mx-auto">

//       <h1 className="text-2xl font-bold mb-6">Checkout</h1>

//       {/* STEPS */}
//       <div className="flex gap-4 mb-6">
//         {STEPS.map((s, i) => (
//           <div key={i} className={i === step ? "font-bold" : ""}>
//             {s}
//           </div>
//         ))}
//       </div>

//       {/* STEP 1 */}
//       {step === 0 && (
//         <div>
//           <h2 className="text-xl mb-4">Delivery</h2>

//           <input name="name" placeholder="Name" value={delivery.name} onChange={handleDeliveryChange} />
//           <input name="email" placeholder="Email" value={delivery.email} onChange={handleDeliveryChange} />
//           <input name="phone" placeholder="Phone" value={delivery.phone} onChange={handleDeliveryChange} />

//           <button onClick={handleNext}>Next</button>
//         </div>
//       )}

//       {/* STEP 2 */}
//       {step === 1 && (
//         <div>
//           <h2>Payment</h2>

//           <select name="method" value={payment.method} onChange={handlePaymentChange}>
//             <option value="card">Card</option>
//             <option value="upi">UPI</option>
//             <option value="cod">COD</option>
//           </select>

//           <button onClick={handleBack}>Back</button>
//           <button onClick={handleNext}>Next</button>
//         </div>
//       )}

//       {/* STEP 3 */}
//       {step === 2 && (
//         <div>
//           <h2>Review</h2>

//           {cart.map((item) => (
//             <div key={item.id}>
//               {item.title} × {item.qty}
//             </div>
//           ))}

//           <p>Total: ₹{total}</p>

//           <button onClick={() => applyPromo("READ20")}>Apply Promo</button>

//           <button onClick={handleBack}>Back</button>

//           <button onClick={handlePlaceOrder} disabled={placing}>
//             {placing ? "Processing..." : "Place Order"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }