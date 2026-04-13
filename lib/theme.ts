// ============================================================
// DYNAMIC THEME SYSTEM – Color & Icon Constants
// ============================================================
// All theme palettes + icon mapping are maintained here.
// Components consume CSS variables injected by ThemeProvider.
// ============================================================

export type ThemeId = "academic-blue" | "calm-green";

export interface ThemePalette {
  id: ThemeId;
  name: string;
  description: string;
  preview: string; // primary color for preview chip

  light: {
    primary: string;
    primaryHover: string;
    primaryLight: string;      // replaces lamaSky
    primaryLighter: string;    // replaces lamaSkyLight
    secondary: string;         // replaces lamaPurple
    secondaryLight: string;    // replaces lamaPurpleLight
    accent: string;            // replaces lamaYellow
    accentLight: string;       // replaces lamaYellowLight
    background: string;
    surface: string;
    surfaceAlt: string;        // replaces #F7F8FA
    textPrimary: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    danger: string;
  };

  dark: {
    primary: string;
    primaryHover: string;
    primaryLight: string;
    primaryLighter: string;
    secondary: string;
    secondaryLight: string;
    accent: string;
    accentLight: string;
    background: string;
    surface: string;
    surfaceAlt: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    danger: string;
  };
}

// ─── Theme 1: Soft Academic Blue ────────────────────────────
export const academicBlue: ThemePalette = {
  id: "academic-blue",
  name: "Academic Blue",
  description: "Clean, professional, easy on eyes",
  preview: "#3B82F6",

  light: {
    primary: "#3B82F6",
    primaryHover: "#2563EB",
    primaryLight: "#BFDBFE",       // sky-200 feel
    primaryLighter: "#EFF6FF",     // sky-50 feel
    secondary: "#A5B4FC",          // indigo-300
    secondaryLight: "#EEF2FF",     // indigo-50
    accent: "#FBBF24",             // amber-400
    accentLight: "#FFFBEB",        // amber-50
    background: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceAlt: "#F8FAFC",
    textPrimary: "#1E293B",
    textSecondary: "#64748B",
    border: "#E2E8F0",
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444",
  },

  dark: {
    primary: "#60A5FA",
    primaryHover: "#93C5FD",
    primaryLight: "#1E3A5F",
    primaryLighter: "#0F172A",
    secondary: "#818CF8",
    secondaryLight: "#1E1B4B",
    accent: "#FBBF24",
    accentLight: "#1C1917",
    background: "#0F172A",
    surface: "#1E293B",
    surfaceAlt: "#1E293B",
    textPrimary: "#F1F5F9",
    textSecondary: "#94A3B8",
    border: "#334155",
    success: "#4ADE80",
    warning: "#FBBF24",
    danger: "#F87171",
  },
};

// ─── Theme 2: Calm Green Education ──────────────────────────
export const calmGreen: ThemePalette = {
  id: "calm-green",
  name: "Calm Green",
  description: "Friendly, modern, student-centric",
  preview: "#10B981",

  light: {
    primary: "#10B981",
    primaryHover: "#059669",
    primaryLight: "#A7F3D0",      // emerald-200
    primaryLighter: "#ECFDF5",    // emerald-50
    secondary: "#5EEAD4",         // teal-300
    secondaryLight: "#F0FDFA",    // teal-50
    accent: "#F59E0B",            // amber-500
    accentLight: "#FFFBEB",       // amber-50
    background: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceAlt: "#F9FAFB",
    textPrimary: "#111827",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
    success: "#22C55E",
    warning: "#F97316",
    danger: "#EF4444",
  },

  dark: {
    primary: "#34D399",
    primaryHover: "#6EE7B7",
    primaryLight: "#064E3B",
    primaryLighter: "#0B1F1A",
    secondary: "#5EEAD4",
    secondaryLight: "#042F2E",
    accent: "#FBBF24",
    accentLight: "#1C1917",
    background: "#0B1F1A",
    surface: "#112D26",
    surfaceAlt: "#112D26",
    textPrimary: "#ECFDF5",
    textSecondary: "#9CA3AF",
    border: "#1F3A34",
    success: "#4ADE80",
    warning: "#FB923C",
    danger: "#F87171",
  },
};

// ─── All Themes Registry ────────────────────────────────────
export const themes: Record<ThemeId, ThemePalette> = {
  "academic-blue": academicBlue,
  "calm-green": calmGreen,
};

export const DEFAULT_THEME: ThemeId = "academic-blue";
export const DEFAULT_MODE: "light" | "dark" = "light";

// ─── Icon Mapping ───────────────────────────────────────────
// Maps old PNG icon paths to Lucide icon names.
// Used by menu, navbar, forms, etc.
export const iconMap: Record<string, string> = {
  "/home.png": "LayoutDashboard",
  "/assignment.png": "ClipboardList",
  "/calendar.png": "CalendarDays",
  "/announcement.png": "Megaphone",
  "/message.png": "MessageSquare",
  "/setting.png": "Settings",
  "/profile.png": "UserCircle",
  "/class.png": "School",
  "/teacher.png": "GraduationCap",
  "/student.png": "Users",
  "/parent.png": "UserCheck",
  "/subject.png": "BookOpen",
  "/lesson.png": "BookMarked",
  "/exam.png": "FileText",
  "/result.png": "BarChart3",
  "/attendance.png": "ClipboardCheck",
  "/logout.png": "LogOut",
  "/search.png": "Search",
  "/filter.png": "SlidersHorizontal",
  "/sort.png": "ArrowUpDown",
  "/more.png": "MoreHorizontal",
  "/moreDark.png": "MoreHorizontal",
  "/view.png": "Eye",
  "/create.png": "Plus",
  "/update.png": "Pencil",
  "/delete.png": "Trash2",
  "/close.png": "X",
  "/upload.png": "Upload",
  "/mail.png": "Mail",
  "/phone.png": "Phone",
  "/date.png": "Calendar",
  "/blood.png": "Droplets",
  "/finance.png": "DollarSign",
  "/singleAttendance.png": "CheckCircle",
  "/singleBranch.png": "GitBranch",
  "/singleClass.png": "School",
  "/singleLesson.png": "Lightbulb",
  "/maleFemale.png": "UsersRound",
  "/noAvatar.png": "UserCircle",
};
