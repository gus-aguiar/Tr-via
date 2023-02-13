import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getGravatar } from '../helpers/apiTrivia';

class Feedback extends React.Component {
  state = {};

  handleRaking = () => {
    const { name, score, email } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    getGravatar(email).then((response) => {
      const newRanking = [...ranking, { name, score, picture: response }];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    });
  };

  render() {
    const { assertions, score } = this.props;
    const minAssertions = 3;
    return (
      <>
        <Header />
        <div>
          <h1>Feedback</h1>
          <p>
            Numero de respostas acertadas:
            <span data-testid="feedback-total-question">{assertions}</span>
          </p>
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-text">
            {assertions < minAssertions ? 'Could be better...' : 'Well Done!'}
          </p>
          <Link to="/">
            <button data-testid="btn-play-again">Play Again</button>
          </Link>

          <Link to="/ranking">
            <button
              data-testid="btn-ranking"
              onClick={ this.handleRaking }
            >
              Ranking
            </button>
          </Link>
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
