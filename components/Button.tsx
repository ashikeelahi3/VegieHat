// File: components/Button.tsx
import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function Button({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} className="bg-green-500 rounded-md p-3">
      <Text className="text-white text-center">{title}</Text>
    </TouchableOpacity>
  );
}
