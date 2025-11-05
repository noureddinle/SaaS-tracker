"use client";

import { Bell, Plus, ExternalLink, SlidersHorizontal, Eye } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useTheme } from "@/lib/ThemeContext";

export default function ProjectsPage() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
      <DashboardSidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className={`border-b ${theme === "light" ? "border-gray-200" : "border-gray-900"} px-6 py-3 flex items-center justify-between`}>
          <h1 className="text-lg font-semibold">Projects</h1>
          <div className="flex items-center gap-2">
            <button className={`p-1.5 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md`}>
              <Bell className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
            </button>
          </div>
        </header>

        {/* Toolbar */}
        <div className={`border-b ${theme === "light" ? "border-gray-200" : "border-gray-900"} px-6 py-3 flex items-center justify-between`}>
          <button className={`flex items-center gap-2 text-xs ${theme === "light" ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"} px-2 py-1 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md font-semibold`}>
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter</span>
          </button>

          <button className={`flex items-center gap-2 text-xs ${theme === "light" ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"} px-2 py-1 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md font-semibold`}>
            <Eye className="w-4 h-4" />
            <span>Display</span>
          </button>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            {/* Cube illustration placeholder */}
            <div className={`w-32 h-32 mx-auto mb-6 rounded-lg ${theme === "light" ? "bg-gray-100" : "bg-gray-900"} flex items-center justify-center`}>
              <div className={`w-16 h-16 border-2 ${theme === "light" ? "border-gray-300" : "border-gray-700"} rounded-lg transform rotate-12`} />
            </div>
            
            <h2 className={`text-xl font-semibold mb-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
              No projects yet
            </h2>
            <p className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-500"} mb-6`}>
              Create your first project to organize your work
            </p>

            <div className="flex gap-3 justify-center">
              <button className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${theme === "light" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"} text-white transition-colors`}>
                <Plus className="w-4 h-4" />
                Create new project
              </button>
              <button className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${theme === "light" ? "border border-gray-300 hover:bg-gray-50" : "border border-gray-800 hover:bg-gray-900"} transition-colors`}>
                <ExternalLink className="w-4 h-4" />
                Documentation
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
