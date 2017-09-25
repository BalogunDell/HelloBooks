import React from 'react';
import { connect } from 'react-redux';

import { membershipIconCreator } from './messages';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: this.props.userProfile,
      editPassStatus:false,
      newPassData: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }
    }

    this.showChangePassForm = this.showChangePassForm.bind(this)
    this.hideChangePassForm = this.hideChangePassForm.bind(this)
  }

  showChangePassForm() {
    return this.setState({editPassStatus:true})
  } 
  
  hideChangePassForm(event) {
    this.setState({editPassStatus:false})
    event.target.value = ''
  }

  render() {
    console.log(this.state.userData)
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
              <p>Member level: {membershipIconCreator(this.state.userData.membership)}</p>
              {!this.state.editPassStatus
              ?
              <button className="btn waves-teal waves-effect" onClick={this.showChangePassForm}>Change Password</button>
              :
              ''
              }
            </div>

            {/* Form for profile update  */}
            {this.state.editPassStatus 
            ?
            <div className="change-password">
              <form action="">
                <div className="input-field col-s12 m12 l6">
                  <input type="text" placeholder="Current password" id="currentPassword" className="validate"/>
                </div>

                <div className="input-field col-s12 m12 l6">
                  <input type="text" placeholder="New Password" id="cnewPassword" className="form-control input-sm"/>
                </div>

                <div className="input-field col-s12 m12 l6">
                  <input type="text" placeholder="Confirm new password" id="confirmNewPassword" className="form-control input-sm"/>
                </div>

                <div className="input-field col-s12 m12 l6">
                  <button type="button" className="btn waves-effect waves-teal">SAVE</button>
                  <button type="button" className="btn waves-effect waves-teal red" onClick={this.hideChangePassForm}>CANCEL</button>
                </div>
              </form> 
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