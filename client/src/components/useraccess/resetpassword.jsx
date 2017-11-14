import React, {PropTypes} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../navbar/Navbar';
import Background from '../Background/Background';
import Loader from '../userprofile/adminSubComponents/loader';
import * as UserAcessActions from '../../Actions/userAccessAction';



/**
 * @class Register
 * @classdesc returns the component for user signup
 */
class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     newPassword: '',
     confirmNewPassword: '',
     errorMessage: '',
     errorStatus: false,
     successMessage: '',
     successStatus: false,
     loader: false,
     disableSubmitBtn: false,
     redirectOnExpiredUrl: false
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * 
   * @param { object } event 
   * @memberof ResetPassword
   * @returns { object } new state for new password and confirm new password 
   */
  handleInput(event) {
   const name = event.target.name;
  this.setState({ [name] : event.target.value });
  }
  

  /**
   * 
   * 
   * @param { object } event 
   * @memberof ResetPassword
   * @returns { object } respose from api call 
   */
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ loader: true, disableSubmitBtn: true });
    if ((this.state.newPassword !== this.state.newPassword)) {
      this.setState({
        loader: false,
        errorStatus: true,
        errorMessage: 'Password and confirm password are not the same',
        successMessage: '',
        successStatus: false,
        disableSubmitBtn: false});
    }  else if(this.state.newPassword === '') {
      this.setState({
        loader: false,
        errorStatus: true,
        errorMessage: 'All fields are required',
        successMessage: '',
        successStatus: false,
        disableSubmitBtn: false});
    } else {
      this.setState({ loader: true, disableSubmitBtn: true }); 
      // API call
      this.props.saveNewPassword({password: this.state.newPassword}, this.props.url)
      .then(() => {
        this.setState({
          errorMessage: '',
          error: false,
          successMessage: 'Your password has been successfully updated, Redirecting to login page',
          successStatus: true,
          loader: false
        });

        setTimeout(() => {
          this.setState({ redirectOnExpiredUrl: true})}, 3000);
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.response.data.message,
          error: true,
          successMessage: '',
          successStatus: false,
          loader: false,
          disableSubmitBtn: false
        });
      });
    }
  }

  componentWillMount() {
    this.props.saveNewPassword(null, this.props.url)
    .then((response)=> {

    })
    .catch((error) => {
      if(error.response.status === 401) {
        this.setState({ redirectOnExpiredUrl: true})
      }
    });
  }



/**
 * 
 * 
 * @returns { jsx } a change password screen
 * @memberof ResetPassword
 */
render() {
  return( 
    <div>
      {
        this.state.redirectOnExpiredUrl 
        ?
          <Redirect to ="/login"/>
        :
          <Background>
            <Navbar/>
              <div className="resetPassword">
                <div className="container">
                  <form className="col s6 offset-s3" onSubmit={this.handleSubmit}>
                    <h5>Password Reset Form</h5>
                    <div className="input-field">
                      <label htmlFor="password">New Password</label>
                      <input type="password" name="newPassword" 
                      className="validate" value={this.state.email} 
                      onChange={this.handleInput}/>
                    </div>

                    <div className="input-field">
                      <label htmlFor="confirmPassword">Confirm New Password</label>
                      <input type="password"
                      name="confirmNewPassword"
                      className="validate" value={this.state.email} 
                      onChange={this.handleInput}/>
                    </div>
                    
                    <div className="row center-align">
                      { this.state.loader ? <Loader/> : null }
                      { this.state.errorStatus ? <h6 className="red-text">{this.state.errorMessage}</h6> : null }
                      { this.state.successMessage ? <h6 className="green-text">{this.state.successMessage}</h6> : null }             
                    </div>

                    <div className="input-field">
                      <button className="btn waves-effect waves-ripple green" disabled={this.state.disableSubmitBtn}>Reset Password</button>
                    </div>
                  </form>
                </div>
              </div>
          </Background>
      }
    </div>
  );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    url: ownProps.match.params.uniqueUrl
  }
}

function dispatchToProps(dispatch) {
  return {
    saveNewPassword: (newPassword, uniqueUrl) => dispatch(
      UserAcessActions.resetPassword(newPassword, uniqueUrl
      )) 
  }
}

export default connect(mapStateToProps, dispatchToProps)(ResetPassword);