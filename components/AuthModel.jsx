"use client";

import { useState } from "react";
import { login, register } from "@/services/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthModal({ mode = "login" }) {
  const [activeTab, setActiveTab] = useState(mode);
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const res = await login({
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");
      router.push("/");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  const handleRegister = async () => {
    try {
      await register(form);
      toast.success("Account created");
      setActiveTab("login");
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/auth-bg.jpg')",
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* MODAL */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => router.push("/")}
          className="absolute right-4 top-4 text-gray-400 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* TABS */}
        <div className="flex justify-center gap-8 border-b pb-3 mb-6">
          <button
            onClick={() => setActiveTab("login")}
            className={`pb-1 ${
              activeTab === "login"
                ? "border-b-2 border-yellow-500 text-yellow-600 font-semibold"
                : "text-gray-400"
            }`}
          >
            Sign In
          </button>

          <button
            onClick={() => setActiveTab("register")}
            className={`pb-1 ${
              activeTab === "register"
                ? "border-b-2 border-yellow-500 text-yellow-600 font-semibold"
                : "text-gray-400"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* LOGIN FORM */}
        {activeTab === "login" && (
          <>
            <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
            <p className="text-gray-500 mb-6">
              Sign in to access your library
            </p>

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded mb-3 focus:ring-2 focus:ring-yellow-500 outline-none"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-yellow-500 outline-none"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button
              onClick={handleLogin}
              className="w-full bg-yellow-600 text-white py-3 rounded hover:bg-yellow-700 transition"
            >
              Sign In →
            </button>
          </>
        )}

        {/* REGISTER FORM */}
        {activeTab === "register" && (
          <>
            <h2 className="text-2xl font-bold mb-2">Create Account</h2>
            <p className="text-gray-500 mb-6">
              Join the bookstore
            </p>

            <input
              placeholder="Username"
              className="w-full p-3 border rounded mb-3"
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />

            <input
              placeholder="Email"
              className="w-full p-3 border rounded mb-3"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded mb-4"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button
              onClick={handleRegister}
              className="w-full bg-yellow-600 text-white py-3 rounded hover:bg-yellow-700"
            >
              Create Account →
            </button>
          </>
        )}
      </div>
    </div>
  );
}