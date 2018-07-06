import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Infinite from 'react-infinite';
import Loading from 'react-loading-animation'
import { fetchPosts, bookmarkPost, unbookmarkPost, toggleLoadingState, getExistingBookmarks } from '../actions/index';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Checkbox from 'material-ui/Checkbox';

class TimelineComponent extends React.Component {
  componentWillMount() {
    const { toggleLoadingState, fetchPosts, getExistingBookmarks } = this.props;
    toggleLoadingState(true);
    fetchPosts("", toggleLoadingState);
    getExistingBookmarks();
  }

  handleToggle(key, event) {
    if (event.target.checked) {
      this.props.bookmarkPost(key);
    } else {
      this.props.unbookmarkPost(key);
    }
  }

  getImageUrl(post) {
      const { preview: { images = [] }} = post;
      return images.length ? images[0].source.url : "../../style/images/reddit.jpg"
  }

  renderPosts() {
    const { posts, bookmarkPosts } = this.props;
    return Object.keys(posts).map((key) => {
      const imageURL = this.getImageUrl(posts[key])
      const author = posts[key].author ?  posts[key].author  : "";
      return <ListItem key={key}>
        <Avatar alt="Reddit" src={imageURL} />
        <ListItemText
            primary={posts[key].title}
            secondary={author}
        />
        <ListItemSecondaryAction>
          <Checkbox
            onChange={this.handleToggle.bind(this, key)}
            checked={bookmarkPosts.indexOf(key) !== -1}
          />
        </ListItemSecondaryAction>
      </ListItem>
    })
  }

  getBookmarkedPosts() {
    const { posts, bookmarkPosts = [] } = this.props;
    const bookmarkedPostdata = [];
    bookmarkPosts.forEach((id) => {
      posts[id] ? bookmarkedPostdata.push(posts[id]) : null;
    })
    return bookmarkedPostdata;
  }

  renderBookmarkedPosts() {
    const posts = this.getBookmarkedPosts();
    return posts.map((post) => {
      const imageURL = this.getImageUrl(post)
      const author = post.author ?  post.author  : "";
      return <ListItem key={post.id}>
        <Avatar alt="Reddit" src={imageURL} />
        <ListItemText
            primary={post.title}
            secondary={author}
        />
      </ListItem>
    })
  }

  getLoader() {
    return <div>
      <Loading />
    </div>
  }

  getAfterPropForFetchAPI() {
    const { posts } = this.props;
    const lastkey = Object.keys(posts)[Object.keys(posts).length -1]
    return posts[lastkey] ? `t3_${posts[lastkey].id}` : ""
  }

  handleInfiniteLoad() {
    const { toggleLoadingState, fetchPosts } = this.props;
    toggleLoadingState(true)
    setTimeout(() => {
        const after = this.getAfterPropForFetchAPI()
        fetchPosts(after)
        toggleLoadingState(false)
    }, 2500);
  }

  render(){
    const { isLoading } = this.props;
    return <div className="container">
      <div className="row col-md-7 posts">
        <Infinite
          elementHeight={60}
          containerHeight={1400}
          infiniteLoadBeginEdgeOffset={200}
          useWindowAsScrollContainer={true}
          isInfiniteLoading={isLoading}
          loadingSpinnerDelegate={this.getLoader()}
          onInfiniteLoad={this.handleInfiniteLoad.bind(this)}
          >
          <List>
            {this.renderPosts()}
          </List>
        </Infinite>
      </div>
      <div className="row col-md-5">
        <div className="page-header bookmarked-header">Bookmarked Posts</div>
        <List>
          {this.renderBookmarkedPosts()}
        </List>
      </div>
    </div>
  }
}

function mapActionsToProps(dispatch) {
  // the createDirectory is called the result  is passed to all the reducers
  return bindActionCreators({ fetchPosts, bookmarkPost, unbookmarkPost, toggleLoadingState, getExistingBookmarks }, dispatch);
}

function mapStateToProps({ posts, bookmarkPosts, isLoading }) {
  // whatever is returned from here will show up as props in the component
  return {
    posts,
    bookmarkPosts,
    isLoading
  }
}

export default connect(mapStateToProps, mapActionsToProps)(TimelineComponent);
