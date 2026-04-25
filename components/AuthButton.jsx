"use client";
 

export default function AuthButton({
  children,
  onClick,
  type = "submit",
  variant = "primary",
  loading = false,
  disabled = false,
  loadingText = "Please wait…",
  fullWidth = true,
  icon,
}) {
  const cls = [
    "auth-btn",
    variant === "ghost" ? "auth-btn-ghost" : "auth-btn-primary",
  ].join(" ");
 
  return (
    <button
      type={type}
      className={cls}
      onClick={onClick}
      disabled={loading || disabled}
      style={fullWidth ? { width: "100%" } : {}}
      aria-busy={loading}
    >
      {loading ? (
        <>
          <span className="auth-spinner" role="status" aria-hidden="true" />
          {loadingText}
        </>
      ) : (
        <>
          {icon && <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}