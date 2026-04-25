const CART_KEY = "bz_cart";

/* ✅ Get cart */
export function getCart() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

/* ✅ Add to cart */
export function addToCart(book) {
  const cart = getCart();

  const existing = cart.find((item) => item.id === book.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...book, qty: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
}

/* ✅ Remove item */
export function removeFromCart(id) {
  const cart = getCart().filter((item) => item.id !== id);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
}

/* ✅ Update quantity */
export function updateQty(id, qty) {
  let cart = getCart();

  if (qty < 1) {
    cart = cart.filter((item) => item.id !== id);
  } else {
    const item = cart.find((item) => item.id === id);
    if (item) item.qty = qty;
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
}

/* ✅ Clear cart */
export function clearCart() {
  localStorage.removeItem(CART_KEY);
}