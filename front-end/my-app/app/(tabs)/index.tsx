import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function LandingPage() {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark(!isDark);

  // Animations
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(40);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View
      className={`flex-1 items-center justify-center ${
        isDark ? "bg-[#0B0B0B]" : "bg-white"
      }`}
    >
      {/* Theme Toggle */}
      <TouchableOpacity
        onPress={toggleTheme}
        className="absolute top-12 right-6"
      >
        <Feather
          name={isDark ? "sun" : "moon"}
          size={22}
          color={isDark ? "white" : "black"}
        />
      </TouchableOpacity>

      {/* Content */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
        className="px-8 w-full items-center"
      >
        {/* Logo */}
        <View
          className={`w-24 h-24 rounded-2xl items-center justify-center mb-8 ${
            isDark ? "bg-[#1DE9B620]" : "bg-[#00C89610]"
          }`}
        >
          <Feather name="layers" size={72} color="#00C896" />
        </View>

        {/* Title */}
        <Text
          className={`text-4xl font-extrabold text-center tracking-tight ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          Freelancer Tracker
        </Text>

        {/* Subtitle */}
        <Text
          className={`text-lg text-center mt-4 leading-6 max-w-md ${
            isDark ? "text-gray-400" : "text-gray-700"
          }`}
        >
          Simplify your freelance journey with automated invoicing, payments,
          and smart insights — built for Moroccan freelancers 🇲🇦.
        </Text>

        {/* CTA Buttons */}
        <Link href="/auth" asChild>
          <TouchableOpacity className="mt-10 bg-[#00C896] px-10 py-4 rounded-xl w-[70%]">
            <Text className="text-black text-center font-semibold text-lg">
              Get Started
            </Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity onPress={toggleTheme} className="mt-6">
          <Text
            className={`text-center ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Toggle {isDark ? "Light" : "Dark"} Mode
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Footer */}
      <View className="absolute bottom-6">
        <Text
          className={`text-xs text-center ${
            isDark ? "text-gray-600" : "text-gray-500"
          }`}
        >
          © {new Date().getFullYear()} Freelancer Tracker. All rights reserved.
        </Text>
      </View>
    </View>
  );
}
