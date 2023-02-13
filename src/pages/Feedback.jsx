import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
=======
import Header from '../components/Header';
>>>>>>> 9a5c5fc65928ff9fce13067e7e3aac6a082adc05

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
<<<<<<< HEAD

        <Link to="/ranking">
          <button data-testid="btn-ranking">
            Ranking
          </button>
        </Link>

        <Link to="/">
          <button data-testid="btn-play-again">
            Play Again
          </button>
        </Link>

=======
        <Header />
        <Link to="/">
          <button data-testid="btn-play-again">Play Again</button>
        </Link>

        <Link to="/ranking">
          <button data-testid="btn-ranking">Ranking</button>
        </Link>
>>>>>>> 9a5c5fc65928ff9fce13067e7e3aac6a082adc05
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
