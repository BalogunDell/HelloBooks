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
      loadedCategories: [],
      imageHeight: 0,
      imageWidth: 0,
      error: '',
      success: '',
      loader: false
      }

    this.loaderText = <h6 className="green-text">Creating book...</h6>
    this.handleInput = this.handleInput.bind(this);
    this.createBookHandler = this.createBookHandler.bind(this);
    this.imageUploadHandler = this.imageUploadHandler.bind(this);
  }

  handleInput(event) {
    let name = event.target.name;
    let tempBookData = Object.assign({}, this.state.bookData);
    tempBookData[name] = event.target.value;
    this.setState({bookData: tempBookData});
  }

  createBookHandler(event) {
    event.preventDefault();
    this.setState({loader:true});
    if(this.state.imageHeight < 300 || this.state.imageWidth < 250) {
      this.setState({loader: false, error: "Image is too small. Allowed dimension is 300 x 250 pixels."});
    } else {
      this.setState({loader:true});
      this.props.createBook(this.state.bookData).then(() => {
        this.setState({loader: false, success: "Book has been created."});

      })
      .catch(error => {
        this.setState({loader: false, error: error.response.data.message});
      })
    }
  }

  imageUploadHandler(event) {
    event.preventDefault();
    let imageInput = event.target.files[0];
    let imageReader = new FileReader();
    if(imageInput) {
      imageReader.onload = () => {
        const newUpload = new Image();
        newUpload.src = imageReader.result;
        newUpload.onload = () => {
          this.setState({ bookData: {...this.state.bookData, image:imageInput.name}, 
          imageHeight:newUpload.height,
          imageWidth: newUpload.width});
        }
      }
    }
    imageReader.readAsDataURL(imageInput);

  }

  componentDidMount() {
    this.props.getCategories().then(() => {
      $('select').material_select();
      $('select').change(e => this.handleInput(e));
    });
   
    $('.modal').modal();
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
              loadedCategories = {this.state.loadedCategories}
              imageUploadHandler = {this.imageUploadHandler}
              error= {this.state.error}
              success= {this.state.success}
              loader={this.state.loader}
              loaderText= {this.loaderText}/>
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
    categoryid: '', 
    image: '' }

  return {
    initialData,
    loadedCategories: state.createCategory.categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createBook: data => dispatch(bookActions.createBook(data)),
    getCategories: () => dispatch(categoryActions.getCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBook);