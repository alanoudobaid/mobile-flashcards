import React, { PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { DeckSwiper, Text } from "native-base";
import {
  resetQuiz,
  showQuiz,
  updateQuizScore,
  setQuizToComplete
} from "../actions";
import QuizComplete from "../components/Quiz/QuizComplete";
import QuizCard from "../components/Quiz/QuizCard";
import QuizButtons from "../components/Quiz/QuizButtons";

class Quiz extends PureComponent {
  state = {
    showQuiz: true
  };
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Quiz: ${navigation.state.params.title}`
    };
  };

  componentWillUnmount() {
    this.handleReset();
  }

  handleWrong() {
    this._deckSwiper._root.swipeLeft();
    const { questions, quiz, dispatch } = this.props;
    const maxLength = questions.length;
    const complete = quiz.counter === maxLength;
    const counter = complete ? quiz.counter : quiz.counter + 1;
    let score;
    if (this.status == "incorrect") {
      score = {
        right: quiz.right + 1,
        wrong: quiz.wrong
      };
    } else {
      score = {
        right: quiz.right,
        wrong: quiz.wrong + 1
      };
    }

    dispatch(updateQuizScore(score, counter));
    this.setState({ showQuiz: true });

    dispatch(showQuiz(true));
    if (complete) {
      dispatch(setQuizToComplete(complete));
    }
  }

  handleRight() {
    this._deckSwiper._root.swipeRight();
    const { questions, quiz, dispatch } = this.props;
    const maxLength = questions.length;
    const complete = quiz.counter === maxLength;
    const counter = complete ? quiz.counter : quiz.counter + 1;
    if (this.status == "correct") {
      score = {
        right: quiz.right + 1,
        wrong: quiz.wrong
      };
    } else {
      score = {
        right: quiz.right,
        wrong: quiz.wrong + 1
      };
    }

    dispatch(updateQuizScore(score, counter));
    this.setState({ showQuiz: true });
    dispatch(showQuiz(true));
    if (complete) {
      dispatch(setQuizToComplete(complete));
    }
  }

  flipCard() {
    const { dispatch, quiz } = this.props;
    this.setState(prevState => {
      return {
        showQuiz: !prevState.showQuiz
      };
    });
    dispatch(showQuiz(!quiz.showQuestion));
  }

  handleReset = () => {
    const { dispatch } = this.props;

    dispatch(resetQuiz());
  };

  renderCard(card) {
    this.status = card.selected;
    const { quiz } = this.props;
    if (!quiz.complete) {
      return <QuizCard questions={card} showQuestion={this.state.showQuiz} />;
    }
  }

  render() {
    const { questions, quiz, navigation } = this.props;
    const score = ((quiz.right / (quiz.right + quiz.wrong)) * 100).toFixed(0);

    const progress = quiz.complete ? null : (
      <Text style={{ textAlign: "center" }}>
        {quiz.counter}/{questions.length}
      </Text>
    );

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          marginTop: 20
        }}
      >
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          {progress}
          {quiz.complete ? (
            <QuizComplete
              handleReset={this.handleReset.bind(this)}
              score={score}
              correct={quiz.right}
              incorrect={quiz.wrong}
              navigation={navigation}
            />
          ) : (
            <DeckSwiper
              ref={c => (this._deckSwiper = c)}
              looping={false}
              dataSource={questions}
              onSwipeLeft={this.handleWrong.bind(this)}
              onSwipeRight={this.handleRight.bind(this)}
              renderItem={this.renderCard.bind(this)}
            />
          )}
        </View>
        <QuizButtons
          complete={quiz.complete}
          flipCard={this.flipCard.bind(this)}
          handleRight={this.handleRight.bind(this)}
          handleWrong={this.handleWrong.bind(this)}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.quiz,
    deck: state.decks[state.quiz.title],
    questions: state.decks[state.quiz.title].cards
  };
}

export default connect(mapStateToProps)(Quiz);
