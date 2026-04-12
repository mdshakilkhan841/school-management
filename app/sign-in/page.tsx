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
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <div className="bg-white p-12 rounded-lg shadow-2xl w-full max-w-md flex flex-col gap-8">
        <div className="flex items-center justify-center gap-2">
            <Image src="/logo.png" alt="logo" width={28} height={28} />
            <span className="uppercase font-bold text-xl tracking-wide text-gray-800">LamaDev School</span>
        </div>
        <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 text-sm">Please enter your details to sign in.</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Email Address</label>
            <input
              type="email"
              placeholder="name@school.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lamaSky transition-all"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lamaSky transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-lamaSky text-white p-3 rounded-md font-bold text-lg hover:bg-opacity-90 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md active:scale-[0.98]"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="text-center text-gray-400 text-xs mt-4">
            &copy; 2026 LamaDev School Management System
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
