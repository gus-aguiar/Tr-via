import { combineReducers } from 'redux';
import playerReducer from './login';
import timerReducer from './timer';

const rootReducer = combineReducers({
  player: playerReducer,
  timer: timerReducer,
});

export default rootReducer;
