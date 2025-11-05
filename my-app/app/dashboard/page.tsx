"use client";

import { useState } from "react";
import { 
  Search, 
  Edit, 
  Bell, 
  LayoutGrid, 
  Inbox, 
  User, 
  ChevronDown,
  Settings,
  Package,
  TangentIcon as AgentIcon,
  View,
  Plus,
  SlidersHorizontal,
  Eye,
  Circle,
  MoreHorizontal,
  UserPlus,
  Download,
  File,
  Receipt,
  Paintbrush,
  Cog,
  Bot,
  Moon,
  Sun
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import AgentManager from "@/components/AgentManager";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "backlog" | "agents">("active");
  const [showWorkspace, setShowWorkspace] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [showTry, setShowTry] = useState(false);
  const hiddenTabs = [
    { id: "all", label: "All issues" },
    { id: "active", label: "Active" },
    { id: "backlog", label: "Backlog" },
  ];

  const checkTab = (tab: string) => {
    return hiddenTabs.some((t) => t.id === tab) ? "hidden" : "";
  };

  const issues = [
    { id: "INT-1", title: "Get familiar with Linear", number: 1, date: "Nov 2" },
    { id: "INT-3", title: "Connect your tools", number: 3, date: "Nov 2" },
    { id: "INT-2", title: "Set up your teams", number: 2, date: "Nov 2" },
    { id: "INT-4", title: "Import your data", number: 4, date: "Nov 2" },
  ];

  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`min-h-screen flex ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
      {/* Sidebar */}
      <aside className={`w-54 border-r ${theme === "light" ? "border-gray-200" : "border-gray-900"} px-5 py-4 flex flex-col`}>
        {/* Workspace header */}
        <div className={`flex items-center gap-2 px-1 py-1 mb-6 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-900"} rounded-md cursor-pointer`}>
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-semibold text-white">
            IN
          </div>
          <span className="text-sm font-semibold">Interlud</span>
          <ChevronDown className={`w-4 h-4 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`} />
          {/* Top actions */}
         <div className="flex gap-1 px-2 ml-auto">
            <button className={`flex-1 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-900"} p-1.5 rounded-md`}>
                <Search className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
            </button>
            <button className={`flex-1 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-900"} p-1.5 rounded-md`}>
                <Edit className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
            </button>
            <button onClick={toggleTheme} className={`flex-1 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-900"} p-1.5 rounded-md`}>
                {theme === "light" ? <Moon className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} /> : <Sun className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />}
            </button>
         </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 text-sm flex-1">
          <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-900"} cursor-pointer ${theme === "light" ? "text-gray-600" : "text-gray-400"} font-semibold text-xs`}>
            <Inbox className="w-4 h-4" />
            <span>Inbox</span>
          </div>
          <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-900"} cursor-pointer ${theme === "light" ? "text-gray-600" : "text-gray-400"} font-semibold text-xs`}>
            <User className="w-4 h-4" />
            <span>My Issues</span>
          </div>

          <div className="pt-4">
            <div onClick={() => setShowWorkspace(!showWorkspace)} className={`flex items-center gap-2 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md cursor-pointer px-2 py-1 text-xs ${theme === "light" ? "text-gray-600" : "text-gray-500"} font-medium`}>
              <button className="cursor-pointer text-xs font-semibold">Workspace</button>
              <ChevronDown className={`w-3 h-3 ml-auto ${theme === "light" ? "text-gray-500" : "text-gray-400"}`} />
            </div>
            <div className={`mt-1 space-y-0.5 ${showWorkspace ? "block" : "hidden"}`}>
              <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} cursor-pointer ${theme === "light" ? "text-gray-600" : "text-gray-400"} font-semibold text-xs`}>
                <Package className="w-4 h-4" />
                <span>Projects</span>
              </div>
              <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} cursor-pointer ${theme === "light" ? "text-gray-600" : "text-gray-400"} font-semibold text-xs`}>
                <AgentIcon className="w-4 h-4" />
                <span>Agents</span>
              </div>
              <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} cursor-pointer ${theme === "light" ? "text-gray-600" : "text-gray-400"} font-semibold text-xs`}>
                <Receipt className="w-4 h-4" />
                <span>Invoices</span>
              </div>
              <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} cursor-pointer ${theme === "light" ? "text-gray-600" : "text-gray-400"} font-semibold text-xs`}>
                <File className="w-4 h-4"/>
                <span>Documents</span>
              </div>
              <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} cursor-pointer ${theme === "light" ? "text-gray-600" : "text-gray-400"} font-semibold text-xs`}>
                <View className="w-4 h-4" />
                <span>Views</span>
              </div>
                <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} cursor-pointer ${theme === "light" ? "text-gray-600" : "text-gray-400"} font-semibold text-xs`}>
                <MoreHorizontal className="w-4 h-4" />
                <span>More</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <div onClick={() => setShowTeams(!showTeams)} className="flex items-center gap-2 px-2 py-1 text-xs text-gray-500 hover:bg-neutral-900 rounded-md cursor-pointer font-medium">
              <button className="cursor-pointer text-xs font-semibold">Your teams</button>
              <ChevronDown className="w-3 h-3 ml-auto text-gray-400" />
            </div>
            <div className="mt-1">
              <div className={`flex items-center gap-2 px-2 py-1 text-gray-400 font-semibold ${showTeams ? "block" : "hidden"}`}>
                <div className="h-4 w-4 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[8px] font-bold">
                  IN
                </div>
                <span>Interlud</span>
                <ChevronDown className="w-3 h-3 ml-auto text-gray-400" />
              </div>
              <div className={`ml-6 mt-1 space-y-0.5 ${showTeams ? "block" : "hidden"}`}>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-neutral-900 cursor-pointer text-gray-400 font-semibold text-xs">
                  <Circle className="w-3 h-3" />
                  <span>Issues</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-400 font-semibold text-xs">
                  <Settings className="w-3 h-3" />
                  <span>Projects</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-400 font-semibold text-xs">
                  <LayoutGrid className="w-3 h-3" />
                  <span>Views</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 mt-auto">
            <div onClick={() => setShowTry(!showTry)} className="flex items-center gap-2 px-2 py-1 text-xs text-gray-500 hover:bg-neutral-900 rounded-md cursor-pointer font-medium mb-2">
              <button className="cursor-pointer text-xs font-semibold">Try</button>
              <ChevronDown className="w-3 h-3 ml-auto text-gray-400" />
            </div>
            <div className={`space-y-0.5 text-sm ${showTry ? "block" : "hidden"}`}>
              <button className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-900 cursor-pointer font-semibold text-xs">
                <Download className="w-4 h-4" />
                <span>Import issues</span>
              </button>
              <button className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-900 cursor-pointer font-semibold text-xs">
                <UserPlus className="w-4 h-4" />
                <span>Invite people</span>
              </button>
              <button className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-900 cursor-pointer font-semibold text-xs">
                <FaGithub className="w-4 h-4" />
                <span>Link GitHub</span>
              </button>
            </div>
          </div>
        </nav>
      </aside>

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
            <button onClick={toggleTheme} className={`p-1.5 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md`}>
              {theme === "light" ? <Moon className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} /> : <Sun className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />}
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
