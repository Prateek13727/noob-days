//clone javascript object
export function cloneObject(src) {
  return Object.assign({}, src);
}

//check for empty javascript object
export function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
