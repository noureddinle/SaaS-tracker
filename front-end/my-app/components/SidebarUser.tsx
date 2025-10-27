"use client";
import Link from "next/link";
import { Home, FileText, Users, Briefcase, Settings } from "lucide-react";

export default function SidebarUser() {
  return (
    <aside className="w-64 bg-white border-r h-screen sticky top-0 flex flex-col justify-between">
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Freelancer</h2>
        <nav className="space-y-4">
          <Link href="/workspace" className="flex items-center gap-3 text-gray-700 hover:text-black"><Home size={18}/>Overview</Link>
          <Link href="/workspace/invoices" className="flex items-center gap-3 text-gray-700 hover:text-black"><FileText size={18}/>Invoices</Link>
          <Link href="/workspace/agents" className="flex items-center gap-3 text-gray-700 hover:text-black"><Users size={18}/>Agents</Link>
          <Link href="/workspace/jobs" className="flex items-center gap-3 text-gray-700 hover:text-black"><Briefcase size={18}/>Jobs</Link>
          <Link href="/workspace/settings" className="flex items-center gap-3 text-gray-700 hover:text-black"><Settings size={18}/>Settings</Link>
        </nav>
      </div>
      <div className="p-4 text-center border-t text-sm text-gray-500">
        © 2025 Freelancer Tracker
      </div>
    </aside>
  );
}
