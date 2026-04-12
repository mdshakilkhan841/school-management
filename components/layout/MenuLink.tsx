"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
    pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");

  return (
    <Link
      href={item.href}
      className={`flex items-center justify-center lg:justify-start gap-4 py-2 md:px-2 rounded-md transition-colors ${
        isActive
          ? "bg-lamaSkyLight text-black font-medium"
          : "text-gray-500 hover:bg-lamaSkyLight"
      }`}
    >
      <Image src={item.icon} alt="" width={20} height={20} />
      <span className="hidden lg:block">{item.label}</span>
    </Link>
  );
};

export default MenuLink;
