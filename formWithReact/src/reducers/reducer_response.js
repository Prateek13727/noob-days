import { RESPONSE } from '../actions/index'

export default function (state = [], action) {
    switch(action.type) {
      case RESPONSE:
        return [...state, action.payload]
      default:
        return state
    }
}
