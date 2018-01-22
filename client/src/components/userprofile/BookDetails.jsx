import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import getUserDetails from '../../utils/getUserInfo';
import {
  userBooks,
  borrowBook
} from '../../Actions/booksAction';
import {
  successMessage,
  failureMessage,
  membershipIconCreator
} from './messages';
import AuthenticateUser from '../HOC/authenticate';

export class BookDetails extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      book_id: this.props.currentBookId,
      books: this.props.allbooks,
      book: [],
      dataReady: false,
      borrowError: '',
      borrowErrorStatus:false,
      disableBtn: false,
      processingRequest: false,
      borrowSuccessStatus: false,
      borrowedMessage: '',
      isAdmin: false
    }

    this.handleBorrow = this.handleBorrow.bind(this)

}

  handleBorrow(){
    this.setState({processingRequest: true})
    this.props.borrowBook({bookid:this.state.book_id})
    .then(() => {
      this.setState({
        borrowBookSuccess: true,
        borrowErrorStatus:false,
        processingRequest: false,
        borrowError: '',
        disableBtn: true,
        borrowBookSuccessMessage: this.props.borrowBookSuccess
      });
      Materialize.toast('You have successfully borrowed this book',
      4000,
      'blue rounded');
    })
    .catch(error => {
      this.setState({
        processingRequest: false,
        borrowErrorStatus:true,
        borrowError: error.response.data.msg, disableBtn:true });
        Materialize.toast('You have either exhausted your book limit or you still have this book with you',
          4000,
          'red rounded');
    });
  }

  componentWillMount() {

    this.setState({dataReady:true,
      borrowErrorStatus: false,
      disableBtn: false,
      borrowBookSuccess:false});
      const filtered = JSON.parse(localStorage.getItem('book'));
    this.setState({book: filtered, dataReady:false});
  }

  componentDidMount() {
    if(getUserDetails().userType === 'admin') {
      this.setState({ isAdmin: true });
    } else {
      this.setState({ isAdmin: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.fetchedUserbooks.response) {
      this.setState({
        dataReady:false,
        borrowErrorStatus: false,
        disableBtn: false,
        borrowBookSuccess:false });
      let filteredBook = nextProps.fetchedUserbooks.response.filter(book => (
        book.bookid == this.state.book_id) 
        && 
        (book.returnstatus == false));
        
      
      if(filteredBook.length === 1) {
        this.setState({ disableBtn: true,
          borrowedMessage: 'You have already borrowed this book!' });
      }
       else {
        this.setState({ disableBtn: false, borrowedMessage: '' });
       }
      
    }
  }



  render() {
    const processing = <h6 className="center">Processing Request...</h6>
    let showError = this.state.processingRequest ? processing : null
    let success = this.state.borrowBookSuccess ? '' : null
    let failure = this.state.borrowErrorStatus ? '' : null

    return (
      
      this.state.dataReady 
      ? 
      <h4 className="center">Loading book details...</h4> 
      :
        <div className="row">
          <div className="row">
            <div className="col s12 m12 l6 offset-3 center">
              <h3 className="center">Book Details</h3>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m12 l6 offset-4 center">
               <img
                src= {this.state.book.image} alt={this.state.book.title} 
                className="responsive-img"/>  
            </div>

            <div className="col s12 m12 l3 offset-9">
              <div className="bookInfo">
                <table>
                  <thead>
                    <tr>
                      <th>
                         {this.state.book.title} 
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Author</td>
                       <td>{this.state.book.author}</td> 
                    </tr>

                    <tr>
                      <td>Category</td>
                       <td>{this.state.book.category.category}</td> 
                    </tr>

                    <tr>
                      <td>ISBN</td>
                       <td>{this.state.book.isbn}</td> 
                    </tr>

                    <tr>
                      <td>Year</td>
                       <td>{this.state.book.year}</td> 
                    </tr>

                    <tr>
                      <td>Pages</td>
                       <td>{this.state.book.pages}</td> 
                    </tr>

                    <tr>
                      <td>Quantity Available</td>
                       <td>{this.state.book.quantity}</td> 
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr/>

                <div>
                   <p>{this.state.book.description}</p> 
                </div>

              <hr/>

                <div>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          { this.state.isAdmin 
                          ?
                          <Link 
                            to="/user/books"
                            className="btn waves-teal waves-effect">Back
                          </Link>
                          :
                          <button
                            className="btn waves-teal waves-effect" 
                            onClick={this.handleBorrow}
                            disabled={this.state.disableBtn}>BORROW
                          </button>

                          }
                        </td>
                      </tr>
                      <tr
                        className="red-text">
                        <td>{this.state.borrowedMessage}</td>
                      </tr>
                      {this.state.borrowErrorStatus 
                      ? <tr>
                          <td>
                            <button className="btn waves-teal waves-effect">
                              <Link
                                to="/user/books">Back to library
                              </Link>
                            </button>
                          </td>
                        </tr> 
                      :
                      null 
                      }
                      
                      {this.state.borrowSuccessStatus
                        ?
                        <tr>
                          <td>
                            <button className="btn waves-teal waves-effect">
                              <Link 
                                to="/user/history">View history
                              </Link>
                            </button>
                          </td>
                        </tr>
                        :
                        null
                      }
                    </tbody>
                  </table>
                </div>
            </div>
          </div>

          {/* ERROR OR SUCCESS MESSAGE HERE */}
          {showError}
          {success}
          {failure}
        </div>
      )
  }
} 


export function mapStateToProps (state, ownProps) {
  return {
    fetchedUserbooks: state.books.fetchedBooks,
    allbooks: state.books.books,
    currentBookId: state.books.currentBookId

  }
}

export function maptDispatchToProps(dispatch) {
  return {
    borrowBook: (bookDetails) => dispatch(borrowBook(bookDetails)),
    userBooks: () => dispatch(getUserBooks())
  }
}

export default connect(mapStateToProps, maptDispatchToProps)(BookDetails);