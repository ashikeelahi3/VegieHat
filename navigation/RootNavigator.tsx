import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import InputScreen from "../screens/InputScreen";
import AnalysisScreen from "../screens/AnalysisScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/AuthScreens/LoginScreen";
import RegisterScreen from "../screens/AuthScreens/RegisterScreen";
import { useAuth } from "../context/AuthProvider";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { user } = useAuth(); // Access authentication state

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "Home" : "Login"}
        screenOptions={{
          headerStyle: { backgroundColor: "#4CAF50" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        {/* Authentication Screens */}
        {!user && (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Login" }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "Register" }}
            />
          </>
        )}

        {/* Protected Screens */}
        {user && (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Welcome to VegieHat" }}
            />
            <Stack.Screen
              name="Input"
              component={InputScreen}
              options={{ title: "Input Prices" }}
            />
            <Stack.Screen
              name="Analysis"
              component={AnalysisScreen}
              options={{ title: "Data Analysis" }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: "Profile" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
