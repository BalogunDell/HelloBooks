import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  loadAllbooks,
  getBookId
} from '../../../actions/booksAction';
import Loader from '../../presentational/Loader';
import Books from '../../containers/Allbooks/Books';

/**
 * @description Renders All books
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
      bookAvailabilityMessage: '',
    }

    this.getBookId = this.getBookId.bind(this);
  }


  /**
   * @description Gets id of book clicked - getBookId
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
   * @description React lifecycle hook - componentDidMount
   * 
   * @memberof Allbooks
   * 
   * @returns {object} updated state
  */
  componentDidMount() {
    this.props.loadAllbooks()
      .then(() => {
      })
      .catch((error) => {
      });
  }

  /**
   * @description React lifecycle hook - componentWillReceiveProps
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
        books: nextProps.retrievedBooks});
    }
  }

  /**
   * @description React render method - render
   * 
   * @memberof Allbooks
   * 
   * @returns {JSX} JSX representation of DOM
  */
  render() {
    return(
        <div>
          <div className="row">
            <div className="col s12 books-holder-title center">
              <h1>All Books</h1>
            </div>
          </div>
          <Books
            books={this.state.books}
            getBookId={this.getBookId}
            bookAvailabilityMessage = {this.state.bookAvailabilityMessage}
            />
      </div>
    );
  }
}

/**
 * @description Redux connect parameter - mapStateToProps
 * 
 * @param {object} state
 * 
 * @returns {object} mapped state 
*/
export const mapStateToProps = (state) => {
  return {
    retrievedBooks: state.books.books,
    currentBookId: state.books.currentBookId,
    
  }
}

/**
 * @description Redux connect parameter - mapDispatchToProps
 * 
 * @param {function} dispatch
 * 
 * @returns {object} mapped dispatch 
*/
export const mapDispatchToProps = (dispatch) => {
  return {
    loadAllbooks: () => dispatch(loadAllbooks()),
    getCurrentBookId: (id) => dispatch(getBookId(id))
  }
}

  export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (Allbooks);