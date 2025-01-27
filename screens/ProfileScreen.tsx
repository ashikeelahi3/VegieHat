import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { useUser } from "@clerk/clerk-expo";

export default function ProfileScreen() {
  const { user } = useUser();

  const handleLogout = async () => {
    if (user) {
      await user.signOut();
      Alert.alert("Logged Out", "You have been signed out.");
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-lg mb-4">Hello, {user?.firstName}!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
