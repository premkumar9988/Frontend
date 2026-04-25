"use client"
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div data-theme={theme} className={`app ${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="toggle-row">
      <span className={`icon sun ${!isDark ? "active" : ""}`}>☀</span>

      <button
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle theme"
        className={`track ${isDark ? "on" : ""}`}
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        <span className="thumb" />
      </button>

      <span className={`icon moon ${isDark ? "active" : ""}`}>☽</span>
      <span className="badge">{theme}</span>
    </div>
  );
}

function Toolbar() {
  return (
    <header className="toolbar">
      <div className="logo">
        <span className="logo-dot" />
        <span className="logo-text">My App</span>
      </div>
      <ThemeToggle />
    </header>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Toolbar />
      <main className="content">
        <h1>Hello World</h1>
      </main>
    </ThemeProvider>
  );
}