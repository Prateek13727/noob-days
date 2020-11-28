import { notify } from 'react-notify-toast';

export function getDataFromLocalStorageByKey(key) {
  const persistedData = localStorage.getItem(key);
  return !persistedData ? [] : JSON.parse(persistedData);
}

export function addDataToLocalStorageByKey(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function cloneObject(src) {
  return Object.assign({}, src);
}

export function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export function getShortDate(milliseconds) {
	if(milliseconds) {
    const date = new Date(milliseconds);
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;   
  }  else {
    return "";
  }
}

export function getDateString(milliseconds) {
  if(milliseconds) {
    const date = new Date(milliseconds);
    return date.toDateString(milliseconds);
  } else {
    return ""
  }
}

export function showNotification(message, type, timeout, color) {
    return notify.show(message, type, timeout, color)
}
