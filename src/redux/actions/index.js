// Coloque aqui suas actions
// ACTIONS CREATORS
import {
  SAVE_LOGIN_INFO,
  INCREMENT_ASSERTIONS,
  TIMER_COUNTER,
  SCORE_COUNTER,
  RESET_SCORE,
} from './actionType';

export const loginSubmit = (payload) => ({
  type: SAVE_LOGIN_INFO,
  payload,
});

export const incrementAssertions = () => ({
  type: INCREMENT_ASSERTIONS,
});

export const timerCounter = (payload) => ({
  type: TIMER_COUNTER,
  payload,
});

export const scoreCounter = (payload) => ({
  type: SCORE_COUNTER,
  payload,
});

export const resetScore = () => ({
  type: RESET_SCORE,
});
