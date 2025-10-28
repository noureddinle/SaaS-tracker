import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";

interface SidebarProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isVisible, onToggle }) => {
  const router = useRouter();
  const { isDark } = useTheme();
  const [activeItem, setActiveItem] = useState("home");

  const menuItems = [
    {
      section: null,
      items: [
        { id: "home", label: "Dashboard", icon: "home", count: null },
      ],
    },
    {
      section: "Invoicing",
      items: [
        { id: "invoices", label: "Invoices", icon: "file-text", count: 5 },
        { id: "templates", label: "Templates", icon: "clipboard", count: 3 },
      ],
    },
    {
      section: "Business",
      items: [
        { id: "clients", label: "Clients", icon: "users", count: 12 },
        { id: "projects", label: "Projects", icon: "briefcase", count: 8 },
      ],
    },
    {
      section: "Payments",
      items: [
        { id: "payments", label: "Payment Tracking", icon: "credit-card", count: 0 },
        { id: "expenses", label: "Expenses", icon: "trending-down", count: 0 },
      ],
    },
    {
      section: "Analytics",
      items: [
        { id: "reports", label: "Reports", icon: "bar-chart-2", count: null },
        { id: "insights", label: "Insights", icon: "pie-chart", count: null },
      ],
    },
  ];

  const handleItemPress = (itemId: string) => {
    setActiveItem(itemId);
    // Add navigation logic here
    console.log("Navigate to:", itemId);
  };

  if (!isVisible) return null;

  return (
    <View
      className={`w-72 h-full border-r ${
        isDark ? "bg-[#1F1F1F] border-gray-800" : "bg-white border-gray-200"
      }`}
    >
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-800">
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-lg bg-[#00C896] items-center justify-center mr-3">
              <Feather name="layers" size={18} color="#000000" />
            </View>
            <Text
              className={`text-lg font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              FreelancerTracker
            </Text>
          </View>
          <TouchableOpacity onPress={onToggle}>
            <Feather
              name="sidebar"
              size={20}
              color={isDark ? "#9CA3AF" : "#6B7280"}
            />
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View className="py-2">
          {menuItems.map((section, sectionIndex) => (
            <View key={sectionIndex}>
              {/* Section Header */}
              {section.section && (
                <Text
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${
                    isDark ? "text-gray-500" : "text-gray-600"
                  }`}
                >
                  {section.section}
                </Text>
              )}

              {/* Section Items */}
              {section.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleItemPress(item.id)}
                  className={`flex-row items-center justify-between px-4 py-2.5 mx-2 rounded-lg ${
                    activeItem === item.id
                      ? isDark
                        ? "bg-gray-800"
                        : "bg-gray-100"
                      : ""
                  }`}
                >
                  <View className="flex-row items-center flex-1">
                    <Feather
                      name={item.icon as any}
                      size={18}
                      color={
                        activeItem === item.id
                          ? isDark
                            ? "#FFFFFF"
                            : "#000000"
                          : isDark
                          ? "#9CA3AF"
                          : "#6B7280"
                      }
                    />
                    <Text
                      className={`ml-3 text-sm ${
                        activeItem === item.id
                          ? isDark
                            ? "text-white font-medium"
                            : "text-gray-900 font-medium"
                          : isDark
                          ? "text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </Text>
                  </View>
                  {item.count !== null && (
                    <View
                      className={`px-2 py-0.5 rounded ${
                        isDark ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    >
                      <Text
                        className={`text-xs ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {item.count}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Bottom Section */}
        <View className={`border-t mt-4 ${isDark ? "border-gray-800" : "border-gray-200"}`}>
          <TouchableOpacity
            onPress={() => handleItemPress("settings")}
            className="flex-row items-center px-4 py-3"
          >
            <Feather
              name="settings"
              size={18}
              color={isDark ? "#9CA3AF" : "#6B7280"}
            />
            <Text
              className={`ml-3 text-sm ${
                isDark ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Settings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleItemPress("more")}
            className="flex-row items-center px-4 py-3"
          >
            <Feather
              name="more-horizontal"
              size={18}
              color={isDark ? "#9CA3AF" : "#6B7280"}
            />
            <Text
              className={`ml-3 text-sm ${
                isDark ? "text-gray-400" : "text-gray-700"
              }`}
            >
              More
            </Text>
          </TouchableOpacity>
        </View>

        {/* User Profile */}
        <View
          className={`flex-row items-center px-4 py-4 border-t ${
            isDark ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <View className="w-10 h-10 rounded-full bg-purple-600 items-center justify-center">
            <Feather name="user" size={20} color="white" />
          </View>
          <View className="ml-3 flex-1">
            <Text
              className={`text-sm font-medium ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Personal
            </Text>
            <Text
              className={`text-xs ${
                isDark ? "text-gray-500" : "text-gray-600"
              }`}
            >
              interlud12xe@gmail.com
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
