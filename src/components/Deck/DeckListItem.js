import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { mainTextColor, Red } from "../../utils";

class DeckListItem extends Component {
  render() {
    const {
      title,
      backgroundColor,
      handleDelete,
      navigation,
      amountOfCards,
      getData
    } = this.props;
    return (
      <TouchableOpacity
        key={title}
        style={[styles.listItem, { backgroundColor: backgroundColor }]}
        onPress={() => {
          navigation.navigate("Deck", {
            title: title,
            getData: () => getData()
          });
        }}
      >
        <View>
          <Text style={styles.deckTitle}>{title}</Text>
        </View>
        <View style={styles.cardAmountContainer}>
          <Text style={styles.amountOfCards}>{amountOfCards}</Text>

          <MaterialCommunityIcons
            name="cards"
            size={20}
            style={{ marginRight: 10 }}
            color={mainTextColor}
          />
          <TouchableOpacity onPress={() => handleDelete({ title: title })}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={20}
              style={{ marginRight: 10 }}
              color={Red}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    paddingTop: 25,
    paddingBottom: 25,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  deckTitle: {
    paddingLeft: 20,
    color: mainTextColor,
    fontSize: 18
  },
  cardAmountContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 5
  },
  amountOfCards: {
    paddingRight: 5,
    color: mainTextColor,
    fontSize: 20
  }
});

export default DeckListItem;
