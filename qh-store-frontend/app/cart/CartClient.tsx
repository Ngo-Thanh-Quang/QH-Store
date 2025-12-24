"use client";

import { useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number | string;
  image?: string;
};

type CartProps = {
  products: Product[];
};

export default function CartClient({ products }: CartProps) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  
  const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
  if (!webhookUrl)
    throw new Error("Missing NEXT_PUBLIC_WEBHOOK_URL");

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: prev[id] ? prev[id] + 1 : 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const current = prev[id] || 1;
      if (current <= 1) return prev;
      return { ...prev, [id]: current - 1 };
    });
  };

  const subtotal = useMemo(() => {
    return products.reduce((sum, p) => {
      const qty = cart[p.id] || 0;
      return sum + (Number(p.price) || 0) * qty;
    }, 0);
  }, [cart, products]);

  const totalItems = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart]
  );

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("vi-VN").format(value);

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;

  const selectedProducts = products
    .filter((p) => cart[p.id] && cart[p.id] > 0)
    .map((p) => ({
      product_id: p.id,
      name: p.name,
      image: p.image,
      quantity: cart[p.id],
      total_price: (Number(p.price) || 0) * cart[p.id],
    }));

  if (selectedProducts.length === 0) {
    return setPopupMessage("<p>Vui lòng chọn ít nhất 1 sản phẩm!</p>");
  }

  const total = selectedProducts.reduce((sum, p) => sum + p.total_price, 0);

  const order = {
    customer_name: form.customer_name.value,
    customer_email: form.customer_email.value,
    customer_phone: form.customer_phone.value,
    shipping_address: form.shipping_address.value,
    total_amount: total,
    items: selectedProducts,
  };

  try {
    setLoading(true);
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    const msg = await res.text();

    setPopupMessage(msg || "<p>Msg success khong duoc tra ve tu webhook</p>");
  } catch (err) {
    console.error(err);
    setPopupMessage("<p>Gửi đơn hàng thất bại! Vui lòng thử lại.</p>");
  } finally {
    setLoading(false);
  }
};

  const closePopup = () => setPopupMessage(null);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      {/* Overlay loading */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="loader">Loading...</div>
        </div>
      )}

  {popupMessage && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-8">
    <div className="fixed inset-0" onClick={closePopup}></div>

    <div className="relative z-10 flex flex-col bg-white shadow-2xl rounded-3xl 
                    w-[95%] md:w-[60%] lg:w-[50%] 
                    max-h-[85vh] overflow-hidden">
      
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <button
          className="h-10 w-10 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors text-black"
          onClick={closePopup}
        >
          ✕
        </button>
      </div>

      <div className="p-6 overflow-y-auto custom-scrollbar text-black text-left">
        <div
          className="prose prose-sm max-w-full"
          dangerouslySetInnerHTML={{ __html: popupMessage }}
        />
      </div>
    </div>
  </div>
)}

      {/* Form thông tin khách hàng */}
      <div>
        <section className="sticky top-24 rounded-3xl border border-black/5 bg-white p-6 shadow-sm shadow-black/5">
          <h2 className="text-lg font-semibold text-black">
            Thông tin giao hàng
          </h2>
          <form className="mt-6 space-y-4" onSubmit={handleCheckout}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">Họ và tên</label>
              <input
                type="text"
                name="customer_name"
                required
                className="h-11 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">Email</label>
              <input
                type="email"
                name="customer_email"
                required
                className="h-11 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">Số điện thoại</label>
              <input
                type="tel"
                name="customer_phone"
                required
                className="h-11 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">
                Địa chỉ giao hàng
              </label>
              <textarea
                name="shipping_address"
                rows={3}
                required
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-black/60">
              <span>Tạm tính</span>
              <span className="text-base font-semibold text-black">
                {formatPrice(subtotal)} VND
              </span>
            </div>

            <button
              type="submit"
              className="mt-4 h-11 w-full rounded-full bg-black text-sm font-medium text-white"
            >
              Thanh toán
            </button>
          </form>
        </section>
      </div>

      {/* Giỏ hàng */}
      <section className="space-y-6">
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm shadow-black/5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-black">Sản phẩm</h2>
            <span className="text-sm text-black/60">
              {totalItems} sản phẩm trong giỏ
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {products.map((p) => {
              const quantity = cart[p.id] || 0;
              return (
                <article
                  key={p.id}
                  className="overflow-hidden rounded-2xl border border-black/5 bg-zinc-50"
                >
                  <div className="h-40 overflow-hidden bg-white">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
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
                    <h3 className="text-sm font-semibold text-black">{p.name}</h3>
                    <p className="text-xs text-black/50">
                      {formatPrice(Number(p.price) || 0)} VND
                    </p>

                    <div className="flex items-center justify-between rounded-full border border-black/10 bg-white px-2 py-1">
                      <button
                        type="button"
                        onClick={() => removeFromCart(p.id)}
                        disabled={quantity <= 1}
                        className="h-8 w-8 rounded-full border disabled:opacity-40"
                      >
                        −
                      </button>

                      <span className="text-sm font-medium text-black">{quantity}</span>

                      <button
                        type="button"
                        onClick={() => addToCart(p.id)}
                        className="h-8 w-8 rounded-full bg-black text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
