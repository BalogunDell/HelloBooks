import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { membershipIconCreator } from './messages';
import * as profileEditConst from './profileEditElements';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: this.props.userProfile,
      viewProfile:false,
      editBtn: false,
      editPass: false,
      editFirstname: false,
      editLastname:false,
      editUsername: false,
      editEmail: false,
      newPassData: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }
    }

    this.showChangePassForm = this.showChangePassForm.bind(this)
    this.hideChangePassForm = this.hideChangePassForm.bind(this)
    this.EditProfileHandler = this.EditProfileHandler.bind(this)
    this.editPassword = this.editPassword.bind(this)
  }

  editPassword() {
    this.setState({editPass: true, editBtn:true})
  }
  showChangePassForm() {
    return this.setState({viewProfile:true})
  } 
  
  hideChangePassForm(event) {
    this.setState({viewProfile:false})
    event.target.value = ''
  }


  EditProfileHandler(){
    console.log('hello')
  }

  componentDidMount() {
    $(document).ready(()=> {
      $('.modal').modal();
    })
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
              <p>Member level: {membershipIconCreator(this.state.userData.membership)}</p>
              <div className="row">
                <div className="col s12 l12">
                  {!this.state.viewProfile
                  ?
                  <button className="btn waves-teal waves-effect" onClick={this.showChangePassForm}>View Full Profile</button>
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
              <table>
                <thead>
                  <tr>
                    <td><b>Profile Details</b></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Firstname:</td>
                    <td>{this.state.userData.firstname} </td>
                  </tr>

                  <tr>
                    <td>Lastname:</td>
                    <td> {this.state.userData.lastname} </td>
                  </tr>

                  <tr>
                    <td>Email:</td>
                    <td> {this.state.userData.email} </td>
                  </tr>

                  <tr>
                    <td>Username:</td>
                    <td> {this.state.userData.username} </td>
                  </tr>

                  <tr>
                    <td>Password:</td>
                    <td> ***<i className="material-icons" onClick={this.editPassword}>edit</i></td>
                  </tr>
                </tbody>
              </table>
              <button className="btn waves-ripple waves-effect modal-trigger" disabled={this.state.editBtn}>EDIT</button>
            </div>
            :
            ''
            }

            {this.state.editPass 
            ?
            <profileEditConst.editPasswordEle/>
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