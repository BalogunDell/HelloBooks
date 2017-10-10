import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ConfirmationModal from './confirmationModal';
import * as bookActions from '../../../Actions/booksAction';


class booksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allbooks: [],
      filterable: [],
      allDatabaseBooks: [],
      dataReady: false,
      deleteErrorStatus: false,
      deleteErrorSuccess: false,
      loader: false,
      disabled: false,
      errorMessage: '',
      successMessage: '',
      bookId: 0,
      bookIndex: 0,
      bookCountStatus: false,
      noBooks:'There are no books in the library',
      selectedValue: ''

    }
    // Bind methods to this class
    this.handleBookEdit = this.handleBookEdit.bind(this);
    this.handleBookDelete = this.handleBookDelete.bind(this);
    this.deleteBookTrigger = this.deleteBookTrigger.bind(this);
    this.handleDeleteCancel = this.handleDeleteCancel.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this);
    
  }

  /**
   * 
   * @param {object} event 
   * @return { object } component state
   */
  handleBookEdit(event) {
    event.persist();
    let filteredBook = this.state.allbooks.filter((book, index) => index == event.target.dataset.index);
    this.props.getAdminEditBookId(filteredBook);
  }
  /**
   * 
   * @param {any} event 
   * @returns event value
   */
  handleSelectChange(event) {
    const currentState = this.state.allbooks;
    this.setState({selectedValue: event.target.value});
    if(this.state.selectedValue ==='allbooks') {
      this.setState({allbooks: this.state.filterable});
    } else if (this.state.selectedValue === 'booksreturned') {
      console.log('create this API');
    } else if (this.state.selectedValue === 'mostborrowedbooks') {
      console.log('create this api');
    } else if (this.state.selectedValue === 'pendingreturn') {
      console.log('create this api');
    } else if (this.state.selectedValue === 'unpublishedbooks') {
      this.setState({allbooks: this.state.allDatabaseBooks})
      let unpublishedbooks = this.state.allbooks.filter(book => book.visibility === false);
      console.log(unpublishedbooks);
      this.setState({allbooks: unpublishedbooks});
    } else {
      this.setState({allbooks: filterable});
    }
  }

  /**
   * 
   * @param {object} event 
   * @return { object } component state
   */
  handleBookDelete(event) {
   this.setState({bookId: event.target.value, bookIndex: event.target.dataset.index});
  }

  /**
   * 
   * @param {object} event 
   * @return { object } component state
   */
  handleDeleteCancel() {
    this.setState({
      error: '',
      successMessage: '',
      errorMessage: '',
      deleteErrorStatus: false,
      successMessage: false,
      loader: false,
      disabled: false,
    })
  }

  deleteBookTrigger() {
     // Set neccessary state before action
     this.setState({loader:true, 
      deleteErrorStatus:false, 
      deleteErrorSuccess: false});

    // Make call to api, delete book and update interface
    this.props.deleteBook(this.state.bookId)
    .then(() => {
      console.log(this.state.allbooks);
      let bookToDelete = this.state.filterable.splice(this.state.bookIndex, 1);
      console.log(this.state.allbooks);
      this.setState({allbooks: this.state.filterable,
        deleteErrorSuccess: true,
        deleteErrorStatus: false,
        errorMessage: '',
        loader: false,
        disabled: true,
        successMessage: 'Book has been successfully deleted'});
    })
    .catch(error => {
      this.setState({
        errorMessage: error.response.data.message,
        loader: false,
        deleteErrorStatus:true,
        deleteErrorSuccess:false,
        successMessage: '',
        disabled: false
        
      })
    })
  }

  componentDidMount() {
    $('select').material_select();
    $('select').change(e=>this.handleSelectChange(e));
    $('.modal').modal({
      dismissible: false,
      opacity: 0.3
    });
    if(this.state.allbooks.length == 0) {
      this.setState({bookCountStatus: true});
    } else {
      this.setState({bookCountStatus: false});
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.loadAllbooks) {
      console.log(nextProps.loadAllbooks)
      let tempBooks = nextProps.loadAllbooks.filter(book => book.visibility == true);
      this.setState({
        allbooks: tempBooks,
        filterable: tempBooks,
        allDatabaseBooks: nextProps.loadAllbooks,
        dataReady: true});
    }
  }


  render() {
  return(
    <div>
      <div className=" row selectFilter">
          <label>Filter table</label>
          <select>
            <option value="allbooks">All books</option>
            <option value="booksreturned">Books Returned</option>
            <option value="mostborrowedbooks">Most Borrowed Books</option>
            <option value="pendingreturn">Pending Return</option>
            <option value="unpublishedbooks">Unpublished/Deleted Books</option>

          </select>
      </div>
      
      <div className="bookslist">
        <table className="">
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
          {this.state.bookCountStatus ? 
           this.state.allbooks.map((book, id) => 
            <tr key={book.id}>
              <td>{book.isbn}</td>
              <td><img src={book.image}/></td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category.category}</td>
              <td>{book.quantity}</td>
              <td>{book.pages}</td>
              <td>
                <Link to ="/user/editbook">
                <button 
              value={book.id}
              data-index = {id}
              onClick={this.handleBookEdit}
              className="material-icons green-text">edit</button>
                </Link>
               <a href="#confirmationModal" className="modal-trigger"> 
                  <button value={book.id}
                  data-index = {id}
                  onClick={this.handleBookDelete} 
                  className="material-icons red-text">delete</button>
              </a>
              </td>
            </tr>
            )
          : 
            <tr>
              <td className>{this.state.noBooks}</td>
            </tr>
            }
            </tbody>
        </table>
      </div>
      <ConfirmationModal deleteErrorStatus = {this.state.deleteErrorStatus}
      deleteErrorSuccess={this.state.deleteErrorSuccess}
      loader = {this.state.loader}
      errorMessage = {this.state.errorMessage}
      successMessage = {this.state.successMessage}
      deleteBookTrigger= {this.deleteBookTrigger}
      disabled = {this.state.disabled}
      handleDeleteCancel = {this.handleDeleteCancel}/>
      </div>
  );
}
}

function stateToProps(state, ownProps) {
  return {
    loadAllbooks: state.books.books,
  }
}

function dispatchToProps(dispatch) {
  return {
    getAllBooks: () => dispatch(bookActions.loadAllbooks()),
    getAdminEditBookId: (id) => dispatch(bookActions.getAdminEditBookId(id)),
    deleteBook: (id) => dispatch(bookActions.deleteBook(id))
  }
} 

export default connect(stateToProps,dispatchToProps)(booksList);