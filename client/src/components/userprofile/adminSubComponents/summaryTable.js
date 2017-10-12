import React from 'react';
import { connect } from 'react-redux';



class summaryTable extends React.Component {
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

  componentDidMount() {

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
                <td>Total Books in Library</td>
                <td>{this.state.bookCount}</td>
              </tr>

              <tr>
                <td>Books Returned</td>
                <td>{this.state.booksReturnedCount}</td>
              </tr>

              <tr>
                <td>Pending Return</td>
                <td>{this.state.pendingReturnCount}</td>
              </tr>

              <tr>
                <td>Most Borrowed book</td>
                <td>Angular 2, React for Beginners...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  } 
}

const stateToProps = (state) => {
  return {
    allbooks: state.books.books,
    borrowedBooks: state.books.allborrowedbooks
  }
}
export default connect(stateToProps, null)(summaryTable);