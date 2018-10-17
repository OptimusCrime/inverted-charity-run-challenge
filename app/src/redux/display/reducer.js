import
{
  AUTH_TOGGLE_DISPLAY_MODAL,
  ENTRY_TOGGLE_DISPLAY_MODAL,

  AUTH_HIDE_DISPLAY_MODAL,
  ENTRY_HIDE_DISPLAY_MODAL,

  UPDATE_AUTH_VALUE,
  UPDATE_ENTRY_VALUE,

  TOGGLE_SHOW_GRAPH,
  CHANGE_CURRENT_CHALLENGE
} from './constants';
import { STATUS_FETCH_FINISHED } from "../status/constants";
import {
  mapChallenges,
  mapChangeCurrentChallenge,
  mapCurrentChallenge
} from "./mapper";

const defaultState = {
  showModalAuth: false,
  showModalEntry: false,
  showGraph: false,

  authValue: '',
  entryComment: '',

  currentChallenge: {}
};

const display = (state = defaultState, action) => {
  switch (action.type) {
    case STATUS_FETCH_FINISHED:
      return {
        ...state,
        currentChallenge: mapCurrentChallenge(action.data)
      };

    case CHANGE_CURRENT_CHALLENGE:
      return {
        ...state,
        currentChallenge: mapChangeCurrentChallenge(action.challenge, action.challenges)
      };

    case AUTH_TOGGLE_DISPLAY_MODAL:
      return {
        ...state,
        showModalAuth: !state.showModalAuth
      };

    case ENTRY_TOGGLE_DISPLAY_MODAL:
      return {
        ...state,
        showModalEntry: !state.showModalEntry
      };

    case AUTH_HIDE_DISPLAY_MODAL:
      return {
        ...state,
        showModalAuth: false
      };

    case ENTRY_HIDE_DISPLAY_MODAL:
      return {
        ...state,
        showModalEntry: false,
        entryComment: ''
      };

    case UPDATE_AUTH_VALUE:
      return {
        ...state,
        authValue: action.value
      };

    case UPDATE_ENTRY_VALUE:
      return {
        ...state,
        entryComment: action.value
      };

    case TOGGLE_SHOW_GRAPH:
      return {
        ...state,
        showGraph: !state.showGraph
      };

    default:
      return state
  }
};

export default display;
