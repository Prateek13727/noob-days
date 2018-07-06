import { WIDGET_COUNT } from '../actions/index'

export default function (state = 1, action) {
    switch(action.type) {
      case WIDGET_COUNT:
        return action.payload
      default:
        return state;
    }
}
