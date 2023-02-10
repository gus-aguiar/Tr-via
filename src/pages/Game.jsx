import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getQuestions } from '../helpers/apiTrivia';
import { incrementAssertions } from '../redux/actions';

class Game extends React.Component {
  state = {
    questions: [],
    questionNumber: 0,
    questionAnswered: false,
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

  shuffle = (corret, incorret) => {
    const array = [corret, ...incorret];
    const compareNumber = 0.5;
    const shuffledArray = array.sort(() => Math.random() - compareNumber);
    return shuffledArray;
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

    this.setState({ questionAnswered: false });

    if (questions.length - 1 === questionNumber) {
      const { history } = this.props;
      history.push('/feedback');
    }
  };

  checkCorrectAnswer = (answer, correctAnswer) => {
    const { dispatch } = this.props;

    this.setState({ questionAnswered: true });

    if (answer === correctAnswer) {
      dispatch(incrementAssertions());
    }
  };

  render() {
    const { questions, questionNumber, questionAnswered } = this.state;
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
                  {answers.map((answer) => (
                    <button
                      key={ answer }
                      onClick={ () => this.checkCorrectAnswer(answer, correctAnswer) }
                      data-testid={
                        answer === correctAnswer
                          ? 'correct-answer'
                          : `wrong-answer-${index}`
                      }
                    >
                      {answer}
                    </button>
                  ))}
                  {questionAnswered && (
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

export default connect()(Game);
