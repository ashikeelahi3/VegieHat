import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const handleSignUp = async () => {
    if (!isLoaded) {
      console.log("SignUp: Clerk not loaded yet");
      return;
    }

    try {
      console.log("SignUp: Attempting to create account...");
      await signUp.create({ emailAddress: email, password });
      console.log("SignUp: Account creation successful");

      console.log("SignUp: Sending verification code...");
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      console.log("SignUp: Verification code sent");

      setPendingVerification(true);
    } catch (error: any) {
      console.error("SignUp: Error during sign-up process", JSON.stringify(error, null, 2));
      Alert.alert("Sign-Up Error", error.errors[0]?.message || "Something went wrong");
    }
  };

  const handleVerify = async () => {
    if (!isLoaded) {
      console.log("Verification: Clerk not loaded yet");
      return;
    }

    try {
      console.log("Verification: Attempting to verify...");
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

      if (signUpAttempt.status === "complete") {
        console.log("Verification: Verification complete. Session active.");
        await setActive({ session: signUpAttempt.createdSessionId });
        Alert.alert("Success", "Account created successfully!");
        // navigation.navigate("Home");
      } else {
        console.log("Verification: Verification incomplete", signUpAttempt);
        Alert.alert("Verification Error", "Please complete all required steps.");
      }
    } catch (error: any) {
      console.error("Verification: Error during verification", JSON.stringify(error, null, 2));
      Alert.alert("Verification Error", error.errors[0]?.message || "Something went wrong");
    }
  };

  if (pendingVerification) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-lg font-bold mb-4">Verify Your Email</Text>
        <TextInput
          placeholder="Enter Verification Code"
          value={code}
          onChangeText={setCode}
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
        />
        <Button title="Verify" onPress={handleVerify} />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-lg font-bold mb-4">Create an Account</Text>
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
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text
        className="mt-4 text-blue-500"
        onPress={() => navigation.navigate("Login")}
      >
        Already have an account? Log in
      </Text>
    </View>
  );
}
