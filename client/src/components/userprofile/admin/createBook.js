import React from 'react';
import { connect } from 'react-redux';

import * as bookActions from '../../../Actions/booksAction';
import * as categoryActions from '../../../Actions/categoryAction';


import CreateBookForm from '../adminSubComponents/createBookForm';

class CreateBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookData: Object.assign({}, this.props.initialData),
      loadedCategories: []
    }

    this.handleInput = this.handleInput.bind(this);
    this.createBookHandler = this.createBookHandler.bind(this);
  }

  handleInput(event) {
    let name = event.target.name;
    let tempBookData = Object.assign({}, this.state.bookData);
    tempBookData[name] = event.target.value;
    this.setState({bookData: tempBookData});
  }

  createBookHandler(event) {
    let bookImagefile = document.getElementById('bookImage').files[0];
    event.preventDefault();
    this.props.createBook(this.state.bookData);
  }

  componentDidMount() {
    $(document).ready(()=> {
      $('select').material_select();
    });
    $('select').change(e => this.handleInput(e));
    $('.modal').modal();
  }

  componentWillMount() {
    // Fetch all categories
    this.props.getCategories();
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.loadedCategories[0].id) {
      this.setState({loadedCategories: nextProps.loadedCategories})
    }
  }

  render() {
    return(
      <div>
        <div className="container">
            <div>
              <CreateBookForm handleInput = {this.handleInput}
              createBookHandler = {this.createBookHandler}
              initialData = {this.state.bookData}
              loadedCategories = {this.state.loadedCategories}/>
            </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {

  let initialData = { 
    isbn: '', 
    title:'', 
    author: '', 
    pages: '', 
    year: '', 
    description: '', 
    quantity: '',
    category: '', 
    image: '' }

  return {
    initialData,
    loadedCategories: state.createCategory.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createBook: data => dispatch(bookActions.createBook(data)),
    getCategories: () => dispatch(categoryActions.getCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBook);