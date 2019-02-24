import React, { Component } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { connect } from "react-redux";

import { Text, Radio } from "native-base";
import { addCard } from "../actions";

import {
  white,
  black,
  mainBackgroundColor,
  mainTextColor,
  createCard
} from "../utils";

import Button from "../components/Button";

class NewCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add Card"
    };
  };

  state = {
    frontText: "",
    backText: "",
    selected: "correct",
    right: true,
    wrong: false
  };

  submitCard = () => {
    const { title } = this.props.navigation.state.params;
    const { dispatch } = this.props;
    const card = {
      frontText: this.state.frontText,
      backText: this.state.backText,
      selected: this.state.selected
    };
    createCard(title, card);
    dispatch(addCard(title, card));

    this.props.navigation.goBack();
  };

  handleRight = () => {
    const { right } = this.state;
    if (!right) {
      this.setState({ right: true, wrong: false, selected: "correct" });
    }
  };

  handleWrong = () => {
    const { wrong } = this.state;
    if (!wrong) {
      this.setState({ right: false, wrong: true, selected: "incorrect" });
    }
  };

  render() {
    return (
      <View style={styles.form}>
        <TextInput
          multiline={true}
          style={styles.textInput}
          value={this.state.frontText}
          placeholder={"Enter your question"}
          onChangeText={frontText => this.setState({ frontText: frontText })}
        />
        <TextInput
          multiline={true}
          style={styles.textInput}
          value={this.state.backText}
          placeholder={"And your answer"}
          onChangeText={backText => this.setState({ backText })}
        />
        <Text style={{ margin: 8 }}>Select if the answer is</Text>
        <View style={styles.optionView}>
          <Text onPress={this.handleRight} style={styles.optionText}>
            correct
          </Text>
          <Radio
            style={styles.optionRadio}
            selected={this.state.right}
            onPress={this.handleRight}
          />
          <Text onPress={this.handleWrong} style={styles.optionText}>
            incorrect
          </Text>
          <Radio
            style={styles.optionRadio}
            selected={this.state.wrong}
            onPress={this.handleWrong}
          />
        </View>

        <Button onPress={this.submitCard} text={"Save"} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: mainBackgroundColor
  },
  textInput: {
    width: 260,
    height: 60,
    marginTop: 20,
    paddingLeft: 20,
    borderColor: black,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
    color: mainTextColor,
    backgroundColor: white
  },
  optionView: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    justifyContent: "space-between"
  },
  optionText: {
    paddingLeft: 20,
    margin: 8
  },
  optionRadio: {
    margin: 8
  }
});

export default connect()(NewCard);
