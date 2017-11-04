import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { membershipIconCreator } from './messages';
import ProfileInfo from './profileInfo';
import ProfileEditForm from './profileUpdateForm';
import ImageModal from './updateImageModal';
import * as userActions from '../../Actions/userProfileAction';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: this.props.userProfile,
      viewProfile:false,
      showInput: false,
      editButton: true,
      tempImageName: '',
      imageHeight: 0,
      imageWidth: 0,
      loader: false
    }

    this.showProfile = this.showProfile.bind(this);
    this.hideChangeForm = this.hideChangeForm.bind(this);
    this.showInputHandler = this.showInputHandler.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.handleImageEdit = this.handleImageEdit.bind(this);
    this.imageUploadHandler = this.imageUploadHandler.bind(this);
    
  }

  showProfile() {
    this.setState({viewProfile:true, editButton: false});
  } 
  
  hideChangeForm(event) {
    this.setState({viewProfile:false});
    event.target.value = ''
  }

  showInputHandler() {
    this.setState({showInput: true, editButton: true,});
    const info = JSON.stringify(this.state.userData);
    localStorage.setItem('info', info);
  }
 
   /**
   * @method cancelEdit
   *  @returns a new state with cancelEditStatus set to false
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
      imageWidth: 0


    })
  }

  /**
   * 
   * @memberof Profile
   */

  handleImageEdit(event) {
    event.preventDefault();
    this.props.saveNewImage(this.state.tempImageName)
    .then(() => {
      console.log('done');
    })
    .catch((error) => {
      console.log(error);
    })
  }

  /**
   * 
   * @param {object} event
   * @returns { object } updated state
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
          this.setState({ tempImageName: imageInput, 
          imageHeight:newUpload.height,
          imageWidth: newUpload.width});
        }
      }
    }
    imageReader.readAsDataURL(imageInput);

  }

  componentDidMount() {
    $(document).ready(()=> {
      $('.modal').modal();

     const showImageOverlay = () => {
        $('#image-target').hover(() => {
          $('#test').addClass("change-image-overlay");
        });     
      };
      showImageOverlay();
    });
    
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.userProfile) {
      this.setState({userData: nextProps.userProfile});
    }
  }

  render() {
    return (
      <div className="center profile">
        <div className="profile-holder">
          <div className="details">
            {/* Profile image here */}
            <div className="profile-image-holder">
              <a href="#confirmationModal" className="modal-trigger">
              <img src="/images/abbey.jpg" className="circle responsive-img" id="image-target" alt=""/>
              <div className="circle image-overlay" id="test">
                <span>
                  <i className="material-icons">photo_camera</i>
                  <h6>Upload new image</h6>
                </span>
              </div>
              </a>
            </div>
            
            {/* User details */}

            <div>
              <h4>{`${this.state.userData.firstname} ${this.state.userData.lastname}`}</h4>
              <p>Joined: {this.state.userData.createdAt} | {this.state.userData.email}</p>
              <p>Member level: {membershipIconCreator(this.state.userData.membership)} </p>
              <div className="row">
                <div className="col s12 l12">
                  {!this.state.viewProfile
                  ?
                  <button className="btn waves-teal waves-effect" onClick={this.showProfile}>View Full Profile</button>
                  :
                  ''
                  }
                </div>
              </div>
            </div>

            {/* Form for profile update  */}
            {this.state.viewProfile 
            ?
            <div>
              {this.state.showInput 
              ? 
                <ProfileEditForm cancelEdit = {this.cancelEdit}/>
              :
                <ProfileInfo userData={this.state.userData}
                showInput={this.state.showInput}
                showInputHandler={this.showInputHandler}/>
              }
              {!this.state.editButton 
              ?
                <button className="btn waves-ripple waves-effect modal-trigger" onClick={this.showInputHandler}>EDIT</button>
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
        cancelEdit = {this.cancelEdit}/>
      </div>
    )
  }
}
function mapStateToProps(state, ownProps) {
  return {
    userProfile: state.userProfile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveNewImage: (image) => dispatch(userActions.saveNewImage(image))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);