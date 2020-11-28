import { SHOWS_LIST, SHOW } from '../actions/index';

export default function(state=[], action) {
    switch(action.type) {
  		case SHOWS_LIST:
      		const { data } = action.payload;
        	return data;
    	case SHOW:
    			const imdbID = action.payload;
    			const show = getShowByImdbID(state, imdbID)
        	return show;    
      default:
        return state;	
    }
}


const getShowByImdbID = (shows, imdbID) => {
	return shows.filter(show => show.imdbID === imdbID);
}

