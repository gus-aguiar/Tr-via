import { SAVE_LOGIN_INFO, INCREMENT_ASSERTIONS } from '../actions/actionType';

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
  default:
    return state;
  }
};

export default playerReducer;
