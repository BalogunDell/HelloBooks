import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as categoryActions from '../../../Actions/categoryAction';
import * as bookActions from '../../../Actions/booksAction';
import AddCategoryModal from './createCategory';

class editBookForm extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      book: {},
      dataReady: false,
      imageHeight: 0,
      imageWidth: 0,
      tempImageName: '',
      loadedCategories: [],
      
    }

    this.handleEditInput = this.handleEditInput.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.imageUploadHandler = this.imageUploadHandler.bind(this);
  }

  handleEditInput(event) {
    let name = event.target.name;
    let tempHolder =  Object.assign({}, this.state.book);
    tempHolder[name] = event.target.value
    if(event.target.name == 'categoryid') {
      this.setState({ book:tempHolder});
      this.setState({book: {...this.state.book, categoryid: event.target.value}});
    } else {
      this.setState({ book:tempHolder });
      
    }
  }

  handleUpdate(event) {
    event.preventDefault();
    this.props.saveImageToCloudinary(this.state.tempImageName)
    .then(() => {
      
      this.setState({book: {...this.state.book, image: this.props.imageUrl}});
      this.props.modifyBook(this.state.book).then(() => {
        console.log(this.state.book);
        })
        .catch(error => {
          console.log(error);
        })
    })
  }


  componentWillMount(){
    this.setState({book: this.props.getBookToEdit[0]});
  }

  componentDidMount() {
    $(document).ready(() => {
      Materialize.updateTextFields();
    });
    this.props.getCategories().then(() => {
      $('select').material_select();
      $('select').change(e => this.handleEditInput(e));
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.loadedCategories[0].id) {
      this.setState({loadedCategories: nextProps.loadedCategories})
    }

    if(nextProps.imageUrl) {
      this.setState({bookData: {
        ...this.state.bookData, image: nextProps.imageUrl
      }
    });
    }
  
  }

  imageUploadHandler(event) {
    event.preventDefault();
    event.persist();
    let imageInput = event.target.files[0];
    let imageReader = new FileReader();
    if(imageInput) {
      imageReader.onload = () => {
        const newUpload = new Image();
        newUpload.src = imageReader.result;
        newUpload.onload = () => {
          this.setState({ tempImageName: imageInput, 
          imageHeight:newUpload.height,
          imageWidth: newUpload.width});
        }
      }
    }
    imageReader.readAsDataURL(imageInput);

  }

  
    render() {
      return (
      <div>
          <div>
            <div className="container">
              <div className="col s12 m12 l6 offset-l3">
                <div className="row">
                  <h5 className="center">Edit book</h5>
                </div>
              <form className="create-form" onSubmit={this.handleUpdate} encType="multipart/form-data">
                <div className="input-field">
                  <input placeholder ={this.state.book.isbn} type="text" name="isbn" id="isbn"
                  maxLength="6"
                  value={this.state.book.isbn}
                   onChange={this.handleEditInput}
                  disabled
                  className="validate"
                  />
                  <label className="active" htmlFor="isbn" data-error="isbn must be numbers" data-success="">ISBN <span>*</span></label>
                </div>

                <div className="row">
                  <div className="input-field col s12 m12 l12">
                    <input type="text" placeholder={this.state.book.title} id="title" className="validate"
                    name="title"
                    minLength="3"
                    value={this.state.book.title}
                    onChange={this.handleEditInput}
                    required />
                    <label htmlFor="title" data-error="Input is not valid" data-success="">Title<span>*</span></label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12 m12 l12">
                    <input type="text" className="validate" placeholder={this.state.author} id="author"
                    name="author"
                    minLength="3"
                    value={this.state.book.author}
                    onChange={this.handleEditInput}
                    required />
                    <label htmlFor="author" data-error="Input is not valid" data-success="">Author<span>*</span></label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12 m12 l6">
                    <label htmlFor="pages">Pages<span>*</span></label>
                    <input type="number" className="validate" id="Pages" placeholder={this.state.book.pages}
                    name="pages"
                    maxLength="4"
                    value={this.state.book.pages}
                    onChange={this.handleEditInput}
                    required />
                  </div>

                  <div className="input-field col s12 m12 l6">
                    <input type="number" className="validate"
                    name="year"
                    maxLength="4"
                    value={this.state.book.year}
                    onChange={this.handleEditInput}                
                    required />
                    <label htmlFor="year" data-error="Year must be numbers" data-success="">Year <span>*</span></label>
                  </div>
                </div>

                <div className="input-field">
                  <textarea minLength="30" className="materialize-textarea"
                  name="description"
                  id="description"
                  value={this.state.book.description}
                  onChange={this.handleEditInput}
                  data-length="500" required />
                  <label htmlFor="description">Description<span>*</span></label>
                </div>

                <div className="row">
                  <div className="input-field col s12 m12 l6">
                    <label htmlFor="qty">Quantity<span>*</span></label>
                    <input type="number" className="validate"
                    name="quantity"
                    id="qty"
                    value={this.state.book.quantity}
                    onChange={this.handleEditInput}                  
                    maxLength="4"
                    required />
                  </div>

                  <div className="input-field col s12 m12 l6">
                  <select name="categoryid" value={this.state.book.category.category} onChange={this.handleEditInput}>
                    <option value={this.state.book.categoryid}>{this.state.book.category.category}</option>
                    { this.state.loadedCategories.map((val, key) => {                  
                      return (<option key={val.id} value={val.id}>{val.category}</option>)
                    })
                    }
                  </select>
                  <a id="newCategory" href="#addCategory" className="modal-trigger">Add new category</a>
                  </div>
                </div>

                <div className="row">
                  <div className="file-field input-field uploadImage">
                    <div className="btn">
                      <span><i className="material-icons">add_a_photo</i></span>
                      <input type="file" name="image" id="bookImage" accept=".jpg" onChange={this.imageUploadHandler}/>
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" required type="text" />
                    </div>
                  </div>
                </div>
              

                <div className="row">
                  <div className="input-field center">
                    {/* { loader ? loaderText : null }
                    { errorStatus ? <h6 className="red-text">{error}</h6>: null }
                    { successStatus ? <h6 className="green-text">{success}</h6>: null } */}
                  </div>
                </div>
              
                <div className="row">
                  <div className="input-field">
                    <div className="row hiddenBtns">
                      <div className="input-field col s12 m6 l12">
                      <input type="submit" className="submitBtn waves-effect waves-teal custom"/>                      
                      </div>
                    </div>
                  </div>
                </div>
            </form>
          </div>
        </div>
        <AddCategoryModal/>
      </div>
    </div>
    );
  }
}

function stateToProps(state, ownProps) {
  return {
    getBookToEdit: state.books.editBookID,
    books: state.books.books,
    loadedCategories: state.createCategory.categories,
    imageUrl: state.books.secure_url

  }
}

function dispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(categoryActions.getCategories()),
    modifyBook: (bookData) => dispatch(bookActions.modifyBook(bookData)),
    saveImageToCloudinary: (image) => dispatch(bookActions.saveImageToCloudinary(image))
    
  }
}


export default connect(stateToProps, dispatchToProps)(editBookForm);