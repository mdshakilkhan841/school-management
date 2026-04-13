"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
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
  toggleMode: (event?: React.MouseEvent) => void;
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
  const [themeId, setThemeIdState] = useState<ThemeId>(() => {
    // SSR-safe: will be overridden by the inline script, but we read
    // localStorage on the client to keep React state in sync.
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY_THEME) as ThemeId | null;
      if (saved && themes[saved]) return saved;
    }
    return DEFAULT_THEME;
  });

  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY_MODE) as ThemeMode | null;
      if (saved === "light" || saved === "dark") return saved;
    }
    return DEFAULT_MODE;
  });

  const isAnimating = useRef(false);

  // Apply CSS variables whenever theme or mode changes
  useEffect(() => {
    const palette = themes[themeId];
    applyThemeVariables(palette, mode);
    localStorage.setItem(STORAGE_KEY_THEME, themeId);
    localStorage.setItem(STORAGE_KEY_MODE, mode);
  }, [themeId, mode]);

  const setThemeId = (id: ThemeId) => {
    if (themes[id]) {
      setThemeIdState(id);
    }
  };

  const setMode = (m: ThemeMode) => {
    setModeState(m);
  };

  const toggleMode = useCallback(
    (event?: React.MouseEvent) => {
      const newMode = mode === "light" ? "dark" : "light";

      // Try View Transition API for the circular reveal animation
      if (
        event &&
        typeof document !== "undefined" &&
        "startViewTransition" in document
      ) {
        // Prevent re-entry
        if (isAnimating.current) return;
        isAnimating.current = true;

        // Get click coordinates (from the toggle button)
        const x = event.clientX;
        const y = event.clientY;

        // Calculate the maximum radius needed to cover the entire viewport
        const maxRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y),
        );

        // @ts-ignore — View Transition API types may not be available
        const transition = document.startViewTransition(() => {
          setModeState(newMode);
        });

        transition.ready.then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${maxRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 500,
              easing: "ease-in-out",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        });

        transition.finished.then(() => {
          isAnimating.current = false;
        });
      } else {
        // Fallback: instant switch
        setModeState(newMode);
      }
    },
    [mode],
  );

  const palette = themes[themeId];

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
