import React, { Component } from "react";
import { View } from "react-native";
import { Card, CardItem, Text, Body } from "native-base";

class QuizCard extends Component {
  render() {
    const { questions, showQuestion } = this.props;
    const { frontText, backText } = questions;

    const questionText = (
      <View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold"
          }}
        >
          Question
        </Text>
        <Text>{frontText}</Text>
      </View>
    );
    const answerText = (
      <View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold"
          }}
        >
          Answer
        </Text>
        <Text>{backText}</Text>
      </View>
    );
    const text = showQuestion ? questionText : answerText;

    return (
      <Card
        style={{
          height: 200,
          marginLeft: 20,
          marginRight: 20
        }}
      >
        <CardItem>
          <Body>{text}</Body>
        </CardItem>
      </Card>
    );
  }
}

export default QuizCard;
