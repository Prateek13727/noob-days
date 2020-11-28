import {STUDENT_IDS } from '../actions/index';

export default function(state=[], action) {
    switch(action.type) {
  		case STUDENT_IDS:
        	return action.payload;
        default:
			return state;	
    }
}
