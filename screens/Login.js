import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { FIREBASE_AUTH } from "../config/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useUserContext } from "../hooks/userContext";
import { UserProvider } from "../hooks/userContext";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const iconSize = windowWidth * 0.1;
const buttonWidth = windowWidth * 0.9;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = FIREBASE_AUTH;
  const { dispatch } = useUserContext();
  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const userUID = response.user.uid;
      dispatch({ type: "SET_USER_UID", payload: userUID });
    } catch (error) {
      setError("Login failed. Please check your email and password.");
      console.log("🚀 ~ file: Login.js:28 ~ signIn ~ error:", error);
    }
  };

  const signUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("🚀 ~ file: Login.js:47 ~ signUp ~ response:", response.user);
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.log("🚀 ~ file: Login.js:49 ~ signUp ~ error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              placeholderTextColor="#A9A9A9"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              placeholderTextColor="#A9A9A9"
              secureTextEntry
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.loginButton} onPress={signIn}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton} onPress={signUp}>
            <Text style={styles.loginButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: buttonWidth,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 5,
    marginTop: windowHeight * 0.03,
    paddingHorizontal: 10,
    height: windowHeight * 0.06,
  },
  input: {
    flex: 1,
    color: "black",
  },
  loginButton: {
    backgroundColor: "purple",
    marginTop: windowHeight * 0.05,
    height: windowHeight * 0.06,
    width: buttonWidth,
    height: windowHeight * 0.06,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  registerButton: {
    backgroundColor: "violet",
    marginTop: windowHeight * 0.03,
    height: windowHeight * 0.06,
    width: buttonWidth,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  loginButtonText: {
    textAlign: "center",
    color: "white",
  },
  errorText: {
    color: "red",
    marginTop: windowHeight * 0.03,
  },
});

export default Login;
