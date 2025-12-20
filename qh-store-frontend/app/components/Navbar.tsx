"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Nữ", href: "#" },
  { label: "Nam", href: "#" },
  { label: "Phụ kiện", href: "#" },
  { label: "Sale", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black/70 transition hover:border-black/20 hover:text-black sm:hidden"
            aria-label="Mo menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 6l12 12M18 6l-12 12" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <Link href="/" className="text-lg font-semibold tracking-tight">
            QH Store
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-black/70 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <label className="relative hidden md:block">
            <span className="sr-only">Tìm kiếm</span>
            <input
              type="search"
              placeholder="Tìm sản phẩm..."
              className="h-9 w-56 rounded-full border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-black/30"
            />
            <svg
              viewBox="0 0 24 24"
              className="absolute right-3 top-2.5 h-4 w-4 text-black/40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </label>
          <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black/70 transition hover:border-black/20 hover:text-black">
            <span className="sr-only">Giỏ hàng</span>
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6h15l-2 9H8L6 6Z" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
              <path d="M6 6L4 3H2" />
            </svg>
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
              2
            </span>
          </button>
          <button className="h-9 rounded-full bg-black px-4 text-sm font-medium text-white transition hover:bg-black/90">
            Đăng nhập
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`sm:hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden border-t border-black/5 bg-white px-4 transition-all duration-300`}
      >
        <div className="flex flex-col gap-4 py-4 text-sm font-medium text-black/70">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition hover:text-black"
            >
              {link.label}
            </Link>
          ))}
          <label className="relative">
            <span className="sr-only">Tim kiem</span>
            <input
              type="search"
              placeholder="Tim san pham..."
              className="h-10 w-full rounded-full border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-black/30"
            />
            <svg
              viewBox="0 0 24 24"
              className="absolute right-3 top-3 h-4 w-4 text-black/40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </label>
          <button className="h-10 w-full rounded-full border border-black/10 text-sm font-medium text-black transition hover:border-black/20">
            Gio hang (2)
          </button>
          <button className="h-10 w-full rounded-full bg-black text-sm font-medium text-white transition hover:bg-black/90">
            Dang nhap
          </button>
        </div>
      </div>
    </header>
  );
}
