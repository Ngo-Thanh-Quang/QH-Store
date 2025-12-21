"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        setError(payload.error || "Đăng nhập thất bại.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Khong the ket noi, vui long thu lai.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-black">Email</label>
        <input
          type="email"
          name="email"
          placeholder="admin@qhstore.vn"
          required
          className="h-11 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-black/30"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-black">Mat khau</label>
        <input
          type="password"
          name="password"
          required
          className="h-11 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-black/30"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-2xl bg-black text-sm font-medium text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Dang xu ly..." : "Dang nhap"}
      </button>
    </form>
  );
}
