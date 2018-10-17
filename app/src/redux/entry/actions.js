import {
  ENTRY_FETCH_STARTED,
  ENTRY_FETCH_FINISHED,

  ENTRY_UPDATE_STARTED,
  ENTRY_UPDATE_FINISHED,
  ENTRY_UPDATE_FAILED
} from './constants';
import {
  fetchEntryRequest,
  addEntryRequest
} from '../../api';
import {
  ENTRY_HIDE_DISPLAY_MODAL
} from '../display/constants';
import { fetchUpdatedStatus } from '../status/actions';

const HTTP_200_CODE = 200;
const UNKNOWN_ENTRY_UPDATE_ERROR = 'UNKNOWN_ENTRY_UPDATE_ERROR';

export const fetchUpdatedEntry = () => dispatch => {
  fetchEntryRequest()
    .then(response => response.json())
    .then(data => dispatch({ type: ENTRY_FETCH_FINISHED, data: data }));
};

export const fetchInitialEntry = () => dispatch => {
  dispatch({ type: ENTRY_FETCH_STARTED });

  fetchEntryRequest()
    .then(response => response.json())
    .then(data => dispatch({ type: ENTRY_FETCH_FINISHED, data: data }));
};

export const updateEntry = (identifier, comment) => dispatch => {
  dispatch({ type: ENTRY_UPDATE_STARTED });

  addEntryRequest(identifier, comment)
    .then(response => {
      if (response.status !== HTTP_200_CODE) {
        throw new Error(UNKNOWN_ENTRY_UPDATE_ERROR);
      }
    })
    .then(() => {
      dispatch({ type: ENTRY_UPDATE_FINISHED });
      dispatch({ type: ENTRY_HIDE_DISPLAY_MODAL });

      // Update view
      fetchUpdatedEntry()(dispatch);
      fetchUpdatedStatus()(dispatch);
    })
    .catch(err => {
      if (err instanceof Error && err.message === UNKNOWN_ENTRY_UPDATE_ERROR) {
        dispatch({ type: ENTRY_UPDATE_FAILED });
      }
    });
};
