import { combineReducers } from 'redux';
import BookReducer from './reducer_books';
import ActiveBookReducer from './reducer_active_book';
//any key we provide in combineReducers ends up as a key in global state
const rootReducer = combineReducers({
  books: BookReducer,
  activeBook: ActiveBookReducer
});

export default rootReducer;
