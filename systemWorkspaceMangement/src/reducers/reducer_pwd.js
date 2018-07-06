import { UPDATE_PWD } from '../actions/index'

// state is not the application state, only the  state current action is responsible for
export default function(state=[], action) {
    switch(action.type) {
      case UPDATE_PWD:
        return action.payload
      default:
        return ""
    }
}
