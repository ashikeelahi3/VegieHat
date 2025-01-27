import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";

export default function LoginScreen() {
  const { signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const signInResult = await signIn.create({
        identifier: email,
        password,
      });
      await setActive({ session: signInResult.createdSessionId });
      Alert.alert("Login Successful", "Welcome!");
    } catch (error) {
      Alert.alert("Login Failed", error.errors[0]?.message || "An error occurred");
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-xl font-bold mb-4">Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border px-4 py-2 rounded mb-4 w-full"
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        className="border px-4 py-2 rounded mb-4 w-full"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
