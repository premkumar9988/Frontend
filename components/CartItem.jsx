"use client";

import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { increaseQty, decreaseQty, removeFromCart } = useCart();

  return (
    <div className="flex justify-between items-center bg-white/10 p-4 rounded mb-4">

      <div>
        <h3>{item.title}</h3>
        <p>₹{item.price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button onClick={() => decreaseQty(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => increaseQty(item.id)}>+</button>
      </div>

      {/* 🔥 REMOVE BUTTON */}
      <button
        onClick={() => removeFromCart(item.id)}
        style={{
          background: "red",
          color: "white",
          padding: "6px 10px",
          borderRadius: "5px"
        }}
      >
        Remove
      </button>

    </div>
  );
}