import { SAVE_EMAIL } from '../actions/actionType';

const INITIAL_STATE = {
  email: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default loginReducer;
