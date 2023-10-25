import { View, Text, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { FIREBASE_AUTH } from "../config/FirebaseConfig";

export default function RootNavigation() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      if (authUser) {
        console.log(
          "🚀 ~ file: index.js:15 ~ unsubscribe ~ authUser:",
          authUser
        );
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? <AppStack userUID={user.uid} /> : <AuthStack />;
}
