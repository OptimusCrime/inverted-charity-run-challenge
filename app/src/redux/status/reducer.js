import {
  STATUS_FETCH_STARTED,
  STATUS_FETCH_FINISHED,
  STATUS_FETCH_FAILED
} from './constants';

const defaultState = {
  fetchStarted: false,
  fetchFinished: false,
  fetchError: false,
  statuses: [],
};

const display = (state = defaultState, action) => {
  switch (action.type) {
    case STATUS_FETCH_STARTED:
      return {
        ...state,
        fetchStarted: true,
        fetchFinished: false,
        fetchError: false
      };
    case STATUS_FETCH_FINISHED:
      return {
        ...state,
        fetchStarted: false,
        fetchFinished: true,
        fetchError: false,
        statuses: action.data
      };
    case STATUS_FETCH_FAILED:
      return {
        ...state,
        fetchStarted: false,
        fetchFinished: false,
        fetchError: true
      };
    default:
      return state
  }
};

export default display;
