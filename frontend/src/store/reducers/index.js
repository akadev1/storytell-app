import { combineReducers } from 'redux';
import authReducer from './authReducer';
import storyReducer from './storyReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  story: storyReducer,
});

export default rootReducer;
