import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getGravatar } from '../helpers/apiTrivia';
import styles from '../styles/Feedback.module.css';

class Feedback extends React.Component {
  state = {
    picture: '',
    message: '',
    messageClassName: '',
    imageClassName: '',
  };

  componentDidMount() {
    this.getGravatarImage();
    this.getMessage();
  }

  componentDidUpdate(prevProps) {
    const { assertions } = this.props;
    const minAssertions = 3;
    if (assertions < minAssertions && prevProps.assertions >= minAssertions) {
      this.setState({ message: 'Could be better...' });
    }
  }

  handleRaking = () => {
    const { name, score, email, history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking') || '[]');
    console.log(ranking);
    getGravatar(email).then((response) => {
      const newRanking = [...ranking, { name, score, picture: response }];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    });
    history.push('/ranking');
  };

  handlePlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  getGravatarImage = () => {
    const { email } = this.props;
    getGravatar(email).then((picture) => {
      this.setState({ picture });
    });
  };

  getMessage = () => {
    const { assertions } = this.props;
    const minAssertions = 3;

    if (assertions < minAssertions) {
      this.setState({
        message: 'Could be better...',
        messageClassName: styles.couldBetter,
        imageClassName: styles.couldBetterImg,
      });
    } else {
      this.setState({
        message: 'Well Done!',
        messageClassName: styles.wellDone,
        imageClassName: styles.wellDoneImg,
      });
    }
  };

  render() {
    const { name, assertions, score } = this.props;
    const { picture, messageClassName, imageClassName, message } = this.state;

    return (
      <>
        <Header />
        <div className={ styles.feeedbackContainer }>
          <div className={ styles.feeedbackBackground }>
            <img
              src={ picture }
              alt={ name }
              className={ `${styles.gravatarImage} ${imageClassName}` }
            />
            <div className={ `${styles.nameContainer} ${messageClassName}` }>
              <p data-testid="header-player-name">{name}</p>
              <p data-testid="feedback-text">{message}</p>
            </div>
            <p className={ styles.scoreContainer }>
              Você acertou
              {' '}
              <span data-testid="feedback-total-question">{assertions}</span>
              {' '}
              questões!
            </p>
            <p className={ styles.scoreContainer }>
              Um total de
              {' '}
              <span data-testid="feedback-total-score">{score}</span>
              {' '}
              pontos!
            </p>
          </div>
          <div className={ styles.btnContainer }>
            <button
              className={ styles.rankingButton }
              data-testid="btn-ranking"
              onClick={ this.handleRaking }
            >
              Ranking
            </button>
            <button
              className={ styles.playAgainButton }
              data-testid="btn-play-again"
              onClick={ this.handlePlayAgain }
            >
              Play Again
            </button>
          </div>
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
  name: player.name,
  email: player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
