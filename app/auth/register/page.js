"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/styles/auth.css";
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";

/* ── Icons ── */
const UserIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const LogoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#a5b4fc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

/* ── Password strength ── */
function getStrength(pass) {
  let s = 0;
  if (pass.length >= 8)          s++;
  if (/[A-Z]/.test(pass))        s++;
  if (/[0-9]/.test(pass))        s++;
  if (/[^A-Za-z0-9]/.test(pass)) s++;
  return s;
}

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"];

/* ── Validation ── */
function validate(f) {
  const e = {};
  if (!f.name.trim())    e.name = "Full name is required.";
  if (!f.email.trim())   e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email.";
  if (!f.password)       e.password = "Password is required.";
  else if (f.password.length < 8) e.password = "Must be at least 8 characters.";
  if (!f.confirm)        e.confirm = "Please confirm your password.";
  else if (f.confirm !== f.password) e.confirm = "Passwords do not match.";
  if (!f.terms)          e.terms = "You must accept the terms to continue.";
  return e;
}

/* ── Helpers ── */
function getRegisteredUsers() {
  try {
    const stored = localStorage.getItem("registered_users");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveRegisteredUser(newUser) {
  const users = getRegisteredUsers();
  users.push(newUser);
  localStorage.setItem("registered_users", JSON.stringify(users));
}

/* ── Component ── */
export default function RegisterPage() {
  const router = useRouter();
  const [fields, setFields] = useState({
    name: "", email: "", password: "", confirm: "", terms: false,
  });
  const [errors, setErrors]           = useState({});
  const [loading, setLoading]         = useState(false);
  const [globalError, setGlobalError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFields((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setGlobalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      // Check if email is already registered
      const existingUsers = getRegisteredUsers();
      const alreadyExists = existingUsers.some(
        (u) => u.email.toLowerCase() === fields.email.trim().toLowerCase()
      );

      if (alreadyExists) {
        setErrors({ email: "This email is already registered." });
        setLoading(false);
        return;
      }

      // Save new user to localStorage
      const newUser = {
        id: `user_${Date.now()}`,
        name: fields.name.trim(),
        email: fields.email.trim().toLowerCase(),
        password: fields.password, // In real apps, never store plain-text passwords
      };
      saveRegisteredUser(newUser);

      // Redirect to login with a success message
      router.push("/auth/login?registered=true");
    } catch {
      setGlobalError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const ps = getStrength(fields.password);

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Logo */}
        <Link href="/" className="auth-logo">
          <div className="auth-logo-mark"><LogoIcon /></div>
          <span className="auth-logo-text">Spark</span>
        </Link>

        {/* Tabs */}
        <div className="auth-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={false}
            className="auth-tab"
            onClick={() => router.push("/auth/login")}
          >
            Sign in
          </button>
          <button role="tab" aria-selected={true} className="auth-tab active">
            Create account
          </button>
        </div>

        <h1 className="auth-heading">Create your account</h1>
        <p className="auth-subheading">
          Start your 14-day free trial — no credit card required.
        </p>

        {globalError && (
          <div className="auth-alert auth-alert-error" role="alert">
            {globalError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <AuthInput
            id="name" name="name" type="text"
            label="Full name" placeholder="Jane Doe"
            value={fields.name} onChange={handleChange}
            icon={<UserIcon />} error={errors.name}
            autoComplete="name" required
          />
          <AuthInput
            id="email" name="email" type="email"
            label="Email address" placeholder="you@example.com"
            value={fields.email} onChange={handleChange}
            icon={<MailIcon />} error={errors.email}
            autoComplete="email" required
          />

          {/* Password + strength meter */}
          <div>
            <AuthInput
              id="password" name="password" type="password"
              label="Password" placeholder="Min. 8 characters"
              value={fields.password} onChange={handleChange}
              icon={<LockIcon />} error={errors.password}
              autoComplete="new-password" required
            />
            {fields.password && (
              <div style={{ marginTop: "-0.55rem", marginBottom: "0.7rem" }}>
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
          </div>

          <AuthInput
            id="confirm" name="confirm" type="password"
            label="Confirm password" placeholder="Repeat your password"
            value={fields.confirm} onChange={handleChange}
            icon={<LockIcon />} error={errors.confirm}
            autoComplete="new-password" required
          />

          {/* Terms */}
          <div className="auth-checkbox-row">
            <input
              id="terms" name="terms" type="checkbox"
              className="auth-checkbox"
              checked={fields.terms}
              onChange={handleChange}
            />
            <label className="auth-checkbox-label" htmlFor="terms">
              I agree to the <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>
            </label>
          </div>
          {errors.terms && (
            <div className="auth-field-error"
              style={{ marginTop: "-0.7rem", marginBottom: "0.9rem" }}
              role="alert"
            >
              {errors.terms}
            </div>
          )}

          <AuthButton loading={loading} loadingText="Creating account…">
            Create account
            {!loading && (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </AuthButton>
        </form>

        <p className="auth-footer-note">
          Already have an account?{" "}
          <Link href="/auth/login" style={{ color: "#534AB7", fontWeight: 500 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}