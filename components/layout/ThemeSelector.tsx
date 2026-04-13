"use client";

import { useTheme } from "@/components/layout/ThemeProvider";
import { themes, ThemeId } from "@/lib/theme";
import { Sun, Moon, Check, Palette } from "lucide-react";

const ThemeSelector = () => {
    const { themeId, mode, setThemeId, toggleMode } = useTheme();

    const themeOptions = Object.values(themes);

    return (
        <div className="flex flex-col gap-6">
            {/* Light/Dark Toggle */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <span
                        className="text-sm font-medium"
                        style={{ color: "var(--theme-text)" }}
                    >
                        Appearance
                    </span>
                    <span
                        className="text-xs"
                        style={{ color: "var(--theme-text-secondary)" }}
                    >
                        Switch between light and dark mode
                    </span>
                </div>
                <button
                    onClick={toggleMode}
                    className="relative w-14 h-7 rounded-full transition-colors duration-300 flex items-center"
                    style={{
                        backgroundColor:
                            mode === "dark"
                                ? "var(--theme-primary)"
                                : "var(--theme-border)",
                    }}
                >
                    <div
                        className="absolute w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center"
                        style={{
                            transform:
                                mode === "dark"
                                    ? "translateX(30px)"
                                    : "translateX(4px)",
                        }}
                    >
                        {mode === "dark" ? (
                            <Moon size={12} className="text-indigo-500" />
                        ) : (
                            <Sun size={12} className="text-amber-500" />
                        )}
                    </div>
                </button>
            </div>

            {/* Theme Cards */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Palette
                        size={16}
                        style={{ color: "var(--theme-text-secondary)" }}
                    />
                    <span
                        className="text-sm font-medium"
                        style={{ color: "var(--theme-text)" }}
                    >
                        Color Theme
                    </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {themeOptions.map((theme) => {
                        const isActive = themeId === theme.id;
                        const colors =
                            mode === "dark" ? theme.dark : theme.light;

                        return (
                            <button
                                key={theme.id}
                                onClick={() => setThemeId(theme.id as ThemeId)}
                                className="relative p-4 rounded-xl border-2 transition-all duration-200 text-left group"
                                style={{
                                    borderColor: isActive
                                        ? colors.primary
                                        : "var(--theme-border)",
                                    backgroundColor: isActive
                                        ? `${colors.primary}10`
                                        : "var(--theme-surface)",
                                }}
                            >
                                {/* Check mark for active */}
                                {isActive && (
                                    <div
                                        className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                                        style={{
                                            backgroundColor: colors.primary,
                                        }}
                                    >
                                        <Check
                                            size={12}
                                            className="text-white"
                                        />
                                    </div>
                                )}

                                {/* Color preview dots */}
                                <div className="flex items-center gap-2 mb-3">
                                    <div
                                        className="w-6 h-6 rounded-full shadow-sm"
                                        style={{
                                            backgroundColor: colors.primary,
                                        }}
                                    />
                                    <div
                                        className="w-4 h-4 rounded-full shadow-sm"
                                        style={{
                                            backgroundColor: colors.secondary,
                                        }}
                                    />
                                    <div
                                        className="w-4 h-4 rounded-full shadow-sm"
                                        style={{
                                            backgroundColor: colors.accent,
                                        }}
                                    />
                                    <div
                                        className="w-3 h-3 rounded-full shadow-sm"
                                        style={{
                                            backgroundColor:
                                                colors.primaryLight,
                                        }}
                                    />
                                </div>

                                {/* Theme name */}
                                <h3
                                    className="font-semibold text-sm"
                                    style={{
                                        color: isActive
                                            ? colors.primary
                                            : "var(--theme-text)",
                                    }}
                                >
                                    {theme.name}
                                </h3>
                                <p
                                    className="text-xs mt-0.5"
                                    style={{
                                        color: "var(--theme-text-secondary)",
                                    }}
                                >
                                    {theme.description}
                                </p>

                                {/* Mini preview bar */}
                                <div className="mt-3 flex gap-1 h-1.5 rounded-full overflow-hidden">
                                    <div
                                        className="flex-3 rounded-full"
                                        style={{
                                            backgroundColor: colors.primary,
                                        }}
                                    />
                                    <div
                                        className="flex-2 rounded-full"
                                        style={{
                                            backgroundColor: colors.secondary,
                                        }}
                                    />
                                    <div
                                        className="flex-1 rounded-full"
                                        style={{
                                            backgroundColor: colors.accent,
                                        }}
                                    />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ThemeSelector;
