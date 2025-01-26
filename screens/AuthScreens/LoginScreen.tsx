import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useAuth } from "../../context/AuthProvider";

export default function LoginScreen({ navigation }: { navigation: any }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (email) {
      login(email); // Simulate login with email
      Alert.alert("Login Successful", `Welcome, ${email}`);
    } else {
      Alert.alert("Error", "Please enter an email");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Text className="text-lg font-bold mb-4">Login</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}
