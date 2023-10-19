import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";

const SplashScreen = () => {
  const { width, height } = Dimensions.get("window");
  const scrollViewRef = useRef(null);
  const animationRefs = [useRef(null), useRef(null), useRef(null)];
  const animationPaths = [
    "../../assets/Casino.json",
    "../../assets/Trading.json",
    "../../assets/Money.json",
  ];
  const animationCount = animationPaths.length;
  const scrollInterval = 3000;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const scrollNext = () => {
      if (scrollViewRef.current) {
        setCurrentIndex((currentIndex + 1) % animationCount);
        const nextIndex = (currentIndex + 1) % animationCount;
        scrollViewRef.current.scrollTo({
          x: nextIndex * width,
          animated: true,
        });
      }
    };

    const scrollTimer = setInterval(scrollNext, scrollInterval);

    return () => {
      clearInterval(scrollTimer);
    };
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={styles.animationContainer}
      >
        {animationPaths.map((path, index) => (
          <LottieView
            ref={animationRefs[index]}
            key={index}
            source={require(path)}
            autoPlay
            loop
            style={[styles.animation, { width, height }]}
          />
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={() => console.log("Login")} />
        <Button
          title="Login with Google"
          onPress={() => console.log("Login with Google")}
        />
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
  animationContainer: {
    flexDirection: "row",
  },
  animation: {
    margin: 10,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
});

export default SplashScreen;
