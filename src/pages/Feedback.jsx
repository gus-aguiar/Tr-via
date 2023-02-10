import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  state = {};

  render() {
    const { assertions } = this.props;
    const minAssertions = 3;
    return (
      <div>
        <h1>Feedback</h1>
        <p data-testid="feedback-total-score">{assertions}</p>
        <p data-testid="feedback-text">
          {assertions < minAssertions ? 'Could be better...' : 'Well Done!'}
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
