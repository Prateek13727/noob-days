import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectBook } from '../actions/index';

class Booklist extends Component {
  renderList() {
    return this.props.books.map((book) => {
        return (
            <li
              key={book.title}
              className='list-group-item'
              onClick={() => this.props.selectBook(book)}>
              {book.title}
            </li>
        )
    })
  }

  render() {
    return <ul className="list-group col-sm-4">
      {this.renderList()}
    </ul>
  }
}

function mapStateToProps(state) {
  // whatever is returned from here will show up as props in the Booklist Component
  return {
    books: state.books
  }
}

function mapActionsToProps(dispatch) {
  // the selectBook is called the result  is passed to all the reducers
  return bindActionCreators({ selectBook: selectBook }, dispatch);
}

// promote Booklist from a component to a container.
// it needs to know about this new dispatch method, selectBook. Make it available as
// prop to Booklist component
export default connect(mapStateToProps, mapActionsToProps)(Booklist);
