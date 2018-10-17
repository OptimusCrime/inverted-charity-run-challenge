import { combineReducers } from 'redux';

import auth from './auth/reducer';
import display from './display/reducer';
import entry from './entry/reducer';
import status from './status/reducer';

const rootReducer = combineReducers({
  auth,
  display,
  entry,
  status
});

export default rootReducer;
