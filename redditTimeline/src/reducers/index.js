import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import BookmarkPostReducer from './reducer_bookmarks';
import InfiniteScrollerReducer from './reducer_infinteScroll';

const rootReducer = combineReducers({
  posts:PostsReducer,
  bookmarkPosts: BookmarkPostReducer,
  isLoading: InfiniteScrollerReducer
});

export default rootReducer;
