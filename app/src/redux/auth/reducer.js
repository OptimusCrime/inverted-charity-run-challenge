import {
  AUTH_FETCH_STARTED,
  AUTH_FETCH_FINISHED,

  AUTH_UPDATE_STARTED,
  AUTH_UPDATE_FINISHED,
  AUTH_UPDATE_FAILED
} from './constants';

const defaultState = {
  fetchDone: false,
  fetchStarted: false,
  fetchFinished: false,
  fetchFailed: false,
  loggedIn: false,

  updateStarted: false,
  updateFinished: false,
  updateFailed: false
};

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_FETCH_STARTED:
      return {
        ...state,
        fetchStarted: true,
        fetchFinished: false,
        fetchFailed: false
      };

    case AUTH_FETCH_FINISHED:
      return {
        ...state,
        loggedIn: action.status,
        fetchDone: true,
        fetchStarted: false,
        fetchFinished: true,
      };

    case AUTH_UPDATE_STARTED:
      return {
        ...state,
        updateStarted: true,
        updateFinished: false,
        updateFailed: false,
      };

  case AUTH_UPDATE_FINISHED:
      return {
        ...state,
        updateStarted: false,
        updateFinished: true,
        updateFailed: false,

        loggedIn: true
      };

  case AUTH_UPDATE_FAILED:
      return {
        ...state,
        updateStarted: false,
        updateFinished: true,
        updateFailed: true,
      };

    default:
      return state
  }
};

export default auth;
