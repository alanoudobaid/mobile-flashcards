import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { addDecks, removeDeck } from "../actions";

import { mainBackgroundColor, getDecks, setDecks, white } from "../utils";

import Button from "../components/Button";

import DeckList from "../components/Deck/DeckList";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: this.props.decks,
      ready: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Decks"
    };
  };

  componentDidMount() {
    // add listener to detect when screen is focused
    this.subs = [
      this.props.navigation.addListener("didFocus", payload =>
        this.componentDidFocus(payload)
      )
    ];
  }
  componentWillUnmount() {
    // remove listener
    this.subs.forEach(sub => sub.remove());
  }

  componentDidFocus() {
    // fetch data
    this.getData();
  }
  getData = () => {
    getDecks().then(decks => {
      this.props.dispatch(addDecks(decks));

      this.setState({ decks: decks, ready: true });
    });
  };

  handleDelete = deck => {
    const { title } = deck;
    const { dispatch } = this.props;

    const filtered = Object.keys(this.state.decks)
      .filter(key => key !== title)
      .reduce((obj, key) => {
        obj[key] = this.state.decks[key];
        return obj;
      }, {});
    dispatch(removeDeck(filtered));
    setDecks(filtered);
    this.getData();
  };

  render() {
    const { navigation } = this.props;

    if (!this.state.ready) {
      return (
        <View style={styles.blank}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return Object.values(this.state.decks).length > 0 ? (
        <View style={{ flex: 1, backgroundColor: mainBackgroundColor }}>
          <DeckList
            getData={this.getData}
            decks={Object.values(this.state.decks || {})}
            onDelete={value => this.handleDelete(value)}
            navigation={this.props.navigation}
          />
        </View>
      ) : (
        <View style={styles.blank}>
          <Text style={{ fontSize: 18 }}>You don't have any decks yet.</Text>
          <Button
            onPress={() => {
              navigation.navigate("NewDeck");
            }}
            text="Create Deck"
          />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  blank: {
    flex: 1,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center"
  }
});
function mapStateToProps(state) {
  return {
    decks: state.decks
  };
}

export default connect(mapStateToProps)(Home);
