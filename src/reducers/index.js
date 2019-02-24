import { initialDecksData } from "../utils/initialDecks";
import { combineReducers } from "redux";
import {
  ADD_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD,
  SET_QUIZ_DECK_TITLE,
  SHOW_ANSWER,
  UPDATE_QUIZ_SCORE,
  SET_QUIZ_TO_COMPLETE,
  RESET_QUIZ
} from "../actions/types";

const decks = (state = initialDecksData, action) => {
  switch (action.type) {
    case ADD_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      };

    case REMOVE_DECK:
      return {
        ...state,
        ...action.decks
      };
    case ADD_CARD:
      return {
        ...state,
        [action.deckTitle]: {
          title: action.deckTitle,
          cards: [...state[action.deckTitle].cards, action.card]
        }
      };
    default:
      return state;
  }
};

const initialQuizState = {
  counter: 1,
  right: 0,
  wrong: 0,
  showQuestion: true,
  complete: false
};

const quiz = (state = initialQuizState, action) => {
  switch (action.type) {
    case SET_QUIZ_DECK_TITLE:
      return {
        ...state,
        title: action.title
      };

    case SHOW_ANSWER:
      return {
        ...state,
        showQuestion: action.show
      };

    case RESET_QUIZ:
      return {
        ...state,
        ...initialQuizState
      };

    case UPDATE_QUIZ_SCORE:
      return {
        ...state,
        right: action.score.right,
        wrong: action.score.wrong,
        counter: action.counter
      };
    case SET_QUIZ_TO_COMPLETE:
      return {
        ...state,
        complete: action.complete
      };

    default:
      return state;
  }
};

export default combineReducers({
  decks,
  quiz
});
