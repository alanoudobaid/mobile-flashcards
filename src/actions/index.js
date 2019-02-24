import {
  ADD_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD,
  SET_QUIZ_DECK_TITLE,
  SHOW_QUESTION,
  UPDATE_QUIZ_SCORE,
  SET_QUIZ_TO_COMPLETE,
  RESET_QUIZ
} from "./types";

export function addDecks(decks) {
  return {
    type: ADD_DECKS,
    decks
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  };
}
export function removeDeck(decks) {
  return {
    type: REMOVE_DECK,
    decks
  };
}

export function addCard(deckTitle, card) {
  return {
    type: ADD_CARD,
    deckTitle,
    card
  };
}

export function setQuizDeckTitle(title) {
  return {
    type: SET_QUIZ_DECK_TITLE,
    title
  };
}

export function showQuiz(show) {
  return {
    type: SHOW_QUESTION,
    show
  };
}

export function updateQuizScore(score, counter) {
  return {
    type: UPDATE_QUIZ_SCORE,
    score,
    counter
  };
}

export function setQuizToComplete(complete) {
  return {
    type: SET_QUIZ_TO_COMPLETE,
    complete
  };
}

export function resetQuiz() {
  return {
    type: RESET_QUIZ
  };
}
