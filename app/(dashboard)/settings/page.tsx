import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { UserCircle, Settings, Megaphone, Palette } from "lucide-react";
import ThemeSelector from "@/components/layout/ThemeSelector";

const SettingsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return notFound();

  const { user } = session;

  return (
    <div className="p-4 flex flex-col gap-8 flex-1">
      <h1 className="text-xl font-semibold" style={{ color: "var(--theme-text)" }}>Settings</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* ACCOUNT SETTINGS */}
        <div className="p-6 rounded-md flex-1 shadow-sm" style={{ backgroundColor: "var(--theme-surface)" }}>
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2" style={{ color: "var(--theme-text)" }}>
            <UserCircle size={20} style={{ color: "var(--theme-text-secondary)" }} />
            Account Information
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs" style={{ color: "var(--theme-text-secondary)" }}>Username</span>
              <span className="text-sm font-medium" style={{ color: "var(--theme-text)" }}>{user.name || user.email.split('@')[0]}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs" style={{ color: "var(--theme-text-secondary)" }}>Email Address</span>
              <span className="text-sm font-medium" style={{ color: "var(--theme-text)" }}>{user.email}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs" style={{ color: "var(--theme-text-secondary)" }}>User Role</span>
              <span
                className="text-sm font-medium px-2 py-1 rounded-md w-max"
                style={{ backgroundColor: "var(--theme-primary-lighter)", color: "var(--theme-text)" }}
              >
                {user.role?.toUpperCase()}
              </span>
            </div>
          </div>
          <button
            className="mt-8 text-white px-4 py-2 rounded-md transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--theme-primary)" }}
          >
            Update Profile
          </button>
        </div>

        {/* SECURITY & PREFERENCES */}
        <div className="flex flex-col gap-8 flex-1">
          {/* THEME SELECTOR */}
          <div className="p-6 rounded-md shadow-sm" style={{ backgroundColor: "var(--theme-surface)" }}>
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2" style={{ color: "var(--theme-text)" }}>
              <Palette size={20} style={{ color: "var(--theme-text-secondary)" }} />
              Appearance & Theme
            </h2>
            <ThemeSelector />
          </div>

          <div className="p-6 rounded-md shadow-sm" style={{ backgroundColor: "var(--theme-surface)" }}>
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2" style={{ color: "var(--theme-text)" }}>
              <Settings size={20} style={{ color: "var(--theme-text-secondary)" }} />
              Security
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-3 rounded-md" style={{ backgroundColor: "var(--theme-surface-alt)" }}>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium" style={{ color: "var(--theme-text)" }}>Change Password</span>
                  <span className="text-xs" style={{ color: "var(--theme-text-secondary)" }}>Update your account password</span>
                </div>
                <button className="text-sm font-medium hover:underline" style={{ color: "var(--theme-primary)" }}>Edit</button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md" style={{ backgroundColor: "var(--theme-surface-alt)" }}>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium" style={{ color: "var(--theme-text)" }}>Two-Factor Authentication</span>
                  <span className="text-xs" style={{ color: "var(--theme-text-secondary)" }}>Add an extra layer of security</span>
                </div>
                <div
                  className="w-10 h-5 rounded-full cursor-pointer relative"
                  style={{ backgroundColor: "var(--theme-border)" }}
                >
                    <div
                      className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"
                    />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-md shadow-sm" style={{ backgroundColor: "var(--theme-surface)" }}>
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2" style={{ color: "var(--theme-text)" }}>
              <Megaphone size={20} style={{ color: "var(--theme-text-secondary)" }} />
              Notifications
            </h2>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" style={{ accentColor: "var(--theme-primary)" }} />
                <span className="text-sm" style={{ color: "var(--theme-text)" }}>Email notifications for new assignments</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" style={{ accentColor: "var(--theme-primary)" }} />
                <span className="text-sm" style={{ color: "var(--theme-text)" }}>Push notifications for exam results</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" style={{ accentColor: "var(--theme-primary)" }} />
                <span className="text-sm" style={{ color: "var(--theme-text)" }}>Weekly progress reports</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
