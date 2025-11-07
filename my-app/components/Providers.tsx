"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "@/theme/ThemeContext";
import { ReactNode } from "react";
import CommandPalette from "./CommandPalette";
import { ToastManager } from "./Toast";

export function Providers({ children }: { children: ReactNode }) {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open command palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ThemeProvider>
      {children}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
      <ToastManager />
    </ThemeProvider>
  );
}
