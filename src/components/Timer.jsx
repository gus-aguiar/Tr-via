import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { timerCounter } from '../redux/actions';

class Timer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    const ONE_SECOND = 1000;
    this.intervalID = setInterval(() => {
      const { timer, timeout, questionAnswered } = this.props;

      if (questionAnswered === false && timeout === false) {
        if (timer > 0) {
          dispatch(timerCounter(timer - 1));
        } else {
          clearInterval(this.intervalID);
        }
      }
    }, ONE_SECOND);
  }

  render() {
    const { timer } = this.props;

    return (
      <section>
        <img alt="timer-icon" />
        <p>Tempo:</p>
        <span>{timer}</span>
      </section>
    );
  }
}

Timer.propTypes = {
  dispatch: PropTypes.func,
  questionAnswered: PropTypes.bool,
  timeout: PropTypes.bool,
  timer: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ timer }) => ({
  timer: timer.timer,
});

export default connect(mapStateToProps)(Timer);
