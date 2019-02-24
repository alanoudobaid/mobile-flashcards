import React, { Component } from "react";
import { ScrollView } from "react-native";

import { listItemColorA, listItemColorB, listItemColorC } from "../../utils";

import DeckListItem from "./DeckListItem";

class DeckList extends Component {
  render() {
    const deckItemColors = [listItemColorA, listItemColorB, listItemColorC];

    return (
      <ScrollView>
        {this.props.decks.map((deck, i) => (
          <DeckListItem
            getData={this.props.getData}
            key={deck.title}
            title={deck.title}
            handleDelete={value => this.props.onDelete(value)}
            amountOfCards={deck.cards && deck.cards.length}
            key={deck.title}
            navigation={this.props.navigation}
            backgroundColor={deckItemColors[i % 3]}
          />
        ))}
      </ScrollView>
    );
  }
}

export default DeckList;
