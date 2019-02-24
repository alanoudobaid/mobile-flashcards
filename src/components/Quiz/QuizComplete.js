import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
console.disableYellowBox = true;
import {
  buttonBackgroundColor,
  clearLocalNotification,
  setLocalNotification
} from "../../utils";

import Button from "../Button";

class QuizComplete extends Component {
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }

  handlebackToDeck = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { correct, incorrect, score } = this.props;
    return (
      <View style={styles.quizCompleteContainer}>
        <View>
          <Text style={styles.quizCompleteTitle}>Quiz Complete!</Text>

          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold"
            }}
          >
            Your Score is {score}
          </Text>
          <Text>Right: {correct}</Text>
          <Text>Wrong: {incorrect}</Text>
          <View style={{ marginTop: 8 }}>
            <Button
              buttonStyle={styles.quizButton}
              onPress={this.props.handleReset}
              text={"Restart Quiz"}
            />
            <Button
              buttonStyle={styles.quizButton}
              onPress={this.handlebackToDeck}
              text={"Back to Deck"}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  quizCompleteContainer: {
    flex: 1,
    alignItems: "center"
  },
  quizCompleteTitle: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 20
  },
  quizCompleteBody: {
    fontSize: 22,
    textAlign: "center"
  },
  quizButton: {
    height: 40,
    backgroundColor: buttonBackgroundColor,
    padding: 10,
    marginTop: 20,
    borderRadius: 4
  }
});

export default connect()(QuizComplete);
