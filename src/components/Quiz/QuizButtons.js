import React, { Component } from "react";
import { View } from "react-native";

import { Text, Button, Icon } from "native-base";

class QuizButtons extends Component {
  render() {
    const { complete, flipCard, handleRight, handleWrong } = this.props;
    return complete ? null : (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 7
        }}
      >
        <Button bordered iconLeft danger onPress={handleWrong}>
          <Icon name="arrow-back" />
          <Text>Incorrect </Text>
        </Button>
        <Button bordered onPress={flipCard}>
          <Text>Flip</Text>
        </Button>
        <Button bordered iconRight success onPress={handleRight}>
          <Text>Correct</Text>
          <Icon name="arrow-forward" />
        </Button>
      </View>
    );
  }
}

export default QuizButtons;
