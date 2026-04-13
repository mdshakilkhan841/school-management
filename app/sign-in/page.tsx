"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Something went wrong!");
      } else {
        toast.success("Logged in successfully!");
        router.push("/");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--theme-primary-lighter)" }}
    >
      <div
        className="p-12 rounded-lg shadow-2xl w-full max-w-md flex flex-col gap-8"
        style={{ backgroundColor: "var(--theme-surface)" }}
      >
        <div className="flex items-center justify-center gap-2">
            <Image src="/logo.png" alt="logo" width={28} height={28} />
            <span className="uppercase font-bold text-xl tracking-wide" style={{ color: "var(--theme-text)" }}>LamaDev School</span>
        </div>
        <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-extrabold" style={{ color: "var(--theme-text)" }}>Welcome Back</h1>
            <p className="text-sm" style={{ color: "var(--theme-text-secondary)" }}>Please enter your details to sign in.</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold" style={{ color: "var(--theme-text-secondary)" }}>Email Address</label>
            <input
              type="email"
              placeholder="name@school.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-md transition-all outline-none"
              style={{
                border: "1px solid var(--theme-border)",
                backgroundColor: "var(--theme-surface)",
                color: "var(--theme-text)",
              }}
              onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px var(--theme-primary)`)}
              onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold" style={{ color: "var(--theme-text-secondary)" }}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-md transition-all outline-none"
              style={{
                border: "1px solid var(--theme-border)",
                backgroundColor: "var(--theme-surface)",
                color: "var(--theme-text)",
              }}
              onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px var(--theme-primary)`)}
              onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="text-white p-3 rounded-md font-bold text-lg transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md active:scale-[0.98]"
            style={{ backgroundColor: "var(--theme-primary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--theme-primary-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--theme-primary)")}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="text-center text-xs mt-4" style={{ color: "var(--theme-text-secondary)" }}>
            &copy; 2026 LamaDev School Management System
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
