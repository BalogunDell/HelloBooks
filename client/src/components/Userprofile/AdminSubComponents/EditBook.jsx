import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import EditBookForm from './EditBookForm';
import { getCategories } from '../../../Actions/categoryAction';
import {
  modifyBook,
  saveImageToCloudinary,
  savePdfToCloudinary
} from '../../../Actions/booksAction';
import LoaderText from './Loader';

/**
 * Edit Book component
 *
 * @class EditBook
 *
 * @extends {Component}
 */
export class EditBook extends React.Component {
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
      redirect: false,
      errorStatus: false,
      bookIndex : 0
    }

    this.handleEditInput = this.handleEditInput.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.imageUploadHandler = this.imageUploadHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }

  /**
   * input handler
   *
   * @memberof EditBook
   *
   * @param {Object} event
   *
   * @returns {object}  updated state
   */
  handleEditInput(event) {
    let name = event.target.name;
    let tempHolder =  {...this.state.book};
    tempHolder[name] = event.target.value
    if(event.target.name == 'categoryid') {
      this.setState({ book:tempHolder});
      this.setState({
        book: {...this.state.book, categoryid: event.target.value}});
    } else {
      this.setState({ book:tempHolder });
      
    }
  }

   /**
   * profile update handler
   *
   * @memberof EditBook
   *
   * @param {Object} event
   *
   * @returns {object} updated book details
   */
  handleUpdate(event) {
    event.preventDefault();
    this.setState({loader: true,
      error: '',
      errorStatus: false })
    // Check if a new image and pdf was selected, if !, save default values
    if((!this.state.tempImageName) && (!this.state.tempFileName)) {
      this.props.modifyBook(this.state.book).then(() => {
        this.setState({loader: false,  
          errorStatus: false})
          setTimeout(()=>{
            this.setState({redirect:true})
          }, 4000)
          Materialize.toast(
            'Book has been updated, Redirecting to dashboard',
            3000,
            'blue rounded'
          );
        })
        .catch(error => {
          this.setState({loader: false, 
            errorStatus: true,
            error: error.response,
          redirect:false})
        });

  // Check if a new image and and no pdf was selected, ues? save default values 
    } else if((this.state.tempImageName) && (!this.state.tempFileName)) {

        // Check image size
        if(this.state.imageHeight < 300 || this.state.imageWidth < 250) {
          this.setState({
            loader: false, 
            error: "Image is too small. Allowed dimension is 300 x 250 pixels.",
            errorStatus: true,
            disableBtn:false });
          } else {
            if(this.state.imageHeight <= this.state.imageWidth ) {
                this.setState({
                  loader: false, 
                  error: "Only portraits are allowed.",
                  errorStatus: true,
                  disableBtn:false });
            } else {
              this.setState({
                loader: true, 
                error: "",
                errorStatus: false,
                disableBtn:true });
              this.props.saveImageToCloudinary(this.state.tempImageName)
                .then(() => {
                  this.props.modifyBook(this.state.book)

                  .then(() => {
                    this.setState({loader: false,  
                      errorStatus: false})
                      setTimeout(()=>{
                        this.setState({redirect:true})
                      }, 4000);
                    Materialize.toast(
                      'Book has been updated',
                      3000,
                      'blue rounded');
                  })
                  .catch(error => {
                  });
                })
                .catch(error => {
                });
              }
        }
      } else if((!this.state.tempImageName) && (this.state.tempFileName)) {

        // Check File size
          if(this.state.tempFileSize > 10485760 ) {
            this.setState({
              loader: false, 
              error: "Only portraits are allowed and should be less than 10MB.",
              errorStatus: true,
              disableBtn:false });
            } else {
              this.props.savePdfToCloudinary(this.state.tempFileName)
              .then(() => {
                this.props.modifyBook(this.state.book)                
                .then(() => {
                  this.setState({loader: false,  
                    errorStatus: false})
                    setTimeout(()=>{
                      this.setState({redirect:false})
                    }, 4000);
                    Materialize.toast(
                      'Book has been updated',
                      3000,
                      'blue rounded'); 
                })
                .catch(error => {
                });
              })
              .catch(error => {
              });
            }
      } else {
        if(this.state.imageHeight < 300 || this.state.imageWidth < 250) {
          this.setState({
            loader: false, 
            error: "Image is too small. Allowed dimension is 300 x 250 pixels.",
            errorStatus: true,
            disableBtn:false });
          } else if(this.state.tempFileSize > 10485760
            || 
            this.state.imageHeight < this.state.imageWidth) {
            this.setState({
              loader: false, 
              error: "Only portraits are allowed and should be less than 10MB.",
              errorStatus: true,
              disableBtn:false });
          } else {
              if( this.state.imageHeight <= this.state.imageWidth) {
                this.setState({
                  loader: false, 
                  error: "Only portraits are allowed.",
                  errorStatus: true,
                  disableBtn:false });
              } else {

                  // Save image to cloudinary
                this.props.saveImageToCloudinary(this.state.tempImageName)
                .then(() => {
                
                  this.setState({
                    loader: true, 
                    error: "",
                    errorStatus: false,
                    disableBtn:true });
                // Check if image url has been set before dispatching pdf action
                  if(this.state.book.imageUrl) {
                    this.props.savePdfToCloudinary(this.state.tempFileName)
                    .then(() => {

                      if(this.state.book.pdfUrl) {
                        // Save book details to database
                          this.props.modifyBook(this.state.book).then(() => {
                            this.setState({loader: false,
                              disableBtn:true,
                              errorStatus:false,
                              showHiddinBtns:true,
                              error: ''});
                              setTimeout(()=>{
                                this.setState({redirect:true})
                              }, 4000);
                              Materialize.toast(
                                'Book has been updated',
                                3000, 
                                'blue rounded');
                    
                          })
                          .catch(error => {
                            this.setState({
                              loader: false,
                              errorStatus:true,
                              disableBtn:true,
                              error: error.response.data.errorMessage});
                          });
                      }
                    }).catch((error) => {
                      return error;
                    });
                  }
                })
                .catch(error => {
                });
                }
            
            }
        }
  }

 /**
   * react lifecycle method
   *
   * @memberof EditBook
   *
   * @returns {object} new state
   */
  componentWillMount(){
    if(this.props.getBookToEdit) {
      this.setState({book: this.props.getBookToEdit[0]});
    } else {
      const fetchedBook = JSON.parse(localStorage.getItem('index'));
      this.setState({book: fetchedBook[0]});
    }
  }

  /**
   * react lifecycle method
   *
   * @memberof EditBook
   *
   * @returns {object} updated state
   */
  componentDidMount() {
    $(document).ready(() => {
      Materialize.updateTextFields();
      $('.modal').modal();
    });
    this.props.getCategories();
  }

  /**
   * react lifecycle method
   *
   * @memberof EditBook
   *
   * @param {Object} nextProps
   *
   * @returns {object} updated state
   */
  componentWillReceiveProps(nextProps) {
    if(nextProps.loadedCategories) {
     this.setState({
       loadedCategories: nextProps.loadedCategories
      });
    }

    if(nextProps.imageUrl) {
      this.setState({book: {
        ...this.state.book,
        imageUrl: nextProps.imageUrl.secure_url
      }
    });
    } else {
    }
    if(nextProps.pdfUrl) {
      this.setState({book: {
        ...this.state.book,
        pdfUrl: nextProps.pdfUrl.secure_url
      }
    });
    }  
  }

  /**
   * image upload handler
   *
   * @memberof EditBook
   *
   * @param {Object} event
   *
   * @returns {object} selected image information
   */
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

  /**
   * pdf file upload method
   *
   * @memberof EditBook
   *
   * @param {Object} event
   *
   * @returns {object} updated state with pdf url
   */
  fileUploadHandler(event) {
    event.preventDefault();
    let fileInput = event.target.files[0];
    let fileReader = new FileReader();
    this.setState({
      tempFileName: fileInput,
      tempFileSize: fileInput.size});
    if(fileInput) {
    fileReader.onload = () => {
      const newUpload = new File([''], fileInput.name);
      this.setState({ tempFileName: fileInput});
    }
  }
}

  /**
   * react render method
   *
   * @memberof EditBook
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    return (
      <div>
        <EditBookForm
          redirect = {this.state.redirect}
          handleUpdate = {this.handleUpdate}
          book = {this.state.book}
          handleEditInput = {this.handleEditInput}
          loadedCategories = {this.state.loadedCategories}
          imageUploadHandler = {this.imageUploadHandler}
          fileUploadHandler = {this.fileUploadHandler}
          error = {this.state.error}
          errorStatus = {this.state.errorStatus}
          loader = {this.state.loader}
        />
      </div>
    );
  }
}

 /**
   *  HOC - Redux Connect method parameter
   *
   * @param {Object} state
   *
   * @returns {object} store state
   */
const stateToProps = (state) => {
  return {
    getBookToEdit: state.books.editBookID,
    books: state.books.books,
    loadedCategories: state.loadedCategories.categories,
    imageUrl: state.uploadFiles.imageUrl,
    pdfUrl: state.uploadFiles.pdfUrl

  }
}

 /**
   *  HOC - Redux Connect method parameter
   *
   * @param {Object} dispatch
   *
   * @returns {object} action creators
   */
const dispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategories()),
    modifyBook: (bookData) => dispatch(modifyBook(bookData)),
    saveImageToCloudinary: (image) => dispatch(saveImageToCloudinary(image)),
    savePdfToCloudinary: (pdf) => dispatch(savePdfToCloudinary(pdf))
  }
}

export default connect(stateToProps, dispatchToProps)(EditBook);