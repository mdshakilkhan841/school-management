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
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 h-full flex flex-col">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">SchooLama</span>
        </Link>
        <div className="flex-1 overflow-y-auto mt-4 scrollbar-hide">
          <Menu />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-y-scroll flex flex-col">
        <div className="sticky top-0 z-50 bg-[#F7F8FA] w-full border-b border-gray-100">
          <Navbar />
        </div>
        {children}
      </div>
    </div>
  );
}
