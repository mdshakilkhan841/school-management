"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggleButton() {
  const { mode, mounted, toggleMode } = useTheme();

  return (
    <div
      onClick={(e) => toggleMode(e)}
      className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
      style={{ backgroundColor: "var(--theme-surface)" }}
      title="Toggle Theme Mode"
    >
      {/* Render a neutral placeholder until mounted to avoid hydration mismatch */}
      {!mounted ? (
        <div className="w-4 h-4" />
      ) : mode === "dark" ? (
        <Sun size={16} style={{ color: "var(--theme-text-secondary)" }} />
      ) : (
        <Moon size={16} style={{ color: "var(--theme-text-secondary)" }} />
      )}
    </div>
  );
}
