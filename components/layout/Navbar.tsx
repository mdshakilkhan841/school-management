import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Search, MessageSquare, Megaphone } from "lucide-react";
import ThemeToggleButton from "./ThemeToggleButton";

const Navbar = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  return (
    <div className="flex items-center justify-between p-4">
      {/* SEARCH BAR */}
      <div
        className="hidden md:flex items-center gap-2 text-xs rounded-full px-2"
        style={{ border: "1.5px solid var(--theme-border)" }}
      >
        <Search size={14} style={{ color: "var(--theme-text-secondary)" }} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
          style={{ color: "var(--theme-text)" }}
        />
      </div>
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        <ThemeToggleButton />
        <div
          className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: "var(--theme-surface)" }}
        >
          <MessageSquare size={16} style={{ color: "var(--theme-text-secondary)" }} />
        </div>
        <div
          className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative"
          style={{ backgroundColor: "var(--theme-surface)" }}
        >
          <Megaphone size={16} style={{ color: "var(--theme-text-secondary)" }} />
          <div
            className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center text-white rounded-full text-xs"
            style={{ backgroundColor: "var(--theme-primary)" }}
          >
            1
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium" style={{ color: "var(--theme-text)" }}>
            {user?.name || "User"}
          </span>
          <span className="text-[10px] text-right" style={{ color: "var(--theme-text-secondary)" }}>
            {user?.role as string}
          </span>
        </div>
        <Image src={user?.image || "/avatar.png"} alt="" width={36} height={36} className="rounded-full"/>
      </div>
    </div>
  );
};

export default Navbar;
