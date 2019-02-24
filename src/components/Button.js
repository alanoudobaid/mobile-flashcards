import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { buttonBackgroundColor, buttonTextColor } from "../utils/colors";

export default function Button({ onPress, text, buttonStyle, textStyle }) {
  return (
    <TouchableOpacity style={buttonStyle || styles.button} onPress={onPress}>
      <Text style={textStyle || styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    backgroundColor: buttonBackgroundColor,
    padding: 10,
    marginTop: 20,
    borderRadius: 4
  },
  buttonText: {
    color: buttonTextColor,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center"
  }
});
