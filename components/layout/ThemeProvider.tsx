"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  themes,
  DEFAULT_THEME,
  DEFAULT_MODE,
  ThemeId,
  ThemePalette,
} from "@/lib/theme";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  themeId: ThemeId;
  mode: ThemeMode;
  palette: ThemePalette;
  setThemeId: (id: ThemeId) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY_THEME = "school-theme-id";
const STORAGE_KEY_MODE = "school-theme-mode";

function applyThemeVariables(palette: ThemePalette, mode: ThemeMode) {
  const colors = mode === "dark" ? palette.dark : palette.light;
  const root = document.documentElement;

  root.style.setProperty("--theme-primary", colors.primary);
  root.style.setProperty("--theme-primary-hover", colors.primaryHover);
  root.style.setProperty("--theme-primary-light", colors.primaryLight);
  root.style.setProperty("--theme-primary-lighter", colors.primaryLighter);
  root.style.setProperty("--theme-secondary", colors.secondary);
  root.style.setProperty("--theme-secondary-light", colors.secondaryLight);
  root.style.setProperty("--theme-accent", colors.accent);
  root.style.setProperty("--theme-accent-light", colors.accentLight);
  root.style.setProperty("--theme-bg", colors.background);
  root.style.setProperty("--theme-surface", colors.surface);
  root.style.setProperty("--theme-surface-alt", colors.surfaceAlt);
  root.style.setProperty("--theme-text", colors.textPrimary);
  root.style.setProperty("--theme-text-secondary", colors.textSecondary);
  root.style.setProperty("--theme-border", colors.border);
  root.style.setProperty("--theme-success", colors.success);
  root.style.setProperty("--theme-warning", colors.warning);
  root.style.setProperty("--theme-danger", colors.danger);

  // Set the data attribute for tailwind dark mode if needed
  if (mode === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>(DEFAULT_THEME);
  const [mode, setModeState] = useState<ThemeMode>(DEFAULT_MODE);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) as ThemeId | null;
    const savedMode = localStorage.getItem(STORAGE_KEY_MODE) as ThemeMode | null;

    if (savedTheme && themes[savedTheme]) {
      setThemeIdState(savedTheme);
    }
    if (savedMode && (savedMode === "light" || savedMode === "dark")) {
      setModeState(savedMode);
    }
    setMounted(true);
  }, []);

  // Apply CSS variables whenever theme or mode changes
  useEffect(() => {
    if (!mounted) return;
    const palette = themes[themeId];
    applyThemeVariables(palette, mode);
    localStorage.setItem(STORAGE_KEY_THEME, themeId);
    localStorage.setItem(STORAGE_KEY_MODE, mode);
  }, [themeId, mode, mounted]);

  const setThemeId = (id: ThemeId) => {
    if (themes[id]) {
      setThemeIdState(id);
    }
  };

  const setMode = (m: ThemeMode) => {
    setModeState(m);
  };

  const toggleMode = () => {
    setModeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const palette = themes[themeId];

  // Instead of unmounting provider, pass default values or rely on CSS variables for hydration.

  return (
    <ThemeContext.Provider
      value={{ themeId, mode, palette, setThemeId, setMode, toggleMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
