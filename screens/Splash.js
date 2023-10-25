import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";

const SplashScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const animationPaths = [
    require("../assets/List.json"),
    require("../assets/Cash.json"),
    require("../assets/Pie.json"),
  ];
  const animationCount = animationPaths.length;
  const animationWidth = width; // Set the animation width to the screen width

  const flatListRef = useRef(null);
  const initialIndex = animationCount;
  const scrollInterval = 4000;

  // Create a circular data array to loop infinitely
  const circularData = Array.from(
    { length: animationCount * 100 },
    (_, index) => ({
      key: String(index % animationCount),
    })
  );

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const scrollTimer = setInterval(() => {
      flatListRef.current.scrollToIndex({
        index: (currentIndex + 1) % circularData.length,
        animated: true,
      });
      setCurrentIndex((currentIndex + 1) % circularData.length);
    }, scrollInterval);

    return () => {
      clearInterval(scrollTimer);
    };
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={circularData}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        initialScrollIndex={initialIndex}
        keyExtractor={(item, index) => item.key + index}
        renderItem={({ item }) => {
          return (
            <View style={{ width: animationWidth, height }}>
              <LottieView
                source={animationPaths[parseInt(item.key)]}
                autoPlay
                loop={false}
                style={{
                  width: animationWidth,
                  height: height * 0.8,
                  margin: 10,
                }}
              />
            </View>
          );
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Login With Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Login with Google")}
        >
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "purple",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
    width: 300,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default SplashScreen;
