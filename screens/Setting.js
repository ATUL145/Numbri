import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { TextInput, Button } from "react-native-paper";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { FIREBASE_AUTH } from "../config/FirebaseConfig";
const Setting = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [savedProfile, setSavedProfile] = useState(null);

  const handleSaveProfile = () => {
    // For demonstration purposes, we'll just display the entered data.
    const profile = { name, phone, address };
    setSavedProfile(profile);
    // Clear the input fields after saving the profile
    setName("");
    setPhone("");
    setAddress("");
  };

  const handleLogout = () => {
    FIREBASE_AUTH.signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>

      {!savedProfile && (
        <View>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            left={
              <TextInput.Icon name={() => <Feather name="user" size={24} />} />
            }
          />

          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            left={
              <TextInput.Icon name={() => <Feather name="phone" size={24} />} />
            }
          />

          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
          />

          <Button
            mode="contained"
            style={styles.saveButton}
            onPress={handleSaveProfile}
          >
            Save Profile
          </Button>
        </View>
      )}

      {savedProfile && (
        <View style={styles.card}>
          <View style={styles.userInfo}>
            <Feather name="user" size={24} style={styles.icon} />
            <Text> {savedProfile.name}</Text>
          </View>
          <View style={styles.userInfo}>
            <Feather name="phone" size={24} style={styles.icon} />
            <Text> {savedProfile.phone}</Text>
          </View>
          <View style={styles.userInfo}>
            <FontAwesome name="address-book" size={24} color="black" />
            <Text> {savedProfile.address}</Text>
          </View>

          <Pressable
            style={[styles.userInfo, styles.logout]}
            onPress={handleLogout}
          >
            <MaterialCommunityIcons name="logout" size={24} color="black" />
            <Text> Logout</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: "blue",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  savedHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  logout: {
    fontSize: 16,
    color: "blue",
    marginTop: 10,
  },
});

export default Setting;
