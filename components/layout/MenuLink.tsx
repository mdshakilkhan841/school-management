"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeIcon from "./ThemeIcon";

type MenuLinkProps = {
    item: {
        href: string;
        icon: string;
        label: string;
    };
};

const MenuLink = ({ item }: MenuLinkProps) => {
    const pathname = usePathname();
    const isActive =
        pathname === item.href ||
        (pathname.startsWith(item.href) && item.href !== "/");

    return (
        <Link
            href={item.href}
            className="flex items-center justify-center lg:justify-start gap-4 py-2 md:px-2 rounded-md transition-colors"
            style={{
                backgroundColor: isActive
                    ? "var(--theme-primary-light)"
                    : "transparent",
                color: isActive
                    ? "var(--theme-text)"
                    : "var(--theme-text-secondary)",
                fontWeight: isActive ? 500 : 400,
            }}
            onMouseEnter={(e) => {
                if (!isActive) {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                        "var(--theme-primary-light)";
                    (e.currentTarget as HTMLElement).style.opacity = "0.7";
                }
            }}
            onMouseLeave={(e) => {
                if (!isActive) {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                        "transparent";
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                }
            }}
        >
            <ThemeIcon
                src={item.icon}
                size={20}
                className={isActive ? "text-(--theme-primary)!" : ""}
            />
            <span className="hidden lg:block">{item.label}</span>
        </Link>
    );
};

export default MenuLink;
