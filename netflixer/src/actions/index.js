import axios from 'axios';
import { IMDB_SECREY_KEY } from '../utilities/env';

export const SHOWS_LIST = "show_list";
export const SHOW = "show";
export const SHOW_SELECTED = "show_selected";
export const SHOW_UNSELECTED = "show_unselected";
export const SHOW_IMDB_DATA = "show_imdb_rating";

const IMDB_BASE_URL= "https://www.omdbapi.com/?";

export function getShows(queryString="") {
	const shows = axios.get(`/netflix?key=${queryString}`);
	return {
		type: SHOWS_LIST,
		payload: shows
	}
}

export function getShowByImdbID(imdbID) {
	return {
		type: SHOW,
		payload: imdbID
	}
}

export function selectShow(show) {	
	return {
		type: SHOW_SELECTED,
		payload: show
	}
}

export function unselectShow(show) {	
	return {
		type: SHOW_UNSELECTED,
		payload: show
	}
}

export function getIMDBRatingForShow(imdbID) {
	const url = `${IMDB_BASE_URL}apikey=${IMDB_SECREY_KEY}&i=${imdbID}`;
	const imdbData = axios.get(url);
	return {
		type: SHOW_IMDB_DATA,
		payload: imdbData
	}
}



