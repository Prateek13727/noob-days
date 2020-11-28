import { STUDENTS } from '../actions/index';

export default function(state={}, action) {
    switch(action.type) {
  		case STUDENTS:
      		const { data } = action.payload;
        	return data;
      default:
        return state;	
    }
}


