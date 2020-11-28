import { INVOICE_CREATE } from '../actions/index';

export default function(state={}, action) {
    switch(action.type) {
      	case INVOICE_CREATE:
	      	return action.payload.data;
      	default:
    		return state
   	}
}
