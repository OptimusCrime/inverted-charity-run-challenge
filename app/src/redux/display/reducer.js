import
{
  CHANGE_CURRENT_CHALLENGE,
  CHANGE_VIEW, VIEW_FORM,
  VIEW_FRONTPAGE
} from './constants';
import { STATUS_FETCH_FINISHED } from "../status/constants";
import {
  mapChangeCurrentChallenge,
  mapCurrentChallenge
} from "./mapper";

const defaultState = {
  view: VIEW_FORM,
  showModalAuth: false,

  currentChallenge: {}
};

const display = (state = defaultState, action) => {
  switch (action.type) {
    case STATUS_FETCH_FINISHED:
      return {
        ...state,
        currentChallenge: mapCurrentChallenge(action.data)
      };

    case CHANGE_VIEW:
      return {
        ...state,
        view: action.view
      };

    case CHANGE_CURRENT_CHALLENGE:
      return {
        ...state,
        currentChallenge: mapChangeCurrentChallenge(action.challenge, action.challenges)
      };

    default:
      return state
  }
};

export default display;
