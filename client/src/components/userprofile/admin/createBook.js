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
      errorStatus: false,
      success: '',
      successStatus: false,
      loader: false,
      disableBtn: false,
      showHiddinBtns: false,
      tempImageName: '',
      tempFileName: '',
      tempFileSize: 0

      }

    this.loaderText = <h6 className="green-text">Creating book...</h6>
    this.handleInput = this.handleInput.bind(this);
    this.createBookHandler = this.createBookHandler.bind(this);
    this.imageUploadHandler = this.imageUploadHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }

  handleInput(event) {
    let name = event.target.name;
    let tempBookData = Object.assign({}, this.state.bookData);
    tempBookData[name] = event.target.value;
    this.setState({bookData: tempBookData});
  }

  createBookHandler(event) {
    event.preventDefault();
    this.setState({loader:true, disableBtn:true});
    if(this.state.imageHeight < 300 || this.state.imageWidth < 250) {
      this.setState({
        loader: false, 
        error: "Image is too small. Allowed dimension is 300 x 250 pixels.",
        errorStatus: true,
        successStatus: false,
        disableBtn:false });
      } 
    else if(this.state.tempFileSize > 10485760) {
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
        disableBtn:false });
        
        // Save image to cloudinary
        this.props.saveImageToCloudinary(this.state.tempImageName).then(()=> {
          // Check if image url has been set before dispatching  save pdf action
          if(this.state.bookData.image) {
            this.props.savePdfToCloudinary(this.state.tempFileName).then(() =>{
              if(this.state.bookData.pdf) {
                // Save book details to database
                  this.props.createBook(this.state.bookData).then(() => {
                    this.setState({loader: false,
                      successStatus:true,
                      disableBtn:true,
                      errorStatus:false,
                      showHiddinBtns:true,
                      error: '',
                      success: "Book has been created."});
            
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
          } else {
            console.log('an error occurred'); 
          }
          
        })
        .catch(error => {
          console.log(error.response);
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
  fileReader.readAsDataURL(fileInput);

  }

  componentDidMount() {
    this.props.getCategories().then(() => {
      $('select').material_select();
      $('select').change(e => this.handleInput(e));
    });
   
    $('.modal').modal();
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.imageUrl) {
      this.setState({bookData: {
        ...this.state.bookData, image: nextProps.imageUrl.secure_url
      }
    });
    } else {
    }
    if(nextProps.loadedCategories[0].id) {
      this.setState({loadedCategories: nextProps.loadedCategories})
    }

    if(nextProps.pdfUrl) {
      this.setState({bookData: {
        ...this.state.bookData, pdf: nextProps.pdfUrl.secure_url
      }
    });
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
              fileUploadHandler={this.fileUploadHandler}
              error= {this.state.error}
              success= {this.state.success}
              loader={this.state.loader}
              successStatus ={this.state.successStatus}
              errorStatus = {this.state.errorStatus}
              showHiddinBtns={this.state.showHiddinBtns}
              disableBtn= {this.disableBtn}/>
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
    image: '',
    pdf: '' }

  return {
    initialData,
    loadedCategories: state.createCategory.categories,
    imageUrl: state.uploadFiles.image,
    pdfUrl: state.uploadFiles.pdf
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createBook: data => dispatch(bookActions.createBook(data)),
    getCategories: () => dispatch(categoryActions.getCategories()),
    saveImageToCloudinary: (image) => dispatch(bookActions.saveImageToCloudinary(image)),
    savePdfToCloudinary: (pdf) => dispatch(bookActions.savePdfToCloudinary(pdf))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBook);
