import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  loadAllbooks,
  getBookId
} from '../../../Actions/booksAction';
import Loader from '../adminSubComponents/loader';
import AuthenticateUser from '../../HOC/authenticate';

/**
 * @class Books
 * @classdesc returns the Books component
 */

export class Allbooks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      book_id: 0,
      books: [],
      loadingBooks: false,
    }

    // Bind getBookId to this
    this.getBookId = this.getBookId.bind(this);
  }


  getBookId(event) {
    this.props.getCurrentBookId(event.target.value);
    let currentBook = this.state.books.filter((book) => book.id == event.target.value);
    localStorage.setItem('book', JSON.stringify(currentBook[0]));
  }

  componentDidMount() {
    this.setState({ loadingBooks: true });
    // Fetch all books
    this.props.loadAllbooks().then(() => {
      this.setState({ loadingBooks: false });
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.retrievedBooks) {
      this.setState({loadingBooks: false, books: nextProps.retrievedBooks});
    }
  }

  render() {
    return(
      
      <div>
        {/* Row for header  */}
        <div className="row">
          <div className="col s12 books-holder-title center">
            <h1>All Books</h1>
          </div>
        </div>
        { this.state.loadingBooks ? 
        <div>
          <h5 className="center"><Loader/></h5>
          <br/>
          <h6 className="center">Loading books..</h6>
          </div>
          : 
          null }
        {/* Row for books  */}
        <div className="row">
          <div className="col s12 m12 l11 offset-l1">
            <div className="books-holder center">
              {this.state.books.length === 0 ?
              <h4 className="center">There's currently no book in the libary</h4>
              :
              this.state.books.map((book, id) => 
                <div className="book-holder-prot" key= {book.id}>
                  {/* Book title  */}
                  <div className="item book-title center">
                    <h6><strong>{book.title}</strong></h6>
                  </div>

                  {/* Book image  */}
                  <div className="item img-holder center">
                    <img src= {book.image} alt=""/>
                    <div className="img-overlay">
                      <p>{book.title} by <strong>{book.author}</strong></p>
                    </div>
                  </div>

                  {/* Book details  */}
                  <div className="dets">
                    <Link to={`/user/bookdetails`} id="bookdetail">
                      <button 
                        type="button"
                        value={book.id}
                        className="btn waves-effect waves-teal"
                        onClick={this.getBookId}>Details
                      </button>
                    </Link>
                    <p>qty: {book.quantity}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
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

  export default connect(mapStateToProps, mapDispatchToProps)(Allbooks);