import { INVOICES} from '../actions/index';

export default function(state=[], action) {
    switch(action.type) {
      	case INVOICES:
	      	return action.payload.data;
      	default:
    		return state
   	}
}
