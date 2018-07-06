import { IS_DISABLED} from '../actions/index'

export default function (state = false, action) {
    switch(action.type) {
      case IS_DISABLED:
        return action.payload
      default:
        return state;
    }
}
