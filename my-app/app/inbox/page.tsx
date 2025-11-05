"use client";

import { useState } from "react";
import { 
  Search, 
  Edit, 
  Bell, 
  LayoutGrid, 
  Inbox as InboxIcon, 
  User, 
  ChevronDown,
  Settings,
  Package,
  TangentIcon as AgentIcon,
  View,
  SlidersHorizontal,
  Circle,
  MoreHorizontal,
  UserPlus,
  Download,
  File,
  Receipt,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function InboxPage() {
  const [showWorkspace, setShowWorkspace] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [showTry, setShowTry] = useState(false);

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Sidebar */}
      <aside className="w-54 border-r border-neutral-900 px-5 py-4 flex flex-col">
        {/* Workspace header */}
        <div className="flex items-center gap-2 px-1 py-1 mb-6 hover:bg-neutral-900 rounded-md cursor-pointer">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-semibold">
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
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-neutral-900 cursor-pointer text-white font-semibold text-xs">
            <InboxIcon className="w-4 h-4" />
            <span>Inbox</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-400 font-semibold text-xs">
            <User className="w-4 h-4" />
            <span>My Issues</span>
          </div>

          <div className="pt-4">
            <div className="flex items-center gap-2 hover:bg-neutral-900 rounded-md cursor-pointer px-2 py-1 text-xs text-gray-500 font-medium">
              <button onClick={() => setShowWorkspace(!showWorkspace)} className="cursor-pointer">Workspace</button>
              <ChevronDown className="w-3 h-3 ml-auto" />
            </div>
            <div className={`mt-1 space-y-0.5 ${showWorkspace ? "block" : "hidden"}`}>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-400 font-semibold text-xs">
                <Package className="w-4 h-4" />
                <span>Projects</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-400 font-semibold text-xs">
                <AgentIcon className="w-4 h-4" />
                <span>Agents</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-400 font-semibold text-xs">
                <Receipt className="w-4 h-4" />
                <span>Invoices</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-400 font-semibold text-xs">
                <File className="w-4 h-4"/>
                <span>Documents</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-400 font-semibold text-xs">
                <View className="w-4 h-4" />
                <span>Views</span>
              </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-400 font-semibold text-xs">
                <MoreHorizontal className="w-4 h-4" />
                <span>More</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <div className="flex items-center gap-2 px-2 py-1 text-xs text-gray-500 hover:bg-neutral-900 rounded-md cursor-pointer font-medium">
              <button onClick={() => setShowTeams(!showTeams)} className="cursor-pointer">Your teams</button>
              <ChevronDown className="w-3 h-3 ml-auto" />
            </div>
            <div className="mt-1">
              <div className={`flex items-center gap-2 px-2 py-1 text-gray-400 font-semibold ${showTeams ? "block" : "hidden"}`}>
                <div className="h-4 w-4 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[8px] font-bold">
                  IN
                </div>
                <span>Interlud</span>
                <ChevronDown className="w-3 h-3 ml-auto" />
              </div>
              <div className={`ml-6 mt-1 space-y-0.5 ${showTeams ? "block" : "hidden"}`}>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-400 font-semibold text-xs">
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
            <div className="flex items-center gap-2 px-2 py-1 text-xs text-gray-500 hover:bg-neutral-900 rounded-md cursor-pointer font-medium mb-2">
              <button onClick={() => setShowTry(!showTry)} className="cursor-pointer">Try</button>
              <ChevronDown className="w-3 h-3 ml-auto" />
            </div>
            <div className={`space-y-0.5 text-sm ${showTry ? "block" : "hidden"}`}>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-400 font-semibold text-xs">
                <Download className="w-4 h-4" />
                <span>Import issues</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-400 font-semibold text-xs">
                <UserPlus className="w-4 h-4" />
                <span>Invite people</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-400 font-semibold text-xs">
                <FaGithub className="w-4 h-4" />
                <span>Link GitHub</span>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="border-b border-neutral-900 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-base font-semibold">Inbox</h1>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-neutral-900 rounded-md">
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-1.5 hover:bg-neutral-900 rounded-md">
              <Settings className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </header>

        {/* Empty state */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <InboxIcon className="w-24 h-24 text-gray-700 stroke-[1.5]" />
            </div>
            <p className="text-sm text-gray-500">No notifications</p>
          </div>
        </div>
      </main>
    </div>
  );
}

