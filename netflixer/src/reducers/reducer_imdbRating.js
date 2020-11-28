import { SHOW_IMDB_DATA} from '../actions/index';

export default function(state="", action) {
    switch(action.type) {
      	case SHOW_IMDB_DATA:
      		const { imdbRating } = action.payload.data;
	      	return imdbRating;
      	default:
    		return state
   	}
}
