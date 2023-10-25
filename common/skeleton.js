import React from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";

const Skeleton = () => {
  return (
    <View style={styles.skeletonItem}>
      <View style={styles.skeletonText} />
      <View style={styles.skeletonText} />
      <View style={styles.skeletonAmount} />
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  skeletonText: {
    width: 60,
    height: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  skeletonAmount: {
    width: 40,
    height: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
});

export default Skeleton;
