import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";

export default function SignInScreen() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!isLoaded) {
      console.log("SignIn: Clerk not loaded yet");
      return;
    }

    try {
      console.log("SignIn: Attempting to log in...");
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        console.log("SignIn: Login successful. Session active.");
        await setActive({ session: signInAttempt.createdSessionId });
        Alert.alert("Welcome Back", "Login successful!");
        // navigation.navigate("Home");
      } else {
        console.log("SignIn: Login incomplete", signInAttempt);
        Alert.alert("Login Error", "Please complete all required steps.");
      }
    } catch (error: any) {
      console.error("SignIn: Error during login", JSON.stringify(error, null, 2));
      Alert.alert("Login Error", error.errors[0]?.message || "Something went wrong");
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-lg font-bold mb-4">Log In</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        className="border border-gray-300 rounded-md px-3 py-2 mb-6 w-full"
      />
      <Button title="Log In" onPress={handleSignIn} />
      <Text
        className="mt-4 text-blue-500"
        onPress={() => navigation.navigate("Register")}
      >
        Don't have an account? Sign up
      </Text>
    </View>
  );
}
