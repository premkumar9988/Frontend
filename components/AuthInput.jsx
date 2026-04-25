"use client";
 
import { useState } from "react";
 

export default function AuthInput({
  id,
  name,
  type = "text",
  label,
  placeholder = "",
  value,
  onChange,
  icon,
  error,
  rightLabel,
  autoComplete,
  required = false,
  disabled = false,
}) {
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPass ? "text" : "password") : type;
 
  return (
    <div className="auth-field">
      {label && (
        <label className="auth-label" htmlFor={id}>
          <span>{label}{required && <span style={{ color: "var(--error)", marginLeft: 2 }}>*</span>}</span>
          {rightLabel && <span>{rightLabel}</span>}
        </label>
      )}
 
      <div className="auth-input-wrap">
        {icon && <span className="auth-input-icon">{icon}</span>}
 
        <input
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          className={[
            "auth-input",
            icon ? "" : "no-left-icon",
            isPassword ? "has-right-icon" : "",
            error ? "error-input" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={icon ? {} : { paddingLeft: "1rem" }}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
 
        {isPassword && (
          <button
            type="button"
            className="auth-eye-btn"
            onClick={() => setShowPass((p) => !p)}
            tabIndex={-1}
            aria-label={showPass ? "Hide password" : "Show password"}
          >
            {showPass ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
 
      {error && (
        <div className="auth-field-error" id={`${id}-error`} role="alert">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}