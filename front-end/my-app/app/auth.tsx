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

export default function AuthScreen() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className={`flex-1 ${isDark ? "bg-[#0B0B0B]" : "bg-white"}`}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-8 py-6">
          {/* Theme Toggle */}
          <TouchableOpacity onPress={toggleTheme} className="absolute top-10 right-6">
            <Feather
              name={isDark ? "sun" : "moon"}
              size={22}
              color={isDark ? "white" : "black"}
            />
          </TouchableOpacity>

          {/* Title */}
          <Text
            className={`text-3xl font-extrabold text-center mb-2 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {isLogin ? "Welcome back" : "Create an account"}
          </Text>

          <Text
            className={`text-center mb-8 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {isLogin
              ? "Sign in to your account"
              : "Sign up to start using Freelancer Tracker"}
          </Text>

          {/* Social Login Buttons */}
          <View className="space-y-3">
            <TouchableOpacity
              className={`flex-row items-center justify-center rounded-lg border ${
                isDark ? "border-gray-700 bg-[#121212]" : "border-gray-300 bg-gray-50"
              } p-4`}
            >
              <Feather
                name="github"
                size={18}
                color={isDark ? "#ffffff" : "#000000"}
              />
              <Text
                className={`ml-2 font-medium ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Continue with GitHub
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row items-center justify-center rounded-lg border ${
                isDark ? "border-gray-700 bg-[#121212]" : "border-gray-300 bg-gray-50"
              } p-4`}
            >
              <Feather
                name="lock"
                size={18}
                color={isDark ? "#ffffff" : "#000000"}
              />
              <Text
                className={`ml-2 font-medium ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Continue with SSO
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-[1px] bg-gray-700" />
            <Text className="mx-3 text-gray-500">or</Text>
            <View className="flex-1 h-[1px] bg-gray-700" />
          </View>

          {/* Input Fields */}
          {!isLogin && (
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={isDark ? "#888" : "#666"}
              value={name}
              onChangeText={setName}
              className={`rounded-md mb-4 p-4 ${
                isDark ? "bg-[#121212] text-white" : "bg-gray-100 text-black"
              }`}
            />
          )}

          <TextInput
            placeholder="Email"
            placeholderTextColor={isDark ? "#888" : "#666"}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            className={`rounded-md mb-4 p-4 ${
              isDark ? "bg-[#121212] text-white" : "bg-gray-100 text-black"
            }`}
          />

          <View className="relative">
            <TextInput
              placeholder="Password"
              placeholderTextColor={isDark ? "#888" : "#666"}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              className={`rounded-md p-4 ${
                isDark ? "bg-[#121212] text-white" : "bg-gray-100 text-black"
              }`}
            />
            <TouchableOpacity className="absolute right-4 top-4">
              <Feather name="eye" size={18} color={isDark ? "#888" : "#666"} />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          {isLogin && (
            <TouchableOpacity className="mt-3 mb-6">
              <Text className="text-teal-400 text-right">Forgot Password?</Text>
            </TouchableOpacity>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            className="bg-[#00C896] rounded-md py-2 mt-2"
            onPress={() =>
              console.log(isLogin ? "Logging in..." : "Registering...")
            }
          >
            <Text className="text-black text-center font-semibold text-lg">
              {isLogin ? "Sign In" : "Sign Up"}
            </Text>
          </TouchableOpacity>

          {/* Switch Between Login and Register */}
          <TouchableOpacity
            onPress={() => setIsLogin(!isLogin)}
            className="mt-6"
          >
            <Text className="text-center text-gray-400">
              {isLogin ? (
                <>
                  Don’t have an account?{" "}
                  <Text className="text-teal-400">Sign Up Now</Text>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Text className="text-teal-400">Sign In</Text>
                </>
              )}
            </Text>
          </TouchableOpacity>

          {/* Terms */}
          <Text
            className={`text-center text-xs mt-10 ${
              isDark ? "text-gray-600" : "text-gray-500"
            }`}
          >
            By continuing, you agree to Freelancer Tracker’s{" "}
            <Text className="text-teal-400">Terms of Service</Text> and{" "}
            <Text className="text-teal-400">Privacy Policy</Text>.
          </Text>

          {/* Back Button */}
          <TouchableOpacity onPress={() => router.back()} className="mt-6">
            <Text className="text-center text-gray-500">← Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
