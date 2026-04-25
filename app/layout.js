import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { BooksProvider } from "@/context/BooksContext";
import  Footer from "@/components/Footer";

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
        <BooksProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />

              <main className="flex-1">{children}</main>

              <Footer />

              <Toaster position="top-right" />
            </CartProvider>
          </AuthProvider>
        </BooksProvider>
      </body>
    </html>
  );
}
