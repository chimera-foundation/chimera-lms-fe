"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Image
        src="/img/chimera-transparent.png"
        alt="Chimera Logo"
        width={120}
        height={120}
        className="rounded-full"
      />
    </div>
  );
}
