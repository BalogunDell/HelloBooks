import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import * as booksAction from '../../../Actions/booksAction';
import PublishBookModal from './publishBookModal';


class unPublishedBooks extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      unpublishedBooksArray: [],
      filterable: [],
      bookIndex: 0,
      bookId: 0,
      loader: false,
      errorStatus: false,
      errorMessage: '',
      successStatus: false,
      successMessage: false,
      modalHeader: 'Publishing this book will make it available to all users, do you want to continue?',
      bookCountStatus: false

    }

    this.handlePublish = this.handlePublish.bind(this);
    this.publishBookHander = this.publishBookHander.bind(this);
    this.cancelPublish = this.cancelPublish.bind(this);
  }


  handlePublish(event) {
    event.persist();
    this.setState({bookIndex: event.target.dataset.index, bookId: event.target.value});
    
  }

  cancelPublish() {
    this.setState({
      error: false,
      errorMessage: '',
      errorStatus: false,
      successStatus: false,
      successMessage: '',
      loader: false,
      modalHeader: ''
    });
  }

  publishBookHander() {
    this.setState({loader: true,
      successStatus: false, 
      errorStatus: false,
      modalHeader: 'Publishing book...'});
    this.props.publishBook(this.state.bookId)
    .then(response => {
      this.state.filterable.splice(this.state.bookIndex, 1);
      this.setState({
        unpublishedBooksArray: this.state.filterable,
        loader: false, 
        successStatus: true, 
        errorStatus: false, 
        modalHeader: 'Book has been successfully pulished'});
      
    })
    .catch(error=> {
      this.setState({loader: false, 
        successStatus: false, 
        errorStatus: true,
        modalHeader: error});      
      console.log(error);
    })
  }

  componentDidMount(){
    $('.modal').modal();
  }
  componentWillMount() {
    this.props.adminGetAllBooks().then(() => {
    })
    .catch(error => {
      console.log(error);
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({unpublishedBooksArray: nextProps.allbooks,
    filterable: nextProps.allbooks});
    if(nextProps.allbooks.length < 1) {
      this.setState({ bookCountStatus: true}); 
    }
  }

  render(){
    return (
      <div>
        <div className="row">
          <div className="col s12 books-holder-title center">
            <h1>Unpublished Books</h1>
          </div>
        <div className="row">
          <div className="col s12 m12 l10 offset-l2">
            <div className="unpublished">
            <table className="centered highlight responsive-table">
              <thead>
                  <tr>
                    <th>ISBN</th>
                    <th>Book Cover</th>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Pages</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  { !this.state.bookCountStatus 
                  ?
                  this.state.unpublishedBooksArray.map((book, id) => 
                      <tr key={book.id}>
                        <td>{book.isbn}</td>
                        <td><img src={book.image}/></td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.category.category}</td>
                        <td>{book.quantity}</td>
                        <td>{book.pages}</td>
                        <td>
                          <a href="#confirmationModal" className="modal-trigger">
                          <button data-index = {id} value={book.id} className="btn waves-effect waves-teal custom" onClick={this.handlePublish}>Publish</button>
                          </a>
                        </td>
                      </tr>
                    )
                    :
                    <tr><td>No book has been deleted/unpublished</td></tr>
                    }
            </tbody>
            </table>
          </div>
          </div>
        </div>
        </div>
        <PublishBookModal loader= {this.state.loader}
        publishBookHander={this.publishBookHander}
        errorStatus = {this.state.errorStatus}
        errorMessage ={this.state.errorMessage}
        successStatus={this.state.successStatus}
        successMessage ={this.state.successMessage}
        modalHeader={this.state.modalHeader}
        />
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allbooks: state.books.unpublishedbooks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    adminGetAllBooks: () => dispatch(booksAction.adminGetAllBooks()),
    publishBook: (id) => dispatch(booksAction.publishBook(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(unPublishedBooks);