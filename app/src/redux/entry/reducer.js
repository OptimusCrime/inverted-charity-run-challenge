import {
  ENTRY_FETCH_STARTED,
  ENTRY_FETCH_FINISHED,
  ENTRY_FETCH_FAILED,

  ENTRY_UPDATE_STARTED,
  ENTRY_UPDATE_FINISHED,
  ENTRY_UPDATE_FAILED,
} from './constants';

const defaultState = {
  fetchStarted: false,
  fetchFinished: false,
  fetchError: false,
  entries: []
};

const entry = (state = defaultState, action) => {
  switch (action.type) {
    case ENTRY_FETCH_STARTED:
      return {
        ...state,
        fetchStarted: true,
        fetchFinished: false,
        fetchError: false
      };

    case ENTRY_FETCH_FINISHED:
      return {
        fetchStarted: false,
        fetchFinished: true,
        fetchError: false,
        entries: action.data
      };

    case ENTRY_FETCH_FAILED:
      return {
        ...state,
        fetchStarted: false,
        fetchFinished: false,
        fetchError: true
      };

    case ENTRY_UPDATE_STARTED:
      return {
        ...state,
        updateStarted: true,
        updateFinished: false,
        updateFailed: false,
      };

    case ENTRY_UPDATE_FINISHED:
      return {
        ...state,
        updateStarted: false,
        updateFinished: true,
        updateFailed: false,
      };

    case ENTRY_UPDATE_FAILED:
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

export default entry;
