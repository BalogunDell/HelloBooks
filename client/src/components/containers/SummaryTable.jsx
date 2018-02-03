import React from 'react';
import { connect } from 'react-redux';

/**
 * @class SummaryTable
 * 
 * @description SummaryTable for admin dashboard
 * 
 * @extends {Component}
 */
export class SummaryTable extends React.Component {
  constructor(props){
    super(props);
    
  this.state = {
    books: [],
    pendingReturnCount: 0,
    booksReturnedCount: 0,
    bookCount: 0,
    borrowed: []
  }
}
  /**
 * @description React lifecycle hook - componentWillReceiveProps
 * 
 * @param {object} nextProps
 * 
 * @memberof SummaryTable
 * 
 * @returns {object} updated state
*/
  componentWillReceiveProps(nextProps){
    if(nextProps.allbooks) {
      if(this.state.books !== nextProps.allbooks) {
        this.setState({books: nextProps.allbooks});
        let count = nextProps.allbooks.length;
        this.setState({bookCount: count});
      }
    }

    if(nextProps.borrowedBooks) {
      if(this.state.borrowed !== nextProps.borrowedBooks) {
        let returnedbookCount = nextProps.borrowedBooks
          .filter(book=>book.returnStatus === true);
        let unreturnedbookCount = nextProps.borrowedBooks
          .filter(book=>book.returStatus === false);
        this.setState({
          pendingReturnCount: unreturnedbookCount.length,
          booksReturnedCount: returnedbookCount.length});
      }
    }
  }

  /**
   * @description React render method - render
   * 
   * @memberof SummaryTable
   * 
   * @returns {JSX} JSX representation of DOM
  */
  render() {
    return(
      <div>
        <div className="row">
           <h4 className="center">ADMIN DASHBOARD</h4>
        </div>

        <div className="row">
          <table className="summary-table styledUserBooksTable">
            <thead>
              <tr>
                <th>SUMMARY</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td id="totalBooksText">Total Books in Library</td>
                <td id="totalBooks">{this.state.bookCount}</td>
              </tr>

              <tr>
                <td id="returnedBooksText">Books Returned</td>
                <td id="returnedBooks">{this.state.booksReturnedCount}</td>
              </tr>

              <tr>
                <td id="pendingBooksText">Pending Return</td>
                <td id="pendingBooks">{this.state.pendingReturnCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  } 
}

/**
 * @description Redux connect parameter - stateToProps
 * 
 * @param {object} state
 * 
 * @returns {object} mapped state 
*/
export const stateToProps = (state) => {
  return {
    allbooks: state.books.books,
    borrowedBooks: state.books.allborrowedbooks
  }
}
export default connect(stateToProps, null)(SummaryTable);