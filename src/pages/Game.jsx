import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import sanitize from 'sanitize-html';
import {
  incrementAssertions,
  scoreCounter,
  timerCounter,
} from '../redux/actions';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { getQuestions } from '../helpers/apiTrivia';
import styles from '../styles/Game.module.css';
//
class Game extends React.Component {
  state = {
    questions: [],
    questionNumber: 0,
    questionAnswered: false,
    timeout: false,
  };

  componentDidMount() {
    const { history } = this.props;

    const numberQuestions = 5;
    const token = localStorage.getItem('token');

    getQuestions(numberQuestions, token).then((data) => {
      const { results, response_code: responseCode } = data;
      const newResults = results.map((result) => {
        const {
          correct_answer: correctAnswer,
          incorrect_answers: incorrectAnswers,
        } = result;
        const answers = this.shuffle(correctAnswer, incorrectAnswers);
        return { ...result, answers };
      });

      const errorCode = 3;
      if (responseCode === errorCode) {
        history.push('/');
      } else {
        this.setState({ questions: newResults });
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { timer } = this.props;
    const { questionAnswered } = this.state;

    if (timer === 0 && !questionAnswered && prevProps.timer !== 0) {
      this.setState({ timeout: true });
    }
  }

  shuffle = (corret, incorret) => {
    const array = [corret, ...incorret];
    const compareNumber = 0.5;
    const shuffledArray = array.sort(() => Math.random() - compareNumber);
    return shuffledArray;
  };

  resetTimer = () => {
    const { dispatch } = this.props;
    const resetTimerValue = 30;
    dispatch(timerCounter(resetTimerValue));
    this.setState({ timeout: false });
  };

  incrementNumberQuestion = () => {
    const { questions, questionNumber } = this.state;
    this.setState({
      questionNumber:
        questions.length - 1 > questionNumber
          ? questionNumber + 1
          : questionNumber,
    });
  };

  handleClickNextBtn = () => {
    const { questions, questionNumber } = this.state;
    this.incrementNumberQuestion();

    this.resetTimer();
    this.setState({ questionAnswered: false });

    if (questions.length - 1 === questionNumber) {
      const { history } = this.props;
      history.push('/feedback');
    }
  };

  getDifficulty = (difficulty) => {
    const difficultyNumber = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    return difficultyNumber[difficulty];
  };

  calculateScore = (difficulty) => {
    const { timer } = this.props;
    const difficultyNumber = this.getDifficulty(difficulty);
    const magicNumber = 10;
    return magicNumber + timer * difficultyNumber;
  };

  checkCorrectAnswer = (answer, correctAnswer, difficulty) => {
    const { dispatch } = this.props;

    const totalScore = this.calculateScore(difficulty);

    this.setState({ timeout: false, questionAnswered: true });

    if (answer === correctAnswer) {
      dispatch(incrementAssertions());
      dispatch(scoreCounter(totalScore));
    }
  };

  fixEntities = (string) => sanitize(string);

  render() {
    const { questions, questionNumber, questionAnswered, timeout } = this.state;
    return (
      <>
        <Header />
        <div>

          <div>
            {questions.map(
              (
                {
                  category,
                  question,
                  answers,
                  difficulty,
                  correct_answer: correctAnswer,
                },
                index,
              ) => index === questionNumber && (
                <div key={ category + question }>
                  <h2 data-testid="question-category">
                    {this.fixEntities(category)}
                  </h2>
                  <p data-testid="question-text">
                    {this.fixEntities(question)}
                  </p>
                  <div data-testid="answer-options">
                    <Timer
                      questionAnswered={ questionAnswered }
                      timeout={ timeout }
                    />
                    {answers.map((answer) => {
                      let className;
                      if (questionAnswered || timeout) {
                        className = answer === correctAnswer
                          ? styles.correct
                          : styles.wrong;
                      } else {
                        className = '';
                      }

                      return (
                        <button
                          key={ answer }
                          onClick={ () => this.checkCorrectAnswer(
                            answer,
                            correctAnswer,
                            difficulty,
                          ) }
                          className={ className }
                          disabled={ timeout }
                          data-testid={
                            answer === correctAnswer
                              ? 'correct-answer'
                              : `wrong-answer-${index}`
                          }
                        >
                          {this.fixEntities(answer)}
                        </button>
                      );
                    })}
                    {(questionAnswered || timeout) && (
                      <button
                        type="button"
                        data-testid="btn-next"
                        onClick={ this.handleClickNextBtn }
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = ({ timer }) => ({
  timer: timer.timer,
});

export default connect(mapStateToProps)(Game);
