import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
const Radio = ({ selected, onSelect, label }) => (
  <TouchableOpacity
    onPress={onSelect}
    style={{
      flexDirection: "row",
      alignItems: "center",
    }}
  >
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: selected ? "purple" : "#ccc",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 5,
      }}
    >
      {selected && (
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "purple",
          }}
        />
      )}
    </View>
    <Text>{label}</Text>
  </TouchableOpacity>
);

export default Radio;
