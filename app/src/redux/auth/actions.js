import {
  AUTH_FETCH_STARTED,
  AUTH_FETCH_FINISHED,

  AUTH_UPDATE_STARTED,
  AUTH_UPDATE_FINISHED,
  AUTH_UPDATE_FAILED
} from './constants';
import {
  AUTH_HIDE_DISPLAY_MODAL
} from '../display/constants';
import {
  fetchAuthRequest,
  updateAuthRequest
} from '../../api';

const HTTP_200_CODE = 200;
const INCORRECT_PASSWORD_IDENTIFIER = 'INCORRECT_PASSWORD_IDENTIFIER';

export const fetchAuth = () => dispatch => {
  dispatch({ type: AUTH_FETCH_STARTED });

  fetchAuthRequest()
    .then(response => response.json())
    .then(data => dispatch({ type: AUTH_FETCH_FINISHED, status: data.status }));
};

export const updateAuth = password => dispatch => {
  dispatch({type: AUTH_UPDATE_STARTED});

  updateAuthRequest(password)
    .then(response => {
      if (response.status !== HTTP_200_CODE) {
        throw new Error(INCORRECT_PASSWORD_IDENTIFIER);
      }
    })
    .then(function () {
      dispatch({ type: AUTH_UPDATE_FINISHED });
      dispatch({ type: AUTH_HIDE_DISPLAY_MODAL });
    })
    .catch(err => {
      if (err instanceof Error && err.message === INCORRECT_PASSWORD_IDENTIFIER) {
        dispatch({ type: AUTH_UPDATE_FAILED });
      }
    });
};
