import React from 'react';
import { connect } from 'react-redux';

import { 
  getUserBooks,
  getBookId,
  returnBook } from '../../Actions/booksAction';
import UserBooks from './TableRows/UserBooks';

/**
 * Borrowed Books component
 *
 * @class BorrowedBooks
 *
 * @extends {Component}
 */
export class BorrowedBooks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: this.props.userID,
      loading: false,
      borrowedBooks: [],
      tableHeader: 'Books with you'
    }

    this.handleReturn = this.handleReturn.bind(this);
  }

  /**
   * return book handler
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
       return book.bookid != event.target.value
      });
    this.props.returnBook({bookid: event.target.value})
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
   * pdf file upload method
   *
   * @memberof BorrowedBooks
   *
   * @returns {object} updated state
   */
  componentDidMount() {
    this.setState({loading: true });
    this.props.getUserBooks(this.state.userid)
      .then(() => {
        this.setState({
          loading: false
        });
      })
      .catch((error) => {
        this.setState({
          loading: false
        });
      })
  }

  /**
   * pdf file upload method
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
        borrowedBooks: nextProps.fetchedBooks.response.filter((book) => {
          return book.returnstatus == false;
         })
      });
    }
  }

  /**
   * react render method
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
 *  HOC - Redux Connect method parameter
 *
 * @param {Object} state
 *
 * @returns {object} store state
 */

export const mapStateToProps = (state) => {
  return {
    fetchedBooks: state.books.fetchedBooks,
  }
}

/**
 *  HOC - Redux Connect method parameter
 *
 * @param {Object} dispatch
 *
 * @returns {object} action creators
 */
export const mapDispatchToProps = (dispatch) => {
  return {
    getUserBooks: (userid) => dispatch(getUserBooks(userid)),
    returnBook: (bookid) => dispatch(returnBook(bookid)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BorrowedBooks);
