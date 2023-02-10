import { TIMER_COUNTER } from '../actions/actionType';

const INITIAL_STATE = {
  timer: 30,
};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIMER_COUNTER:
    return { ...state, timer: action.payload };
  default:
    return state;
  }
};

export default timerReducer;
