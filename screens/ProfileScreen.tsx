import React from "react";
import { View, Text, Button } from "react-native";
import { useUser } from "@clerk/clerk-expo";

export default function ProfileScreen() {
  const { user } = useUser();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl font-bold">Welcome, {user?.firstName}</Text>
      <Text className="text-gray-600">Email: {user?.primaryEmailAddress?.emailAddress}</Text>
    </View>
  );
}
