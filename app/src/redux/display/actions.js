import {
  AUTH_TOGGLE_DISPLAY_MODAL,
  ENTRY_TOGGLE_DISPLAY_MODAL,

  UPDATE_AUTH_VALUE,
  UPDATE_ENTRY_VALUE,

  TOGGLE_SHOW_GRAPH,
  CHANGE_CURRENT_CHALLENGE
} from './constants';

export const toggleDisplayModalAuth = () => dispatch => dispatch({ type: AUTH_TOGGLE_DISPLAY_MODAL });

export const toggleDisplayModalEntry = () => dispatch => dispatch({ type: ENTRY_TOGGLE_DISPLAY_MODAL });

export const updateAuthValue = value => dispatch => dispatch({ type: UPDATE_AUTH_VALUE, value: value });

export const updateEntryValue = value => dispatch => dispatch({ type: UPDATE_ENTRY_VALUE, value: value });

export const toggleShowGraph = () => dispatch => dispatch({ type: TOGGLE_SHOW_GRAPH });

export const changeCurrentChallenge = (challenge, challenges) => dispatch => dispatch({ type: CHANGE_CURRENT_CHALLENGE, challenge: challenge, challenges: challenges });
