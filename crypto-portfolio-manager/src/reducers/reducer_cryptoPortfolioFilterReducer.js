import { CRYPTO_PORTFOLIO_FILTER } from '../actions/index';

export default function(state=false, action) {
    switch(action.type) {
  		case CRYPTO_PORTFOLIO_FILTER:
        	return action.payload
		default:
			return state;
    }
}