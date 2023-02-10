import { combineReducers } from 'redux';
import playerReducer from './login';

const rootReducer = combineReducers({
  player: playerReducer,
});

export default rootReducer;
