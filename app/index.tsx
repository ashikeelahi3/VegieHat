import React from "react";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "../cache"; 
import RootNavigator from "../navigation/RootNavigator";

export default function App() {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY} // Replace with your Clerk Frontend API key
      tokenCache={tokenCache}
    >
      <RootNavigator />
    </ClerkProvider>
  );
}
