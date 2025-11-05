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
  SlidersHorizontal,
  Circle,
  MoreHorizontal,
  UserPlus,
  Download,
  File,
  Receipt,
  Eye,
  Plus,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function ProjectsPage() {
  const [showWorkspace, setShowWorkspace] = useState(true);
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
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-900 cursor-pointer text-gray-400 font-semibold text-xs">
            <Inbox className="w-4 h-4" />
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
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-neutral-900 cursor-pointer text-white font-semibold text-xs">
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
      <main className="flex-1 flex flex-col bg-neutral-950">
        {/* Top bar */}
        <header className="border-b border-neutral-900 px-6 py-3 flex items-center justify-between bg-black">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-gray-400" />
              <h1 className="text-base font-semibold">All projects</h1>
            </div>
            <button className="p-1.5 hover:bg-neutral-900 rounded-md">
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white font-semibold">
              <span>New view</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-neutral-900 rounded-md">
              <LayoutGrid className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-1.5 hover:bg-neutral-900 rounded-md">
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </header>

        {/* Toolbar */}
        <div className="border-b border-neutral-900 px-6 py-3 flex items-center justify-between bg-black">
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white px-2 py-1 hover:bg-neutral-900 rounded-md font-semibold">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter</span>
          </button>

          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white px-2 py-1 hover:bg-neutral-900 rounded-md font-semibold">
            <Eye className="w-4 h-4" />
            <span>Display</span>
          </button>
        </div>

        {/* Empty state */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center max-w-md text-center">
            <div className="mb-6">
              <svg 
                className="w-32 h-32 text-gray-700" 
                viewBox="0 0 100 100" 
                fill="none" 
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Cube illustration */}
                <path d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z" />
                <path d="M50 20 L50 50" />
                <path d="M20 35 L50 50" />
                <path d="M80 35 L50 50" />
                <path d="M35 27.5 L35 42.5 L50 50 L65 42.5 L65 27.5" />
                <path d="M35 42.5 L20 50" />
                <path d="M65 42.5 L80 50" />
                <path d="M50 50 L50 65" />
                <path d="M35 57.5 L35 72.5" />
                <path d="M65 57.5 L65 72.5" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Projects are larger units of work with a clear<br />
              outcome, such as a new feature you want to ship.<br />
              They can be shared across multiple teams and<br />
              are comprised of issues and optional documents.
            </p>
            <div className="flex gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
                Create new project
                <span className="text-xs bg-blue-700 px-1.5 py-0.5 rounded">N</span>
                <span className="text-xs text-gray-300">then</span>
                <span className="text-xs bg-blue-700 px-1.5 py-0.5 rounded">P</span>
              </button>
              <button className="border border-neutral-700 hover:bg-neutral-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Documentation
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

