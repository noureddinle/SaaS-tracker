"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "icon";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-500 text-white shadow-md shadow-indigo-900/30 hover:from-indigo-400 hover:via-indigo-300 hover:to-indigo-400 focus-visible:ring-indigo-400",
  secondary:
    "bg-neutral-800 text-neutral-200 border border-neutral-700 hover:bg-neutral-700 focus-visible:ring-neutral-500",
  outline:
    "border border-neutral-700 bg-transparent text-neutral-200 hover:bg-neutral-800 focus-visible:ring-neutral-600",
  ghost: "text-neutral-300 hover:bg-neutral-800 hover:text-white",
  destructive:
    "bg-red-500 text-white hover:bg-red-400 focus-visible:ring-red-400",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  xs: "h-8 px-2.5 text-xs",
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
  icon: "h-9 w-9",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading = false, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 disabled:pointer-events-none disabled:opacity-50",
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          loading && "pointer-events-none opacity-70",
          className
        )}
        ref={ref}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2 text-xs">
            <span className="h-3 w-3 animate-spin rounded-full border-[2px] border-white/40 border-t-white" />
            Loading…
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };

