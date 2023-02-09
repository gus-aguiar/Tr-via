import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    questions: [],
    questionNumber: 0,
  };

  componentDidMount() {
    const numberQuestions = 5;
    this.getQuestions(numberQuestions);
  }

  shuffle = (corret, incorret) => {
    const array = [corret, ...incorret];
    const compareNumber = 0.5;
    const shuffledArray = array.sort(() => Math.random() - compareNumber);
    return shuffledArray;
  };

  getQuestions = async (numberQuestions) => {
    const { history } = this.props;
    const token = localStorage.getItem('token');

    const apiData = await fetch(
      `https://opentdb.com/api.php?amount=${numberQuestions}&token=${token}`,
    );
    const apiJson = await apiData.json();
    const { results, response_code: responseCode } = apiJson;

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

  render() {
    const { questions, questionNumber } = this.state;
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
                      onClick={ this.incrementNumberQuestion }
                      data-testid={
                        answer === correctAnswer
                          ? 'correct-answer'
                          : `wrong-answer-${index}`
                      }
                    >
                      {answer}
                    </button>
                  ))}
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
