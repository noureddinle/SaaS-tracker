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
  Sidebar,
  TangentIcon as AgentIcon,
  PackageOpen,
  PackageCheck,
  PackageX,
  PackagePlus,
  PackageMinus,
  View,
  Plus,
  SlidersHorizontal,
  Eye,
  Circle,
  MoreHorizontal,
  Github,
  UserPlus,
  Download
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "backlog">("active");
  const [showWorkspace, setShowWorkspace] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

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

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-800 px-3 py-4 flex flex-col">
        {/* Workspace header */}
        <div className="flex items-center gap-2 px-2 py-2 mb-6 hover:bg-neutral-900 rounded-md cursor-pointer">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
            IN
          </div>
          <span className="text-sm font-semibold">Interlud</span>
          <ChevronDown className=" w-4 h-4 text-gray-500" />
          {/* Top actions */}
         <div className="flex gap-1 px-2 ml-auto">
            <button className="flex-1 hover:bg-neutral-900 p-1.5 rounded-md">
                <Search className="w-4 h-4 text-gray-400" />
            </button>
            <button className="flex-1 hover:bg-neutral-900 p-1.5 rounded-md">
                <Edit className="w-4 h-4 text-gray-400" />
            </button>
         </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 text-sm flex-1">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-300 font-semibold">
            <Inbox className="w-4 h-4" />
            <span>Inbox</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-300 font-semibold">
            <User className="w-4 h-4" />
            <span>My Issues</span>
          </div>

          <div className="pt-4">
            <div className="flex items-center gap-2 hover:bg-neutral-900 rounded-md cursor-pointer px-2 py-1 text-xs text-gray-500 font-medium">
              <button onClick={() => setShowWorkspace(!showWorkspace)} className="cursor-pointer">Workspace</button>
              <ChevronDown className="w-3 h-3 ml-auto" />
            </div>
            <div className={`mt-1 space-y-0.5 ${showWorkspace ? "block" : "hidden"}`}>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-300 font-semibold">
                <Package className="w-4 h-4" />
                <span>Projects</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-300 font-semibold">
                <AgentIcon className="w-4 h-4" />
                <span>Agents</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-300 font-semibold">
                <View className="w-4 h-4" />
                <span>Views</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-300 font-semibold">
                <MoreHorizontal className="w-4 h-4" />
                <span>More</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <div className="flex items-center gap-2 px-2 py-1 text-xs text-gray-500 font-medium">
              <span>Your teams</span>
              <ChevronDown className="w-3 h-3 ml-auto" />
            </div>
            <div className="mt-1">
              <div className="flex items-center gap-2 px-2 py-1 text-gray-300 font-semibold">
                <div className="h-4 w-4 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[8px] font-bold">
                  IN
                </div>
                <span>Interlud</span>
                <ChevronDown className="w-3 h-3 ml-auto" />
              </div>
              <div className="ml-6 mt-1 space-y-0.5">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-neutral-900 cursor-pointer text-white font-semibold">
                  <Circle className="w-3 h-3" />
                  <span>Issues</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-300 font-semibold">
                  <Settings className="w-3 h-3" />
                  <span>Projects</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-300 font-semibold">
                  <LayoutGrid className="w-3 h-3" />
                  <span>Views</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Bottom section */}
        <div className="pt-4 border-t border-neutral-800 mt-auto">
          <div className="flex items-center gap-2 px-2 py-1 text-xs text-gray-500 font-medium mb-2">
            <span>Try</span>
            <ChevronDown className="w-3 h-3 ml-auto" />
          </div>
          <div className="space-y-0.5 text-sm">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-300 font-semibold">
              <Download className="w-4 h-4" />
              <span>Import issues</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-300 font-semibold">
              <UserPlus className="w-4 h-4" />
              <span>Invite people</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-300 font-semibold">
              <FaGithub className="w-4 h-4" />
              <span>Link GitHub</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="border-b border-neutral-800 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white font-semibold">
              <Circle className="w-4 h-4" />
              <span>All issues</span>
            </button>
            <button className="flex items-center gap-2 text-sm text-white border-b-2 border-white pb-[13px] -mb-[13px] font-semibold">
              <Circle className="w-4 h-4" />
              <span>Active</span>
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white font-semibold">
              <LayoutGrid className="w-4 h-4" />
              <span>Backlog</span>
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white font-semibold">
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-neutral-900 rounded-md">
              <Bell className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-1.5 hover:bg-neutral-900 rounded-md">
              <LayoutGrid className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </header>

        {/* Toolbar */}
        <div className="border-b border-neutral-800 px-6 py-3 flex items-center justify-between">
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white px-2 py-1 hover:bg-neutral-900 rounded-md font-semibold">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter</span>
          </button>

          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white px-2 py-1 hover:bg-neutral-900 rounded-md font-semibold">
            <Eye className="w-4 h-4" />
            <span>Display</span>
          </button>
        </div>

        {/* Issues list */}
        <div className="flex-1 px-6">
          {/* Todo section */}
          <div className="py-4">
            <div className="flex items-center gap-2 mb-4">
              <Circle className="w-4 h-4 text-gray-500" />
              <h2 className="text-sm font-semibold text-gray-400">Todo</h2>
              <span className="text-sm text-gray-600">4</span>
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
                  <span className="text-sm flex-1">{issue.title}</span>
                  <span className="text-sm text-gray-600">({issue.number})</span>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
                    <div className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center">
                      <User className="w-3 h-3 text-gray-500" />
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">{issue.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
