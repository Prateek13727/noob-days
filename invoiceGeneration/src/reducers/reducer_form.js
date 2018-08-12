import { CLEAR_FORM_DATA, ADD_ITEM, PERSISTENT_ITEMS } from '../actions/index'
import _ from 'lodash';

export default function (state = [], action) {
    switch(action.type) {
      	case ADD_ITEM:
	        const items = [...state, action.payload];
	        localStorage.setItem('items', JSON.stringify(items));
	        return items;
      	case CLEAR_FORM_DATA:
	        localStorage.removeItem('items');
	        return [];
		    case PERSISTENT_ITEMS:
        	return action.payload;
        default:
          return state;
    }
}