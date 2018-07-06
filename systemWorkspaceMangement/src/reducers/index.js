import { combineReducers } from 'redux';
import DirectoryCreateReducer from './reducer_create_directory';
import PWDUpdateReducer from './reducer_pwd';

const rootReducer = combineReducers({
  directories: DirectoryCreateReducer,
  pwd: PWDUpdateReducer
});

export default rootReducer;
