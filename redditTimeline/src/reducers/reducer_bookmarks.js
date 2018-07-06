import { BOOKMARK_POST, UNBOOKMARK_POST, BOOKMARK_LIST } from '../actions/index'
import _ from 'lodash';

export default function (state = [], action) {
    switch(action.type) {
      case BOOKMARK_POST:
        const bookmarks = [...state, action.payload]
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
        return bookmarks;
      case UNBOOKMARK_POST:
        const filteredBookmarks = state.filter(key => key !== action.payload)
        localStorage.setItem('bookmarks', JSON.stringify(filteredBookmarks))
        return filteredBookmarks;
      case BOOKMARK_LIST:
        return action.payload;
      default:
        return state;
    }
}
