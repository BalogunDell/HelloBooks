import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import SummaryTable from '../containers/SummaryTable';
import BooksList from '../containers/BooksList';
import { 
  loadAllbooks,
  getAllBorrowedBooks
} from '../../Actions/booksAction';


/**
 * Dashboard
 * 
 * @class Dashboard
 * 
 * @extends {Component}
 */
export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectDefaultValue: 'All books',
      books: [],
      borrowedbooksCount: {},
      getBooks: false,
    };
    
  }

/**
 * React lifecycle hook - componentDidMount
 * 
 * @memberof Dashboard
 * 
 * @returns {void}
 */
  componentWillMount() {
    this.props.getAllBooks()
      .then(() => {})
      .catch(() => {})
  }

/**
 * React render method - render
 * 
 * @memberof Dashboard
 * 
 * @returns {JSX} JSX representation of DOM
 */
  render() {
    return(
        <div className="admindashboard col s12 m12 l11 offset-l1">
          <SummaryTable/>
          <BooksList/>
        </div>
    );
  }
}

/**
 * Redux connect parameter - dispatchToProps
 * 
 * @returns {object} dispatched actions
 */
export const dispatchToProps = (dispatch) => {
  return {
    getAllBooks: () => dispatch(loadAllbooks()),
    getAllBorrowedBooks: () => dispatch(getAllBorrowedBooks())
  }
} 


export default connect(null, dispatchToProps)(Dashboard);