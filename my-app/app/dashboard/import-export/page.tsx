"use client";

import { Bell, Upload, Download, Terminal, FileText } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useTheme } from "@/lib/ThemeContext";

export default function ImportExportPage() {
  const { theme } = useTheme();

  const integrations = [
    { name: "Asana", icon: "📋", description: "Import projects and tasks" },
    { name: "Shortcut", icon: "⚡", description: "Import stories and epics" },
    { name: "GitHub", icon: "🐙", description: "Import issues and PRs" },
    { name: "Jira", icon: "🔷", description: "Import issues and projects" },
    { name: "Linear", icon: "📐", description: "Import from another workspace" },
  ];

  return (
    <div className={`min-h-screen flex ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
      <DashboardSidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className={`border-b ${theme === "light" ? "border-gray-200" : "border-gray-900"} px-6 py-3 flex items-center justify-between`}>
          <h1 className="text-lg font-semibold">Import & Export</h1>
          <div className="flex items-center gap-2">
            <button className={`p-1.5 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md`}>
              <Bell className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto px-6 py-8">
          {/* Import Assistant */}
          <section className="mb-12 max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Upload className={`w-5 h-5 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`} />
              <h2 className="text-lg font-semibold">Import Assistant</h2>
            </div>
            <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"} mb-6`}>
              Import your data from other tools to get started quickly
            </p>

            <div className="grid grid-cols-2 gap-3">
              {integrations.map((integration) => (
                <button
                  key={integration.name}
                  className={`flex items-start gap-3 p-4 rounded-lg border ${
                    theme === "light" 
                      ? "border-gray-200 hover:border-gray-300 hover:bg-gray-50" 
                      : "border-gray-800 hover:border-gray-700 hover:bg-gray-950"
                  } transition-all text-left`}
                >
                  <span className="text-2xl">{integration.icon}</span>
                  <div className="flex-1">
                    <h3 className={`text-sm font-semibold mb-0.5 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                      {integration.name}
                    </h3>
                    <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                      {integration.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* CLI Importer */}
          <section className={`mb-12 max-w-4xl pb-8 border-b ${theme === "light" ? "border-gray-200" : "border-gray-800"}`}>
            <div className="flex items-center gap-2 mb-4">
              <Terminal className={`w-5 h-5 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`} />
              <h2 className="text-lg font-semibold">CLI Importer</h2>
            </div>
            <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"} mb-4`}>
              Use our command-line tool for advanced imports
            </p>
            <div className={`p-4 rounded-lg ${theme === "light" ? "bg-gray-100" : "bg-gray-950"} font-mono text-sm`}>
              <code className={theme === "light" ? "text-gray-800" : "text-gray-300"}>
                npx @linear/import --source=csv --file=data.csv
              </code>
            </div>
          </section>

          {/* Export */}
          <section className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Download className={`w-5 h-5 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`} />
              <h2 className="text-lg font-semibold">Export</h2>
            </div>
            <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"} mb-6`}>
              Export your data for backup or migration
            </p>

            <button
              className={`flex items-center gap-3 p-4 rounded-lg border ${
                theme === "light" 
                  ? "border-gray-200 hover:border-gray-300 hover:bg-gray-50" 
                  : "border-gray-800 hover:border-gray-700 hover:bg-gray-950"
              } transition-all w-full text-left`}
            >
              <FileText className={`w-5 h-5 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
              <div className="flex-1">
                <h3 className={`text-sm font-semibold mb-0.5 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                  Export to CSV
                </h3>
                <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                  Download all your issues and projects as CSV
                </p>
              </div>
              <Download className={`w-4 h-4 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`} />
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
