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
  Circle,
  MoreHorizontal,
  UserPlus,
  Download,
  File,
  Receipt,
  ChevronRight,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { 
  SiAsana, 
  SiJira,
} from "react-icons/si";

export default function ImportExportPage() {
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
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-neutral-900 cursor-pointer text-white font-semibold text-xs">
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
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Content wrapper */}
        <div className="max-w-4xl mx-auto w-full px-8 py-12">
          <h1 className="text-3xl font-semibold mb-12">Import / Export</h1>

          {/* Import assistant section */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold mb-4">Import assistant</h2>
            <p className="text-sm text-gray-400 mb-6">
              If you use another service to track issues, this tool will create a copy of them in Linear.{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">
                Docs
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>

            {/* Integration cards - 2x2 grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Asana */}
              <button className="flex items-center justify-between p-4 rounded-lg border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 transition-all text-left">
                <div className="flex items-center gap-3">
                  <SiAsana className="w-5 h-5 text-red-400" />
                  <span className="text-sm font-medium">Asana</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>

              {/* Shortcut */}
              <button className="flex items-center justify-between p-4 rounded-lg border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 transition-all text-left">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">/</span>
                  </div>
                  <span className="text-sm font-medium">Shortcut</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>

              {/* GitHub */}
              <button className="flex items-center justify-between p-4 rounded-lg border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 transition-all text-left">
                <div className="flex items-center gap-3">
                  <FaGithub className="w-5 h-5" />
                  <span className="text-sm font-medium">GitHub</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>

              {/* Jira */}
              <button className="flex items-center justify-between p-4 rounded-lg border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 transition-all text-left">
                <div className="flex items-center gap-3">
                  <SiJira className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">Jira</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Linear to Linear import */}
            <button className="w-full mt-4 p-4 rounded-lg border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 transition-all text-left">
              <div className="flex items-center gap-3 mb-1">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-500 to-pink-500"></div>
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                  <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-500 to-pink-500"></div>
                </div>
                <span className="text-sm font-medium">Linear to Linear import</span>
                <ChevronRight className="w-4 h-4 text-gray-500 ml-auto" />
              </div>
              <p className="text-xs text-gray-500 ml-9">Import data from an existing Linear workspace</p>
            </button>
          </section>

          {/* CLI importer section */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold mb-4">CLI importer</h2>
            <p className="text-sm text-gray-400 mb-4">
              If you prefer using the command line or want to make custom modifications, use our open source importer 
              which imports issues into Linear from CSV files. It supports Asana (CSV), Jira (CSV), GitHub (API), 
              Pivotal Tracker (CSV), Shortcut (CSV), Trello (JSON).
            </p>
            <a 
              href="#" 
              className="text-sm text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
            >
              Go to Linear CLI Importer
              <ExternalLink className="w-3 h-3" />
            </a>
          </section>

          {/* Export section */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Export</h2>
            <p className="text-sm text-gray-400 mb-6">
              You can export your issue data in CSV format. Once the export is available, we&apos;ll email you the download link.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Export CSV
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

