import { AsyncStorage } from "react-native";
import { DECKS_STORAGE_KEY } from "./api";

export const initialDecksData = {};

export function setInitialDecks() {
  AsyncStorage.getItem(DECKS_STORAGE_KEY).then(res => {
    if (!res) {
      AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        JSON.stringify(initialDecksData)
      );
    }
  });
}
