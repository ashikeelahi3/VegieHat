import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import InputScreen from "../screens/InputScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For icons

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarStyle: { backgroundColor: "#ffffff" },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Input") {
            iconName = "create";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Input" component={InputScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
