import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import SummaryTable from '../adminSubComponents/SummaryTable';
import BooksList from '../adminSubComponents/BooksList';
import * as bookActions from '../../../Actions/booksAction';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectDefaultValue: 'All books',
      books: [],
      borrowedbooksCount: {}
    };
    
  }

  componentDidMount() {
    this.props.getAllBooks();
  }

  render() {
    return(
        <div className="admindashboard col s12 m12 l11 offset-l1">
          <SummaryTable/>
          <BooksList/>
        </div>
    );
  }
}

export const stateToProps = (state, ownProps) => {
  return {
    allbooks: state.books.books
  }
}

export const dispatchToProps = (dispatch) => {
  return {
    getAllBooks: () => dispatch(bookActions.loadAllbooks()),
  }
} 


export default connect(stateToProps, dispatchToProps)(Dashboard);