import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sidebar } from "@/components/Sidebar";

export default function WorkspaceHome() {
  const router = useRouter();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("invoices");
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Sample data for the table
  const recentInvoices = [
    {
      id: 1,
      client: "Acme Corp",
      lastActivity: "10/21/2025, 10:29:20 PM",
      status: "Paid",
      amount: "12,500 MAD",
      dueDate: "10/15/2025",
      progress: 100,
    },
  ];

  return (
    <View className={`flex-1 flex-row ${isDark ? "bg-[#1F1F1F]" : "bg-gray-50"}`}>
      {/* Sidebar */}
      <Sidebar 
        isVisible={sidebarVisible} 
        onToggle={() => setSidebarVisible(!sidebarVisible)} 
      />

      {/* Main Content */}
      <ScrollView className="flex-1">
        <View className="p-6">
          {/* Header Bar */}
          <View className="flex-row items-center justify-between mb-6">
            {!sidebarVisible && (
              <TouchableOpacity onPress={() => setSidebarVisible(true)}>
                <Feather
                  name="menu"
                  size={24}
                  color={isDark ? "#FFFFFF" : "#000000"}
                />
              </TouchableOpacity>
            )}
            <View className="flex-1" />
            <ThemeToggle size={20} />
          </View>
        {/* Header Section */}
        <View className="mb-8 mt-8">
          <Text className={`text-sm uppercase tracking-wider mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            LET'S GET STARTED
          </Text>
          <Text className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Welcome to{"\n"}Freelancer Tracker
          </Text>
          
          {/* Progress Indicator */}
          <View className="flex-row items-center mt-2">
            <View className="flex-row gap-2">
              <View className={`w-3 h-3 rounded-sm border-2 ${isDark ? "border-gray-600" : "border-gray-300"}`} />
              <View className={`w-3 h-3 rounded-sm border-2 ${isDark ? "border-gray-600" : "border-gray-300"}`} />
              <View className={`w-3 h-3 rounded-sm border-2 ${isDark ? "border-gray-600" : "border-gray-300"}`} />
            </View>
            <Text className={`ml-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>0/3</Text>
          </View>
        </View>

        {/* Getting Started Cards */}
        <View className="mb-10">
          <View className="flex-row flex-wrap gap-4">
            {/* Card 1 */}
            <TouchableOpacity
              className={`flex-1 min-w-[280px] rounded-2xl p-6 border ${
                isDark ? "bg-[#2A2A2A] border-gray-700" : "bg-white border-gray-200"
              }`}
              style={styles.card}
            >
              <View className="flex-1">
                <Text className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Create your first invoice
                </Text>
                <Text className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Set up invoicing with smart templates and auto-tracking
                </Text>
              </View>
              <View className="items-end mt-4">
                <Feather name="arrow-up-right" size={24} color={isDark ? "#9CA3AF" : "#6B7280"} />
              </View>
            </TouchableOpacity>

            {/* Card 2 */}
            <TouchableOpacity
              className={`flex-1 min-w-[280px] rounded-2xl p-6 border ${
                isDark ? "bg-[#2A2A2A] border-gray-700" : "bg-white border-gray-200"
              }`}
              style={styles.card}
            >
              <View className="flex-1">
                <Text className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Track payments in real-time
                </Text>
                <Text className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Monitor your cash flow and get payment notifications
                </Text>
              </View>
              <View className="items-end mt-4">
                <Feather name="arrow-up-right" size={24} color={isDark ? "#9CA3AF" : "#6B7280"} />
              </View>
            </TouchableOpacity>

            {/* Card 3 */}
            <TouchableOpacity
              className={`flex-1 min-w-[280px] rounded-2xl p-6 border ${
                isDark ? "bg-[#2A2A2A] border-gray-700" : "bg-white border-gray-200"
              }`}
              style={styles.card}
            >
              <View className="flex-1">
                <Text className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Manage your clients
                </Text>
                <Text className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Organize clients and track project milestones
                </Text>
              </View>
              <View className="items-end mt-4">
                <Feather name="arrow-up-right" size={24} color={isDark ? "#9CA3AF" : "#6B7280"} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Personal Section */}
        <View className="mb-8">
          <View className="flex-row items-center mb-6">
            <View className="w-10 h-10 rounded-full bg-purple-600 items-center justify-center mr-3">
              <Feather name="user" size={20} color="white" />
            </View>
            <Text className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Personal</Text>
            <View className={`ml-3 px-3 py-1 rounded-md flex-row items-center ${
              isDark ? "bg-gray-800" : "bg-gray-100"
            }`}>
              <Feather name="link-2" size={14} color={isDark ? "#9CA3AF" : "#6B7280"} />
              <Text className={`text-xs ml-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>ID</Text>
            </View>
          </View>

          {/* Dashboard Section */}
          <Text className={`text-xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Dashboard
          </Text>

          {/* Tabs */}
          <View className={`flex-row mb-6 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
            <TouchableOpacity
              onPress={() => setActiveTab("invoices")}
              className={`px-4 py-3 border-b-2 ${
                activeTab === "invoices"
                  ? "border-purple-600"
                  : "border-transparent"
              }`}
            >
              <View className="flex-row items-center">
                <Text
                  className={`font-medium ${
                    activeTab === "invoices" 
                      ? (isDark ? "text-white" : "text-gray-900")
                      : (isDark ? "text-gray-400" : "text-gray-600")
                  }`}
                >
                  Recent Invoices
                </Text>
                <View className={`ml-2 px-2 py-0.5 rounded ${isDark ? "bg-gray-800" : "bg-gray-200"}`}>
                  <Text className={`text-xs ${isDark ? "text-gray-400" : "text-gray-700"}`}>1</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("analytics")}
              className={`px-4 py-3 border-b-2 ${
                activeTab === "analytics"
                  ? "border-purple-600"
                  : "border-transparent"
              }`}
            >
              <View className="flex-row items-center">
                <Text
                  className={`font-medium ${
                    activeTab === "analytics"
                      ? (isDark ? "text-white" : "text-gray-900")
                      : (isDark ? "text-gray-400" : "text-gray-600")
                  }`}
                >
                  Analytics
                </Text>
                <View className={`ml-2 px-2 py-0.5 rounded ${isDark ? "bg-gray-800" : "bg-gray-200"}`}>
                  <Text className={`text-xs ${isDark ? "text-gray-400" : "text-gray-700"}`}>0</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Table */}
          <View className={`rounded-lg border overflow-hidden ${
            isDark ? "bg-[#2A2A2A] border-gray-700" : "bg-white border-gray-200"
          }`}>
            {/* Table Header */}
            <View className={`flex-row border-b px-4 py-3 ${
              isDark ? "bg-[#1F1F1F] border-gray-700" : "bg-gray-50 border-gray-200"
            }`}>
              <Text className={`flex-1 text-xs font-semibold uppercase ${
                isDark ? "text-gray-400" : "text-gray-700"
              }`}>
                Client
              </Text>
              <Text className={`w-40 text-xs font-semibold uppercase ${
                isDark ? "text-gray-400" : "text-gray-700"
              }`}>
                Last Activity (7D)
              </Text>
              <Text className={`w-32 text-xs font-semibold uppercase text-right ${
                isDark ? "text-gray-400" : "text-gray-700"
              }`}>
                Status
              </Text>
              <Text className={`w-32 text-xs font-semibold uppercase text-right ${
                isDark ? "text-gray-400" : "text-gray-700"
              }`}>
                Amount
              </Text>
              <Text className={`w-32 text-xs font-semibold uppercase text-right ${
                isDark ? "text-gray-400" : "text-gray-700"
              }`}>
                Progress
              </Text>
              <Text className={`w-32 text-xs font-semibold uppercase text-right ${
                isDark ? "text-gray-400" : "text-gray-700"
              }`}>
                Due Date
              </Text>
              <View className="w-8" />
            </View>

            {/* Table Row */}
            {recentInvoices.map((invoice) => (
              <View
                key={invoice.id}
                className={`flex-row items-center px-4 py-4 border-b ${
                  isDark ? "border-gray-800" : "border-gray-100"
                }`}
              >
                <Text className={`flex-1 text-sm font-medium ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  {invoice.client}
                </Text>
                <Text className={`w-40 text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}>
                  {invoice.lastActivity}
                </Text>
                <Text className={`w-32 text-sm text-right ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}>
                  {invoice.status}
                </Text>
                <Text className={`w-32 text-sm font-medium text-right ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  {invoice.amount}
                </Text>
                <View className="w-32 items-end">
                  <View className="flex-row items-center">
                    <Feather name="clock" size={14} color="#10B981" />
                    <Text className="text-sm text-green-600 font-medium ml-1">
                      {invoice.progress}%
                    </Text>
                  </View>
                </View>
                <Text className={`w-32 text-sm text-right ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}>
                  {invoice.dueDate}
                </Text>
                <TouchableOpacity className="w-8 items-center">
                  <Feather name="more-vertical" size={18} color={isDark ? "#9CA3AF" : "#6B7280"} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Footer Text */}
          <Text className={`text-sm mt-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Showing 5 most active invoices.
          </Text>

          {/* View All Link */}
          <TouchableOpacity className="flex-row items-center justify-end mt-4">
            <Text className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
              View all invoices
            </Text>
            <Feather name="arrow-right" size={16} color={isDark ? "#FFFFFF" : "#111827"} className="ml-1" />
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});
