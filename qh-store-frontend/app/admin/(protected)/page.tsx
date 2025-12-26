import Link from "next/link";
import { adminDb } from "@/lib/firebase-admin";

type SeverityKeyword = {
  id: string;
  label?: string;
  asked?: number;
};

const getTopFaq = async (): Promise<SeverityKeyword[]> => {
  const snapshot = await adminDb
    .collection("severity_keywords")
    .orderBy("asked", "desc")
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<SeverityKeyword, "id">),
  }));
};

export default async function AdminDashboardPage() {
  const topFaq = await getTopFaq();
  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm shadow-black/5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-black/40">
            Khách hàng hỏi nhiều nhất
          </h3>
          <div className="mt-4 space-y-3 text-sm">
            {topFaq.length ? (
              topFaq.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-black/5 bg-zinc-50 px-4 py-3"
                >
                  <span className="font-medium text-black">
                    {(item.label || item.id).replace(/^\w/, (m) =>
                      m.toUpperCase()
                    )}
                  </span>
                  <span className="text-black/60">
                    {Number(item.asked || 0)} lần
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-black/60">
                Chưa có thống kê tương tác.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm shadow-black/5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-black/40">
            Tác vụ
          </h3>
          <div className="mt-4 space-y-3 text-sm">
            <Link
              href="/"
              target="_blank"
              className="block rounded-2xl border border-black/10 px-4 py-3 text-black transition hover:border-black/30"
            >
              Đến cửa hàng
            </Link>
            <button className="w-full rounded-2xl border border-black/10 px-4 py-3 text-left text-black transition hover:border-black/30">
              Quản lý sản phẩm
            </button>
            <button className="w-full rounded-2xl border border-black/10 px-4 py-3 text-left text-black transition hover:border-black/30">
              Xem thông báo CSKH
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
