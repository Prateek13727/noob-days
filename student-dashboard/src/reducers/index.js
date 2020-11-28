import { combineReducers } from 'redux';
import StudentsReducer from './reducer_students';
import StudentIdsReducer from './reducer_studentIds';

//any key we provide in combineReducers ends up as a key in global state
const rootReducer = combineReducers({
  students: StudentsReducer,
  studentIds: StudentIdsReducer,
});
	
export default rootReducer;
