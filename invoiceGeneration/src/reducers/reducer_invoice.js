import { CREATE_INVOICE } from '../actions/index';

// state is not the application state, only the  state current action is responsible for
export default function(state=[], action) {
    const { payload, type } = action;
    switch(type) {
      case CREATE_INVOICE:
      	const { data } = payload;
        return data;
    }
    return state
}
