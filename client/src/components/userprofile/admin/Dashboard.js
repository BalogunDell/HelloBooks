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
    };

    this.handleBookEdit = this.handleBookEdit.bind(this);
    this.handleBookDelete = this.handleBookDelete.bind(this);
  }


  handleBookEdit(event) {
    console.log(event.target.value)
  }

  handleBookDelete(event) {
    alert(event.target.value)
  }

  componentDidMount() {
    $(document).ready(()=> {
      $('select').material_select();
    });
  }


  componentWillMount() {
    this.props.getAllBooks().then(()=> {
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return(
        <div className="admindashboard col s12 m12 l11 offset-l1">
          <SummaryTable bookcount = {this.props.allbooks}/>  
          <SelectFilter handleSelectChange={this.handleSelectChange}
          selectDefaultValue = {this.state.selectDefaultValue}/>
          <BooksList allbooks = {this.props.allbooks}
          handleBookDelete = {this.handleBookDelete}
          handleBookEdit = {this.handleBookEdit}
          />
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
    getAllBooks: () => dispatch(bookActions.loadAllbooks())
  }
} 


export default connect(stateToProps, dispatchToProps)(Dashboard);