import React from 'react';
import { connect } from 'react-redux';


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
        let returnedbookCount = nextProps.borrowedBooks.filter(book=>book.returnstatus === true);
        let unreturnedbookCount = nextProps.borrowedBooks.filter(book=>book.returnstatus === false);
        this.setState({
          pendingReturnCount: unreturnedbookCount.length,
          booksReturnedCount: returnedbookCount.length});
      }
    }
  }


  render() {
    return(
      <div>
        <div className="row">
           <h4 className="center">ADMIN DASHBOARD</h4>
        </div>

        <div className="row">
          <table className="summary-table">
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

export const stateToProps = (state) => {
  return {
    allbooks: state.books.books,
    borrowedBooks: state.books.allborrowedbooks
  }
}
export default connect(stateToProps, null)(SummaryTable);