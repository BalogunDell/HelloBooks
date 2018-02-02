import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  loadAllbooks,
  getBookId
} from '../../../Actions/booksAction';
import Loader from '../../presentational/Loader';
import Books from '../../containers/Allbooks/Books';
import authenticate from '../../presentational/HOC/authenticate'

/**
 * Renders All books
 * 
 * @class Allbooks
 * 
 * @extends {Component}
 */
export class Allbooks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      loadingBooks: false,
      bookAvailabilityMessage: ''
    }

    // Bind getBookId to this
    this.getBookId = this.getBookId.bind(this);
  }


  /**
   * Gets id of book clicked - getBookId
   * 
   * @param {object} event
   * 
   * @memberof Allbooks
   * 
   * @returns {void}
  */
  getBookId(event) {
    this.props.getCurrentBookId(event.target.value);
    let currentBook = this.state.books
      .filter((book) => book.id == event.target.value);
    localStorage.setItem('book', JSON.stringify(currentBook[0]));
  }

  /**
   * React lifecycle hook - componentDidMount
   * 
   * @memberof Allbooks
   * 
   * @returns {object} updated state
  */
  componentDidMount() {
    this.setState({ loadingBooks: true });
    // Fetch all books
    this.props.loadAllbooks()
      .then(() => {
        this.setState({ loadingBooks: false });
      })
      .catch(() => {
        this.setState({
          loadingBooks: false
        });
      });
  }

  /**
   * React lifecycle hook - componentWillReceiveProps
   * 
   * @param {object} nextProps
   * 
   * @memberof Allbooks
   * 
   * @returns {object} updated state
  */
  componentWillReceiveProps(nextProps) {
    if(nextProps.retrievedBooks) {
      if( nextProps.retrievedBooks.length === 0) {
        return this.setState({
          bookAvailabilityMessage: 'There is currently no book in the library'
        });
      } 
      return this.setState({
        loadingBooks: false,
        books: nextProps.retrievedBooks});
    }
  }

  /**
   * React render method - render
   * 
   * @memberof Allbooks
   * 
   * @returns {JSX} JSX representation of DOM
  */
  render() {
    return(
      
      <div>
        {/* Row for header  */}
        <div className="row">
          <div className="col s12 books-holder-title center">
            <h1>All Books</h1>
          </div>
        </div>
        <Books
          loadingBooks={this.state.loadingBooks}
          books={this.state.books}
          getBookId={this.getBookId}
          bookAvailabilityMessage = {this.state.bookAvailabilityMessage}
        />
      </div>
    );
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    retrievedBooks: state.books.books,
    currentBookId: state.books.currentBookId
    
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    loadAllbooks: () => dispatch(loadAllbooks()),
    getCurrentBookId: (id) => dispatch(getBookId(id))
  }
}

  export default connect(mapStateToProps,
    mapDispatchToProps)(authenticate(Allbooks));