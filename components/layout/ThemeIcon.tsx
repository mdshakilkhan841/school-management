"use client";

import { iconMap } from "@/lib/theme";
import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

interface ThemeIconProps extends Omit<LucideProps, "ref"> {
    /** The old PNG path like "/home.png" or a Lucide icon name like "Home" */
    src: string;
    /** Fallback className for sizing etc. */
    className?: string;
}

/**
 * Renders a Lucide icon based on the old PNG path mapping.
 * Falls back to a generic icon if no mapping is found.
 */
const ThemeIcon = ({
    src,
    className = "",
    size = 20,
    ...props
}: ThemeIconProps) => {
    // Resolve the icon name from the mapping
    const iconName = iconMap[src] || src;

    // Look up the icon component from lucide-react
    const IconComponent = (LucideIcons as Record<string, any>)[iconName];

    if (!IconComponent) {
        // Fallback: render a generic circle icon
        const Fallback = LucideIcons.Circle;
        return (
            <Fallback
                size={size}
                className={`text-(--theme-text-secondary) ${className}`}
                {...props}
            />
        );
    }

    return (
        <IconComponent
            size={size}
            className={`text-(--theme-text-secondary) ${className}`}
            {...props}
        />
    );
};

export default ThemeIcon;
