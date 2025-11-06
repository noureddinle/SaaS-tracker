"use client";

import { useState } from "react";
import { Bell, ChevronLeft, Plus, ChevronRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useTheme } from "@/theme/ThemeContext";

export default function GitHubIntegrationPage() {
  const { theme } = useTheme();
  const [isConnected, setIsConnected] = useState(false);
  const [privateRepos, setPrivateRepos] = useState(true);
  const [publicRepos, setPublicRepos] = useState(false);
  const [linkCommits, setLinkCommits] = useState(false);
  const [branchFormat, setBranchFormat] = useState("username/identifier-title");

  return (
    <div className={`min-h-screen flex ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
      <DashboardSidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Top bar */}
        <header className={`border-b ${theme === "light" ? "border-gray-200" : "border-gray-900"} px-6 py-3 flex items-center justify-between sticky top-0 ${theme === "light" ? "bg-white" : "bg-black"} z-10`}>
          <div className="flex items-center gap-3">
            <button className={`flex items-center gap-1 text-xs ${theme === "light" ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"}`}>
              <ChevronLeft className="w-4 h-4" />
              <span>Integrations</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className={`p-1.5 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md`}>
              <Bell className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
            </button>
          </div>
        </header>

        <div className="px-6 py-8 max-w-5xl w-full mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${theme === "light" ? "bg-gray-100" : "bg-gray-900"}`}>
                <FaGithub className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-semibold mb-2">GitHub</h1>
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  Automate your pull request and commit workflows and keep issues synced both ways
                </p>
              </div>
            </div>

            <div className={`border ${theme === "light" ? "border-gray-200" : "border-gray-800"} rounded-lg p-4 mb-6`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-500"} mb-1`}>BUILT BY</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs">📧</span>
                    <span className="text-sm font-medium">Linear</span>
                  </div>
                </div>
                <div>
                  <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-500"} mb-1`}>DOCS</p>
                  <a href="#" className={`flex items-center gap-1 text-sm ${theme === "light" ? "text-gray-900 hover:text-black" : "text-gray-300 hover:text-white"}`}>
                    <span className="text-xs">📄</span>
                    <span>Docs</span>
                  </a>
                </div>
                <button 
                  onClick={() => setIsConnected(!isConnected)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isConnected 
                      ? theme === "light" ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <FaGithub className="w-4 h-4" />
                  {isConnected ? "Connected" : "Enable"}
                </button>
              </div>

              {/* Preview Images */}
              <div className="grid grid-cols-2 gap-3">
                <div className={`rounded-lg overflow-hidden border ${theme === "light" ? "border-gray-200 bg-gray-50" : "border-gray-800 bg-gray-900"} aspect-video flex items-center justify-center`}>
                  <div className={`text-center p-4 ${theme === "light" ? "text-gray-400" : "text-gray-600"}`}>
                    <FaGithub className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-xs">Git branch integration</p>
                  </div>
                </div>
                <div className={`rounded-lg overflow-hidden border ${theme === "light" ? "border-gray-200 bg-gray-50" : "border-gray-800 bg-gray-900"} aspect-video flex items-center justify-center`}>
                  <div className={`text-center p-4 ${theme === "light" ? "text-gray-400" : "text-gray-600"}`}>
                    <FaGithub className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-xs">Issue sync</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Overview</h2>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"} mb-3`}>
                Linear's GitHub integration keeps your work in sync in both applications. It links issues to Pull Requests and commits so that issues update automatically from <span className="italic">In Progress</span> to <span className="italic">Done</span> as the PR moves from drafted to merged – there is no need to update the issue in Linear at all.
              </p>
              <button className={`text-sm ${theme === "light" ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"}`}>
                Read more
              </button>
            </div>
          </div>

          {/* Connected Organizations */}
          <div className={`border-t ${theme === "light" ? "border-gray-200" : "border-gray-800"} pt-6 mb-6`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Connected organizations</h2>
              <button className={`p-1.5 rounded-md ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-900"}`}>
                <Plus className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
              </button>
            </div>

            {/* Connection Status */}
            <div className={`flex items-center justify-between py-4 px-4 rounded-lg ${theme === "light" ? "bg-gray-50" : "bg-gray-950"} mb-6`}>
              <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                {isConnected ? "Personal GitHub account connected" : "Personal GitHub account not connected"}
              </span>
              <button className={`flex items-center gap-1 text-xs ${theme === "light" ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"}`}>
                <span>Connected accounts</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* GitHub Issues */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold mb-1">GitHub Issues</h3>
                  <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-500"}`}>
                    Automatically create issues and sync properties from GitHub repositories into Linear teams
                  </p>
                </div>
                <button className={`p-1.5 rounded-md ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-900"}`}>
                  <Plus className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
                </button>
              </div>
            </div>

            {/* Branch Format */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">Branch format</h3>
              <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-500"} mb-3`}>
                Linear helps you keep your git branch names aligned across your entire organization. Users can copy a git branch name for their issue using the <span className={`font-mono px-1 rounded ${theme === "light" ? "bg-gray-200" : "bg-gray-900"}`}>Copy git branch name</span> action ( <span className="font-mono">⌘</span> <span className="font-mono">⇧</span> <span className="font-mono">.</span> )
              </p>
              <div className="mb-1">
                <label className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-500"} mb-2 block`}>
                  Format
                </label>
                <select 
                  value={branchFormat}
                  onChange={(e) => setBranchFormat(e.target.value)}
                  className={`w-full px-3 py-2 rounded-md text-sm border ${
                    theme === "light" 
                      ? "bg-white border-gray-300 text-gray-900" 
                      : "bg-gray-950 border-gray-800 text-gray-300"
                  } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                >
                  <option value="username/identifier-title">username/identifier-title</option>
                  <option value="identifier-title">identifier-title</option>
                  <option value="username/identifier">username/identifier</option>
                  <option value="identifier">identifier</option>
                </select>
              </div>
            </div>

            {/* Linkbacks */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">Linkbacks</h3>
              <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-500"} mb-3`}>
                Automatically comment in GitHub with a link to the Linear issue. Private team issue titles will not be included in the comment.
              </p>
            </div>

            {/* Toggle Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <span className="text-sm font-medium">Private repositories</span>
                <button 
                  onClick={() => setPrivateRepos(!privateRepos)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privateRepos ? "bg-blue-600" : theme === "light" ? "bg-gray-300" : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      privateRepos ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-sm font-medium">Public repositories</span>
                <button 
                  onClick={() => setPublicRepos(!publicRepos)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    publicRepos ? "bg-blue-600" : theme === "light" ? "bg-gray-300" : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      publicRepos ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Link Commits */}
            <div className={`border-t ${theme === "light" ? "border-gray-200" : "border-gray-800"} mt-6 pt-6`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold mb-1">Link commits to issues with magic words</h3>
                  <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-500"}`}>
                    Include magic words in your commit messages to link GitHub commits to Linear issues. For example: 'Fixes ID-123' or 'Part of ID-123'.{" "}
                    <button className={`inline-flex items-center gap-0.5 ${theme === "light" ? "text-gray-700 hover:text-black" : "text-gray-400 hover:text-white"}`}>
                      Read more
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </p>
                </div>
                <button 
                  onClick={() => setLinkCommits(!linkCommits)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    linkCommits ? "bg-blue-600" : theme === "light" ? "bg-gray-300" : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      linkCommits ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
