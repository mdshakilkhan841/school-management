import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lama Dev School Management Dashboard",
  description: "Next.js School Management System",
};

// Inline script that runs BEFORE first paint to prevent light-mode flash.
// It reads localStorage and applies the saved theme's CSS variables immediately.
const themeInitScript = `
(function() {
  try {
    var THEMES = {
      "academic-blue": {
        light: {
          primary:"#3B82F6",primaryHover:"#2563EB",primaryLight:"#BFDBFE",primaryLighter:"#EFF6FF",
          secondary:"#A5B4FC",secondaryLight:"#EEF2FF",accent:"#FBBF24",accentLight:"#FFFBEB",
          background:"#FFFFFF",surface:"#FFFFFF",surfaceAlt:"#F8FAFC",
          textPrimary:"#1E293B",textSecondary:"#64748B",border:"#E2E8F0",
          success:"#22C55E",warning:"#F59E0B",danger:"#EF4444"
        },
        dark: {
          primary:"#60A5FA",primaryHover:"#93C5FD",primaryLight:"#1E3A5F",primaryLighter:"#0F172A",
          secondary:"#818CF8",secondaryLight:"#1E1B4B",accent:"#FBBF24",accentLight:"#1C1917",
          background:"#030712",surface:"#111827",surfaceAlt:"#030712",
          textPrimary:"#F9FAFB",textSecondary:"#9CA3AF",border:"#1F2937",
          success:"#4ADE80",warning:"#FBBF24",danger:"#F87171"
        }
      },
      "calm-green": {
        light: {
          primary:"#10B981",primaryHover:"#059669",primaryLight:"#A7F3D0",primaryLighter:"#ECFDF5",
          secondary:"#5EEAD4",secondaryLight:"#F0FDFA",accent:"#F59E0B",accentLight:"#FFFBEB",
          background:"#FFFFFF",surface:"#FFFFFF",surfaceAlt:"#F9FAFB",
          textPrimary:"#111827",textSecondary:"#6B7280",border:"#E5E7EB",
          success:"#22C55E",warning:"#F97316",danger:"#EF4444"
        },
        dark: {
          primary:"#34D399",primaryHover:"#6EE7B7",primaryLight:"#064E3B",primaryLighter:"#0B1F1A",
          secondary:"#5EEAD4",secondaryLight:"#042F2E",accent:"#FBBF24",accentLight:"#1C1917",
          background:"#0B1F1A",surface:"#112D26",surfaceAlt:"#112D26",
          textPrimary:"#ECFDF5",textSecondary:"#9CA3AF",border:"#1F3A34",
          success:"#4ADE80",warning:"#FB923C",danger:"#F87171"
        }
      }
    };
    var tid = localStorage.getItem("school-theme-id") || "academic-blue";
    var m = localStorage.getItem("school-theme-mode") || "light";
    var t = THEMES[tid]; if (!t) t = THEMES["academic-blue"];
    var c = m === "dark" ? t.dark : t.light;
    var r = document.documentElement;
    r.style.setProperty("--theme-primary",c.primary);
    r.style.setProperty("--theme-primary-hover",c.primaryHover);
    r.style.setProperty("--theme-primary-light",c.primaryLight);
    r.style.setProperty("--theme-primary-lighter",c.primaryLighter);
    r.style.setProperty("--theme-secondary",c.secondary);
    r.style.setProperty("--theme-secondary-light",c.secondaryLight);
    r.style.setProperty("--theme-accent",c.accent);
    r.style.setProperty("--theme-accent-light",c.accentLight);
    r.style.setProperty("--theme-bg",c.background);
    r.style.setProperty("--theme-surface",c.surface);
    r.style.setProperty("--theme-surface-alt",c.surfaceAlt);
    r.style.setProperty("--theme-text",c.textPrimary);
    r.style.setProperty("--theme-text-secondary",c.textSecondary);
    r.style.setProperty("--theme-border",c.border);
    r.style.setProperty("--theme-success",c.success);
    r.style.setProperty("--theme-warning",c.warning);
    r.style.setProperty("--theme-danger",c.danger);
    if(m==="dark"){r.classList.add("dark")}else{r.classList.remove("dark")}
  } catch(e){}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <NextTopLoader color="var(--theme-primary)" showSpinner={false} />
          {children} <ToastContainer position="bottom-right" theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  );
}
