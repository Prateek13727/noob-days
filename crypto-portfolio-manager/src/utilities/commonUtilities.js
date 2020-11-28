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