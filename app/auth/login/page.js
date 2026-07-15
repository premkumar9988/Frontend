"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import "@/styles/auth.css";
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";
import { useAuth } from "@/context/AuthContext";

/* ── Icons ── */
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const LogoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

/* ── Validation ── */
function validate(fields) {
  const errors = {};
  if (!fields.email.trim()) errors.email = "Email is required.";
  else if (!/\S+@\S+\.\S+/.test(fields.email)) errors.email = "Enter a valid email.";
  if (!fields.password) errors.password = "Password is required.";
  return errors;
}

/* ── Hardcoded demo users (fallback) ── */
const DEMO_USERS = [
  { id: "user_1", name: "Prem Kumar", email: "prem@gmail.com", password: "123456789" },
  { id: "user_2", name: "Prem Kumar 2", email: "premkumar@gmail.com", password: "123456789" },
];

/* ── Get all users (demo + registered) ── */
function getAllUsers() {
  try {
    const stored = localStorage.getItem("registered_users");
    const registeredUsers = stored ? JSON.parse(stored) : [];
    return [...DEMO_USERS, ...registeredUsers];
  } catch {
    return DEMO_USERS;
  }
}

/* ── Inner component: uses useSearchParams, must live inside <Suspense> ── */
function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAuth();

  const [tab, setTab] = useState("login");
  const [fields, setFields] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectParam = params.get("redirect");
  const safeRedirect =
    redirectParam && redirectParam !== "/auth/login" ? redirectParam : "/";

  // Show success banner if coming from register
  const justRegistered = params.get("registered") === "true";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setGlobalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate(fields);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);

    try {
      // Check demo users + registered users from localStorage
      const allUsers = getAllUsers();
      const matchedUser = allUsers.find(
        (u) =>
          u.email.toLowerCase() === fields.email.trim().toLowerCase() &&
          u.password === fields.password
      );

      if (!matchedUser) {
        throw new Error("Invalid email or password.");
      }

      // Strip password before storing in context
      const { password, ...userData } = matchedUser;

      localStorage.setItem("token", "demo_token_123");
      login(userData);

      router.push(safeRedirect);
    } catch (err) {
      setGlobalError(err.message);
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
          <span className="auth-logo-text">Login</span>
        </Link>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${tab === "login" ? "active" : ""}`}
            onClick={() => { setTab("login"); router.push("/auth/login"); }}
          >
            Sign in
          </button>
          <button
            type="button"
            className={`auth-tab ${tab === "register" ? "active" : ""}`}
            onClick={() => { setTab("register"); router.push("/auth/register"); }}
          >
            Create account
          </button>
        </div>

        <h1 className="auth-heading">Welcome back</h1>
        <p className="auth-subheading">Sign in to continue</p>

        {/* ✅ Success banner after registration */}
        {justRegistered && (
          <div className="auth-alert auth-alert-success">
            Account created! You can now sign in.
          </div>
        )}

        {globalError && (
          <div className="auth-alert auth-alert-error">{globalError}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <AuthInput
            id="email" name="email" type="email" label="Email"
            value={fields.email} onChange={handleChange}
            icon={<MailIcon />} error={errors.email}
          />
          <AuthInput
            id="password" name="password" type="password" label="Password"
            value={fields.password} onChange={handleChange}
            icon={<LockIcon />} error={errors.password}
            rightLabel={<Link href="/auth/forgot-password">Forgot?</Link>}
          />
          <AuthButton type="submit" loading={loading}>Sign in</AuthButton>
        </form>

      </div>
    </div>
  );
}

/* ── Page export: wraps the form in Suspense (required for useSearchParams) ── */
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}