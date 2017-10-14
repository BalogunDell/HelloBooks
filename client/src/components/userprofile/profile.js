import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { membershipIconCreator } from './messages';
import ProfileInfo from './profileInfo';
import ProfileEditForm from './profileUpdateForm';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: this.props.userProfile,
      viewProfile:false,
      showInput: false,
      editButton: true
    }

    this.showProfile = this.showProfile.bind(this);
    this.hideChangeForm = this.hideChangeForm.bind(this);
    this.showInputHandler = this.showInputHandler.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);    
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
      editButton: false

    })
  }

  componentDidMount() {
    $(document).ready(()=> {
      $('.modal').modal();
    });
  }

  render() {
    return (
      <div className="center profile">
        <div className="profile-holder">
          <div className="details">
            {/* Profile image here */}
            <div className="profile-image-holder">
              <img src="/images/abbey.jpg" className="circle responsive-img" id="" alt=""/>
              <div className="circle change-image-overlay">
                <span>
                  <i className="material-icons">photo_camera</i>
                  <h6>Upload new image</h6>
                </span>
              </div>
            </div>
            
            {/* User details0 */}

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
      </div>
    )
  }
}
function mapStateToProps(state, ownProps) {
  return {
    userProfile: state.userProfile
  }
}
export default connect(mapStateToProps, null)(Profile);