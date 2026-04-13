"use client";

import { useEffect } from "react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
          },
        },
      });
    };
    handleLogout();
  }, [router]);

  return (
    <div className="h-screen w-screen flex items-center justify-center" style={{ backgroundColor: "var(--theme-bg)" }}>
      <div className="flex flex-col items-center gap-4">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2"
          style={{ borderColor: "var(--theme-primary)" }}
        ></div>
        <p className="font-medium" style={{ color: "var(--theme-text-secondary)" }}>Logging you out...</p>
      </div>
    </div>
  );
};

export default LogoutPage;
