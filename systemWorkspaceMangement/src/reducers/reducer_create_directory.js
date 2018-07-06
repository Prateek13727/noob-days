import { CREATE_DIRECTORY } from '../actions/index'

// state is not the application state, only the  state current action is responsible for
export default function(state={}, action) {
    switch(action.type) {
      case CREATE_DIRECTORY:
        return { ...state, [action.payload.key]: action.payload }
      default:
        return state
      }
}

//Sample test code
// return {
//   "root": {
//     key: "root",
//     _parentKey: null,
//     isLeaf: false,
//     name: "root"
//   },
//   "root_1": {
//     key: "root_1",
//     _parentKey: "root",
//     isLeaf: false,
//     name: "root1"
//   },
//   "root_2": {
//     key: "root_2",
//     _parentKey: "root",
//     isLeaf: false,
//     name: "root2"
//   },
//   "root_3": {
//     key: "root_3",
//     _parentKey: "root_1",
//     isLeaf: false,
//     name: "root3"
//   },
//   "root_4": {
//     key: "root_4",
//     _parentKey: "root_2",
//     isLeaf: false,
//     name: "root4"
//   },
//   "root_5": {
//     key: "root_5",
//     _parentKey: "root_3",
//     isLeaf: false,
//     name: "root5"
//   }
// }
