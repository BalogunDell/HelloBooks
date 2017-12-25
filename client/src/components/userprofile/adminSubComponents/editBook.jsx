import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as categoryActions from '../../../Actions/categoryAction';
import * as bookActions from '../../../Actions/booksAction';
import AddCategoryModal from './createCategory';
import LoaderText from './loader';

class editBookForm extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      book: {},
      dataReady: false,
      imageHeight: 0,
      imageWidth: 0,
      tempImageName: '',
      tempFileName: '',
      tempFileSize: 0,
      loadedCategories: [],
      loader: false,
      error: '',
      successStatus: false,
      success: '',
      redirect: false,
      errorStatus: false,
      bookIndex : 0
      
    }

    this.handleEditInput = this.handleEditInput.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.imageUploadHandler = this.imageUploadHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
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
    this.setState({loader: true,
      error: false,
      successStatus:false,
      errorStatus: false })
    // Check if a new image and pdf was selected, if !, save default values
    if((!this.state.tempImageName) && (!this.state.tempFileName)) {
      this.props.modifyBook(this.state.book).then(() => {
        this.setState({loader: false,  
          successStatus: true,
          errorStatus: false})
          setTimeout(()=>{
            this.setState({redirect:true})
          }, 1000)
        })
        .catch(error => {
          this.setState({loader: false, 
            errorStatus: true,
            error: 'error',
            successStatus: false,
          redirect:false})
        })
    // Check if a new image and and no pdf was selected, if !, save default values 
    } else if((this.state.tempImageName) && (!this.state.tempFileName)) {
        // Check image size
        if(this.state.imageHeight < 300 || this.state.imageWidth < 250) {
          this.setState({
            loader: false, 
            error: "Image is too small. Allowed dimension is 300 x 250 pixels.",
            errorStatus: true,
            successStatus: false,
            disableBtn:false });
          } else {
            this.props.saveImageToCloudinary(this.state.tempImageName)
            .then(() => {

              this.props.modifyBook(this.state.book)

              .then(() => {
                this.setState({loader: false,  
                  successStatus: true,
                  errorStatus: false})
                  setTimeout(()=>{
                    this.setState({redirect:true})
                  }, 1000);
              })
              .catch(error => {
              });
            })
            .catch(error => {
            })
        }
      } else if((!this.state.tempImageName) && (this.state.tempFileName)) {
        // Check File size
          if(this.state.tempFileSize > 10485760) {
            this.setState({
              loader: false, 
              error: "File too large, Only 10MB or less is allowed.",
              errorStatus: true,
              successStatus: false,
              disableBtn:false });
            } else {
              this.props.savePdfToCloudinary(this.state.tempFileName)
              .then(() => {
                this.props.modifyBook(this.state.book)                
                .then(() => {
                  this.setState({loader: false,  
                    successStatus: true,
                    errorStatus: false})
                    setTimeout(()=>{
                      this.setState({redirect:false})
                    }, 1000);
                })
                .catch(error => {
                });
              })
              .catch(error => {
              })
            }
      } else {
        if(this.state.imageHeight < 300 || this.state.imageWidth < 250) {
          this.setState({
            loader: false, 
            error: "Image is too small. Allowed dimension is 300 x 250 pixels.",
            errorStatus: true,
            successStatus: false,
            disableBtn:false });
          } else if(this.state.tempFileSize > 10485760) {
            this.setState({
              loader: false, 
              error: "File too large, Only 10MB or less is allowed.",
              errorStatus: true,
              successStatus: false,
              disableBtn:false });
          } else {
            this.setState({
              loader: true, 
              error: "",
              errorStatus: false,
              successStatus: false,
              disableBtn:true });

              // Save image to cloudinary
            this.props.saveImageToCloudinary(this.state.tempImageName).then(()=> {
              // Check if image url has been set before dispatching  save pdf action
              if(this.state.book.image) {
                this.props.savePdfToCloudinary(this.state.tempFileName).then(() =>{
                  if(this.state.book.pdf) {
                    // Save book details to database
                      this.props.modifyBook(this.state.book).then(() => {
                        this.setState({loader: false,
                          successStatus:true,
                          disableBtn:true,
                          errorStatus:false,
                          showHiddinBtns:true,
                          error: '',
                          success: "Book has been created."});
                          setTimeout(()=>{
                            this.setState({redirect:true})
                          }, 1000);
                
                      })
                      .catch(error => {
                        this.setState({
                          loader: false,
                          successStatus:false,
                          errorStatus:true,
                          disableBtn:true,
                          error: error.response.data.message});
                      })
                  }
                })
              }
            })
            .catch(error => {
            })
          }
        }
  }


  componentWillMount(){
    const fetchedBook = JSON.parse(localStorage.getItem('index'));
    this.setState({book: fetchedBook[0]});
    if(this.props.getBookToEdit) {
      this.setState({book: this.props.getBookToEdit[0]});
    } else {
      this.setState({book: fetchedBook[0]});
    }
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
      this.setState({book: {
        ...this.state.book, image: nextProps.imageUrl.secure_url
      }
    });
    } else {
    }
    if(nextProps.pdfUrl) {
      this.setState({book: {
        ...this.state.book, pdf: nextProps.pdfUrl.secure_url
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

  fileUploadHandler(event) {
    event.preventDefault();
    let fileInput = event.target.files[0];
    let fileReader = new FileReader();
    this.setState({ tempFileName: fileInput, tempFileSize: fileInput.size});
    if(fileInput) {
    fileReader.onload = () => {
      const newUpload = new File([''], fileInput.name);
      this.setState({ tempFileName: fileInput});
    }
  }
}

  
    render() {

    const success = <i>Book has been successfully updated<br/><br/>Redirecting to dashboard...</i>


      return (
        
      <div>
        {this.state.redirect ? <Redirect to ="/user/dashboard"/> : 
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
                      <input type="file" 
                      name="image" 
                      id="bookImage" 
                      accept=".jpg" 
                      onChange={this.imageUploadHandler}/>
                      
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path" type="text" placeholder="Upload book image"/>           
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="file-field input-field uploadImage">
                    <div className="btn">
                      <span><i className="material-icons">file_upload</i></span>
                      <input
                      type="file" name="pdf" 
                      id="bookImage" 
                      accept=".pdf" 
                      onChange={this.fileUploadHandler}/>
                      
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path" type="text" placeholder="Upload book file"/>
                    </div>
                  </div>
                </div>
              

                <div className="row">
                  <div className="input-field center">
                    { this.state.loader ? <LoaderText/> : null }
                    { this.state.errorStatus ? <h6 className="red-text">{this.state.error}</h6>: null }
                    { this.state.successStatus ? <h6 className="green-text">{success}</h6>: null }
                  </div>
                </div>
              
                <div className="row">
                  <div className="input-field">
                    <div className="row hiddenBtns">
                      <div className="input-field col s12 m6 l12">
                      <input type="submit"  value= "Update book"  className="btn submitBtn waves-effect waves-teal custom"/>                      
                      </div>
                    </div>
                  </div>
                </div>
            </form>
          </div>
        </div>
        <AddCategoryModal/>
      </div>
    }
    </div>
    );
  }
}

function stateToProps(state, ownProps) {
  return {
    getBookToEdit: state.books.editBookID,
    books: state.books.books,
    loadedCategories: state.createCategory.categories,
    imageUrl: state.uploadFiles.image,
    pdfUrl: state.uploadFiles.pdf

  }
}

function dispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(categoryActions.getCategories()),
    modifyBook: (bookData) => dispatch(bookActions.modifyBook(bookData)),
    saveImageToCloudinary: (image) => dispatch(bookActions.saveImageToCloudinary(image)),
    savePdfToCloudinary: (pdf) => dispatch(bookActions.savePdfToCloudinary(pdf))
    
    
  }
}


export default connect(stateToProps, dispatchToProps)(editBookForm);