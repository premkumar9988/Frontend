"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // ✅ ADD ITEM (with quantity logic)
  const addItem = (book) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === book.id);

      if (existing) {
        return prev.map((i) =>
          i.id === book.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...book, quantity: 1 }];
    });
  };

  // ❌ REMOVE ITEM
  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // ➕➖ UPDATE QUANTITY
  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }

    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: qty } : i
      )
    );
  };

  // 🧹 CLEAR CART
  const clearCart = () => setItems([]);

  // 📊 TOTALS
  const totalItems = items.reduce((a, i) => a + i.quantity, 0);
  const totalPrice = items.reduce(
    (a, i) => a + i.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        cartItems: items,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);