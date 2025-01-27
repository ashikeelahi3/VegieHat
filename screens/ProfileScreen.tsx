import React from "react";
import { View, Text, Button } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useClerk } from '@clerk/clerk-react';
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useClerk(); // Initialize Clerk sign out hook
  const navigation = useNavigation(); // Initialize navigation

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Sign out error:", err);
      // Handle error (show alert, etc.)
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl font-bold">Welcome, {user?.firstName}</Text>
      <Text className="text-gray-600">Email: {user?.primaryEmailAddress?.emailAddress}</Text>
      <Button title="Logout" onPress={handleSignOut} />
    </View>
  );
}