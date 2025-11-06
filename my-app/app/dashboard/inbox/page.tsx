"use client";

import { Bell, Inbox as InboxIcon } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useTheme } from "@/theme/ThemeContext";

export default function InboxPage() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
      <DashboardSidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className={`border-b ${theme === "light" ? "border-gray-200" : "border-gray-900"} px-6 py-3 flex items-center justify-between`}>
          <h1 className="text-lg font-semibold">Inbox</h1>
          <div className="flex items-center gap-2">
            <button className={`p-1.5 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md`}>
              <Bell className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
            </button>
          </div>
        </header>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <InboxIcon className={`w-16 h-16 mx-auto mb-4 ${theme === "light" ? "text-gray-300" : "text-gray-700"}`} />
            <h2 className={`text-xl font-semibold mb-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
              No notifications
            </h2>
            <p className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
              You're all caught up!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
