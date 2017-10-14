import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import * as bookActions from '../../Actions/booksAction';
import AllUserBooksComp from './tableRows/allUserBooks';

/* @class History
 * @classdesc returns the borrow history of the user
 */
class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: this.props.userID,
      loading: false,
      selectedValue: '',
      allUserBooks: [],
      filterable: [],
      bookToDisplay: '',
      returnSuccessStatus: false,
      returnSuccessMessage: '',
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
    this.props.returnBook({bookid: event.target.value})
    .then(() => {
      let spliced = this.state.allUserBooks.splice(event.target.dataset.id, 1);
      let tempState = this.state.allUserBooks;
      this.setState({allUserBooks: tempState, 
        returnSuccessStatus: true, 
        returnSuccessMessage:'Book has been successfully returned'});
    })
    .catch(error => {
      console.log(error);
    });
  }


  handleSelectChange(event) {
    this.setState({bookToDisplay: event.target.value});
    if(this.state.bookToDisplay == "Pending Returns") {
      this.setState({tableHeader: 'pending returns'});
     let unreturned = this.state.filterable.filter(book => book.returnstatus == false);
      this.setState({ allUserBooks: unreturned });
    } else if(this.state.bookToDisplay == "Returned books") {
      this.setState({tableHeader: 'Returned books'});
      this.setState({allUserBooks: this.state.filterable});
      let returned = this.state.filterable.filter(book => book.returnstatus == true);
      this.setState({ allUserBooks: returned });
    } else if (this.state.bookToDisplay == "allbooks") {
      this.setState({tableHeader: 'All books'});
      this.setState({allUserBooks: this.state.filterable});
    } else {
      console.log('nothing');
    }
  }

  componentWillMount() {
    this.setState({loading: true})    
    this.props.getUserBooks().then(() => {
      this.setState({loading:false})
    })
    .catch(error => {
      console.log(error);
    })
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.fetchedBooks.response) {
      let unreturned = nextProps.fetchedBooks.response.filter(book => book.returnstatus == false);
      this.setState({loading: false, 
        allUserBooks: unreturned,
        filterable: nextProps.fetchedBooks.response});
  }
}

  componentDidMount() {
    $('select').material_select();
    $('select').change(e => this.handleSelectChange(e));
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
            <option value="Pending Returns">Pending returns</option>
            <option value="Returned books">Returned books</option>
              <option value="allbooks"> All books</option>
              <option value="Books Awaiting return confirmation">Books Awaiting return confirmation</option>
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
                <AllUserBooksComp allUserBooks = {this.state.allUserBooks}
                handleReturn= {this.handleReturn}
                handleBorrow={this.handleBorrow}
                tableHeader= {this.state.tableHeader}
                getRowKey={this.getRowKey}
                successMessage= {this.state.returnSuccessMessage}
                returnSuccessStatus= {this.state.returnSuccessStatus}/>
            }
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    fetchedBooks: state.books.fetchedBooks,
    test: state
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getUserBooks: (userid) => dispatch(bookActions.getUserBooks(userid)),
    returnBook: (bookid) => dispatch(bookActions.returnBook(bookid))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(History);