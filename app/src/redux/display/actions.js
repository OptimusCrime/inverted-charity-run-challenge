import {
  CHANGE_CURRENT_CHALLENGE,
  CHANGE_VIEW
} from './constants';

export const changeCurrentChallenge = (challenge, challenges) => dispatch => dispatch({
  type: CHANGE_CURRENT_CHALLENGE,
  challenge,
  challenges
});

export const changeView = view => dispatch => dispatch({
  type: CHANGE_VIEW,
  view
});