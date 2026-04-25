"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderSuccessPage() {
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem("lastOrder")) || [];
    const storedTotal = localStorage.getItem("lastTotal") || 0;

    setOrder(storedOrder);
    setTotal(storedTotal);
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>🎉 Order Confirmed!</h1>
      <p>Your order has been placed successfully.</p>

      <div style={{ marginTop: "20px" }}>
        {order.map(item => (
          <div key={item.id}>
            <p>{item.title} × {item.quantity}</p>
          </div>
        ))}
      </div>

      <h2>Total Paid: ₹{total}</h2>

      <br />

      <Link href="/books">
        <button>Continue Shopping</button>
      </Link>
    </div>
  );
}