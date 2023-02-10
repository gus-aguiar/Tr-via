// Coloque aqui suas actions
// ACTIONS CREATORS
import { SAVE_LOGIN_INFO, INCREMENT_ASSERTIONS } from './actionType';

export const loginSubmit = (payload) => ({
  type: SAVE_LOGIN_INFO,
  payload,
});

export const incrementAssertions = () => ({
  type: INCREMENT_ASSERTIONS,
});
