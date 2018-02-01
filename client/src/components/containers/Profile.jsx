import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { membershipIconCreator } from '../../utils/messages';
import ProfileInfo from '../presentational/ProfileInfo';
import ProfileUpdateForm from '..//containers/ProfileUpdateForm';
import ImageModal from '../presentational/UpdateImageModal';
import {
  saveNewImage,
  saveNewImageToDB
} from '../../Actions/userProfileAction';

require('dotenv').config();

/**
 * @export Profile
 * 
 * @class Profile to show user details
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
      defaultUserImage: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1510302773/default_image_yi56ca.jpg'
    }

    this.showProfile = this.showProfile.bind(this);
    this.hideChangeForm = this.hideChangeForm.bind(this);
    this.showInputHandler = this.showInputHandler.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.handleImageEdit = this.handleImageEdit.bind(this);
    this.imageUploadHandler = this.imageUploadHandler.bind(this);
    this.cancelProfileEdit = this.cancelProfileEdit.bind(this);
    
  }

 /**
  * @method showProfile
  * 
  * @returns {object} updated state
  *
  * @memberof Profile
  */
 showProfile() {
    this.setState({viewProfile:true, editButton: false});
  } 
  
/**
  * @method hideChangeForm
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
  * @returns {object} updated state
  *
  * @memberof Profile
  */
  showInputHandler() {
    this.setState({showInput: true, editButton: true,});
    const info = JSON.stringify(this.state.userData);
    localStorage.setItem('info', info);
  }
 
   /**
   * @method cancelEdit
   * 
   *  @returns a new state with cancelEditStatus set to false
   * 
   * @memberof profileUpdateForm
   */
  cancelEdit() {
    this.setState({
      viewProfile: true,
      showInput: false,
      editButton: false,
      tempImageName: '',
      loader: false,
      imageHeight: 0,
      imageWidth: 0,
      preview: '',
      newImageUploadError : false,
      newImageUploadSuccessMessage: '',
      disableUpdateBtn: false
    });
  }

  /**
   * @method cancelProfileEdit
   * 
   *  @returns a new state with cancelEditStatus set to false
   * 
   * @memberof profileUpdateForm
   */
  cancelProfileEdit() {
    this.setState({
      viewProfile: true,
      showInput: false,
      editButton: false,
      loader: false,
    });
  }


   /**
   * @method handleImageEdit
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
      this.setState({
        userData: { 
          ...this.state.userData, 
          image: this.props.newImageUrl.secure_url } });
      this.props.saveNewImageToDB(this.state.userData)
        .then(() => {
          Materialize.toast(
            'Profile image has been updated',
            3000,
            'blue rounded');
          // Close modal afer message has been displayed
        })
        .catch((error) => {
        });
      })
      .catch((error) => {
        this.setState({ 
          loader: false,
          newImageUploadError: true,
          newImageUploadSuccess: false,
          newImageUploadErrorMessage: error.response.data.message,
          newImageUploadSuccessMessage: '',
          tempImageName: ''
        });
    })
  }

  /**
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
            this.setState({ newImageUploadError: true, disableUpdateBtn: true,
            newImageUploadErrorMessage: 'Only portraits are allowed.' });
          }
        }
      }
    }
    imageReader.readAsDataURL(imageInput);
  }

  /**
   * 
   * React lifecycle hook - componentDidMount
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
   * React lifecycle hook - componentWillReceiveProps
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
  }

   /**
   * 
   * React render method - render
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
              <div className="profile-image-holder">
                <a href="#confirmationModal" className="modal-trigger">
                { this.state.userData.image 
                  ?
                  <img
                    src={this.state.userData.image} 
                    className="responsive-img"
                    id="image-target"
                    alt=""/>
                  :
                  <img
                    src={this.state.defaultUserImage}
                    className="responsive-img"
                    id="image-target"
                    alt=""
                  />
                }
                </a>
              </div>
              
              <div className="userInfoDisplay">
                <h4>{`${this.state.userData.firstName}
                ${this.state.userData.lastName}`}
                </h4>
                <p>Joined: 
                  {this.state.userData.createdAt} | {this.state.userData.email}
                </p>
                <p>Member level:
                {membershipIconCreator(this.state.userData.membership 
                  || 
                  process.env.DEFAULT_MEMBERSHIP)} </p>
                <div className="row">
                  <div className="col s12 l12">
                    {!this.state.viewProfile
                    ?
                    <button className="btn waves-teal waves-effect" 
                      onClick={this.showProfile}>View Full Profile</button>
                    :
                    ''
                    }
                  </div>
                </div>
              </div>

              {this.state.viewProfile 
              ?
              <div>
                {this.state.showInput 
                ? 
                  <ProfileUpdateForm cancelEdit = {this.cancelProfileEdit}
                  showProfile = {this.showProfile}/>
                :
                  <ProfileInfo userData={this.state.userData}
                  showInput={this.state.showInput}
                  showInputHandler={this.showInputHandler}/>
                }
                {!this.state.editButton 
                ?
                  <button 
                    className="btn waves-ripple waves-effect modal-trigger" 
                    onClick={this.showInputHandler}
                    id="editProfile">EDIT
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
        cancelEdit = {this.cancelEdit}
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
 *  HOC - Redux Connect method parameter
 *
 * @param {Object} state
 *
 * @returns {object} action creators
 */

export const mapStateToProps = (state, ownProps) => {
  return {
    userProfile: state.userProfile,
    newImageUrl: state.uploadFiles.image
  }
}


 /**
 *  HOC - Redux Connect method parameter
 *
 * @param {Object} dispatch
 *
 * @returns {object} action creators
 */
export const mapDispatchToProps = (dispatch) => {
  return {
    saveNewImage: (image) => dispatch(saveNewImage(image)),
    saveNewImageToDB: (newimage) => dispatch(saveNewImageToDB(newimage))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);