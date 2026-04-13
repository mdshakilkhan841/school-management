import Menu from "@/components/layout/Menu";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex" style={{ backgroundColor: "var(--theme-bg)" }}>
      {/* LEFT */}
      <div
        className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 h-full flex flex-col"
        style={{ backgroundColor: "var(--theme-surface)" }}
      >
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold" style={{ color: "var(--theme-text)" }}>SchooLama</span>
        </Link>
        <div className="flex-1 overflow-y-auto mt-4 scrollbar-hide">
          <Menu />
        </div>
      </div>
      {/* RIGHT */}
      <div
        className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] overflow-y-scroll flex flex-col"
        style={{ backgroundColor: "var(--theme-surface-alt)" }}
      >
        <div
          className="sticky top-0 z-50 w-full"
          style={{
            backgroundColor: "var(--theme-surface-alt)",
            borderBottom: "1px solid var(--theme-border)",
          }}
        >
          <Navbar />
        </div>
        {children}
      </div>
    </div>
  );
}
