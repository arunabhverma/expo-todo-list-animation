import React from "react";
import { StyleSheet, View } from "react-native";

export const Mask = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn} />
      <View style={styles.rightColumn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  leftColumn: {
    width: 180,
    height: "100%",
    backgroundColor: "white",
    borderRadius: 30,
  },
  rightColumn: {
    flex: 1,
    height: "100%",
    backgroundColor: "white",
    borderRadius: 30,
  },
});
