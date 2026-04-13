"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const TableSearch = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = (e.currentTarget[0] as HTMLInputElement).value;

    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full px-2"
      style={{ border: "1.5px solid var(--theme-border)" }}
    >
      <Search size={14} style={{ color: "var(--theme-text-secondary)" }} />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none"
        style={{ color: "var(--theme-text)" }}
      />
    </form>
  );
};

export default TableSearch;
