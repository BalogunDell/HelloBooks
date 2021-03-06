import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'jquery';

import ConfirmationModal from '../presentational/ConfirmationModal';
import {
  loadAllbooks,
  getAdminEditBookId,
  deleteBook,
  getAllBorrowedBooks

} from '../../actions/booksAction';
import UserBooks from '../presentational/UserBooks';

/**
 * @class BooksList
 * 
 * @export BooksList Component
 * 
 * @extends {React.Component}
 */
export class BooksList extends React.Component {
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
      noBooks: 'There are no books in the library',
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

    };
    this.handleBookEdit = this.handleBookEdit.bind(this);
    this.handleBookDelete = this.handleBookDelete.bind(this);
    this.deleteBookTrigger = this.deleteBookTrigger.bind(this);
    this.handleDeleteCancel = this.handleDeleteCancel.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  /**
 * @description handleBookEdit
 * 
 * @param {object} event 
 * 
 * @return { object } component state
 */
  handleBookEdit(event) {
    event.persist();
    const filteredBook = this.state.allbooks
      .filter((book, index) => index == event.target.dataset.index);

    localStorage.setItem('index', JSON.stringify(filteredBook));
    this.props.getAdminEditBookId(filteredBook);
  }

/**
 * @description handleSelectChange
 * 
 * @param {object} event
 * 
 * @returns {object} updated state
 */
  handleSelectChange(event) {
    this.setState({ selectedValue: event.target.value });

    if (this.state.selectedValue === 'allbooks') {
      this.setState({ allbooks: this.state.filterable,
        all: true,
        mostRead: false,
        borrowed: false,
        published: false,
        showAll: true

      });
    } else if (this.state.selectedValue === 'booksreturned') {
      this.setState({
        fetchedborrowedbooks: this.state.borrowedBooksFilterable
      });
      const returnedbooks = this.state.borrowedBooksFilterable
        .filter(book => book.returnStatus === true);
      this.setState({ fetchedborrowedbooks: returnedbooks,
        all: false,
        mostRead: false,
        borrowed: true,
        published: false,
        showAll: false
      });
    } else if (this.state.selectedValue === 'pendingreturn') {
      this.setState({ 
        fetchedborrowedbooks: this.state.borrowedBooksFilterable
      });
      const unreturned = this.state.borrowedBooksFilterable
        .filter(book => book.returnStatus === false);
      this.setState({ fetchedborrowedbooks: unreturned,
        all: false,
        mostRead: false,
        borrowed: true,
        published: false,
        showAll: false
      });
    }
  }

/**
 * @description handleBookDelete
 * 
 * @param { object } event 
 * 
 * @return { object } component state
 */
  handleBookDelete(event) {
    this.setState({
      bookId: event.target.value,
      bookIndex: event.target.dataset.index
    });
  }

/**
 * @description handleDeleteCancel
 * 
 * @return {object} component state
 */
  handleDeleteCancel() {
    this.setState({
      error: '',
      successMessage: '',
      errorMessage: '',
      deleteErrorStatus: false,
      loader: false,
      disabled: false,
    });
  }

  /**
 * deleteBookTrigger
 * 
 * @memberof BooksList
 * 
 * @returns {object}
 */
  deleteBookTrigger() {
    this.setState({
      loader: true,
      disabled: false,
      deleteErrorStatus: false,
      deleteErrorSuccess: false,
      errorMessage: '' });

    this.props.deleteBook(this.state.bookId)
      .then(() => {
        this.setState({
          deleteErrorSuccess: true,
          deleteErrorStatus: false,
          errorMessage: '',
          loader: false,
          disabled: true,
          successMessage: 'Book has been successfully deleted' });
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
      .catch((error) => {
        this.setState({
          errorMessage: error.response.data.message,
          loader: false,
          deleteErrorStatus: true,
          deleteErrorSuccess: false,
          successMessage: '',
          disabled: false
        });
      });
  }

  /**
 * @description componentDidMount
 * 
 * @memberof BooksList
 * 
 * @returns {object}
 */
  componentDidMount() {
    this.props.getAllBorrowedBooks()
      .then(() => {})
      .catch(() => {})
    $(document).ready(() => {
      $('select').material_select();
      $('select').change(event => this.handleSelectChange(event));
      $('.modal').modal({
        dismissible: false,
        opacity: 0.3
      });
    });
 }

  /**
 * @description componentWillReceiveProps
 * 
 * @param {object} nextProps
 * 
 * @memberof BooksList
 * 
 * @returns {object}
 */
  componentWillReceiveProps(nextProps) {
    if (nextProps.loadAllbooks) {
      this.setState({
        allbooks: nextProps.loadAllbooks,
        filterable: nextProps.loadAllbooks,
        dataReady: true });
    }

    if (nextProps.borrowedBooks) {
      this.setState({ fetchedborrowedbooks: nextProps.borrowedBooks,
        borrowedBooksFilterable: nextProps.borrowedBooks });
    }
  }

/**
 * @description Render method 
 * 
 * @memberof BooksList
 * 
 * @returns {JSX} JSX representation of DOM
 */
render() {
  return(
    <div>
      <div className=" row selectFilter">
        <label>Filter table</label>
        <select 
          id="booksToDisplay" 
          onChange = {this.handleSelectChange}
          value={this.state.selectedValue}
          className ="browser-default">
          <option value="allbooks">All books</option>
          <option value="booksreturned">Books Returned</option>
          <option value="pendingreturn">Pending Return</option>

        </select>
      </div>

      <div className="bookslist">
        {this.state.borrowed
        ? 
          <UserBooks borrowedBooks={this.state.fetchedborrowedbooks}/>
        : 
          null
        }

        {this.state.all || this.state.showAll
        ? 
          <UserBooks allBooks={this.state.allbooks}
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

/**
 * @description Redux connect parameter - mapStateToProps
 * 
 * @param {object} state
 * 
 * @returns {object} mapped state 
*/
export const stateToProps = state => ({
  loadAllbooks: state.books.books,
  borrowedBooks: state.allborrowedbooks
});

/**
 * @description Redux connect parameter - mapDispatchToProps
 * 
 * @param {function} dispatch
 * 
 * @returns {object} mapped dispatch 
*/
export const dispatchToProps = dispatch => ({
  getAdminEditBookId: id => dispatch(getAdminEditBookId(id)),
  deleteBook: id => dispatch(deleteBook(id)),
  getAllBorrowedBooks: () => dispatch(getAllBorrowedBooks())
});

export default connect(
  stateToProps,
  dispatchToProps)
  (BooksList);
