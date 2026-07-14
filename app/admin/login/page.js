"use client";


import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";

// ─── Inner component uses useSearchParams (must be wrapped in Suspense) ───────
function AdminLoginForm() {
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted]       = useState(false);

  const router       = useRouter();
  const searchParams = useSearchParams();



  // Hydration guard
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (!mounted) return;
    if (localStorage.getItem("admin") === "true") {
      router.replace("/admin/dashboard");
    }
  }, [mounted, router]);

  // Persist redirect param
  useEffect(() => {
    if (!mounted) return;
    const redirect = searchParams.get("redirect");
    if (redirect) {
      localStorage.setItem("redirectAfterLogin", redirect);
    }
  }, [mounted, searchParams]);

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation first (instant, no delay)
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    // Simulated auth delay
    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "123456") {
        localStorage.setItem("admin", "true");
        const redirect = localStorage.getItem("redirectAfterLogin");
        if (redirect) {
          localStorage.removeItem("redirectAfterLogin");
          router.push(redirect);
        } else {
          router.push("/admin/dashboard");
        }
      } else {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      }
    }, 1200);
  };

  if (!mounted) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F4F6FA",
        backgroundImage:
          "radial-gradient(ellipse at 20% 20%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(139,92,246,0.06) 0%, transparent 60%)",
        padding: "48px 16px",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: "440px" }}>

        {/* ── Brand header ─────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              boxShadow: "0 8px 24px rgba(79,70,229,0.35)",
            }}
          >
            <ShieldCheck style={{ width: "26px", height: "26px", color: "#fff" }} />
          </div>

          <h1
            style={{
              fontSize: "26px",
              fontWeight: "700",
              color: "#0F1629",
              letterSpacing: "-0.5px",
              margin: "0 0 6px",
            }}
          >
            Admin Portal
          </h1>
          <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>
            Sign in to manage your bookstore
          </p>
        </div>

        {/* ── Card ─────────────────────────────────────────── */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "20px",
            padding: "36px",
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                  letterSpacing: "0.01em",
                }}
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  fontSize: "14px",
                  border: error && !email ? "1.5px solid #EF4444" : "1.5px solid #E5E7EB",
                  borderRadius: "10px",
                  backgroundColor: "#FAFAFA",
                  color: "#111827",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
                onBlur={(e)  => (e.target.style.borderColor = "#E5E7EB")}
              />
            </div>

            <div style={{ marginBottom: "8px" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                  letterSpacing: "0.01em",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  style={{
                    width: "100%",
                    padding: "11px 44px 11px 14px",
                    fontSize: "14px",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: "10px",
                    backgroundColor: "#FAFAFA",
                    color: "#111827",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
                  onBlur={(e)  => (e.target.style.borderColor = "#E5E7EB")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    color: "#9CA3AF",
                    display: "flex",
                    alignItems: "center",
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword
                    ? <EyeOff style={{ width: "16px", height: "16px" }} />
                    : <Eye    style={{ width: "16px", height: "16px" }} />
                  }
                </button>
              </div>
            </div>

            {/* Error banner */}
            {error && (
              <div
                role="alert"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  margin: "16px 0 0",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 20 20" fill="#EF4444" style={{ flexShrink: 0 }}>
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p style={{ fontSize: "13px", color: "#B91C1C", margin: 0 }}>{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                marginTop: "24px",
                padding: "12px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#fff",
                background: loading
                  ? "#A5B4FC"
                  : "linear-gradient(135deg, #4F46E5 0%, #6D28D9 100%)",
                border: "none",
                borderRadius: "10px",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: loading ? "none" : "0 4px 14px rgba(79,70,229,0.4)",
                transition: "opacity 0.15s, box-shadow 0.15s",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = "0.92"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              {loading ? (
                <>
                  <Loader2 style={{ width: "16px", height: "16px", animation: "spin 1s linear infinite" }} />
                  Signing in…
                </>
              ) : (
                "Sign in to Admin Panel"
              )}
            </button>
          </form>
        </div>

        {/* Demo credentials hint */}
        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#9CA3AF",
            marginTop: "20px",
            padding: "10px 16px",
            backgroundColor: "rgba(255,255,255,0.7)",
            borderRadius: "8px",
            border: "1px dashed #E5E7EB",
          }}
        >
          Demo — <span style={{ fontFamily: "monospace" }}>admin@gmail.com</span> / <span style={{ fontFamily: "monospace" }}>123456</span>
        </p>
      </div>

      {/* Spin keyframe */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Default export wraps in Suspense (required for useSearchParams in Next 13+) ──
export default function AdminLogin() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F4F6FA" }}>
        <Loader2 style={{ width: "28px", height: "28px", color: "#4F46E5", animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  );
}