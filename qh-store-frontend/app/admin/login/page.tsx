import Link from "next/link";
import AdminLoginForm from "./AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-50 px-4">
      <div className="absolute inset-0">
        <div className="absolute -left-10 top-20 h-64 w-64 rounded-full bg-amber-200/50 blur-3xl" />
        <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-zinc-200/70 blur-3xl" />
      </div>

      <section className="relative z-10 w-full max-w-md rounded-3xl border border-black/5 bg-white/90 p-8 shadow-xl shadow-black/5 backdrop-blur">
        <div className="space-y-3">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.3em] text-black/40">
            QH Store Admin
          </Link>
          <h1 className="text-2xl font-semibold text-black">Dang nhap quan tri</h1>
          <p className="text-sm text-black/60">
            Chi danh cho tai khoan quan tri duoc cap phep.
          </p>
        </div>
        <div className="mt-6">
          <AdminLoginForm />
        </div>
      </section>
    </main>
  );
}
