import React from 'react';
import { connect } from 'react-redux';

import * as bookActions from '../../Actions/booksAction';
/**
 * @class History
 * @classdesc returns the borrow history of the user
 */
class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: this.props.userID,
      loading: false
    }
  }

  componentWillMount() {
    this.setState({loading: true})
    this.props.getUserBooks().then(() => {
      this.setState({loading:false})
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    console.log('this is the fectched books:', this.props.fetchedUserBooks)
    return(
      <div>
        {/* Row for header  */}
        <div className="row">
          <div className="col s12 books-holder-title center">
            <h1>Borrow History</h1>
          </div>
        </div>
      
        {/* Row for books  */}
        
        <div className="row borrowHistory">
          <div className="col s12 m12 l11 offset-l1">
            {this.state.loading 
              ?
                <h3>Loading books...</h3>
              :
              <table className="responsive-table centered highlight">
                <thead>
                  <tr>
                    <th>Book image</th>
                    <th>Book title</th>
                    <th>Author</th>
                    <th>Date Borrowed</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.fetchedUserBooks.map((book, id) =>
                  <tr key={book.id}>
                    <td><img src={book.image} alt="Book cover"/></td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.dateBorrowed}</td>
                    <td>
                      <button className="">Read</button> | <button className="">Return</button>
                    </td>
                  </tr>
                  )} 
                  </tbody>
              </table>
            }
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    fetchedUserBooks: state.books.fetchedUserBooks
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getUserBooks: (userid) => dispatch(bookActions.getUserBooks(userid))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(History);
