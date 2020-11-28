import { addDataToLocalStorageByKey, cloneObject } from '../utilities/commonUtilities.js';
import { KEY_USER_CRYPTO } from '../utilities/env';
import { LIST_USER_CRYPTO, ADD_USER_CRYPTO, DELETE_USER_CRYPTO } from '../actions/index';

export default function(state={}, action) {
    switch(action.type) {
      	case ADD_USER_CRYPTO:     
      		let newStateAfterAdd = cloneObject(state);
	      	manageUserCryptoData(newStateAfterAdd, action.payload, true);
	      	addDataToLocalStorageByKey(KEY_USER_CRYPTO, newStateAfterAdd);
	      	return newStateAfterAdd;
  		case DELETE_USER_CRYPTO:      	
  			let newStateAfterDelete = cloneObject(state);
	      	manageUserCryptoData(newStateAfterDelete, action.payload, false);
	      	addDataToLocalStorageByKey(KEY_USER_CRYPTO, newStateAfterDelete);
	      	return newStateAfterDelete;
		case LIST_USER_CRYPTO:
			return action.payload;
		default:
        	return state;
    }
}

const manageUserCryptoData = (state, payload, add) => {
	const { id, name, symbol, price, rank } = payload;
	if(state[id] && add) {
		state[id].quantity += 1;
		state[id].totalWorth += price;
	} else if(state[id] && !add) {
		state[id].quantity -= 1;
		state[id].totalWorth -= price;
		if (!state[id].quantity) {
			delete state[id];
		}
	} else if (add) {
		state[id] = {
			id, 
			name, 
			symbol,
			totalWorth: price,
			quantity: 1,
			price,
			rank
		}
	}
	return state;
}