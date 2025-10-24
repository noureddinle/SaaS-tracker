import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  text: string;
  onPress: () => void;
  isDark?: boolean;
}

export const PrimaryButton: React.FC<ButtonProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-teal-400 px-10 py-4 rounded-xl m-2"
    >
      <Text className="text-black font-semibold text-lg text-center">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const OutlineButton: React.FC<ButtonProps> = ({ text, onPress, isDark }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="border-2 border-teal-400 px-10 py-4 rounded-xl m-2"
    >
      <Text
        className={`font-semibold text-lg text-center ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
