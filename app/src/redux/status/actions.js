import {
  STATUS_FETCH_STARTED,
  STATUS_FETCH_FINISHED
} from './constants';
import {
  fetchStatusRequest
} from '../../api';

export const fetchInitialStatus = () => dispatch => {
  dispatch({ type: STATUS_FETCH_STARTED });

  fetchStatusRequest()
    .then(response => response.json())
    .then(data => dispatch({ type: STATUS_FETCH_FINISHED, data: data, derp: 2 }));
};

export const fetchUpdatedStatus = () => dispatch => {
  fetchStatusRequest()
    .then(response => response.json())
    .then(data => dispatch({ type: STATUS_FETCH_FINISHED, data: data }));
};
