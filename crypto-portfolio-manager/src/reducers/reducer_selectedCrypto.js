import { SELECTED_CRYPTO } from '../actions/index';

export default function(state="", action) {
    switch(action.type) {
      	case SELECTED_CRYPTO:
	      	return action.payload;
    	default:
    		return state
    } 
}