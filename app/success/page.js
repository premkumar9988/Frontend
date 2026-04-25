"use client";

import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  const handleTrack = () => {
    const id = localStorage.getItem("trackingNumber");

    router.push(`/order-tracking/${id}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Payment Successful</h1>

      <button onClick={handleTrack}>
        Track Your Order
      </button>
    </div>
  );
}