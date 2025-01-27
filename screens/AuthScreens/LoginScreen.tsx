import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useAuth } from "../../context/AuthProvider";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();

  const handleLogin = () => {
    if (email) {
      login(email); // Simulated login
      Alert.alert("Login Successful", `Welcome back, ${email}`);
    } else {
      Alert.alert("Error", "Please enter your email");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Text className="text-lg font-bold mb-4">Login</Text>
      <TextInput
        className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
