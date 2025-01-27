import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const { signIn, setActive } = useSignIn();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const signInResult = await signIn.create({
        identifier: email,
        password,
      });
      await setActive({ session: signInResult.createdSessionId });
      Alert.alert("Login Successful", "Welcome back!");
    } catch (err: any) {
      Alert.alert("Login Failed", err.errors[0]?.message || "Something went wrong");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-6">
      <Text className="text-2xl font-bold mb-6 text-gray-800">Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="w-full border border-gray-300 rounded-md p-3 mb-4"
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        className="w-full border border-gray-300 rounded-md p-3 mb-6"
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate("Register")} className="mt-4">
        <Text className="text-blue-500">Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}
