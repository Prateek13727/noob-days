import { combineReducers } from 'redux';
import IMDBRatingReducer from './reducer_imdbRating';
import SelectedShowReducer from './reducer_selectedShow';
import ShowListReducer from './reducer_showList';

//any key we provide in combineReducers ends up as a key in global state
const rootReducer = combineReducers({
  showList: ShowListReducer,
  selectedShow: SelectedShowReducer,
  imdbRating: IMDBRatingReducer
});

export default rootReducer;
