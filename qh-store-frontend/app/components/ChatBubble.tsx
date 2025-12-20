"use client";

import { useState } from "react";

const chatOptions = [
  {
    label: "Telegram",
    href: "https://t.me/QHCustomerSupportbot",
    accent: "bg-sky-500",
  },
  {
    label: "Zalo",
    href: "https://zalo.me/0896480166",
    accent: "bg-transparent",
  },
];

export default function ChatBubble() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <div
        className={`origin-bottom-right transition ${open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
          }`}
      >
        <div className="w-56 rounded-2xl border border-black/10 bg-white/95 p-3 shadow-xl shadow-black/10 backdrop-blur">
          <p className="px-2 pb-2 text-xs font-medium uppercase tracking-[0.2em] text-black/40">
            Chat nhanh
          </p>
          <div className="flex flex-col gap-2">
            {chatOptions.map((option) => (
              <a
                key={option.label}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-black/10 px-3 py-2 text-sm font-medium text-black transition hover:border-black/30"
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-white ${option.accent}`}
                  >
                    {option.label === "Telegram" ? (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="currentColor"
                      >
                        <path d="M9.9 15.6 9.7 20c.4 0 .6-.2.8-.4l2-2 4.1 3c.8.5 1.3.2 1.5-.7L22 4.3c.2-.9-.4-1.3-1.2-1L2.8 10c-.9.4-.9 1 0 1.3l4.6 1.4L18.2 6 9.9 15.6Z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                        <path fill="#2962ff" d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10	c4.722,0,8.883-2.348,11.417-5.931V36H15z"></path><path fill="#eee" d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19	c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742	c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083	C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"></path><path fill="#2962ff" d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75	S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"></path><path fill="#2962ff" d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z"></path><path fill="#2962ff" d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75	S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5	c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"></path><path fill="#2962ff" d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5	c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"></path>
                      </svg>
                    )}
                  </span>
                  {option.label}
                </span>
                <span className="text-xs text-black/40 transition group-hover:text-black">
                  Mở chat
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg shadow-black/30 transition hover:-translate-y-0.5"
        aria-label="Mo chat"
        aria-expanded={open}
      >
        {open ? (
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
            <path d="M8 10h8M8 14h4" />
            <path d="M21 12c0 4-4 7-9 7-1.3 0-2.6-.2-3.7-.6L3 20l1.3-3.1C3.5 15.7 3 13.9 3 12c0-4 4-7 9-7s9 3 9 7Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
