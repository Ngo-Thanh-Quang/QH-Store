import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-session";
import AdminLogoutButton from "./AdminLogoutButton";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bypassAuth = process.env.ADMIN_BYPASS_AUTH === "true";
  const session = await getAdminSession();

  if (!session && !bypassAuth) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-black/5 bg-white/90 px-6 py-4 shadow-sm shadow-black/5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-black/40">
              QH Store Admin
            </p>
            <h1 className="text-xl font-semibold text-black">Dashboard</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-black/60">
            <span>
              Xin chào,{" "}
              <span className="font-medium text-black">
                {session?.name || session?.email || "Admin"}
              </span>
            </span>
            <AdminLogoutButton />
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
