"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  BookOpen,
  Bell,
  ChevronRight,
  Settings,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [mounted,   setMounted]   = useState(false);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    setMounted(true);
    const isAdmin = localStorage.getItem("admin");
    if (!isAdmin) {
      router.push("/admin/login");
      return;
    }
    try {
      const parsed = JSON.parse(isAdmin);
      if (parsed?.name) setAdminName(parsed.name);
    } catch {
      // plain string value — that's fine
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("admin");
    router.push("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Inventory", path: "/admin/inventory",  icon: Package },
    { name: "Orders",    path: "/admin/orders",     icon: ShoppingCart },
    { name: "Users",     path: "/admin/users",      icon: Users },
  ];

  if (!mounted) return null;

  return (
    <div style={{ display: "flex", height: "100vh", background: "#F4F6FA", overflow: "hidden" }}>

      {/* ─── SIDEBAR ─────────────────────────────────────── */}
      <aside style={{
        width: "256px",
        minWidth: "256px",
        background: "#0F1629",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "4px 0 24px rgba(0,0,0,0.3)",
        zIndex: 20,
      }}>

        {/* Brand */}
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <BookOpen size={18} color="white" />
          </div>
          <div>
            <p style={{ color: "#fff", fontWeight: 600, fontSize: "14px", margin: 0, lineHeight: 1.2 }}>Bookstore</p>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px", letterSpacing: "0.1em", margin: 0, textTransform: "uppercase" }}>Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "20px 12px 8px" }}>
          <p style={{
            color: "rgba(255,255,255,0.25)", fontSize: "10px",
            letterSpacing: "0.12em", textTransform: "uppercase",
            fontWeight: 600, padding: "0 12px", marginBottom: "8px",
          }}>Main Menu</p>

          {navItems.map((item) => {
            const Icon     = item.icon;
            const isActive = pathname?.startsWith(item.path);

            return (
              <Link
                key={item.name}
                href={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  marginBottom: "2px",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 500,
                  transition: "background 0.15s, color 0.15s",
                  background: isActive ? "#4F46E5" : "transparent",
                  color:      isActive ? "#ffffff" : "rgba(255,255,255,0.45)",
                  boxShadow:  isActive ? "0 4px 12px rgba(79,70,229,0.35)" : "none",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
              >
                <Icon size={16} style={{ flexShrink: 0, color: isActive ? "rgba(199,210,254,1)" : "rgba(255,255,255,0.35)" }} />
                <span style={{ flex: 1 }}>{item.name}</span>
                {isActive
                  ? <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#34D399" }} />
                  : <ChevronRight size={13} style={{ opacity: 0.3 }} />
                }
              </Link>
            );
          })}

          {/* System section */}
          <p style={{
            color: "rgba(255,255,255,0.25)", fontSize: "10px",
            letterSpacing: "0.12em", textTransform: "uppercase",
            fontWeight: 600, padding: "0 12px", margin: "20px 0 8px",
          }}>System</p>

          {(() => {
            const isActive = pathname?.startsWith("/admin/settings");
            return (
              <Link
                href="/admin/settings"
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 12px", borderRadius: "10px",
                  textDecoration: "none", fontSize: "14px", fontWeight: 500,
                  background: isActive ? "#4F46E5" : "transparent",
                  color:      isActive ? "#ffffff" : "rgba(255,255,255,0.45)",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
              >
                <Settings size={16} style={{ flexShrink: 0, color: "rgba(255,255,255,0.35)" }} />
                Settings
              </Link>
            );
          })()}
        </nav>

        {/* Footer */}
        <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "10px 12px", borderRadius: "10px",
            background: "rgba(255,255,255,0.05)", marginBottom: "4px",
          }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "50%",
              background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: 600, color: "#fff", flexShrink: 0,
            }}>
              {adminName.charAt(0).toUpperCase()}
            </div>
            <div style={{ overflow: "hidden" }}>
              <p style={{ color: "#fff", fontSize: "13px", fontWeight: 500, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {adminName}
              </p>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", margin: 0 }}>Administrator</p>
            </div>
          </div>

          <button
            onClick={logout}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: "10px",
              padding: "10px 12px", borderRadius: "10px", border: "none",
              background: "transparent", cursor: "pointer",
              color: "#F87171", fontSize: "14px", fontWeight: 500,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ─── MAIN AREA ───────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top Bar */}
        <header style={{
          height: "56px", background: "#fff",
          borderBottom: "1px solid #E5E7EB",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px", flexShrink: 0, zIndex: 10,
        }}>
          <span style={{ fontSize: "14px", color: "#6B7280", fontWeight: 500 }}>
            {navItems.find((n) => pathname?.startsWith(n.path))?.name ?? "Admin"}
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button style={{
              position: "relative", padding: "8px", borderRadius: "8px",
              border: "none", background: "transparent", cursor: "pointer", color: "#6B7280",
            }}>
              <Bell size={16} />
              <span style={{
                position: "absolute", top: "6px", right: "6px",
                width: "6px", height: "6px", borderRadius: "50%", background: "#EF4444",
              }} />
            </button>
            <div style={{ width: "1px", height: "20px", background: "#E5E7EB" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%",
                background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "11px", fontWeight: 600, color: "#fff",
              }}>
                {adminName.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>{adminName}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}