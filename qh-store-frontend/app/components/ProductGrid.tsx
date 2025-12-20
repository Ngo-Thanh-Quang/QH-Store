export type Product = {
  id: string;
  name: string;
  price: number | string;
  description: string;
  image: string;
  category: string;
  inventory_stock: number | string;
  event?: string;
};

const formatPrice = (value: number | string) =>
  new Intl.NumberFormat("vi-VN").format(Number(value));

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <p className="text-sm text-black/60">Chưa có sản phẩm để hiển thị.</p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <article
          key={product.id}
          className="group overflow-hidden rounded-3xl border border-black/5 bg-white/80 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
        >
          <div className="relative h-56 overflow-hidden bg-zinc-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium capitalize text-black/70">
              {product.category}
            </span>
          </div>
          <div className="space-y-3 p-6">
            <div>
              <h3 className="text-lg font-semibold text-black">
                {product.name}
              </h3>
              <p className="text-sm text-black/60">{product.description}</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-black">
                {formatPrice(product.price)} VND
              </span>
              <span className="text-black/50">
                {Number(product.inventory_stock) > 0
                  ? `Còn ${Number(product.inventory_stock)} sản phẩm`
                  : "Hết hàng"}
              </span>
            </div>
            <button className="h-10 w-full rounded-full bg-black text-sm font-medium text-white transition hover:bg-black/90">
              Thêm vào giỏ hàng
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
