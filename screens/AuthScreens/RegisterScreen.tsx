import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const { signUp } = useSignUp();
  const navigation = useNavigation();
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
      navigation.navigate("Login"); // Redirect to login screen
    } catch (err: any) {
      Alert.alert("Registration Failed", err.errors[0]?.message || "Something went wrong");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-6">
      <Text className="text-2xl font-bold mb-6 text-gray-800">Register</Text>
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
      <Button title="Register" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate("Login")} className="mt-4">
        <Text className="text-blue-500">Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
