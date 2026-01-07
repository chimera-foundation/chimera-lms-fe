"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { loginUser, clearUsers } from "../redux/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showExpiredMessage, setShowExpiredMessage] = useState(false);
  const { error, loading, isAuthenticated } = useAppSelector((x) => x.user);

  useEffect(() => {
    if (searchParams.get("expired") === "true") {
      setShowExpiredMessage(true);
      dispatch(clearUsers());
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowExpiredMessage(false);

    try {
      await dispatch(loginUser({ email: username, password })).unwrap();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md space-y-8 rounded-lg p-8 shadow-lg bg-black">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/img/chimera-transparent.png"
              alt="Chimera Logo"
              width={120}
              height={120}
              className="rounded-full"
            />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50">
            CHIMERA LMS
          </h2>
          <p className="mt-2 text-sm text-zinc-400">Sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {showExpiredMessage && (
            <div className="rounded-md bg-yellow-900/20 border border-yellow-900 p-3">
              <p className="text-sm text-yellow-400">
                Your session has expired. Please login again.
              </p>
            </div>
          )}
          {error && (
            <div className="rounded-md bg-red-900/20 border border-red-900 p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-zinc-50"
              >
                Email
              </label>
              <input
                id="username"
                name="username"
                type="email"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1.5 flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-zinc-800 bg-zinc-950 ring-offset-zinc-950 placeholder:text-zinc-400 focus-visible:ring-zinc-300"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-50"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-zinc-800 bg-zinc-950 ring-offset-zinc-950 placeholder:text-zinc-400 focus-visible:ring-zinc-300"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 bg-zinc-50 text-zinc-900 hover:bg-zinc-200 focus:ring-zinc-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
