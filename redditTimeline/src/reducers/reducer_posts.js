import { FETCH_POSTS } from '../actions/index'
import _ from 'lodash';

export default function (state = {}, action) {
    switch(action.type) {
      case FETCH_POSTS:
        const newPosts =  _.mapKeys(getData(action.payload), 'id')
        const oldPosts = state;
        return { ...newPosts, ...oldPosts }
      default:
        return state
    }
}

function getData(payload = {}) {
  const { data: {data: { children = [] } = {} } = {} } = payload;
  if (children.length) {
    return children.map(({ data }) => {
        const {id = "", title = "", author = "", preview ={} } = data;
        return {
            id,
            title,
            author,
            preview
        }
    })
  }
  return [];
}
