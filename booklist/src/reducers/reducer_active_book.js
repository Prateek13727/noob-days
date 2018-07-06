// state is not the application state, only the  state current action is responsible for
export default function(state=null, action) {
    switch(action.type) {
      case 'BOOK_SELECTED':
        return action.payload
    }
    return state
}
