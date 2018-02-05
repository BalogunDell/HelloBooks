import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import clearStorage from '../../utils/clearStorage';
import { 
  getUserBooks,
  getBookId,
  returnBook } from '../../actions/booksAction';
import UserBooks from '../presentational/UserBooks';

/**
 * @description Borrowed Books component
 *
 * @class BorrowedBooks
 *
 * @extends {Component}
 */
export class BorrowedBooks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.userId,
      borrowedBooks: [],
      tableHeader: 'Books with you',
      restricted: false
    }

    this.handleReturn = this.handleReturn.bind(this);
  }

  /**
   * @description return book handler
   *
   * @memberof BorrowedBooks
   *
   * @param {Object} event
   *
   * @returns {object} updated borrowedbooks with success message
   */
  handleReturn(event) {
    event.persist();
    let spliced = this.state.borrowedBooks.filter((book) => {
       return book.bookId != event.target.value
      });
    this.props.returnBook({bookId: parseInt(event.target.value)})
    .then(() => {
      this.setState({borrowedBooks: spliced });
        Materialize.toast(
          'Book has been successfully returned',
          3000,
          'blue rounded');
    })
    .catch(error => {
    });
  }

  /**
   * @description PDF file upload method
   *
   * @memberof BorrowedBooks
   *
   * @returns {object} updated state
   */
  componentDidMount() {
    this.props.getUserBooks(this.state.userId)
      .then(() => {
      })
      .catch((error) => {
      })
  }

  /**
   * @description PDF file upload method
   *
   * @memberof BorrowedBooks
   *
   * @param {Object} nextProps
   *
   * @returns {object} updated state with borrowed books
   */
  componentWillReceiveProps(nextProps) {
    if(nextProps.fetchedBooks) {
      this.setState({
        borrowedBooks: nextProps.fetchedBooks.fetchedBooks
          .filter((book) => {
          return book.returnStatus == false;
         })
      });
    }
  }

  /**
   * @description react render method
   *
   * @memberof BorrowedBooks
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    return(
      <div>
          <div className="row">
          <div className="col s12 books-holder-title center">
            <h1>Recently Borrowed</h1>
          </div>
          <div className="row borrowHistory">
            <div className="col s12 m12 l11 offset-l1">
            <br/>
              <UserBooks
                allUserBooks = {this.state.borrowedBooks}
                tableHeader= {this.state.tableHeader}
                handleReturn = {this.handleReturn}/>
            </div>
          </div>
        </div>
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
    fetchedBooks: state.books,
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
    getUserBooks: (userId) => dispatch(getUserBooks(userId)),
    returnBook: (bookId) => dispatch(returnBook(bookId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (BorrowedBooks);
