import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AuthScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    console.log("Auth submitted:", { email, password, isLogin });
    // Navigate to workspace after successful auth
    router.push("/workspace");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className={`flex-1 ${isDark ? "bg-[#1F1F1F]" : "bg-gray-50"}`}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 items-center justify-center px-6 py-12">
          {/* Theme Toggle */}
          <ThemeToggle className="absolute top-12 right-6 z-10" />
          
          <View className="w-full max-w-md">
            {/* Header */}
            <View className="mb-8">
              <Text className={`text-3xl font-normal mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                {isLogin ? "Welcome back" : "Create an account"}
              </Text>
              <Text className={`text-base ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {isLogin ? "Sign in to your account" : "Sign up to get started"}
              </Text>
            </View>

            {/* SSO Buttons */}
            <View className="mb-6">
              <TouchableOpacity className={`flex-row items-center justify-center rounded-lg py-3.5 mb-3 border ${
                isDark ? "bg-[#2A2A2A] border-gray-700" : "bg-white border-gray-300"
              }`}>
                <Feather name="github" size={18} color={isDark ? "#FFFFFF" : "#000000"} />
                <Text className={`ml-3 text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                  Continue with GitHub
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className={`flex-row items-center justify-center rounded-lg py-3.5 border ${
                isDark ? "bg-[#2A2A2A] border-gray-700" : "bg-white border-gray-300"
              }`}>
                <Feather name="lock" size={18} color={isDark ? "#FFFFFF" : "#000000"} />
                <Text className={`ml-3 text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                  Continue with SSO
                </Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className={`flex-1 h-[1px] ${isDark ? "bg-gray-700" : "bg-gray-300"}`} />
              <Text className={`mx-4 text-sm ${isDark ? "text-gray-500" : "text-gray-600"}`}>or</Text>
              <View className={`flex-1 h-[1px] ${isDark ? "bg-gray-700" : "bg-gray-300"}`} />
            </View>

            {/* Email Input */}
            <View className="mb-4">
              <Text className={`text-sm mb-2 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Email</Text>
              <TextInput
                placeholder="you@example.com"
                placeholderTextColor={isDark ? "#666666" : "#9CA3AF"}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className={`rounded-lg px-4 py-3.5 text-sm border ${
                  isDark ? "bg-[#2A2A2A] border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <View className="flex-row justify-between items-center mb-2">
                <Text className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Password</Text>
                {isLogin && (
                  <TouchableOpacity>
                    <Text className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View className="relative">
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor={isDark ? "#666666" : "#9CA3AF"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  className={`rounded-lg px-4 py-3.5 text-sm pr-12 border ${
                    isDark ? "bg-[#2A2A2A] border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5"
                >
                  <Feather
                    name={showPassword ? "eye-off" : "eye"}
                    size={18}
                    color={isDark ? "#666666" : "#9CA3AF"}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-[#00C896] rounded-lg py-3.5 mb-6"
            >
              <Text className="text-white text-center font-semibold text-sm">
                {isLogin ? "Sign In" : "Sign Up"}
              </Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View className="flex-row justify-center mb-8">
              <Text className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </Text>
              <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text className={`text-sm underline ${isDark ? "text-white" : "text-gray-900"}`}>
                  {isLogin ? "Sign Up Now" : "Sign In"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Terms and Privacy */}
            <View className="flex-row flex-wrap justify-center">
              <Text className={`text-xs text-center ${isDark ? "text-gray-500" : "text-gray-600"}`}>
                By continuing, you agree to Freelancer Tracker's{" "}
              </Text>
              <TouchableOpacity>
                <Text className={`text-xs underline ${isDark ? "text-gray-500" : "text-gray-600"}`}>
                  Terms of Service
                </Text>
              </TouchableOpacity>
              <Text className={`text-xs ${isDark ? "text-gray-500" : "text-gray-600"}`}> and </Text>
              <TouchableOpacity>
                <Text className={`text-xs underline ${isDark ? "text-gray-500" : "text-gray-600"}`}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
              <Text className={`text-xs ${isDark ? "text-gray-500" : "text-gray-600"}`}>
                , and to receive periodic emails with updates.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
