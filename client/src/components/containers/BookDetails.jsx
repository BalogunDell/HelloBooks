import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import getUserDetails from '../../utils/getUserInfo';
import BookInfo from '../presentational/BookInfo';
import {
  userBooks,
  borrowBook
} from '../../Actions/booksAction';
import {
  successMessage,
  failureMessage,
  membershipIconCreator
} from '../../utils/messages';
import authenticate from '../presentational/HOC/authenticate';

export class BookDetails extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentBookId: parseInt(this.props.currentBookId),
      books: this.props.allbooks,
      book: [],
      dataReady: false,
      borrowErrorStatus:false,
      disableBtn: false,
      processingRequest: false,
      borrowSuccessStatus: false,
      borrowedMessage: '',
      isAdmin: false
    }

    this.handleBorrow = this.handleBorrow.bind(this);

}

  handleBorrow(){
    this.setState({processingRequest: true})
    this.props.borrowBook({bookId:this.state.currentBookId})
    .then(() => {
      this.setState({
        borrowBookSuccess: true,
        borrowErrorStatus:false,
        processingRequest: false,
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
        disableBtn:true });
    });
  }

  componentWillMount() {

    this.setState({dataReady:true,
      borrowErrorStatus: false,
      disableBtn: false,
      borrowBookSuccess:false});
      const filtered = JSON.parse(localStorage.getItem('book'));
      if(filtered.quantity === 0) {
        this.setState({
          disableBtn: true,
          book: filtered,
          dataReady:false
        });
      } else {
        this.setState({
          book: filtered,
          dataReady:false,
          disableBtn: false
        });
      }
    
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
        book.bookId == this.state.currentBookId) 
        && 
        (book.returnStatus == false));
        
      
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
          <BookInfo
          book = {this.state.book}
          isAdmin = {this.state.isAdmin}
          disableBtn = {this.state.disableBtn}
          handleBorrow = {this.handleBorrow}
          borrowedMessage= {this.state.borrowedMessage}
          borrowErrorStatus = {this.state.borrowErrorStatus}
          borrowSuccessStatus = {this.state.borrowSuccessStatus}
          />

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

export default connect(mapStateToProps, maptDispatchToProps)(authenticate(BookDetails));