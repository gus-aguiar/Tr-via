// Coloque aqui suas actions
// ACTIONS CREATORS
import { SAVE_LOGIN_INFO } from './actionType';

export const loginSubmit = (payload) => ({
  type: SAVE_LOGIN_INFO,
  payload,
});
