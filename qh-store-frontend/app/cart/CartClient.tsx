"use client";

import { useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number | string;
  description?: string;
  image?: string;
  category?: string;
  inventory_stock?: number | string;
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value);

export default function CartClient({ products }: { products: Product[] }) {
  const [cart, setCart] = useState<Record<string, number>>({});

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const { [id]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  const subtotal = useMemo(() => {
    return products.reduce((sum, product) => {
      const qty = cart[product.id] || 0;
      const price = Number(product.price) || 0;
      return sum + price * qty;
    }, 0);
  }, [cart, products]);

  const totalItems = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <section className="sticky top-24 rounded-3xl border border-black/5 bg-white p-6 shadow-sm shadow-black/5">
          <h2 className="text-lg font-semibold text-black">Thông tin giao hàng</h2>
          <p className="text-sm text-black/60">
            Vui lòng nhập thông tin để hoàn tất đơn hàng.
          </p>
          <form className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">Họ và tên</label>
              <input
                type="text"
                name="name"
                required
                className="h-11 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-black/30"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">Email</label>
              <input
                type="email"
                name="email"
                required
                className="h-11 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-black/30"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                required
                className="h-11 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-black/30"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">
                Địa chỉ giao hàng
              </label>
              <textarea
                name="address"
                rows={3}
                required
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/30"
              />
            </div>
            <div className="flex items-center justify-between text-sm text-black/60">
            <span>Tạm tính</span>
            <span className="text-base font-semibold text-black">
              {formatPrice(subtotal)} VND
            </span>
          </div>
          <button className="mt-4 h-11 w-full rounded-full bg-black text-sm font-medium text-white transition hover:bg-black/90">
            Thanh toán
          </button>
          </form>
        </section>
      </div>

      <section className="space-y-6">
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm shadow-black/5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-black">Sản phẩm</h2>
            <span className="text-sm text-black/60">
              {totalItems} sản phẩm trong giỏ
            </span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {products.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-black/5 bg-zinc-50"
              >
                <div className="h-40 overflow-hidden bg-white">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-black/40">
                      No image
                    </div>
                  )}
                </div>
                <div className="space-y-2 px-4 py-3">
                  <h3 className="text-sm font-semibold text-black">
                    {product.name}
                  </h3>
                  <p className="text-xs text-black/50">
                    {formatPrice(Number(product.price) || 0)} VND
                  </p>
                  <div className="flex items-center justify-between rounded-full border border-black/10 bg-white px-2 py-1 text-xs">
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      disabled={!cart[product.id]}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-black transition hover:border-black/30 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium text-black">
                      {cart[product.id] || 0}
                    </span>
                    <button
                      type="button"
                      onClick={() => addToCart(product.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition hover:bg-black/90"
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
