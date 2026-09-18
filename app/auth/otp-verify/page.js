"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import "@/styles/auth.css";
import AuthButton from "@/components/AuthButton";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 30;

function OtpVerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "your email";
  const context = searchParams.get("context") || "register";

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleDigitChange = (i, e) => {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    setError("");

    if (val && i < OTP_LENGTH - 1) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace") {
      const next = [...digits];
      if (next[i]) {
        next[i] = "";
      } else if (i > 0) {
        inputRefs.current[i - 1]?.focus();
        next[i - 1] = "";
      }
      setDigits(next);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    const next = Array(OTP_LENGTH).fill("");
    text.split("").forEach((ch, i) => (next[i] = ch));
    setDigits(next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const code = digits.join("");

    if (code.length < OTP_LENGTH) {
      setError("Enter all 6 digits");
      return;
    }

    setLoading(true);

    await new Promise((r) => setTimeout(r, 1200));

    if (code === "000000") {
      setError("Invalid OTP");
      setLoading(false);
      return;
    }

    setLoading(false);
    setVerified(true);

    setTimeout(() => {
      if (context === "reset") {
        router.push(`/auth/reset-password?email=${email}`);
      } else {
        router.push("/");
      }
    }, 1200);
  };

  const handleResend = async () => {
    if (!canResend) return;

    setCountdown(RESEND_COOLDOWN);
    setCanResend(false);
    setDigits(Array(OTP_LENGTH).fill(""));
    setError("");

    await new Promise((r) => setTimeout(r, 500));
  };

  const allFilled = digits.every((d) => d !== "");

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link href="/" className="auth-logo">
          <span>Verify OTP</span>
        </Link>

        {!verified ? (
          <>
            <h1 className="auth-heading">Enter OTP</h1>

            <p>Sent to: {email}</p>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="otp-row" onPaste={handlePaste}>
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    value={d}
                    maxLength={1}
                    onChange={(e) => handleDigitChange(i, e)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="otp-box"
                  />
                ))}
              </div>

              <AuthButton loading={loading} disabled={!allFilled}>
                Verify
              </AuthButton>
            </form>

            <button onClick={handleResend} disabled={!canResend}>
              {canResend ? "Resend" : `Wait ${countdown}s`}
            </button>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h2>Verified</h2>
            <p>Redirecting...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OtpVerifyPage() {
  return (
    <Suspense fallback={<div className="auth-page" />}>
      <OtpVerifyForm />
    </Suspense>
  );
}