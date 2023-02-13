import {
  SAVE_LOGIN_INFO,
  INCREMENT_ASSERTIONS,
  SCORE_COUNTER,
  RESET_SCORE,
} from '../actions/actionType';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  assertions: 0,
  score: 0,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN_INFO:
    return { ...state, ...action.payload };
  case INCREMENT_ASSERTIONS: {
    return { ...state, assertions: state.assertions + 1 };
  }
  case SCORE_COUNTER:
    return { ...state, score: state.score + action.payload };

  case RESET_SCORE:
    return { ...state, score: 0 };

  default:
    return state;
  }
};

export default playerReducer;
