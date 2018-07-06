export default function(state=[], action) {
    switch(action.type) {
      case 'FETCH_WEATHER':
        //we do not do state.push() since we should never mutate the state
        // the below code is ES6 equovalent of state.concat(action.payload.data) which returns a new version of the state
        return [ action.payload.data, ...state ]
    }
    return state;
}
