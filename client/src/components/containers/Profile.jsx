import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProfileInfo from '../presentational/ProfileInfo';
import ProfileUpdateForm from '..//containers/ProfileUpdateForm';
import ImageModal from '../presentational/UpdateImageModal';
import ProfileHeader from '../presentational/ProfileHeader';
import {
  saveNewImage,
  saveNewImageToDB,
  editPassword
} from '../../actions/userProfileAction';
import { fail } from 'assert';

require('dotenv').config();

/** 
 * @class Profile to show user details
 * 
 * @description Renders the Profile component
 * 
 * @export Profile
 * 
 * @extends {React.Component}
 */
export class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: { ...this.props.userProfile },
      viewProfile:false,
      showInput: false,
      editButton: true,
      tempImageName: '',
      imageHeight: 0,
      imageWidth: 0,
      loader: false,
      newImageUploadError: false,
      newImageUploadSuccess: false,
      newImageUploadSuccessMessage: '',
      newImageUploadErrorMessage: '',
      disableUpdateBtn: false,
      preview: '',
      showPasswordUpdateInput: false,
      passwordContainer: { ...this.props.initialData },
    }

    this.showProfile = this.showProfile.bind(this);
    this.hideChangeForm = this.hideChangeForm.bind(this);
    this.showInputHandler = this.showInputHandler.bind(this);
    this.handleImageEdit = this.handleImageEdit.bind(this);
    this.imageUploadHandler = this.imageUploadHandler.bind(this);
    this.cancelProfileEdit = this.cancelProfileEdit.bind(this);
    this.handleShowVisibility = this.handleShowVisibility.bind(this);
    this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
    this.handleHideVisibility = this.handleHideVisibility.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

 /**
  * @method showProfile
  * 
  * @description showProfile Handler
  *
  * @returns {object} updated state
  *
  * @memberof Profile
  */
 showProfile() {
    this.setState({
      viewProfile:true,
      editButton: false
    });
  } 
  
  /**
 * @description decides when to show the password edit form
 * 
 * @param {boolean} status of the form 
 *
 * @returns {object} action creators
 */
handleShowVisibility(event) {
  this.setState({
    showPasswordUpdateInput: true,
    showInput: false,
    editButton: true

  });
}

/**
 * @description decides when to show the password edit form
 * 
 * @param {boolean} status of the form 
 *
 * @returns {object} action creators
 */
handleHideVisibility(event) {
  this.setState({
    showPasswordUpdateInput: false,
    showInput: false,
    editButton: false,
    passwordContainer: {
      currentPassword: '',
      newPassword: ''
      }
  });
}


/**
  * @method hideChangeForm
  *
  * @description hideChangeForm Handler
  * 
  * @returns {object} updated state
  *
  * @memberof Profile
  */
  hideChangeForm(event) {
    this.setState({viewProfile:false});
    event.target.value = ''
  }

  /**
  * @method showInputHandler
  * 
  * @description showInputHandler Handler
  *
  * @returns {object} updated state
  *
  * @memberof Profile
  */
  showInputHandler() {
    this.setState({
      showInput: true,
      editButton: true,});
    const info = JSON.stringify(this.state.userData);
    localStorage.setItem('info', info);
  }

  /**
   * @method cancelProfileEdit
   * 
   * @description cancelProfileEdit Handler
   * 
   * @returns a new state with cancelEditStatus set to false
   * 
   * @memberof profileUpdateForm
   */
  cancelProfileEdit() {
    document.getElementById('imageEdit').reset();
    this.setState({
      viewProfile: true,
      showInput: false,
      editButton: false,
      loader: false,
      tempImageName: '',
      preview: '',
      newImageUploadErrorMessage: '',
      disableUpdateBtn: false
    });
  }

  /**
 * @description handles inout change of the form
 * 
 * @param {boolean} event of the form 
 *
 * @returns {object} action creators
 */
  handleChange(event) {
    event.preventDefault();
    const field = event.target.name;
    let temporaryPasswordContainer = { ...this.state.passwordContainer }
    temporaryPasswordContainer[field] = event.target.value;
    return this.setState({
      passwordContainer: temporaryPasswordContainer,
    });
  }


   /**
   * @method handleImageEdit
   * 
   * @description handleImageEdit Handler
   * 
   *  @returns {object} a new state with cancelEditStatus set to false
   * 
   * @memberof profileUpdateForm
   */
  handleImageEdit(event) {
    event.preventDefault();
    this.setState({ 
      loader: true
    });
    this.props.saveNewImage(this.state.tempImageName)
    .then(() => {
      this.props.saveNewImageToDB(this.state.userData)
        .then(() => {
          Materialize.toast(
            'Profile image has been updated',
            3000,
            'blue rounded');
        })
        .catch((error) => {
          if(!error.logout) {
          this.setState({ 
            loader: false,
            newImageUploadError: true,
            newImageUploadSuccess: false,
            newImageUploadSuccessMessage: '',
            tempImageName: ''
          });
        }
      });
    })
  }

  /**
 * @description handles the password update
 * 
 * @param {boolean} event of the form 
 *
 * @returns {object} action creators
 */
  handlePasswordUpdate(event) {
    event.preventDefault();
    this.props.editPassword(this.state.passwordContainer)
      .then(() => {
        Materialize.toast(
          'Password has been changed successfully',
          3000,
          'blue rounded');
          this.setState({
            showPasswordUpdateInput: false,
          });
          this.cancelProfileEdit();
      })
      .catch(() => {
      });
  }

  /**
   * 
   * @description imageUploadHandler Handler
   * 
   * @param {object} event
   * 
   * @returns { object } updated state
   * 
   * @memberof profileUpdateForm
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
          if((newUpload.height > newUpload.width)
          ||
          newUpload.height === newUpload.width) {
            this.setState({ disableUpdateBtn: false, 
              tempImageName: imageInput,
              preview: newUpload.src,
              newImageUploadErrorMessage: '' });
              
              
          } else {
            this.setState({ 
              newImageUploadError: true, 
              disableUpdateBtn: true,
            newImageUploadErrorMessage: 'Only portraits are allowed.' });
          }
        }
      }
    }
    imageReader.readAsDataURL(imageInput);
  }

  /**
   * 
   * @description React lifecycle hook - componentDidMount
   * 
   * @memberof profileUpdateForm
   */
  componentDidMount() {
    $(document).ready(() => {
      $('.modal').modal();
    });
  }

  /**
   * 
   * @description React lifecycle hook - componentWillReceiveProps
   * 
   * @param {object} nextProps
   * 
   * @memberof profileUpdateForm
   */
  componentWillReceiveProps(nextProps) {
    if(nextProps.userProfile) {
      this.setState({ userData: nextProps.userProfile });
    } else {
      this.state.userData.length === 0;
    }

    if(nextProps.newImageUrl.imageUrl) {
      this.setState({
        userData: { 
          ...this.state.userData, 
          imageUrl: nextProps.newImageUrl.imageUrl.secure_url }
        });
    }
  }

   /**
   * 
   * @description React render method - render
   * 
   * @memberof profileUpdateForm
   * 
   * @returns {JSX} JSX representation of the DOM
   */
  render() {
    return (
      <div className="center profile">
        { Object.keys(this.state.userData).length === 0
        ?
        <h5>Loading profile information...</h5>
        :
        <div>
          <div className="profile-holder">
            <div className="details">
              {/* Profile image here */}
              <ProfileHeader
                userData={this.state.userData}
                viewProfile={this.state.viewProfile}
                showProfile={this.showProfile}
              />

              {this.state.viewProfile 
              ?
              <div>
                {this.state.showInput 
                ? 
                  <ProfileUpdateForm cancelEdit = {this.cancelProfileEdit}
                  showProfile = {this.showProfile}/>
                :
                  <ProfileInfo userData={this.state.userData}
                    showPasswordUpdateInput={this.state.showPasswordUpdateInput}
                    showInputHandler={this.showInputHandler}
                    handleShowVisibility = {this.handleShowVisibility}
                    handleChange={this.handleChange}
                    handleHideVisibility={this.handleHideVisibility}
                    handlePasswordUpdate={this.handlePasswordUpdate}
                    userDetails={this.state.userData}
                    handleChange={this.handleChange}
                    passwordContainer={this.state.passwordContainer}
                    cancelEdit = {this.cancelProfileEdit}/>
                }
                {!this.state.editButton 
                ?
                  <button 
                    className="btn waves-ripple waves-effect custom"
                    onClick={this.showInputHandler}
                    id="editProfile">EDIT PROFILE
                  </button>
                : 
                  null
                }
              </div>
              :
              ''
              }
            </div>
          </div>
        <ImageModal 
        imageUploadHandler = {this.imageUploadHandler}
        loader ={this.state.loader}
        handleImageEdit={this.handleImageEdit}
        cancelEdit = {this.cancelProfileEdit}
        preview = {this.state.preview}
        newImageUploadError= {this.state.newImageUploadError}
        newImageUploadSuccess = {this.state.newImageUploadSuccess}
        newImageUploadErrorMessage = {this.state.newImageUploadErrorMessage}
        newImageUploadSuccessMessage = {this.state.newImageUploadSuccessMessage}
        disableUpdateBtn = {this.state.disableUpdateBtn}/>
        </div>
        }
      </div>
    )
  }
}

 /**
 * @description HOC - Redux Connect method parameter
 *
 * @param {Object} state
 *
 * @returns {object} action creators
 */

export const mapStateToProps = (state) => {
  let initialData = { currentPassword: '', newPassword: ''};
  return {
    userProfile: state.userProfile,
    newImageUrl: state.uploadFiles,
    initialData
  }
}


 /**
 * @description HOC - Redux Connect method parameter
 *
 * @param {Object} dispatch
 *
 * @returns {object} action creators
 */
export const mapDispatchToProps = (dispatch) => {
  return {
    saveNewImage: (image) => dispatch(saveNewImage(image)),
    saveNewImageToDB: (newimage) => dispatch(saveNewImageToDB(newimage)),
    editPassword: (payload) => dispatch(editPassword(payload))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (Profile);