import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import EditBookForm from '../presentational/EditBookForm';
import { getCategories } from '../../actions/categoryAction';
import getCategory from '../../utils/getCategory';
import {
  modifyBook,
  saveImageToCloudinary,
  savePDFToCloudinary
} from '../../actions/booksAction';
import LoaderText from '../presentational/Loader';
import clearStorage from '../../utils/clearStorage';

/**
 * @description Edit Book component
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
      bookIndex : 0,
      selectedCategoryId: 0,
    }

    this.handleEditInput = this.handleEditInput.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.imageUploadHandler = this.imageUploadHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }

  /**
   * @description input handler
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
    switch(name) {
      case 'categoryId':
        this.setState({
          book:tempHolder,
          selectedCategoryId: parseInt(event.target.value, 10)
        });
        const result = getCategory(this.state.loadedCategories,
          parseInt(event.target.value, 10));

        this.setState({
          book: {...this.state.book,
            categoryId: parseInt(event.target.value, 10),
            Category: result[0]
          }});
        break;
      case 'year':
        tempHolder[name] = parseInt(event.target.value, 10);
        return this.setState({ book:tempHolder });
      case 'pages':
        tempHolder[name] = parseInt(event.target.value, 10);
        return this.setState({ book:tempHolder });
      
       case 'quantity':
        tempHolder[name] = parseInt(event.target.value, 10);
        return this.setState({ book:tempHolder });
      default: 
        return this.setState({ book:tempHolder });
    }
  }

   /**
   * @description profile update handler
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
    if((!this.state.tempImageName) && (!this.state.tempFileName)) {
      const modifiedBookData = {...this.state.book};
      delete modifiedBookData['isbn'];
      this.props.modifyBook(modifiedBookData).then(() => {
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
          if(!error.logout) {
            this.setState({loader: false, 
              errorStatus: true,
            redirect:false})
          }
        });

    } else if((this.state.tempImageName) && (!this.state.tempFileName)) {

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
                disableBtn: false });
              this.props.saveImageToCloudinary(this.state.tempImageName)
                .then(() => {
                  if(this.state.book.imageUrl) {
                  const modifiedBookData = {...this.state.book};
                  delete modifiedBookData['isbn'];
                  this.props.modifyBook(modifiedBookData)
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
                }
                })
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
              this.props.savePDFToCloudinary(this.state.tempFileName)
              .then(() => {
                if(this.state.book.PDFUrl) {
                  const modifiedBookData = {...this.state.book};
                  delete modifiedBookData['isbn'];
                this.props.modifyBook(modifiedBookData)                
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
              }
              })
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

                this.props.saveImageToCloudinary(this.state.tempImageName)
                .then(() => {
                
                  this.setState({
                    loader: true, 
                    error: "",
                    errorStatus: false,
                    disableBtn:true });
                  if(this.state.book.imageUrl) {
                    this.props.savePDFToCloudinary(this.state.tempFileName)
                    .then(() => {

                      if(this.state.book.PDFUrl) {
                        const modifiedBookData = {...this.state.book};
                        delete modifiedBookData['isbn'];
                          this.props.modifyBook(modifiedBookData).then(() => {
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
                          if(!error.logout) {
                            this.setState({
                              loader: false,
                              errorStatus:true,
                              disableBtn:true
                            });
                          }
                          });
                      }
                    })
                  }
                })
                }   
            }
        }
  }

 /**
   * @description react lifecycle method
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
   * @description react lifecycle method
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
    this.props.getCategories()
      .then(() => {})
      .catch(() =>{})
  }

  /**
   * @description react lifecycle method
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
    if(nextProps.PDFUrl) {
      this.setState({book: {
        ...this.state.book,
        PDFUrl: nextProps.PDFUrl.secure_url
      }
    });
    }
  }

  /**
   * @description image upload handler
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
   * @description PDF file upload method
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
   * @description react render method
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
          selectedCategoryId = {this.state.selectedCategoryId}
        />
      </div>
    );
  }
}

/**
 * @description HOC - Redux Connect method parameter
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
    PDFUrl: state.uploadFiles.PDFUrl,

  }
}

/**
 *  @description HOC - Redux Connect method parameter
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
    savePDFToCloudinary: (PDF) => dispatch(savePDFToCloudinary(PDF))
  }
}

export default connect(
  stateToProps,
  dispatchToProps)
  (EditBook);