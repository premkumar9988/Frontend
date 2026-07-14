"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/styles/auth.css";
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";

/* ── Icons ── */
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
  </svg>
);

const LogoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const KeyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="m21 2-9.6 9.6" />
  </svg>
);


export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  /*  Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter valid email");
      return;
    }

    setLoading(true);

    try {
  
      await new Promise((r) => setTimeout(r, 1200));

      setSent(true);

    
      setTimeout(() => {
        router.push(
          `/auth/otp-verify?email=${encodeURIComponent(email)}&context=reset`
        );
      }, 1200);

    } catch {
      setEmailError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Logo */}
        <Link href="/" className="auth-logo">
          <div className="auth-logo-mark"><LogoIcon /></div>
          <span className="auth-logo-text">Forgot Password</span>
        </Link>

        {/* Back */}
        <button
          className="auth-back"
          onClick={() => router.push("/auth/login")}
          type="button"
        >
          ← Back to login
        </button>

        {/* Icon */}
        <div className="auth-icon-circle auth-icon-circle-brand">
          <KeyIcon />
        </div>

        {!sent ? (
          <>
            <h1 className="auth-heading">Forgot password?</h1>

            <p className="auth-subheading">
              Enter your email to receive OTP
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <AuthInput
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                icon={<MailIcon />}
                error={emailError}
              />

              <AuthButton loading={loading}>
                Send OTP
              </AuthButton>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h2> Email Sent</h2>
            <p>Redirecting to OTP verification...</p>
          </div>
        )}

      </div>
    </div>
  );
}