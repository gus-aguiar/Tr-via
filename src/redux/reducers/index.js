import { combineReducers } from 'redux';
import loginReducer from './login';

const rootReducer = combineReducers({
  user: loginReducer,
});

export default rootReducer;
