import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const { isLoaded, signUp } = useSignUp();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return false;
    }

    if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
      Alert.alert(
        "Weak Password",
        "Password must contain:\n- 8+ characters\n- 1 number\n- 1 special character"
      );
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    try {
      const signUpResult = await signUp.create({
        emailAddress: email,
        password,
      });
  
      // Remove strategy parameter if using default configuration
      await signUpResult.prepareEmailAddressVerification();
      
      navigation.navigate("VerifyEmail", { email });
    } catch (err) {
      console.error("Full error:", JSON.stringify(err, null, 2));
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-6">
      <Text className="text-2xl font-bold mb-6 text-gray-800">Register</Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        className="w-full border border-gray-300 rounded-md p-3 mb-4"
      />
      
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        className="w-full border border-gray-300 rounded-md p-3 mb-6"
      />
      
      <Button title="Register" onPress={handleRegister} />
      
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="mt-4"
      >
        <Text className="text-blue-500">Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}