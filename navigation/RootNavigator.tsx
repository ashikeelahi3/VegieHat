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
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "Home" : "Login"}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Input" component={InputScreen} />
            <Stack.Screen name="Analysis" component={AnalysisScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
