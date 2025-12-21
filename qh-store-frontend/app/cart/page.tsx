import { adminDb } from "@/lib/firebase-admin";
import CartClient from "./CartClient";

type Product = {
  id: string;
  name: string;
  price: number | string;
  description?: string;
  image?: string;
  category?: string;
  inventory_stock?: number | string;
};

const getProducts = async (): Promise<Product[]> => {
  const snapshot = await adminDb.collection("products").get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Product, "id">),
  }));
};

export default async function CartPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-semibold text-black">
          Giỏ hàng
        </h1>
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-black/40">
          Thông tin giỏ hàng của bạn
        </p>
      </div>
      <CartClient products={products} />
    </main>
  );
}
