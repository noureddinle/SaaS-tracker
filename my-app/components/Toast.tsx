"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react";
import { useTheme } from "@/theme/ThemeContext";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastProps) {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  const icons = {
    success: CheckCircle2,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: "border-success-500",
    error: "border-error-500",
    warning: "border-warning-500",
    info: "border-primary-500",
  };

  const Icon = icons[toast.type];
  const borderColor = colors[toast.type];

  return (
    <div
      className={`flex items-center gap-3 px-5 py-4 rounded-lg border-l-3 shadow-xl min-w-[320px] animate-slide-in-right ${
        theme === "light" ? "bg-white border-gray-200" : "bg-gray-850 border-gray-700"
      } ${borderColor} ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"} transition-all duration-300`}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${
        toast.type === "success" ? "text-success-500" :
        toast.type === "error" ? "text-error-500" :
        toast.type === "warning" ? "text-warning-500" :
        "text-primary-500"
      }`} />
      <p className={`flex-1 text-sm ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
        {toast.message}
      </p>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onRemove(toast.id), 300);
        }}
        className={`p-1 rounded-md ${theme === "light" ? "hover:bg-gray-100 text-gray-600" : "hover:bg-gray-800 text-gray-400"}`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[1500] flex flex-col gap-3">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

// Toast hook for easy usage
let toastIdCounter = 0;
const toastListeners: Array<(toast: Toast) => void> = [];

export function useToast() {
  const showToast = (message: string, type: ToastType = "info", duration?: number) => {
    const toast: Toast = {
      id: `toast-${toastIdCounter++}`,
      message,
      type,
      duration,
    };
    toastListeners.forEach((listener) => listener(toast));
  };

  return {
    success: (message: string, duration?: number) => showToast(message, "success", duration),
    error: (message: string, duration?: number) => showToast(message, "error", duration),
    warning: (message: string, duration?: number) => showToast(message, "warning", duration),
    info: (message: string, duration?: number) => showToast(message, "info", duration),
  };
}

// Global toast manager component
export function ToastManager() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (toast: Toast) => {
      setToasts((prev) => [...prev, toast]);
    };
    toastListeners.push(listener);

    return () => {
      const index = toastListeners.indexOf(listener);
      if (index > -1) {
        toastListeners.splice(index, 1);
      }
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return <ToastContainer toasts={toasts} onRemove={removeToast} />;
}

