import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { useAuth } from "../context/AuthProvider";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Simulate logout
    Alert.alert("Logout Successful", "You have been logged out.");
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Text className="text-lg font-bold mb-4">Profile</Text>
      <Text className="mb-4">Logged in as: {user?.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
