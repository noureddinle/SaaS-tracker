"use client";

import { useState } from "react";
import { 
  Bell, 
  LayoutGrid, 
  Plus,
  SlidersHorizontal,
  Eye,
  Circle,
  MoreHorizontal,
  User,
  Bot,
  Moon,
  Sun
} from "lucide-react";
import AgentManager from "@/components/AgentManager";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useTheme } from "@/theme/ThemeContext";

export default function DashboardPage() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<"all" | "active" | "backlog" | "agents">("active");

  const issues = [
    { id: "INT-1", title: "Get familiar with Linear", number: 1, date: "Nov 2" },
    { id: "INT-3", title: "Connect your tools", number: 3, date: "Nov 2" },
    { id: "INT-2", title: "Set up your teams", number: 2, date: "Nov 2" },
    { id: "INT-4", title: "Import your data", number: 4, date: "Nov 2" },
  ];

  return (
    <div className={`min-h-screen flex ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
      <DashboardSidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className={`border-b ${theme === "light" ? "border-gray-200" : "border-gray-900"} px-6 py-3 flex items-center justify-between`}>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 text-xs font-semibold ${
                activeTab === "all" 
                  ? theme === "light" ? "text-black border-b-2 border-black pb-[13px] -mb-[13px]" : "text-white border-b-2 border-white pb-[13px] -mb-[13px]"
                  : theme === "light" ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              <Circle className="w-4 h-4" />
              <span>All issues</span>
            </button>
            <button 
              onClick={() => setActiveTab("active")}
              className={`flex items-center gap-2 text-xs font-semibold ${
                activeTab === "active" 
                  ? theme === "light" ? "text-black border-b-2 border-black pb-[13px] -mb-[13px]" : "text-white border-b-2 border-white pb-[13px] -mb-[13px]"
                  : theme === "light" ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              <Circle className="w-4 h-4" />
              <span>Active</span>
            </button>
            <button 
              onClick={() => setActiveTab("backlog")}
              className={`flex items-center gap-2 text-xs font-semibold ${
                activeTab === "backlog" 
                  ? theme === "light" ? "text-black border-b-2 border-black pb-[13px] -mb-[13px]" : "text-white border-b-2 border-white pb-[13px] -mb-[13px]"
                  : theme === "light" ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Backlog</span>
            </button>
            <button 
              onClick={() => setActiveTab("agents")}
              className={`flex items-center gap-2 text-xs font-semibold ${
                activeTab === "agents" 
                  ? theme === "light" ? "text-black border-b-2 border-black pb-[13px] -mb-[13px]" : "text-white border-b-2 border-white pb-[13px] -mb-[13px]"
                  : theme === "light" ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Agents</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className={`p-1.5 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md`}>
              <Bell className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
            </button>
            <button onClick={toggleTheme} className={`flex-1 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-900"} p-1.5 rounded-md`}>
                {theme === "light" ? <Moon className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} /> : <Sun className={`w-4 h-4 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />}
            </button>
          </div>
        </header>

        {/* Toolbar - Only show for non-agents tabs */}
        {activeTab !== "agents" && (
          <div className={`border-b ${theme === "light" ? "border-gray-200" : "border-neutral-900"} px-6 py-3 flex items-center justify-between`}>
            <button className={`flex items-center gap-2 text-xs ${theme === "light" ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"} px-2 py-1 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md font-semibold`}>
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter</span>
            </button>

            <button className={`flex items-center gap-2 text-xs ${theme === "light" ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"} px-2 py-1 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md font-semibold`}>
              <Eye className="w-4 h-4" />
              <span>Display</span>
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 px-6 overflow-auto">
          {activeTab === "agents" ? (
            <div className="py-6">
              <AgentManager />
            </div>
          ) : (
            /* Issues list */
            <div className="py-4">
              <div className="flex items-center gap-2 mb-4">
                <Circle className="w-4 h-4 text-gray-500" />
                <h2 className="text-xs font-semibold text-gray-400">Todo</h2>
                <span className="text-xs text-gray-600">4</span>
                <button className="ml-auto text-gray-600 hover:text-white font-semibold">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-0">
                {issues.map((issue) => (
                  <div
                    key={issue.id}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-neutral-900 rounded-md cursor-pointer group"
                  >
                    <MoreHorizontal className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    <span className="text-xs text-gray-600 w-12 flex-shrink-0">{issue.id}</span>
                    <Circle className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    <span className="text-xs flex-1">{issue.title}</span>
                    <span className="text-xs text-gray-600">({issue.number})</span>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
                      <div className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center">
                        <User className="w-3 h-3 text-gray-500" />
                      </div>
                    </div>
                    <span className="text-xs font-mono text-gray-600">{issue.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
