import axios from 'axios';
import Notifications, {notify} from 'react-notify-toast';
import { getDataFromLocalStorageByKey } from '../utilities/commonUtilities.js';
import { COINMARKETCAP_API_KEY, KEY_USER_CRYPTO } from '../utilities/env';

export const ADD_USER_CRYPTO = "add_user_crypto";
export const DELETE_USER_CRYPTO = "delete_user_crypto";
export const LIST_USER_CRYPTO = "list_user_crypto";
export const LIST_CRYPTO = "list_crypto";
export const SELECTED_CRYPTO = "select_crypto";
export const CRYPTO_PORTFOLIO_FILTER = "crypto_portfolio_filter";

const BASE_URL= "https://pro-api.coinmarketcap.com/v1/cryptocurrency/";

export function getListOfCryptoCurrencies(start, limit, currency) {
	const headers = {
		"X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
	}
 	// 	const cryptocurrencies = axios.get(`${BASE_URL}listings/latest?start=${start}&limit=${limit}&convert=${currency}`,{
	// 	headers
	// });
 	const cryptocurrencies = axios.get(`/crypto?start=${start}&limit=${limit}&convert=${currency}`, {
		headers
	});
	return {
		type: LIST_CRYPTO,
		payload: cryptocurrencies
	}
}

export function addCryptocurrencyToUserWallet(crypto) {	
	return {
		type: ADD_USER_CRYPTO,
		payload: crypto
	}
}

export function deleteCryptocurrencyFromUserWallet(crypto) {	
	return {
		type: DELETE_USER_CRYPTO,
		payload: crypto
	}
}

export function getCryptoCurrenciesFromUserWallet() {
	const cryptocurrencies = getDataFromLocalStorageByKey(KEY_USER_CRYPTO);
	return {
		type: LIST_USER_CRYPTO,
		payload: cryptocurrencies
	}
}

export function selectCrypto(cryptoId) {
	return {
		type: SELECTED_CRYPTO,
		payload: cryptoId
	}
}

export function toggleFilterState(filterState) {
	return {
		type: CRYPTO_PORTFOLIO_FILTER,
		payload: filterState
	}
}


