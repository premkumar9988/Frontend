import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { BooksProvider } from "@/context/BooksContext";

import Navbar from "@/components/Navbar";
import ConditionalFooter from "@/components/ConditionalFooter";

import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Premium Bookstore",
  description: "Modern Online Bookstore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="min-h-screen flex flex-col bg-black text-white"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {/* ✅ Global Providers */}
        <BooksProvider>
          <AuthProvider>
            <CartProvider>

              {/* ✅ Navbar */}
              <Navbar />

              {/* ✅ Main Content */}
              <main className="flex-1 overflow-x-hidden">
                {children}
              </main>

              {/* ✅ Footer */}
              <ConditionalFooter />

              {/* ✅ Toast Notifications */}
              <Toaster position="top-right" />

            </CartProvider>
          </AuthProvider>
        </BooksProvider>

      </body>
    </html>
  );
}