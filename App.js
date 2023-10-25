import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import RootNavigation from "./navigation";
import { UserProvider } from "./hooks/userContext";
export default function App() {
  return (
    <UserProvider>
      <RootNavigation />
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
