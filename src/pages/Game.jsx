import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { incrementAssertions, timerCounter } from '../redux/actions';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { getQuestions } from '../helpers/apiTrivia';
import styles from '../styles/Game.module.css';

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

  checkCorrectAnswer = (answer, correctAnswer) => {
    const { dispatch } = this.props;

    this.setState({ timeout: false, questionAnswered: true });

    if (answer === correctAnswer) {
      dispatch(incrementAssertions());
    }
  };

  render() {
    const { questions, questionNumber, questionAnswered, timeout } = this.state;
    return (
      <div>
        <Header />
        <h1>Game Page</h1>

        <div>
          {questions.map(
            (
              { category, question, answers, correct_answer: correctAnswer },
              index,
            ) => index === questionNumber && (
              <div key={ category + question }>
                <h2 data-testid="question-category">{category}</h2>
                <p data-testid="question-text">{question}</p>
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
                        onClick={ () => this.checkCorrectAnswer(answer, correctAnswer) }
                        className={ className }
                        disabled={ timeout }
                        data-testid={
                          answer === correctAnswer
                            ? 'correct-answer'
                            : `wrong-answer-${index}`
                        }
                      >
                        {answer}
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
