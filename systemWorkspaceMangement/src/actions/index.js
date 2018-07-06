export const CREATE_DIRECTORY = "create_directory";
export const UPDATE_PWD = "update_PWD";

export function updatePWD(pwd) {
  //selectBook is an action creator.It needs to return an action.
  //an object with a type property
  return {
    type: UPDATE_PWD,
    payload: pwd
  }
}

export function createDirectory(directories) {
  //selectBook is an action creator.It needs to return an action.
  //an object with a type property

  return {
    type: CREATE_DIRECTORY,
    payload: directories
  }
}
