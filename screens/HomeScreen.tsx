import React from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View className="flex-1 items-center justify-center bg-blue-50 p-4">
      <Text className="text-lg font-bold text-gray-700">Welcome to VegieHat!</Text>
      <Button title="Go to Input" onPress={() => navigation.navigate("Input")} />
    </View>
  );
}
