import { Fontisto, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import History from "../../components/History";
import Home from "../../components/Home";
import Refer from "../../components/Refer";
import Setting from "../../components/Setting";

const Tab = createBottomTabNavigator();
const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState();

  const handleLogout = () => {
    console.log("logout");
  };
  const CustomTabBar = ({ navigation, state, descriptors }) => {
    return (
      <View style={styles.tabBarContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName;
          if (route.name === "Home") {
            iconName = isFocused ? "home" : "home-outline";
          } else if (route.name === "History") {
            iconName = isFocused ? "time" : "time-outline";
          } else if (route.name === "Setting") {
            iconName = "Setting";
          } else if (route.name === "Refer") {
            iconName = "Refer";
          }
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[
                styles.tabBarButton,
                {
                  backgroundColor: isFocused ? "skyblue" : "#8957b8",
                },
              ]}
            >
              {route.name !== "User" ? (
                <Ionicons
                  name={iconName}
                  size={30}
                  color={isFocused ? "white" : "black"}
                />
              ) : (
                <Fontisto
                  name="user-secret"
                  size={30}
                  color={isFocused ? "white" : "black"}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Refer" component={Refer} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    height: 60,
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabBarButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

export default HomeScreen;
