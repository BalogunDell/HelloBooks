import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  createBook,
  saveImageToCloudinary,
  savePdfToCloudinary
} from '../../Actions/booksAction';
import { getCategories } from '../../Actions/categoryAction';
import CreateBookForm from '../presentational/CreateBookForm';


/**
 * @description CreateBook
 * 
 * @class CreateBook
 * 
 * @extends {Component}
 */
export class CreateBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookData: { ...this.props.initialData },
      loadedCategories: [],
      imageHeight: 0,
      imageWidth: 0,
      errorMessage: '',
      errorStatus: false,
      successMessage: '',
      successStatus: false,
      loader: false,
      disableBtn: false,
      showHiddinBtns: false,
      tempImageName: '',
      tempFileName: '',
      tempFileSize: 0,
      redirect: false

      }

    this.loaderText = <h6 className="green-text">Creating book...</h6>
    this.handleInput = this.handleInput.bind(this);
    this.createBookHandler = this.createBookHandler.bind(this);
    this.imageUploadHandler = this.imageUploadHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }


  /**
   * @description React lifecycle hook - componentDidMount
   * 
   * @memberof CreateBook
   * 
   * @returns {object} updated state
   */
  componentDidMount() {
    this.props.getCategories()
      .then(() => {})
      .catch(() => {})
   $(document).ready(() => {
    $('.modal').modal();
   })
  }

  
  /**
   * @description React lifecycle hook - componentWillReceiveProps
   * 
   * @param {object} nextProps
   * 
   * @memberof CreateBook
   * 
   * @returns {object} updated state
   */
  componentWillReceiveProps(nextProps) {
    if(nextProps.imageUrl) {
      this.setState({bookData: {
        ...this.state.bookData,
        imageUrl: nextProps.imageUrl.secure_url
      }
    });
    } else {
    }
    if(nextProps.loadedCategories[0].id) {
      this.setState({loadedCategories: nextProps.loadedCategories});
    }

    if(nextProps.PDFUrl) {
      this.setState({bookData: {
        ...this.state.bookData, PDFUrl: nextProps.PDFUrl.secure_url
      }
    });
    }
  }

  
  /**
   * @description Handles user input - handleInput
   * 
   * @param {object} event
   * 
   * @memberof CreateBook
   * 
   * @returns {object} updated state user data
   */
  handleInput(event) {
    let name = event.target.name;
    let tempBookData = { ...this.state.bookData };
    tempBookData[name] = event.target.value;
    switch(event.target.name) {

      case 'categoryId': 
        this.setState({ bookData:tempBookData});
        return this.setState({
        bookData: {...this.state.bookData,
          categoryId: parseInt(event.target.value, 10)}});

      case 'isbn':
        this.setState({ bookData:tempBookData});
        return this.setState({
          bookData: {...this.state.bookData,
            isbn: parseInt(event.target.value, 10)}});

      case 'year':
          this.setState({ bookData:tempBookData});
          return this.setState({
            bookData: {...this.state.bookData,
              year: parseInt(event.target.value, 10)}});

      case 'pages':
        this.setState({ bookData:tempBookData});
        return this.setState({
          bookData: {...this.state.bookData,
            pages: parseInt(event.target.value, 10)}});

      case 'quantity':
        this.setState({ bookData:tempBookData});
        return this.setState({
          bookData: {...this.state.bookData,
            quantity: parseInt(event.target.value, 10)}});

      default: 
      this.setState({ bookData: tempBookData });
      }
}

  /**
   * @description Handles book creation - createBookHandler
   * 
   * @param {object} event
   * 
   * @memberof CreateBook
   * 
   * @returns {object} updated state and success message
   */
  createBookHandler(event) {
    event.preventDefault();
    this.setState({loader:true, disableBtn:true});
    if(this.state.imageHeight < 300 || this.state.imageWidth < 250) {
      this.setState({
        loader: false, 
        errorMessage: "Image is too small. it should 300 x 250 pixels.",
        errorStatus: true,
        successStatus: false,
        disableBtn:false });
      } 
    else if(this.state.tempFileSize > 10485760) {
      this.setState({
        loader: false, 
        errorMessage: "File too large, Only 10MB or less is allowed.",
        errorStatus: true,
        successStatus: false,
        disableBtn:false });
    } else if (this.state.imageHeight <= this.state.imageWidth) {
        this.setState({
          loader: false, 
          errorMessage: "Only portraits are allowed",
          errorStatus: true,
          successStatus: false,
          disableBtn:false });
    } else {
      this.setState({
        loader: true, 
        errorMessage: "",
        errorStatus: false,
        successStatus: false,
        disableBtn:true });
        
        this.props.saveImageToCloudinary(this.state.tempImageName)
        .then(()=> {
          if(this.state.bookData.imageUrl) {
            this.props.savePdfToCloudinary(this.state.tempFileName)
            .then(() =>{
              if(this.state.bookData.PDFUrl) {
                  this.props.createBook(this.state.bookData).then(() => {
                    this.setState({
                      loader: false,
                      successStatus:true,
                      disableBtn:true,
                      errorStatus:false,
                      showHiddinBtns:true,
                      errorMessage: '',
                      successMessage: "Book has been created."});
                      setTimeout(() => {
                        this.setState({
                          redirect: true
                        });
                      }, 3000);
                      Materialize.toast(
                        'Book has been created',
                        3000,
                        'blue rounded');
            
                  })
                  .catch(error => {
                    this.setState({
                      loader: false,
                      successStatus:false,
                      errorStatus:true,
                      disableBtn:true });
                  })
              }
            }).catch(() => {})
          }
        }).catch(() => {});
    }
  }

  /**
   * @description Handles image upload - imageUploadHandler
   * 
   * @param {object} event
   * 
   * @memberof CreateBook
   * 
   * @returns {object} selected file
   */
  imageUploadHandler(event) {
    event.preventDefault();
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
   * @description Handles image upload - fileUploadHandler
   * 
   * @param {object} event
   * 
   * @memberof CreateBook
   * 
   * @returns {object} selected file
   */
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
  fileReader.readAsDataURL(fileInput);

  }

  /**
   * @description React render method - render
   * 
   * @memberof CreateBook
   * 
   * @returns {JSX} JSX representation of DOM
   */
  render() {
    return(
      <div>
        {
            this.state.redirect
          ?
          <Redirect to="/user/dashboard"/>
          :
          <div className="container">
                <div>
                  <CreateBookForm handleInput = {this.handleInput}
                  createBookHandler = {this.createBookHandler}
                  initialData = {this.state.bookData}
                  loadedCategories = {this.state.loadedCategories}
                  imageUploadHandler = {this.imageUploadHandler}
                  fileUploadHandler={this.fileUploadHandler}
                  errorMessage= {this.state.errorMessage}
                  successMessage= {this.state.successMessage}
                  loader={this.state.loader}
                  successStatus ={this.state.successStatus}
                  errorStatus = {this.state.errorStatus}
                  showHiddinBtns={this.state.showHiddinBtns}
                  disableBtn= {this.disableBtn}/>
                </div>

            </div>
        }
      </div>
    );
  }
}


/**
 * @description Redux connect parameter - mapStateToProps
 * 
 * @param {object} state
 * 
 * @returns {object} mapped state of the store
 */
export const mapStateToProps = (state) => {

  let initialData = { 
    isbn: '', 
    title:'', 
    author: '', 
    pages: '', 
    year: '', 
    description: '', 
    quantity: '',
    categoryId: '', 
    imageUrl: '',
    PDFUrl: '' }

  return {
    initialData,
    loadedCategories: state.loadedCategories.categories,
    imageUrl: state.uploadFiles.imageUrl,
    PDFUrl: state.uploadFiles.PDFUrl
  }
}

/**
 * @description Redux connect parameter - mapDispatchToProps
 * 
 * @param {object} dispatch
 * 
 * @returns {object} dispatched actions
 */
export const mapDispatchToProps = (dispatch) => {
  return {
    createBook: data => dispatch(createBook(data)),
    getCategories: () => dispatch(getCategories()),
    saveImageToCloudinary: (image) => dispatch(saveImageToCloudinary(image)),
    savePdfToCloudinary: (pdf) => dispatch(savePdfToCloudinary(pdf))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBook);
