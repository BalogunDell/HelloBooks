import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import SummaryTable from '../adminSubComponents/summaryTable';
import SelectFilter from '../adminSubComponents/selectFilter';
import BooksList from '../adminSubComponents/booksList';
import * as bookActions from '../../../Actions/booksAction';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectDefaultValue: 'All books',
      books: [],
      bookCount: 0
    };

  }


  componentDidMount() {
    $('select').material_select();
    this.props.getAllBooks().then(()=> {
      this.setState({books: this.props.allbooks, bookCount: this.props.allbooks.length});
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return(
        <div className="admindashboard col s12 m12 l11 offset-l1">
          <SummaryTable bookcount = {this.state.bookCount}/>  
          <SelectFilter handleSelectChange={this.handleSelectChange}
          selectDefaultValue = {this.state.selectDefaultValue}/>
          <BooksList/>
        </div>
    );
  }
}

function stateToProps(state, ownProps) {
  return {
    allbooks: state.books.books
  }
}

function dispatchToProps(dispatch) {
  return {
    getAllBooks: () => dispatch(bookActions.loadAllbooks()),
  }
} 


export default connect(stateToProps, dispatchToProps)(Dashboard);