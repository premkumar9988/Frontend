'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

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

  const handleCheckout = () => {
    if (!user) {
      router.push("/auth/login?redirect=/checkout");
    } else {
      localStorage.setItem("cart", JSON.stringify(items));
      router.push("/checkout");
    }
  };

return (
  <div className="min-h-screen bg-gray-100 p-6 overflow-x-hidden"> {/* ← ADD overflow-x-hidden */}
    <div className="max-w-6xl mx-auto">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">
        🛒 Shopping Cart ({totalItems})
      </h1>

        {/* EMPTY CART */}
        {isEmpty && (
          <div className="text-center py-20">
            <h2 className="text-xl mb-4">Your cart is empty</h2>
            <Link href="/books">
              <button className="bg-orange-500 text-white px-6 py-2 rounded">
                Browse Books
              </button>
            </Link>
          </div>
        )}

        {/* CART GRID */}
        {!isEmpty && (
          <div className="grid md:grid-cols-3 gap-6">
            {/* LEFT - ITEMS */}
            <div className="md:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow flex gap-4"
                >
                  {/* IMAGE */}
                  <div className="relative w-24 h-32 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="text-gray-500 text-sm">{item.author}</p>
                    <p className="text-orange-600 font-bold mt-2">
                      ₹{item.price}
                    </p>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-semibold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* ITEM TOTAL + REMOVE */}
                  <div className="flex flex-col items-end justify-between">
                    <span className="font-bold text-lg">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT - SUMMARY */}
            <div className="bg-white p-6 rounded-lg shadow h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Items ({totalItems})</span>
                <span>₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Discount (10%)</span>
                <span className="text-green-600">
                  − ₹{Math.round(totalPrice * 0.1).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-orange-500">
                  ₹{(totalPrice - Math.round(totalPrice * 0.1)).toLocaleString("en-IN")}
                </span>
              </div>

              {/* CHECKOUT BUTTON */}
              <button
                onClick={handleCheckout}
                className="w-full mt-4 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 font-semibold transition"
              >
                Proceed to Checkout →
              </button>

              {/* CLEAR CART */}
              <button
                onClick={clearCart}
                className="w-full mt-2 text-red-500 text-sm hover:text-red-700 py-2"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}