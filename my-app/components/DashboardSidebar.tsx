"use client";

import { useState } from "react";
import { 
  Search, 
  Edit, 
  Inbox, 
  User, 
  ChevronDown,
  Package,
  TangentIcon as AgentIcon,
  MoreHorizontal,
  UserPlus,
  Download,
  File,
  Receipt,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useTheme } from "@/lib/ThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [showWorkspace, setShowWorkspace] = useState(true);
  const [showTry, setShowTry] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <aside className={`w-54 border-r ${theme === "light" ? "border-gray-200" : "border-gray-900"} px-5 py-4 flex flex-col`}>
      {/* Workspace header */}
      <div className={`flex items-center gap-2 px-1 py-1 mb-6 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-900"} rounded-md cursor-pointer`}>
        <div className="h-6 w-6 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-semibold text-white">
          IN
        </div>
        <span className="text-sm font-semibold">Interlud</span>
        <ChevronDown className={`w-4 h-4 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`} />
        <div className="flex gap-1 px-2 ml-auto">
          <button className={`flex-1 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-900"} p-1.5 rounded-md`}>
            <Search className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
          </button>
          <button className={`flex-1 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-900"} p-1.5 rounded-md`}>
            <Edit className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 text-sm flex-1">
        <Link href="/dashboard/inbox">
          <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${
            isActive("/dashboard/inbox") 
              ? theme === "light" ? "bg-gray-100 text-gray-900" : "bg-neutral-900 text-white"
              : theme === "light" ? "hover:bg-gray-100 text-gray-600" : "hover:bg-gray-900 text-gray-400"
          } cursor-pointer font-semibold text-xs`}>
            <Inbox className="w-4 h-4" />
            <span>Inbox</span>
          </div>
        </Link>
        <Link href="/dashboard">
          <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${
            isActive("/dashboard") 
              ? theme === "light" ? "bg-gray-100 text-gray-900" : "bg-neutral-900 text-white"
              : theme === "light" ? "hover:bg-gray-100 text-gray-600" : "hover:bg-gray-900 text-gray-400"
          } cursor-pointer font-semibold text-xs`}>
            <User className="w-4 h-4" />
            <span>My Issues</span>
          </div>
        </Link>

        <div className="pt-4">
          <div onClick={() => setShowWorkspace(!showWorkspace)} className={`flex items-center gap-2 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md cursor-pointer px-2 py-1 text-xs ${theme === "light" ? "text-gray-600" : "text-gray-500"} font-medium`}>
            <button className="cursor-pointer text-xs font-semibold">Workspace</button>
            <ChevronDown className={`w-3 h-3 ml-auto ${theme === "light" ? "text-gray-500" : "text-gray-400"}`} />
          </div>
          <div className={`mt-1 space-y-0.5 ${showWorkspace ? "block" : "hidden"}`}>
            <Link href="/dashboard/projects">
              <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${
                isActive("/dashboard/projects") 
                  ? theme === "light" ? "bg-gray-100 text-gray-900" : "bg-neutral-900 text-white"
                  : theme === "light" ? "hover:bg-gray-100 text-gray-600" : "hover:bg-neutral-900 text-gray-400"
              } cursor-pointer font-semibold text-xs`}>
                <Package className="w-4 h-4" />
                <span>Projects</span>
              </div>
            </Link>
            <Link href="/dashboard/agents">
              <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${
                pathname?.startsWith("/dashboard/agents") || isActive("/dashboard")
                  ? theme === "light" ? "bg-gray-100 text-gray-900" : "bg-neutral-900 text-white"
                  : theme === "light" ? "hover:bg-gray-100 text-gray-600" : "hover:bg-neutral-900 text-gray-400"
              } cursor-pointer font-semibold text-xs`}>
                <AgentIcon className="w-4 h-4" />
                <span>Automations</span>
              </div>
            </Link>
            <Link href="/dashboard/invoices">
              <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${
                isActive("/dashboard/invoices") 
                  ? theme === "light" ? "bg-gray-100 text-gray-900" : "bg-neutral-900 text-white"
                  : theme === "light" ? "hover:bg-gray-100 text-gray-600" : "hover:bg-neutral-900 text-gray-400"
              } cursor-pointer font-semibold text-xs`}>
                <Receipt className="w-4 h-4" />
                <span>Invoices</span>
              </div>
            </Link>
            <Link href="/dashboard/documents">
              <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${
                isActive("/dashboard/documents") 
                  ? theme === "light" ? "bg-gray-100 text-gray-900" : "bg-neutral-900 text-white"
                  : theme === "light" ? "hover:bg-gray-100 text-gray-600" : "hover:bg-neutral-900 text-gray-400"
              } cursor-pointer font-semibold text-xs`}>
                <File className="w-4 h-4"/>
                <span>Documents</span>
              </div>
            </Link>
            <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} cursor-pointer ${theme === "light" ? "text-gray-600" : "text-gray-400"} font-semibold text-xs`}>
              <MoreHorizontal className="w-4 h-4" />
              <span>More</span>
            </div>
          </div>
        </div>
        
        <div className="pt-4 mt-auto">
          <div onClick={() => setShowTry(!showTry)} className={`flex items-center gap-2 px-2 py-1 text-xs text-gray-500 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md cursor-pointer font-medium mb-2`}>
            <button className="cursor-pointer text-xs font-semibold">Try</button>
            <ChevronDown className="w-3 h-3 ml-auto" />
          </div>
          <div className={`space-y-0.5 text-sm ${showTry ? "block" : "hidden"}`}>
            <Link href="/dashboard/import-export">
              <button className={`flex items-center gap-2 px-2 py-1.5 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md cursor-pointer font-semibold text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"} w-full`}>
                <Download className="w-4 h-4" />
                <span>Import issues</span>
              </button>
            </Link>
            <button className={`flex items-center gap-2 px-2 py-1.5 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md cursor-pointer font-semibold text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"} w-full`}>
              <UserPlus className="w-4 h-4" />
              <span>Invite people</span>
            </button>
            <Link href="/dashboard/integrations/github">
              <button className={`flex items-center gap-2 px-2 py-1.5 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md cursor-pointer font-semibold text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"} w-full`}>
                <FaGithub className="w-4 h-4" />
                <span>Link GitHub</span>
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </aside>
  );
}

