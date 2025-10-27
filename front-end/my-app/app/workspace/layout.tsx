"use client";
import SidebarUser from "@/components/SidebarUser";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for user */}
      <SidebarUser />
      {/* Scrollable main section */}
      <main className="flex-1 overflow-y-auto px-8 py-6">
        {children}
      </main>
    </div>
  );
}
