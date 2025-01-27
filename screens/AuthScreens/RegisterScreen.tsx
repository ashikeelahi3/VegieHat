import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";

export default function RegisterScreen() {
  const { signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const signUpResult = await signUp.create({
        emailAddress: email,
        password,
      });
      await signUpResult.prepareEmailAddressVerification();
      Alert.alert("Verification Email Sent", "Please check your inbox.");
    } catch (error) {
      Alert.alert("Registration Failed", error.errors[0]?.message || "An error occurred");
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-xl font-bold mb-4">Register</Text>
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
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
