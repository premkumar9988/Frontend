"use client";
 
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import "@/styles/auth.css";
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";
 
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
 
const LogoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
 

function getStrength(pass) {
  let s = 0;
  if (pass.length >= 8) s++;
  if (/[A-Z]/.test(pass)) s++;
  if (/[0-9]/.test(pass)) s++;
  if (/[^A-Za-z0-9]/.test(pass)) s++;
  return s;
}
const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"];
 
const RULES = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One number", test: (p) => /[0-9]/.test(p) },
  { label: "One special character", test: (p) => /[^A-Za-z0-9]/.test(p) },
];
 

function validate(f) {
  const e = {};
  if (!f.password) e.password = "New password is required.";
  else if (f.password.length < 8) e.password = "Must be at least 8 characters.";
  if (!f.confirm) e.confirm = "Please confirm your new password.";
  else if (f.confirm !== f.password) e.confirm = "Passwords do not match.";
  return e;
}
 

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
 
  const [fields, setFields] = useState({ password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setDone(true);
    setTimeout(() => router.push("/auth/login"), 2000);
  };
 
  const ps = getStrength(fields.password);
 
  return (
    <div className="auth-page">
      <div className="auth-card">
 
        {/* Logo */}
        <Link href="/" className="auth-logo">
          <div className="auth-logo-mark"><LogoIcon /></div>
          <span className="auth-logo-text">Reset Password</span>
        </Link>
 
        {/* Progress dots */}
        <div className="auth-progress">
          <div className="auth-progress-dot done" />
          <div className="auth-progress-dot done" />
          <div className="auth-progress-dot active" />
        </div>
 
        {/* Step badge */}
        <span className="auth-step-badge">
          <span className="auth-step-badge-dot" />
          Final step
        </span>
 
        {!done ? (
          <>
            <div style={{ height: "0.75rem" }} />
            <h1 className="auth-heading">Set new password</h1>
            <p className="auth-subheading">
              Choose a strong password for your account.
              {email && (
                <> Resetting for <strong style={{ color: "var(--gray-700)" }}>{email}</strong>.</>
              )}
            </p>
 
            <form onSubmit={handleSubmit} noValidate>
              <div>
                <AuthInput
                  id="password" name="password" type="password"
                  label="New password"
                  placeholder="Min. 8 characters"
                  value={fields.password}
                  onChange={handleChange}
                  icon={<LockIcon />}
                  error={errors.password}
                  autoComplete="new-password"
                  required
                />
 
                {/* Strength bar */}
                {fields.password && (
                  <div style={{ marginTop: "-0.6rem", marginBottom: "0.6rem" }}>
                    <div className="strength-bar">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="strength-seg"
                          style={{ background: i <= ps ? STRENGTH_COLORS[ps] : undefined }}
                        />
                      ))}
                    </div>
                    <div className="strength-meta" style={{ color: STRENGTH_COLORS[ps] }}>
                      {STRENGTH_LABELS[ps]} password
                    </div>
                  </div>
                )}
 
                {/* Requirements checklist */}
                {fields.password && (
                  <ul style={{
                    listStyle: "none", padding: "0.5rem 0.75rem",
                    background: "var(--gray-50)", borderRadius: "var(--radius-sm)",
                    marginBottom: "0.75rem", display: "flex", flexDirection: "column", gap: "0.3rem"
                  }}>
                    {RULES.map((rule) => {
                      const ok = rule.test(fields.password);
                      return (
                        <li key={rule.label} style={{
                          display: "flex", alignItems: "center", gap: "0.4rem",
                          fontSize: "0.78rem",
                          color: ok ? "#059669" : "var(--gray-400)",
                          transition: "color 0.2s",
                        }}>
                          {ok ? (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          ) : (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="9" />
                            </svg>
                          )}
                          {rule.label}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
 
              <AuthInput
                id="confirm" name="confirm" type="password"
                label="Confirm new password"
                placeholder="Repeat your new password"
                value={fields.confirm}
                onChange={handleChange}
                icon={<LockIcon />}
                error={errors.confirm}
                autoComplete="new-password"
                required
              />
 
              <div style={{ height: "0.4rem" }} />
 
              <AuthButton loading={loading} loadingText="Resetting password…">
                Reset password
                {!loading && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </AuthButton>
            </form>
          </>
        ) : (
          /* ── Success state ── */
          <div style={{ textAlign: "center", animation: "cardIn 0.4s ease both" }}>
            <div
              className="auth-icon-circle auth-icon-circle-success"
              style={{ marginTop: "0.5rem" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
 
            <div className="auth-alert auth-alert-success" style={{ marginTop: "0.5rem" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Password reset successfully!
            </div>
 
            <h2 className="auth-heading">All done!</h2>
            <p className="auth-subheading">
              Your password has been updated. Redirecting you to sign in…
            </p>
          </div>
        )}
 
        <p className="auth-footer-note">
          Remember your password?{" "}
          <Link href="/auth/login" style={{ color: "var(--brand-600)", fontWeight: 500 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
 