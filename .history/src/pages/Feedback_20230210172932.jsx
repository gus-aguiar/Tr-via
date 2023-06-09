import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  state = {};

  render() {
    const { assertions, score } = this.props;
    const minAssertions = 3;
    return (
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

        <Link to="/ranking">
          <button data-testid="btn-ranking">
            Ranking
          </button>

        </Link>
        <Link to="/game">
          <button data-testid="btn-play-again">
            Play Again
          </button>

        </Link>

      </div>
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
});

export default connect(mapStateToProps)(Feedback);
