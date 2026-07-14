"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Globe,
  Mail,
  Phone,
  Camera,
  Save,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Store,
  CreditCard,
  Truck,
} from "lucide-react";

// ─── Reusable Toggle ───────────────────────────────────────────────────────────
function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: enabled ? "#f97316" : "#e2e8f0",
        border: "none",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.2s",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: enabled ? 23 : 3,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          transition: "left 0.2s",
        }}
      />
    </button>
  );
}

// ─── Section Card ──────────────────────────────────────────────────────────────
function SettingCard({ icon: Icon, title, description, children, accent = "#f97316" }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #f1f5f9",
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Card Header */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid #f8fafc",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `${accent}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={18} color={accent} />
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 15, color: "#0f172a" }}>{title}</p>
          {description && (
            <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", marginTop: 1 }}>{description}</p>
          )}
        </div>
      </div>
      {/* Card Body */}
      <div style={{ padding: "20px 24px" }}>{children}</div>
    </div>
  );
}

// ─── Input Field ───────────────────────────────────────────────────────────────
function Field({ label, type = "text", value, onChange, placeholder, hint, required }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>
        {label}
        {required && <span style={{ color: "#f97316", marginLeft: 2 }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: `1.5px solid ${focused ? "#f97316" : "#e2e8f0"}`,
          fontSize: 14,
          color: "#0f172a",
          outline: "none",
          background: "#fafafa",
          transition: "border-color 0.15s",
        }}
      />
      {hint && <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{hint}</p>}
    </div>
  );
}

// ─── Password Field ─────────────────────────────────────────────────────────────
function PasswordField({ label, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            padding: "10px 42px 10px 14px",
            borderRadius: 10,
            border: `1.5px solid ${focused ? "#f97316" : "#e2e8f0"}`,
            fontSize: 14,
            color: "#0f172a",
            outline: "none",
            background: "#fafafa",
            boxSizing: "border-box",
            transition: "border-color 0.15s",
          }}
        />
        <button
          onClick={() => setShow(!show)}
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#94a3b8",
            display: "flex",
            alignItems: "center",
          }}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

// ─── Toggle Row ────────────────────────────────────────────────────────────────
function ToggleRow({ label, description, enabled, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "12px 0",
        borderBottom: "1px solid #f8fafc",
      }}
    >
      <div>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#1e293b" }}>{label}</p>
        {description && (
          <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{description}</p>
        )}
      </div>
      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  );
}

// ─── Save Button ───────────────────────────────────────────────────────────────
function SaveButton({ onClick, saved }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 22px",
        borderRadius: 10,
        background: saved ? "#22c55e" : "#f97316",
        color: "#fff",
        border: "none",
        fontWeight: 600,
        fontSize: 14,
        cursor: "pointer",
        transition: "background 0.25s",
      }}
    >
      {saved ? <Check size={16} /> : <Save size={16} />}
      {saved ? "Saved!" : "Save Changes"}
    </button>
  );
}

// ─── Main Settings Page ────────────────────────────────────────────────────────
export default function AdminSettingsPage() {
  // Store Profile
  const [storeName, setStoreName] = useState("Premium Bookstore");
  const [storeEmail, setStoreEmail] = useState("admin@bookstore.com");
  const [storePhone, setStorePhone] = useState("+91 98765 43210");
  const [storeAddress, setStoreAddress] = useState("Puducherry, India");
  const [storeCurrency, setStoreCurrency] = useState("INR");

  // Admin Account
  const [adminName, setAdminName] = useState("Admin");
  const [adminEmail, setAdminEmail] = useState("admin@bookstore.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Notifications
  const [notifNewOrder, setNotifNewOrder] = useState(true);
  const [notifLowStock, setNotifLowStock] = useState(true);
  const [notifNewUser, setNotifNewUser] = useState(false);
  const [notifPayment, setNotifPayment] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);

  // Store Config
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [guestCheckout, setGuestCheckout] = useState(true);
  const [autoDiscount, setAutoDiscount] = useState(true);
  const [freeShippingEnabled, setFreeShippingEnabled] = useState(true);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("499");
  const [discountPercent, setDiscountPercent] = useState("10");

  // Security
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("60");
  const [loginAlerts, setLoginAlerts] = useState(true);

  // Save states
  const [savedSection, setSavedSection] = useState(null);
  const handleSave = (section) => {
    setSavedSection(section);
    setTimeout(() => setSavedSection(null), 2000);
  };

  // Active tab
  const [activeTab, setActiveTab] = useState("store");

  const tabs = [
    { id: "store", label: "Store", icon: Store },
    { id: "account", label: "Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "shipping", label: "Shipping & Pricing", icon: Truck },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#0f172a" }}>

      {/* ── Page Header ── */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#f97316", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Admin Panel
        </p>
        <h1 style={{ margin: "4px 0 6px", fontSize: 26, fontWeight: 700, color: "#0f172a" }}>
          Settings
        </h1>
        <p style={{ margin: 0, fontSize: 14, color: "#64748b" }}>
          Manage your store preferences, account, and configurations.
        </p>
      </div>

      {/* ── Tabs ── */}
      <div
        style={{
          display: "flex",
          gap: 4,
          background: "#f8fafc",
          padding: 4,
          borderRadius: 12,
          marginBottom: 28,
          overflowX: "auto",
          border: "1px solid #f1f5f9",
        }}
      >
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 16px",
              borderRadius: 9,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
              whiteSpace: "nowrap",
              background: activeTab === id ? "#fff" : "transparent",
              color: activeTab === id ? "#f97316" : "#64748b",
              boxShadow: activeTab === id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.15s",
            }}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* ── STORE PROFILE ── */}
      {activeTab === "store" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <SettingCard icon={Store} title="Store Profile" description="Your public-facing store information">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Store Name" value={storeName} onChange={setStoreName} required />
              <Field label="Support Email" type="email" value={storeEmail} onChange={setStoreEmail} required />
              <Field label="Phone Number" value={storePhone} onChange={setStorePhone} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>Currency</label>
                <select
                  value={storeCurrency}
                  onChange={(e) => setStoreCurrency(e.target.value)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1.5px solid #e2e8f0",
                    fontSize: 14,
                    color: "#0f172a",
                    background: "#fafafa",
                    outline: "none",
                  }}
                >
                  <option value="INR">INR — Indian Rupee (₹)</option>
                  <option value="USD">USD — US Dollar ($)</option>
                  <option value="EUR">EUR — Euro (€)</option>
                  <option value="GBP">GBP — British Pound (£)</option>
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <Field label="Store Address" value={storeAddress} onChange={setStoreAddress} />
              </div>
            </div>
            <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
              <SaveButton onClick={() => handleSave("store")} saved={savedSection === "store"} />
            </div>
          </SettingCard>

          {/* Announcement Banner */}
          <SettingCard icon={Globe} title="Announcement Banner" description="The orange banner shown at the top of your storefront">
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Field
                label="Banner Text"
                value="🚚 Free shipping on orders over ₹499 · New arrivals every week"
                onChange={() => {}}
                hint="Displayed to all visitors on every page."
              />
              <ToggleRow
                label="Show Banner"
                description="Toggle visibility of the announcement bar"
                enabled={true}
                onChange={() => {}}
              />
            </div>
            <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
              <SaveButton onClick={() => handleSave("banner")} saved={savedSection === "banner"} />
            </div>
          </SettingCard>
        </div>
      )}

      {/* ── ACCOUNT ── */}
      {activeTab === "account" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <SettingCard icon={User} title="Admin Profile" description="Update your admin account details">
            {/* Avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #f97316, #fb923c)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {adminName.charAt(0).toUpperCase()}
                </div>
                <button
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#f97316",
                    border: "2px solid #fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Camera size={11} color="#fff" />
                </button>
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 15, color: "#0f172a" }}>{adminName}</p>
                <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>{adminEmail}</p>
                <p style={{ margin: 0, fontSize: 11, color: "#f97316", marginTop: 2, fontWeight: 500 }}>Administrator</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Full Name" value={adminName} onChange={setAdminName} required />
              <Field label="Email Address" type="email" value={adminEmail} onChange={setAdminEmail} required />
            </div>
            <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
              <SaveButton onClick={() => handleSave("profile")} saved={savedSection === "profile"} />
            </div>
          </SettingCard>

          <SettingCard icon={Shield} title="Change Password" description="Use a strong password you don't use elsewhere" accent="#6366f1">
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <PasswordField label="Current Password" value={currentPassword} onChange={setCurrentPassword} placeholder="Enter current password" />
              <PasswordField label="New Password" value={newPassword} onChange={setNewPassword} placeholder="Min. 8 characters" />
              <PasswordField label="Confirm New Password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Re-enter new password" />
              {newPassword && confirmPassword && newPassword !== confirmPassword && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#ef4444", fontSize: 12 }}>
                  <AlertCircle size={13} /> Passwords do not match
                </div>
              )}
              {newPassword && confirmPassword && newPassword === confirmPassword && newPassword.length >= 8 && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#22c55e", fontSize: 12 }}>
                  <Check size={13} /> Passwords match
                </div>
              )}
            </div>
            <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
              <SaveButton onClick={() => handleSave("password")} saved={savedSection === "password"} />
            </div>
          </SettingCard>
        </div>
      )}

      {/* ── NOTIFICATIONS ── */}
      {activeTab === "notifications" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <SettingCard icon={Bell} title="Admin Notifications" description="Choose which events trigger alerts for you">
            <div>
              <ToggleRow label="New Order Placed" description="Alert when a customer completes checkout" enabled={notifNewOrder} onChange={setNotifNewOrder} />
              <ToggleRow label="Low Stock Alert" description="Notify when a book drops below 5 copies" enabled={notifLowStock} onChange={setNotifLowStock} />
              <ToggleRow label="New User Registration" description="Alert when a new account is created" enabled={notifNewUser} onChange={setNotifNewUser} />
              <ToggleRow label="Payment Received" description="Confirm every successful Stripe payment" enabled={notifPayment} onChange={setNotifPayment} />
            </div>
            <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
              <SaveButton onClick={() => handleSave("notif")} saved={savedSection === "notif"} />
            </div>
          </SettingCard>

          <SettingCard icon={Mail} title="Email Notifications" description="Email delivery settings" accent="#06b6d4">
            <ToggleRow label="Send Email Notifications" description="Receive all alerts via email at your admin address" enabled={notifEmail} onChange={setNotifEmail} />
            <div style={{ marginTop: 14 }}>
              <Field label="Notification Email" type="email" value={adminEmail} onChange={setAdminEmail} hint="Alerts will be sent to this address." />
            </div>
            <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
              <SaveButton onClick={() => handleSave("email")} saved={savedSection === "email"} />
            </div>
          </SettingCard>
        </div>
      )}

      {/* ── SHIPPING & PRICING ── */}
      {activeTab === "shipping" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <SettingCard icon={Truck} title="Shipping Rules" description="Configure free shipping thresholds" accent="#10b981">
            <ToggleRow label="Enable Free Shipping" description="Offer free delivery above a minimum order value" enabled={freeShippingEnabled} onChange={setFreeShippingEnabled} />
            {freeShippingEnabled && (
              <div style={{ marginTop: 14 }}>
                <Field
                  label="Free Shipping Threshold (₹)"
                  value={freeShippingThreshold}
                  onChange={setFreeShippingThreshold}
                  hint="Orders above this amount qualify for free shipping."
                />
              </div>
            )}
            <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
              <SaveButton onClick={() => handleSave("shipping")} saved={savedSection === "shipping"} />
            </div>
          </SettingCard>

          <SettingCard icon={CreditCard} title="Discount Settings" description="Manage automatic discounts on all orders" accent="#f97316">
            <ToggleRow label="Enable Auto Discount" description="Apply a percentage discount to every order automatically" enabled={autoDiscount} onChange={setAutoDiscount} />
            {autoDiscount && (
              <div style={{ marginTop: 14 }}>
                <Field
                  label="Discount Percentage (%)"
                  value={discountPercent}
                  onChange={setDiscountPercent}
                  hint="This discount will be applied at checkout for all users."
                />
              </div>
            )}
            <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
              <SaveButton onClick={() => handleSave("discount")} saved={savedSection === "discount"} />
            </div>
          </SettingCard>

          <SettingCard icon={Store} title="Checkout Behaviour" description="Control the checkout experience for your customers" accent="#8b5cf6">
            <ToggleRow label="Guest Checkout" description="Allow users to buy without creating an account" enabled={guestCheckout} onChange={setGuestCheckout} />
            <ToggleRow
              label="Maintenance Mode"
              description="Take the storefront offline for customers while you make changes"
              enabled={maintenanceMode}
              onChange={setMaintenanceMode}
            />
            {maintenanceMode && (
              <div
                style={{
                  marginTop: 12,
                  padding: "10px 14px",
                  borderRadius: 10,
                  background: "#fef3c7",
                  border: "1px solid #fbbf24",
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  fontSize: 13,
                  color: "#92400e",
                }}
              >
                <AlertCircle size={14} color="#f59e0b" />
                Your store is currently hidden from customers.
              </div>
            )}
            <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
              <SaveButton onClick={() => handleSave("checkout")} saved={savedSection === "checkout"} />
            </div>
          </SettingCard>
        </div>
      )}

      {/* ── SECURITY ── */}
      {activeTab === "security" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <SettingCard icon={Shield} title="Security Settings" description="Protect your admin account and store" accent="#6366f1">
            <ToggleRow label="Two-Factor Authentication" description="Require a code alongside your password on login" enabled={twoFactor} onChange={setTwoFactor} />
            <ToggleRow label="Login Alerts" description="Email me when a new device logs into this account" enabled={loginAlerts} onChange={setLoginAlerts} />
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>Session Timeout (minutes)</label>
                <select
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1.5px solid #e2e8f0",
                    fontSize: 14,
                    color: "#0f172a",
                    background: "#fafafa",
                    outline: "none",
                    maxWidth: 260,
                  }}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="120">2 hours</option>
                  <option value="0">Never</option>
                </select>
                <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>Auto-logout after this period of inactivity.</p>
              </div>
            </div>
            <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
              <SaveButton onClick={() => handleSave("security")} saved={savedSection === "security"} />
            </div>
          </SettingCard>

          {/* Danger Zone */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1.5px solid #fee2e2",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #fee2e2", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AlertCircle size={18} color="#ef4444" />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 15, color: "#ef4444" }}>Danger Zone</p>
                <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>Irreversible actions — proceed with caution</p>
              </div>
            </div>
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Clear All Sessions", desc: "Force logout all active admin sessions immediately." },
                { label: "Export All Data", desc: "Download a full backup of books, orders, and users." },
                { label: "Delete All Orders", desc: "Permanently remove all order history. Cannot be undone." },
              ].map(({ label, desc }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "12px 0",
                    borderBottom: "1px solid #fef2f2",
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#1e293b" }}>{label}</p>
                    <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{desc}</p>
                  </div>
                  <button
                    style={{
                      padding: "8px 16px",
                      borderRadius: 8,
                      border: "1.5px solid #fca5a5",
                      background: "#fff",
                      color: "#ef4444",
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label.split(" ").slice(0, 2).join(" ")}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
