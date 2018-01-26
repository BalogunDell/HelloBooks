import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import SummaryTable from '../AdminSubComponents/SummaryTable';
import BooksList from '../AdminSubComponents/BooksList';
import { loadAllbooks } from '../../../Actions/booksAction';


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
      borrowedbooksCount: {}
    };
    
  }

/**
 * React lifecycle hook - componentDidMount
 * 
 * @memberof Dashboard
 * 
 * @returns {void}
 */
  componentDidMount() {
    this.props.getAllBooks();
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
 * Redux connect parameter - stateToProps
 * 
 * @returns {object} mapped state of the store
 */
export const stateToProps = (state) => {
  return {
    allbooks: state.books.books
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
  }
} 


export default connect(stateToProps, dispatchToProps)(Dashboard);