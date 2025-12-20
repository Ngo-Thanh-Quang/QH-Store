import ProductGrid from "./components/ProductGrid";
import type { Product } from "./components/ProductGrid";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

const getProducts = async (): Promise<Product[]> => {
  const snapshot = await adminDb.collection("products").limit(3).get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Product, "id">),
  }));
};

const getWinterProducts = async (): Promise<Product[]> => {
  const snapshot = await adminDb
    .collection("products")
    .where("event", "==", "đông")
    .get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Product, "id">),
  }));
};

export default async function Home() {
  const [products, winterProducts] = await Promise.all([
    getProducts(),
    getWinterProducts(),
  ]);
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-16 px-4 py-16 sm:px-6">
      <section className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/50">
            QH Store Collection 2025
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-black sm:text-5xl">
            Thời trang tối giản, tinh tế, sang trọng mỗi ngày.
          </h1>
          <p className="max-w-lg text-lg leading-8 text-black/60">
            Khám phá bộ sưu tập mới nhất với chất liệu cao cấp, thiết kế tinh
            tế và dáng vẻ tôn form.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="h-11 rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-black/90">
              Mua ngay
            </button>
            <button className="h-11 rounded-full border border-black/10 px-6 text-sm font-medium text-black transition hover:border-black/30">
              Xem lookbook
            </button>
          </div>
        </div>
        <div className="relative h-72 overflow-hidden rounded-3xl border border-black/5 bg-gradient-to-br from-amber-50 via-white to-zinc-100 sm:h-80">
          <div className="absolute inset-0">
            <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-amber-200/60 blur-2xl" />
            <div className="absolute left-10 bottom-6 h-32 w-32 rounded-full bg-zinc-200/80 blur-2xl" />
          </div>
          <div className="relative z-10 flex h-full items-end justify-between px-6 pb-6 text-sm font-medium text-black/60">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                Hàng mới về
              </p>
              <p className="text-lg text-black">Áo khoác linen</p>
            </div>
            <span className="rounded-full border border-black/10 px-3 py-1 text-xs">
              10% OFF
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-gray-300 bg-white/70 p-8 backdrop-blur md:grid-cols-3">
        {[
          {
            title: "Giao hàng nhanh",
            detail: "Nhận hàng trong 24-48h tại TP.HCM và Hà Nội.",
          },
          {
            title: "Đổi trả dễ dàng",
            detail: "Hoàn hàng trong 7 ngày nếu sản phẩm không vừa ý.",
          },
          {
            title: "Tư vấn kích cỡ",
            detail: "Chat trực tuyến hỗ trợ 8h-22h mỗi ngày.",
          },
        ].map((item) => (
          <div key={item.title} className="space-y-2">
            <h3 className="text-lg font-semibold text-black">{item.title}</h3>
            <p className="text-sm leading-6 text-black/60">{item.detail}</p>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
              Sản phẩm nổi bật
            </p>
            <h2 className="text-3xl font-semibold text-black">
              Danh sách sản phẩm
            </h2>
          </div>
          <button className="h-10 rounded-full border border-black/10 px-5 text-sm font-medium text-black transition hover:border-black/30">
            Xem tất cả
          </button>
        </div>
        <ProductGrid products={products} />
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
              Chọn đồ mùa đông
            </p>
            <h2 className="text-3xl font-semibold text-black">
              Phong cách ấm áp cho ngày lạnh
            </h2>
          </div>
        </div>
        <ProductGrid products={winterProducts} />
      </section>
    </main>
  );
}
