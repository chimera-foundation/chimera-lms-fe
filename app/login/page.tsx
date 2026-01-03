"use client";
import Image from "next/image";
import { useState } from "react";
import { loginUser } from "../redux/auth/auth-slice";
import { useAppDispatch } from "../redux/hooks";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Login attempt:", { username, password });
    // dispatch(loginUser({ username, password }));
    router.push("/dashboard");
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
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-zinc-50"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
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
            className="w-full rounded-md px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 bg-zinc-50 text-zinc-900 hover:bg-zinc-200 focus:ring-zinc-50"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
