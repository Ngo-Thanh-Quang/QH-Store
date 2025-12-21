"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="rounded-full border border-black/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-black/60 transition hover:border-black/30 hover:text-black disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isLoading ? "Đăng xuất..." : "Đăng xuất"}
    </button>
  );
}
