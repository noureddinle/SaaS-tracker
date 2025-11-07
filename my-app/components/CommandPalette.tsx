"use client";

import { useState, useEffect, useRef } from "react";
import { Search, FileText, DollarSign, Briefcase, Settings, User, Bot, X } from "lucide-react";
import { useTheme } from "@/theme/ThemeContext";

interface CommandItem {
  id: string;
  label: string;
  icon: any;
  shortcut?: string;
  action: () => void;
  category: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const commands: CommandItem[] = [
    { id: "create-invoice", label: "Create Invoice", icon: DollarSign, shortcut: "I", category: "Actions", action: () => console.log("Create invoice") },
    { id: "view-invoices", label: "View Invoices", icon: FileText, shortcut: "V", category: "Navigation", action: () => console.log("View invoices") },
    { id: "find-jobs", label: "Find Jobs", icon: Briefcase, shortcut: "J", category: "Navigation", action: () => console.log("Find jobs") },
    { id: "agents", label: "Agent Configuration", icon: Bot, shortcut: "A", category: "Settings", action: () => console.log("Agents") },
    { id: "settings", label: "Settings", icon: Settings, shortcut: "S", category: "Settings", action: () => console.log("Settings") },
    { id: "profile", label: "Profile", icon: User, shortcut: "P", category: "Settings", action: () => console.log("Profile") },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-start justify-center pt-[15vh] bg-black/90 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={containerRef}
        className={`w-full max-w-2xl rounded-xl border shadow-xl animate-slide-up ${
          theme === "light" ? "bg-white border-gray-200" : "bg-gray-850 border-gray-700"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className={`flex items-center gap-4 px-6 py-4 border-b ${
          theme === "light" ? "border-gray-200" : "border-gray-700"
        }`}>
          <Search className={`w-5 h-5 ${theme === "light" ? "text-gray-400" : "text-gray-500"}`} />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            className={`flex-1 bg-transparent border-none outline-none text-lg ${
              theme === "light" ? "text-gray-900 placeholder-gray-400" : "text-gray-100 placeholder-gray-600"
            }`}
            placeholder="Type a command or search..."
          />
          <button
            onClick={onClose}
            className={`p-1.5 rounded-md ${theme === "light" ? "hover:bg-gray-100 text-gray-600" : "hover:bg-gray-800 text-gray-400"}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className={`px-4 py-8 text-center ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
              No commands found
            </div>
          ) : (
            filteredCommands.map((command, index) => {
              const Icon = command.icon;
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={command.id}
                  onClick={() => {
                    command.action();
                    onClose();
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-md transition-colors ${
                    isSelected
                      ? theme === "light"
                        ? "bg-primary-100 text-primary-900"
                        : "bg-primary-900 text-primary-300"
                      : theme === "light"
                        ? "hover:bg-gray-50 text-gray-900"
                        : "hover:bg-gray-800 text-gray-300"
                  }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${
                    isSelected
                      ? theme === "light" ? "text-primary-700" : "text-primary-400"
                      : theme === "light" ? "text-gray-600" : "text-gray-400"
                  }`} />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{command.label}</div>
                    <div className={`text-xs ${
                      isSelected
                        ? theme === "light" ? "text-primary-600" : "text-primary-500"
                        : theme === "light" ? "text-gray-500" : "text-gray-500"
                    }`}>
                      {command.category}
                    </div>
                  </div>
                  {command.shortcut && (
                    <kbd className={`px-2 py-1 rounded text-xs font-mono ${
                      theme === "light"
                        ? "bg-gray-200 text-gray-700 border border-gray-300"
                        : "bg-gray-800 text-gray-400 border border-gray-700"
                    }`}>
                      {command.shortcut}
                    </kbd>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className={`px-6 py-3 border-t ${
          theme === "light" ? "border-gray-200 bg-gray-50" : "border-gray-700 bg-gray-900"
        }`}>
          <div className="flex items-center justify-between text-xs">
            <div className={`flex items-center gap-4 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
              <span className="flex items-center gap-1.5">
                <kbd className={`px-1.5 py-0.5 rounded font-mono ${
                  theme === "light" ? "bg-gray-200 border border-gray-300" : "bg-gray-800 border border-gray-700"
                }`}>↑</kbd>
                <kbd className={`px-1.5 py-0.5 rounded font-mono ${
                  theme === "light" ? "bg-gray-200 border border-gray-300" : "bg-gray-800 border border-gray-700"
                }`}>↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className={`px-1.5 py-0.5 rounded font-mono ${
                  theme === "light" ? "bg-gray-200 border border-gray-300" : "bg-gray-800 border border-gray-700"
                }`}>↵</kbd>
                Select
              </span>
            </div>
            <span className={theme === "light" ? "text-gray-400" : "text-gray-600"}>
              Press <kbd className={`px-1.5 py-0.5 rounded font-mono ${
                theme === "light" ? "bg-gray-200 border border-gray-300" : "bg-gray-800 border border-gray-700"
              }`}>Esc</kbd> to close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

