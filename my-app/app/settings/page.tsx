"use client";

import { useState } from "react";
import { 
  Bell, 
  User, 
  CreditCard, 
  Users, 
  Key, 
  Palette, 
  Globe,
  Shield,
  Mail,
  Smartphone,
  Moon,
  Sun,
  Building,
  Plus,
  Trash2,
  Copy,
  Check,
} from "lucide-react";
import { useTheme } from "@/theme/ThemeContext";

type SettingsTab = "account" | "workspace" | "notifications" | "billing" | "team" | "security" | "api";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyKey = (key: string, keyId: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const tabs = [
    { id: "account" as SettingsTab, label: "Account", icon: User },
    { id: "workspace" as SettingsTab, label: "Workspace", icon: Building },
    { id: "notifications" as SettingsTab, label: "Notifications", icon: Bell },
    { id: "billing" as SettingsTab, label: "Billing", icon: CreditCard },
    { id: "team" as SettingsTab, label: "Team", icon: Users },
    { id: "security" as SettingsTab, label: "Security", icon: Shield },
    { id: "api" as SettingsTab, label: "API Keys", icon: Key },
  ];

  return (
    <div className={`min-h-screen flex ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Top bar */}
        <header className={`border-b ${theme === "light" ? "border-gray-100" : "border-gray-800"} px-6 py-3 flex items-center justify-between`}>
          <h1 className="text-lg font-semibold">Settings</h1>
          <div className="flex items-center gap-2">
            <button className={`p-1.5 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md`}>
              <Bell className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
            </button>
            <button onClick={toggleTheme} className={`p-1.5 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-900"} rounded-md`}>
              {theme === "light" ? <Moon className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} /> : <Sun className={`w-4 h-4 text-gray-400`} />}
            </button>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Sidebar Tabs */}
          <aside className={`w-56 border-r ${theme === "light" ? "border-gray-100" : "border-gray-800"} p-4`}>
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      activeTab === tab.id
                        ? theme === "light"
                          ? "bg-gray-100 text-gray-900 font-medium"
                          : "bg-gray-900 text-white font-medium"
                        : theme === "light"
                          ? "text-gray-600 hover:bg-gray-50"
                          : "text-gray-400 hover:bg-gray-950"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content Area */}
          <div className={`flex-1 overflow-auto ${theme === "light" ? "bg-white" : "bg-black-700"}`}>
            <div className="max-w-3xl mx-auto p-8">
              {/* Account Settings */}
              {activeTab === "account" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Account</h2>
                    <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Manage your personal account settings
                    </p>
                  </div>

                  {/* Profile Picture */}
                  <div className={`border-t ${theme === "light" ? "border-gray-100" : "border-gray-800"} pt-6`}>
                    <label className="block text-sm font-medium mb-3">Profile picture</label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-semibold">
                        IN
                      </div>
                      <button className={`px-4 py-2 text-sm rounded-md border ${
                        theme === "light" 
                          ? "border-gray-100 hover:bg-gray-50" 
                          : "border-gray-800 hover:bg-gray-900"
                      }`}>
                        Change photo
                      </button>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Full name</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className={`w-full px-3 py-2 rounded-md border text-sm ${
                        theme === "light"
                          ? "bg-white border-gray-100 text-gray-900"
                          : "bg-gray-950 border-gray-800 text-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="john@interlud.com"
                      className={`w-full px-3 py-2 rounded-md border text-sm ${
                        theme === "light"
                          ? "bg-white border-gray-100 text-gray-900"
                          : "bg-gray-950 border-gray-800 text-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  {/* Timezone */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Timezone</label>
                    <select
                      className={`w-full px-1 py-2 rounded-md border text-sm ${
                        theme === "light"
                          ? "bg-white border-gray-100 text-gray-900"
                          : "bg-gray-950 border-gray-800 text-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option>UTC (GMT+0:00)</option>
                      <option>Eastern Time (GMT-5:00)</option>
                      <option>Pacific Time (GMT-8:00)</option>
                      <option>Central European (GMT+1:00)</option>
                    </select>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-blue-950 hover:bg-purple-700 text-white text-sm rounded-md font-medium transition-colors">
                      Save changes
                    </button>
                  </div>
                </div>
              )}

              {/* Workspace Settings */}
              {activeTab === "workspace" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Workspace</h2>
                    <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Manage your workspace settings and preferences
                    </p>
                  </div>

                  <div className={`border-t ${theme === "light" ? "border-gray-100" : "border-gray-800"} pt-6`}>
                    <label className="block text-sm font-medium mb-2">Workspace name</label>
                    <input
                      type="text"
                      defaultValue="Interlud"
                      className={`w-full px-3 py-2 rounded-md border text-sm ${
                        theme === "light"
                          ? "bg-white border-gray-100 text-gray-900"
                          : "bg-gray-950 border-gray-800 text-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Workspace URL</label>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                        interlud.app/
                      </span>
                      <input
                        type="text"
                        defaultValue="workspace"
                        className={`flex-1 px-3 py-2 rounded-md border text-sm ${
                          theme === "light"
                            ? "bg-white border-gray-300 text-gray-900"
                            : "bg-gray-950 border-gray-800 text-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Default currency</label>
                    <select
                      className={`w-full px-3 py-2 rounded-md border text-sm ${
                        theme === "light"
                          ? "bg-white border-gray-100 text-gray-900"
                          : "bg-gray-950 border-gray-800 text-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option>USD - US Dollar</option>
                      <option>EUR - Euro</option>
                      <option>GBP - British Pound</option>
                      <option>CAD - Canadian Dollar</option>
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-blue-950 hover:bg-purple-700 text-white text-sm rounded-md font-medium transition-colors">
                      Save changes
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeTab === "notifications" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Notifications</h2>
                    <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Manage how you receive notifications
                    </p>
                  </div>

                  <div className={`border-t ${theme === "light" ? "border-gray-100" : "border-gray-800"} pt-6 space-y-4`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5" />
                        <div>
                          <p className="text-sm font-medium">Email notifications</p>
                          <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                            Receive email updates about your invoices
                          </p>
                        </div>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-950">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5" />
                        <div>
                          <p className="text-sm font-medium">Push notifications</p>
                          <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                            Get push notifications on your devices
                          </p>
                        </div>
                      </div>
                      <button className={`relative inline-flex h-6 w-11 items-center rounded-full ${theme === "light" ? "bg-gray-300" : "bg-gray-700"}`}>
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5" />
                        <div>
                          <p className="text-sm font-medium">Invoice reminders</p>
                          <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                            Remind me about overdue invoices
                          </p>
                        </div>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-950">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5" />
                        <div>
                          <p className="text-sm font-medium">Team activity</p>
                          <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                            Notify me when team members take actions
                          </p>
                        </div>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-950">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing */}
              {activeTab === "billing" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Billing</h2>
                    <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Manage your subscription and payment methods
                    </p>
                  </div>

                  <div className={`border-t ${theme === "light" ? "border-gray-100" : "border-gray-800"} pt-6`}>
                    <h3 className="text-sm font-medium mb-4">Current plan</h3>
                    <div className={`p-4 rounded-lg border ${theme === "light" ? "border-gray-100 bg-gray-50" : "border-gray-800 bg-gray-950"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-lg font-semibold">Professional</p>
                          <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                            $49/month
                          </p>
                        </div>
                        <button className={`px-4 py-2 text-sm rounded-md border ${
                          theme === "light" 
                            ? "border-gray-300 hover:bg-gray-100" 
                            : "border-gray-800 hover:bg-gray-900"
                        }`}>
                          Change plan
                        </button>
                      </div>
                      <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                        Next billing date: December 5, 2025
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-4">Payment method</h3>
                    <div className={`p-4 rounded-lg border ${theme === "light" ? "border-gray-100" : "border-gray-800"} flex items-center justify-between`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-7 rounded ${theme === "light" ? "bg-gray-200" : "bg-gray-800"} flex items-center justify-center text-xs font-semibold`}>
                          VISA
                        </div>
                        <div>
                          <p className="text-sm font-medium">•••• 4242</p>
                          <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                            Expires 12/2026
                          </p>
                        </div>
                      </div>
                      <button className={`text-sm ${theme === "light" ? "text-blue-600 hover:text-blue-700" : "text-blue-400 hover:text-blue-300"}`}>
                        Update
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-4">Billing history</h3>
                    <div className={`rounded-lg border ${theme === "light" ? "border-gray-100" : "border-gray-800"} overflow-hidden`}>
                      {[
                        { date: "Nov 5, 2025", amount: "$49.00", status: "Paid" },
                        { date: "Oct 5, 2025", amount: "$49.00", status: "Paid" },
                        { date: "Sep 5, 2025", amount: "$49.00", status: "Paid" },
                      ].map((invoice, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between p-4 ${
                            i !== 0 ? (theme === "light" ? "border-t border-gray-100" : "border-t border-gray-800") : ""
                          }`}
                        >
                          <div>
                            <p className="text-sm font-medium">{invoice.date}</p>
                            <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                              Invoice
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium">{invoice.amount}</span>
                            <span className={`text-xs px-2 py-1 rounded ${theme === "light" ? "bg-green-100 text-green-700" : "bg-green-950 text-green-400"}`}>
                              {invoice.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Team */}
              {activeTab === "team" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Team</h2>
                    <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Manage team members and permissions
                    </p>
                  </div>

                  <div className={`border-t ${theme === "light" ? "border-gray-100" : "border-gray-800"} pt-6`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium">Team members</h3>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-950 hover:bg-purple-700 text-white text-sm rounded-md font-medium transition-colors">
                        <Plus className="w-4 h-4" />
                        Invite member
                      </button>
                    </div>

                    <div className={`rounded-lg border ${theme === "light" ? "border-gray-100" : "border-gray-800"} overflow-hidden`}>
                      {[
                        { name: "John Doe", email: "john@interlud.com", role: "Owner" },
                        { name: "Jane Smith", email: "jane@interlud.com", role: "Admin" },
                        { name: "Bob Johnson", email: "bob@interlud.com", role: "Member" },
                      ].map((member, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between p-4 ${
                            i !== 0 ? (theme === "light" ? "border-t border-gray-100" : "border-t border-gray-800") : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-semibold">
                              {member.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{member.name}</p>
                              <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                                {member.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <select
                              defaultValue={member.role}
                              className={`px-3 py-1.5 text-sm rounded-md border ${
                                theme === "light"
                                  ? "bg-white border-gray-300 text-gray-900"
                                  : "bg-gray-950 border-gray-800 text-gray-300"
                              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            >
                              <option>Owner</option>
                              <option>Admin</option>
                              <option>Member</option>
                            </select>
                            {member.role !== "Owner" && (
                              <button className={`p-1.5 rounded-md ${theme === "light" ? "hover:bg-red-50 text-red-600" : "hover:bg-red-950 text-red-400"}`}>
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Security */}
              {activeTab === "security" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Security</h2>
                    <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Manage your security settings
                    </p>
                  </div>

                  <div className={`border-t ${theme === "light" ? "border-gray-100" : "border-gray-800"} pt-6`}>
                    <h3 className="text-sm font-medium mb-4">Password</h3>
                    <div className="space-y-3">
                      <input
                        type="password"
                        placeholder="Current password"
                        className={`w-full px-3 py-2 rounded-md border text-sm ${
                          theme === "light"
                            ? "bg-white border-gray-300 text-gray-900"
                            : "bg-gray-950 border-gray-700 text-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      <input
                        type="password"
                        placeholder="New password"
                        className={`w-full px-3 py-2 rounded-md border text-sm ${
                          theme === "light"
                            ? "bg-white border-gray-300 text-gray-900"
                            : "bg-gray-950 border-gray-700 text-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className={`w-full px-3 py-2 rounded-md border text-sm ${
                          theme === "light"
                            ? "bg-white border-gray-300 text-gray-900"
                            : "bg-gray-950 border-gray-700 text-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md font-medium transition-colors">
                        Update password
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-4">Two-factor authentication</h3>
                    <div className={`p-4 rounded-lg border ${theme === "light" ? "border-gray-100 bg-gray-50" : "border-gray-800 bg-gray-950"}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium mb-1">Status: Not enabled</p>
                          <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <button className={`px-4 py-2 text-sm rounded-md border ${
                          theme === "light" 
                            ? "border-gray-300 hover:bg-white" 
                            : "border-gray-700 hover:bg-gray-900"
                        }`}>
                          Enable 2FA
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-4">Active sessions</h3>
                    <div className={`rounded-lg border ${theme === "light" ? "border-gray-100" : "border-gray-800"} overflow-hidden`}>
                      {[
                        { device: "Chrome on Mac", location: "San Francisco, US", lastActive: "Active now" },
                        { device: "Safari on iPhone", location: "San Francisco, US", lastActive: "2 hours ago" },
                      ].map((session, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between p-4 ${
                            i !== 0 ? (theme === "light" ? "border-t border-gray-100" : "border-t border-gray-800") : ""
                          }`}
                        >
                          <div>
                            <p className="text-sm font-medium">{session.device}</p>
                            <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                              {session.location} • {session.lastActive}
                            </p>
                          </div>
                          {i !== 0 && (
                            <button className={`text-sm ${theme === "light" ? "text-red-600 hover:text-red-700" : "text-red-400 hover:text-red-300"}`}>
                              Revoke
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* API Keys */}
              {activeTab === "api" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">API Keys</h2>
                    <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Manage your API keys for integrations
                    </p>
                  </div>

                  <div className={`border-t ${theme === "light" ? "border-gray-100" : "border-gray-800"} pt-6`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium">Your API keys</h3>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md font-medium transition-colors">
                        <Plus className="w-4 h-4" />
                        Create new key
                      </button>
                    </div>

                    <div className="space-y-3">
                      {[
                        { name: "Production API Key", key: "pk_live_51R19qh...", created: "Oct 15, 2025" },
                        { name: "Test API Key", key: "pk_test_51R19qh...", created: "Sep 1, 2025" },
                      ].map((apiKey, i) => (
                        <div
                          key={i}
                          className={`p-4 rounded-lg border ${theme === "light" ? "border-gray-100" : "border-gray-800"}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">{apiKey.name}</p>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleCopyKey(apiKey.key, `key-${i}`)}
                                className={`p-1.5 rounded-md ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-900"}`}
                              >
                                {copiedKey === `key-${i}` ? (
                                  <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                              <button className={`p-1.5 rounded-md ${theme === "light" ? "hover:bg-red-50 text-red-600" : "hover:bg-red-950 text-red-400"}`}>
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <code className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"} font-mono`}>
                            {apiKey.key}
                          </code>
                          <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"} mt-2`}>
                            Created {apiKey.created}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className={`mt-6 p-4 rounded-lg ${theme === "light" ? "bg-yellow-50 border border-yellow-200" : "bg-yellow-950/20 border border-yellow-900"}`}>
                      <p className={`text-sm font-medium mb-1 ${theme === "light" ? "text-yellow-800" : "text-yellow-400"}`}>
                        Keep your keys secure
                      </p>
                      <p className={`text-xs ${theme === "light" ? "text-yellow-700" : "text-yellow-500"}`}>
                        Never share your API keys publicly or commit them to version control.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

