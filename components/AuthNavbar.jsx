"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function AuthNavbar() {
  const { user, logout, loading } = useAuth();

  if (loading) return null;

  return (
    <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
      
      {/* 🔍 Search Icon */}
      <span style={{ cursor: "pointer" }}>🔍</span>

      {/* 🛒 Cart Icon */}
      <span style={{ cursor: "pointer" }}>🛒</span>

      {/* 👤 Auth Section */}
      {user ? (
        <div style={{ position: "relative" }}>
          <div
            onClick={logout}
            style={{
              width: 35,
              height: 35,
              borderRadius: "50%",
              background: "#ff4d00",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            {user.username?.[0]?.toUpperCase() || "U"}
          </div>
        </div>
      ) : (
        <Link href="/login">
          <button
            style={{
              background: "#ff4d00",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: 8,
              cursor: "pointer"
            }}
          >
            Sign in
          </button>
        </Link>
      )}

    </div>
  );
}