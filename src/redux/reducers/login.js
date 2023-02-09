import { SAVE_LOGIN_INFO } from '../actions/actionType';

const INITIAL_STATE = {
  email: '',
  userName: '',
  gravatarImage: '',
  score: 0,
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN_INFO:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default loginReducer;
