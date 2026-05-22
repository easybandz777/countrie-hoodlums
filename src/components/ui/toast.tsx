"use client";

import { useEffect, useState } from "react";
import type { Toast } from "@/hooks/use-toast";

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

const typeStyles: Record<Toast["type"], string> = {
  success: "bg-green-600 border-green-500",
  error: "bg-red-600 border-red-500",
  info: "bg-yellow-600 border-yellow-500",
};

function ToastItem({
  toast,
  removeToast,
}: {
  toast: Toast;
  removeToast: (id: string) => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation on next frame
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className={`
        flex items-center justify-between gap-3 px-4 py-3 rounded-lg border
        text-white shadow-lg min-w-[280px] max-w-[380px]
        transition-all duration-300 ease-out
        ${visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        ${typeStyles[toast.type]}
      `}
      role="alert"
    >
      <p className="text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => removeToast(toast.id)}
        className="shrink-0 rounded p-1 hover:bg-white/20 transition-colors"
        aria-label="Close toast"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
}
