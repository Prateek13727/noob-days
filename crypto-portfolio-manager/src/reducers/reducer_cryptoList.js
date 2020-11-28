import { LIST_CRYPTO } from '../actions/index';
import { CURRENCY } from '../utilities/env';

export default function(state=[], action) {
    switch(action.type) {
      case LIST_CRYPTO:
        return filterProps(action.payload.data);
    }
    return state;
}

const filterProps = ({ data }) => {
	return data.map((obj) => {
		const { 
			id,
		 	name,
	 	 	symbol,
 	 	 	circulating_supply,
 	 	 	cmc_rank,
 	 	 	quote
 	 	} = obj;
 	 	const { price } = quote[CURRENCY];
		return { 
			id,
		 	name,
	 	 	symbol,
 	 	 	circulating_supply,
 	 	 	rank: cmc_rank,
 	 	 	price: price
 	 	}
	});
}