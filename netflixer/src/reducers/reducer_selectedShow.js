import { SHOW_SELECTED, SHOW_UNSELECTED } from '../actions/index';

export default function(state={}, action) {
    switch(action.type) {
      	case SHOW_SELECTED:
	      	return action.payload;
      	case SHOW_UNSELECTED:
	      	return {};
    	default:
    		return state
    } 
}