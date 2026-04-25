// utils/auth.js

const USER_KEY = "bz_user";

/* ===============================
   BASIC AUTH (SIMPLE & CLEAN)
================================ */

/** ✅ Save user after login */
export function loginUser(user) {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

/** ✅ Get user */
export function getUser() {
  if (typeof window === "undefined") return null;

  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
}

/** ✅ Check login */
export function isLoggedIn() {
  return getUser() !== null;
}

/** ✅ Logout */
export function logoutUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_KEY);
  }
}

/* ===============================
   SAFE REDIRECT
================================ */

export function getRedirectPath(searchParams) {
  const path = searchParams?.get?.("redirect") || "/";
  return path.startsWith("/") && !path.startsWith("//")
    ? path
    : "/";
}

/* ===============================
   VALIDATION
================================ */

export function validateLogin({ email = "", password = "" }) {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Email is required";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  return errors;
}