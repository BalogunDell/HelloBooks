import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ConfirmationModal from './confirmationModal';
import * as bookActions from '../../../Actions/booksAction';
import selectFilterer from '../../../utils/selectFilterer';
import BorrowedbookTable from './borrowedbooksTable';
import PublishedBooks from './publishedBooks';

class booksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allbooks: [],
      filterable: [],
      fetchedborrowedbooks: [],
      borrowedBooksFilterable: [],
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
      selectedValue: '',
      all: false,
      pending: false,
      returned: false,
      borrowed: false,
      mostRead: false,
      published: false,
      unpublished: false,
      showAll: true,
      booksReturnedCount: 0,
      pendingReturnCount: 0,

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
    
    localStorage.setItem('index', JSON.stringify(filteredBook));
    this.props.getAdminEditBookId(filteredBook);
  }
  /**
   * 
   * @param {any} event 
   * @returns event value
   */
  handleSelectChange(event) {
    this.setState({selectedValue: event.target.value});
    
    if(this.state.selectedValue === 'allbooks') {
      this.setState({allbooks:this.state.filterable,
      all: true,
      mostRead: false,
      borrowed: false,
      published: false,
      showAll: true
      
    });
    
    } else if(this.state.selectedValue === 'booksreturned') {
      this.setState({fetchedborrowedbooks: this.state.borrowedBooksFilterable});
      let returnedbooks = this.state.borrowedBooksFilterable.filter(book=> book.returnstatus === true);
      this.setState({fetchedborrowedbooks: returnedbooks,
      all: false,
      mostRead: false,
      borrowed: true,
      published: false,
      showAll: false
      });
    } else if(this.state.selectedValue === 'pendingreturn') {
      this.setState({fetchedborrowedbooks: this.state.borrowedBooksFilterable});
      let unreturned = this.state.borrowedBooksFilterable.filter(book=> book.returnstatus === false);
      this.setState({fetchedborrowedbooks: unreturned,
      all: false,
      mostRead: false,
      borrowed: true,
      published: false,
      showAll: false
      });
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
    });
  }
  /**
   * 
   * 
   * @returns an object which is the state
   */
  deleteBookTrigger() {
     // Set neccessary state before action
     this.setState({
        loader:true,
        disabled: false,
        deleteErrorStatus:false, 
        deleteErrorSuccess: false,
        errorMessage: ''});

    // Make call to api, delete book and update interface
    this.props.deleteBook(this.state.bookId)
    .then(() => {
      const result = this.state.allbooks.filter(book => book.id != this.state.bookId );
      this.setState({allbooks: result,
        deleteErrorSuccess: true,
        deleteErrorStatus: false,
        errorMessage: '',
        loader: false,
        disabled: true,
        successMessage: 'Book has been successfully deleted'});
        setTimeout(() => {
          $('.modal').modal('close');
          this.setState({
            error: '',
            successMessage: '',
            errorMessage: '',
            deleteErrorStatus: false,
            successMessage: false,
            loader: false,
            disabled: false,
          });
        }, 2000);
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

    // Fetch all borrowed books
    this.props.getAllBorrowedBooks();

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.loadAllbooks) {
      this.setState({
        allbooks: nextProps.loadAllbooks,
        filterable: nextProps.loadAllbooks,
        dataReady: true});
    }

    if(nextProps.borrowedBooks) {
      this.setState({fetchedborrowedbooks: nextProps.borrowedBooks,
        borrowedBooksFilterable: nextProps.borrowedBooks});
        
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
            <option value="pendingreturn">Pending Return</option>
            <option value="mostborrowedbooks">Most Borrowed Books</option>

          </select>
      </div>
      
      <div className="bookslist">
        {this.state.borrowed
        ? 
          <BorrowedbookTable books={this.state.fetchedborrowedbooks}/>
        : 
          null
        }

        {this.state.all || this.state.showAll
        ? 
          <PublishedBooks books={this.state.allbooks}
          handleBookDelete= {this.handleBookDelete}
          handleBookEdit= {this.handleBookEdit}/>
        :
          null
        }
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
    borrowedBooks: state.books.allborrowedbooks
  }
}

function dispatchToProps(dispatch) {
  return {
    getAllBooks: () => dispatch(bookActions.loadAllbooks()),
    getAdminEditBookId: (id) => dispatch(bookActions.getAdminEditBookId(id)),
    deleteBook: (id) => dispatch(bookActions.deleteBook(id)),
    getAllBorrowedBooks: () => dispatch(bookActions.getAllBorrowedBooks())    
  }
} 

export default connect(stateToProps,dispatchToProps)(booksList);