"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import "@/styles/auth.css";
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";
import { useAuth } from "@/context/AuthContext"; 

/* ── Icons ── */
const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
  </svg>
);

const LogoIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

/* ── Validation ── */
function validate(fields) {
  const errors = {};
  if (!fields.email.trim()) errors.email = "Email is required.";
  if (!fields.password) errors.password = "Password is required.";
  return errors;
}


export default function LoginPage() {

  
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAuth();

  const [tab, setTab] = useState("login");
  const [fields, setFields] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Safe redirect
  const redirectParam = params.get("redirect");
  const safeRedirect =
    redirectParam && redirectParam !== "/auth/login" ? redirectParam : "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
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
    
    if (
     fields.email === "prem@gmail.com" &&
      fields.password === "123456789"
    ) { 
      
      const userData = {
        id: "user_1",
        name: "Prem Kumar",
        email: "prem@gmail.com",

        id: "user_2",
        name: "premkumar",
        email: "premkumar@gmail.com"
      };

      
      localStorage.setItem("token", "demo_token_123");

    
      login(userData);

      console.log("Demo login success");

      router.push("/"); 
    } else {
      throw new Error("Invalid email or password");
    }
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
          <div className="auth-logo-mark">
            <LogoIcon />
          </div>
          <span className="auth-logo-text">Login</span>
        </Link>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === "login" ? "active" : ""}`}
            onClick={() => {
              setTab("login");
              router.push("/auth/login");
            }}
          >
            Sign in
          </button>

          <button
            className={`auth-tab ${tab === "register" ? "active" : ""}`}
            onClick={() => {
              setTab("register");
              router.push("/auth/register");
            }}
          >
            Create account
          </button>
        </div>

        <h1 className="auth-heading">Welcome back</h1>
        <p className="auth-subheading">Sign in to continue</p>

        
        {globalError && (
          <div className="auth-alert auth-alert-error">{globalError}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <AuthInput
            id="email"
            name="email"
            type="email"
            label="Email"
            value={fields.email}
            onChange={handleChange}
            icon={<MailIcon />}
            error={errors.email}
          />

          <AuthInput
            id="password"
            name="password"
            type="password"
            label="Password"
            value={fields.password}
            onChange={handleChange}
            icon={<LockIcon />}
            error={errors.password}
            rightLabel={<Link href="/auth/forgot-password">Forgot?</Link>}
          />

          <AuthButton loading={loading}>Sign in</AuthButton>
        </form>
      </div>
    </div>
  );
}
