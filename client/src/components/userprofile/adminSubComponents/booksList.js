import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import EditBookModal from './editBook';
import * as bookActions from '../../../Actions/booksAction';


class booksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allbooks: [],
      dataReady: false,

    }
    // Bind methods to this class
    this.handleBookEdit = this.handleBookEdit.bind(this);
    this.handleBookDelete = this.handleBookDelete.bind(this);
  }


  handleBookEdit(event) {
    event.persist();
    let filteredBook = this.state.allbooks.filter((book, index) => index == event.target.dataset.index);
    this.props.getAdminEditBookId(filteredBook);
  }

  handleBookDelete(event) {
    alert(event.target.value)
  }

  componentDidMount() {
    $('.modal').modal();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.loadAllbooks) {
      this.setState({allbooks: nextProps.loadAllbooks, dataReady: true});
    }
  }

  render() {
  return(
    <div>
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
           {this.state.allbooks.map((book, id) => 
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
              <button value={book.id} onClick={this.handleBookDelete} className="material-icons red-text">delete</button>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
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
    getAdminEditBookId: (id) => dispatch(bookActions.getAdminEditBookId(id))
  }
} 

export default connect(stateToProps,dispatchToProps)(booksList);