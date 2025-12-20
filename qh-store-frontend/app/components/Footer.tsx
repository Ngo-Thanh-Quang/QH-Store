import Link from "next/link";

const footerLinks = [
  {
    title: "Danh mục",
    items: [
      { label: "Nữ", href: "#" },
      { label: "Nam", href: "#" },
      { label: "Phụ kiện", href: "#" },
      { label: "Bộ sưu tập mới", href: "#" },
    ],
  },
  {
    title: "Hỗ trợ",
    items: [
      { label: "Liên hệ", href: "#" },
      { label: "Giao hàng & đổi trả", href: "#" },
      { label: "Hướng dẫn kích cỡ", href: "#" },
      { label: "Câu hỏi thường gặp", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-black/5 bg-[#ececec]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_2fr]">
        <div className="space-y-4">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            QH Store
          </Link>
          <p className="max-w-sm text-sm leading-6 text-black/60">
            Thời trang tối giản dành cho nhịp sống hiện đại. Chúng tôi chọn lọc
            chất liệu tốt, phom dáng chuẩn và thiết kế tinh tế cho mỗi ngày.
          </p>
          <div className="flex items-center gap-3 text-sm text-black/60">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 12a8 8 0 1 0-16 0c0 5 8 10 8 10s8-5 8-10Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            <span>Sơn Trà, TP. Đà Nẵng</span>
          </div>
          <div className="flex gap-3">
            {["FB", "IG", "TK"].map((label) => (
              <button
                key={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-xs font-semibold text-black/60 transition hover:border-black/30 hover:text-black"
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-black/50">
                {group.title}
              </h3>
              <ul className="space-y-2 text-sm text-black/60">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="transition hover:text-black"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-black/50">
              Đăng ký nhận tin
            </h3>
            <p className="text-sm text-black/60">
              Ưu đãi độc quyền và xu hướng mới mỗi tuần.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="h-10 w-full rounded-full border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-black/30"
              />
              <button className="h-10 rounded-full bg-black px-4 text-sm font-medium text-white transition hover:bg-black/90">
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-black/5">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-black/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© 2025 QH Store. All rights reserved.</span>
          <span>Hotline: 0900 123 456 • Email: hello@qhstore.vn</span>
        </div>
      </div>
    </footer>
  );
}
