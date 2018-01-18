import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import * as bookActions from '../../Actions/booksAction';
import AllUserBooksComp from './tableRows/allUserBooks';
import AuthenticateUser from '../HOC/authenticate';
/* @class History
 * @classdesc returns the borrow history of the user
 */
export class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: this.props.userID,
      loading: false,
      selectedValue: '',
      allUserBooks: [],
      bookToDisplay: '',
      allbooks: false,
      returnedBookDisplayStatus: false,
      unreturnedBookDisplayStatus: true,
      tableHeader: 'Pending Returns'
    }


    //  Bind methods for onclick of the buttons
    this.handleReturn = this.handleReturn.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);

  }

  handleReturn(event) {
    event.persist();
    let spliced = this.state.allUserBooks.filter((book) => book.bookid != event.target.value);
    this.props.returnBook({bookid: event.target.value})
    .then(() => {
      this.setState({allUserBooks: spliced });
        Materialize.toast('Book has been successfully returned', 3000, 'blue rounded');
    })
    .catch(error => {
    });
  }


  handleSelectChange(event) {
    switch(event.target.value) {
      case 'Pending Returns':
        this.setState({
          tableHeader: event.target.value,
          loading: true
        });
        this.props.getUserBooks(this.state.userid).then(() => {
          const pending = this.props.fetchedBooks.response.filter(book => book.returnstatus == false);
          this.setState({
            allUserBooks: pending,
            loading: false
          });
        })
      break;
      case 'Returned books':
      this.setState({
        tableHeader: event.target.value,
        loading: true
      });
      this.props.getUserBooks(this.state.userid).then(() => {
        const returned = this.props.fetchedBooks.response.filter(book => book.returnstatus == true);
        this.setState({
          allUserBooks: returned,
          loading: false
        });
      });
      break;
      default:
      this.setState({
        tableHeader: event.target.value,
        loading: true
      });
      this.props.getUserBooks(this.state.userid).then(() => {
        this.setState({ 
          allUserBooks: this.props.fetchedBooks.response,
          loading: false
        });
      });
      }
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.fetchedBooks.response) {
      this.setState({loading: false, 
        allUserBooks: nextProps.fetchedBooks.response,
      });
  }
}

  componentDidMount() {
    this.setState({loading: true})    
    this.props.getUserBooks(this.state.userid).then(() => {
      this.setState({loading:false})
    })
    .catch(error => {
    });
    $(document).ready(() => {
      $('select').material_select();
      $('select').change(event => this.handleSelectChange(event));
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
            <select 
              value={this.state.selectedValue} 
              onChange={this.handleSelectChange}
              id= "handleSelectInput">
            <option id="pending" value="Pending Returns">Pending returns</option>
            <option id="returned" value="Returned books">Returned books</option>
              <option id="allbooks" value="All Books"> All books</option>
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
                this.state.allUserBooks == undefined
              ?
                <h3>You have no books yet</h3>
              :
                <AllUserBooksComp allUserBooks = {this.state.allUserBooks}
                handleReturn= {this.handleReturn}
                handleBorrow={this.handleBorrow}
                tableHeader= {this.state.tableHeader}
                getRowKey={this.getRowKey}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}


export const mapStateToProps = (state, ownProps) => {
  return {
    fetchedBooks: state.books.fetchedBooks,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    getUserBooks: (userid) => dispatch(bookActions.getUserBooks(userid)),
    returnBook: (bookid) => dispatch(bookActions.returnBook(bookid))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(History);