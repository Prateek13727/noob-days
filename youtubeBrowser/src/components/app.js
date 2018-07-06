import React, { Component } from 'react';
import Booklist from '../containers/book_list';
import BookDetail from '../containers/book_details';

export default class App extends Component {
  render() {
    return (
      <div>
        <Booklist />
        <BookDetail />
      </div>
    );
  }
}
