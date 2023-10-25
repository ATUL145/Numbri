import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import History from "../screens/History";
import Home from "../screens/Home";
import Setting from "../screens/Setting";

const Tab = createBottomTabNavigator();
const windowWidth = Dimensions.get("window").width;
const tabBarHeight = windowWidth * 0.15;
const AppStack = ({ navigation, userUID }) => {
  const CustomTabBar = ({ navigation, state, descriptors }) => {
    return (
      <View style={[styles.tabBarContainer, { height: tabBarHeight }]}>
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
            iconName = "settings-outline";
          }
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[
                styles.tabBarButton,
                {
                  backgroundColor: isFocused ? "skyblue" : "purple",
                  elevation: isFocused ? 8 : 2,
                },
              ]}
            >
              <Ionicons
                name={iconName}
                size={windowWidth * 0.08}
                color={isFocused ? "white" : "black"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Home"
          component={(props) => <Home {...props} userUID={userUID} />}
        />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Setting" component={Setting} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    width: "90%",
    marginHorizontal: 20,
  },
  tabBarButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

export default AppStack;
