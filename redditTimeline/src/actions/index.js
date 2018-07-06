import axios from 'axios';

export const FETCH_POSTS = "get_posts"
export const BOOKMARK_POST  = "bookmark_post"
export const UNBOOKMARK_POST  = "unbookmark_post"
export const BOOKMARK_LIST  = "bookmark_list"
export const IS_LOADING  = "is_loading"

const ROOT_URL = 'https://www.reddit.com/'

export function fetchPosts(after="") {
  const request = axios.get(`${ROOT_URL}/r/subreddit/new.json?limit=20&after=${after}`)
  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function bookmarkPost(id) {
  return {
    type: BOOKMARK_POST,
    payload: id
  }
}

export function getExistingBookmarks() {
  const persistedBookmarks = localStorage.getItem('bookmarks')
  let bookmarks = [];
  if(!persistedBookmarks) {
    bookmarks = [];
  } else {
    bookmarks = JSON.parse(persistedBookmarks);
  }
  return {
    type: BOOKMARK_LIST,
    payload: bookmarks
  }
}

export function unbookmarkPost(id) {
  return {
    type: UNBOOKMARK_POST,
    payload: id
  }
}

export function toggleLoadingState(isLoading) {
  return {
    type: IS_LOADING,
    payload: isLoading
  }
}
