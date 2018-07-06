import axios from 'axios';

export const RESPONSE  = "response";
export const WIDGET_COUNT  = "widgetCount";
export const IS_DISABLED  = "widgetState";
export const FORM_DATA  = "formData";
const ROOT_URL = 'https://reqres.in/api/users';

export function doRequest(number, url) {
  let response = {}
  if (url) {
    response = axios.get(`${url}?page=${number}`)
  } else {
    response = axios.get(`${ROOT_URL}?page=${number}`)
  }
  return {
    type: RESPONSE,
    payload: response
  }
}

export function updateFormData(data, callback) {
  setTimeout(() => {
    callback();
  }, 0)
  return {
    type: FORM_DATA,
    payload: data
  }
}

export function addWidget(count) {
  const newCount = count + 1;
  return {
    type: WIDGET_COUNT,
    payload: newCount
  }
}

export function getWidgetCount() {
  return {
    type: WIDGET_COUNT
  }
}

export function toggleWidgetState(state) {
  return {
    type: IS_DISABLED,
    payload: state
  }
}
