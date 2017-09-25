import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

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
      loading: false,
      selectedValue: ''
    }

    //  Set different buttons for return book and borrow again
    this.actionBtn = <button className="btn btn-small waves-effect waves-teal orange" onClick={this.handleReturn}>Return Book</button>
    this.borrowAgainBtn = <button className="btn waves-effect waves-teal green" value='hello' onClick={this.handleReturn}>Borrow Again</button>


    //  Bind methods for onclick of the buttons
    this.handleReturn = this.handleReturn.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)

  }

  handleReturn(event) {
    console.log(event.target.value)
  }

  handleSelectChange(event) {
    console.log(event.target.value)
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

  componentDidMount() {
    $(document).ready(function()  {
      $('select').material_select();
  
    });
  }

  render() {
    return(
      <div>
        {/* Row for header  */}
        <div className="row">
          <div className="col s12 books-holder-title center">
            <h1>Borrow History</h1>
          </div>
        </div>
      
        {/* Row for books  */}
        
        <div className="row">
          <div className="input-field col s12 m12 l3 offset-l1 filter-table">
            <select value={this.state.selectedValue} onChange={this.handleSelectChange}>
              <option value="">...</option> 
              <option value="Returned books">Returned books</option>
              <option value="Books Awaiting return confirmation">Books Awaiting return confirmation</option>
              <option value="Pending Returns">Pending returns</option> 
            </select>
            <label>Filter history table</label>
          </div>
        </div>
        
        <div className="row borrowHistory">
          <div className="col s12 m12 l11 offset-l1">
            {this.state.loading 
              ?
                <h3>Loading books...</h3>
              :
              <table className="highlight centered">
                <thead>
                  <tr>
                    <th>Book image</th>
                    <th>Book title</th>
                    <th>Author</th>
                    <th>Date Borrowed</th>
                    <th>Expected Return Date</th>
                    <th>Action</th>

                  </tr>
                </thead>
                <tbody>
                  {this.props.fetchedUserBooks.map((book, id) =>
                  <tr key={book.id}>
                    <td><img src={`/images/books/${book.book.image}`} alt="Book cover"/></td>
                    <td>{book.book.title}</td>
                    <td>{book.book.author}</td>
                    <td>{book.dateborrowed}</td>
                    <td>{book.expectedreturndate}</td>
                    <td>{book.returnstatus ? this.borrowAgainBtn : this.actionBtn}</td>
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
