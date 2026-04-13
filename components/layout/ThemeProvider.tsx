"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
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
    mounted: boolean;
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

    // ─── Render-time initialization (no useEffect needed) ──────
    // React-recommended "setState during render" pattern — if values differ
    // from defaults, React aborts and re-renders with the correct state.
    // The inline <Script> in layout.tsx already handled the visual flash.
    if (typeof window !== "undefined" && !mounted) {
        const savedTheme = localStorage.getItem(
            STORAGE_KEY_THEME,
        ) as ThemeId | null;
        const savedMode = localStorage.getItem(
            STORAGE_KEY_MODE,
        ) as ThemeMode | null;

        const resolvedTheme =
            savedTheme && themes[savedTheme] ? savedTheme : DEFAULT_THEME;
        const resolvedMode =
            savedMode === "light" || savedMode === "dark"
                ? savedMode
                : DEFAULT_MODE;

        // Batch all state updates — React will abort and re-render once
        setMounted(true);
        if (resolvedTheme !== DEFAULT_THEME) setThemeIdState(resolvedTheme);
        if (resolvedMode !== DEFAULT_MODE) setModeState(resolvedMode);
    }

    // ─── Apply CSS vars whenever theme or mode changes ─────────
    // This effect does NOT call setState — it only syncs external state (DOM + localStorage)
    useEffect(() => {
        applyThemeVariables(themes[themeId], mode);
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
            const root = document.documentElement;

            // Fallback: no View Transition API support
            if (!document.startViewTransition) {
                setModeState(newMode);
                return;
            }

            // Set click coordinates for the CSS @keyframes animation
            if (event) {
                root.style.setProperty("--x", `${event.clientX}px`);
                root.style.setProperty("--y", `${event.clientY}px`);
            }

            // ts-expect-error — View Transition API types may not be available
            document.startViewTransition(() => {
                setModeState(newMode);
            });
        },
        [mode],
    );

    const palette = themes[themeId];

    return (
        <ThemeContext.Provider
            value={{
                themeId,
                mode,
                palette,
                mounted,
                setThemeId,
                setMode,
                toggleMode,
            }}
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
