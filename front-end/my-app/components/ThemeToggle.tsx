import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";

interface ThemeToggleProps {
  size?: number;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  size = 22, 
  className = "" 
}) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <TouchableOpacity 
      onPress={toggleTheme} 
      className={className}
    >
      <Feather
        name={isDark ? "sun" : "moon"}
        size={size}
        color={isDark ? "#FFFFFF" : "#000000"}
      />
    </TouchableOpacity>
  );
};

