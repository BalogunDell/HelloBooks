import React from 'react';
import toastr from 'toastr';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

import Navbar from '../Navbar/Navbar';
import LoginForm from './Forms/LoginForm';
import Background from '../Background/Background';
import { 
  userLogin,
  newGoogleAccess} from '../../Actions/userAccessAction'; 

/**
 * Login component
 *
 * @class Login
 *
 * @extends {Component}
 */
export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state =  {
      userData: { ...this.props.initialUserData },

      loginError: '',
      isAuthenticated: false,
      isLoading: false,
      googleAuthenticated: true

    }

    this.handleLoginInput = this.handleLoginInput.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.googleLoginHandler = this.googleLoginHandler.bind(this);
  }


  /**
   * handleLoginInput
   *
   * @memberof Login
   *
   * @returns {object} updated state
   */

  handleLoginInput(event) {
    const field = event.target.name;
    let temporaryContainer = { ...this.state.userData }
    temporaryContainer[field] = event.target.value;
    return this.setState({ userData: temporaryContainer })

  }

  /**
   * googleLoginHandler
   *
   * @memberof Login
   *
   * @returns {object} updated state
   */
  googleLoginHandler(response) {
    const googleId = response.profileObj.googleId[5];
    const userData = {
      firstname: response.profileObj.givenName,
      lastname: response.profileObj.familyName,
      username: `${response.profileObj.givenName}${googleId}`,
      password: `${response.profileObj.familyName}${googleId}`,
      email: response.profileObj.email,
      image: response.profileObj.imageUrl
    }
    this.props.googleAccess(userData).then(() => {
      this.setState({
        isLoading: false,
        isAuthenticated: true
      });
    })
  }


  /**
   * loginHandler
   *
   * @memberof Login
   *
   * @returns {object} updated state
   */
  loginHandler(event) {
    event.preventDefault();
    this.setState({isLoading: true})
    this.props.userLogin(this.state.userData).then(() => {
    this.setState({isLoading: false, isAuthenticated: true})
    })
    .catch(error => {
      this.setState({
        isLoading:false,
        loginError: error.response.data.message})
    });
  }
  
  /**
   * React Lifecycle method
   *
   * @memberof Login
   *
   * @returns {object} updated state
   */
  componentDidMount() {
    $(document).ready(() => {
      $('.modal').modal();
    });

    if(this.props.googleAuth.isAuthenticated
      &&
      localStorage.getItem('Access-Token')) {
      this.setState({
        isAuthenticated: true
      });
    }
  }


  /**
   * React render method
   *
   * @memberof Login
   *
   * @returns {JSX} DOM representation of JSX
   */
  render() {
    return(
      this.state.isAuthenticated ? <Redirect to ="/user/books"/> : 
      <div>
        {/* This div holds the navbar component  */}
          <Background>
          <Navbar/>
          <LoginForm 
            userData = {this.state.userData}
            handleLoginInput = {this.handleLoginInput}
            loginHandler = {this.loginHandler}
            loginError = {this.state.loginError}
            isLoading = {this.state.isLoading}
            googleLoginHandler = {this.googleLoginHandler}/>

          </Background>
      </div>
    );
  }
}


/**
 * Redux Connect parameter
 *
 * @returns {object} mapped state from redux store
 */
export const mapStateToProps = (state, ownProps) => {
    let initialUserData = { username:'' , password:'' }
  return {
    initialUserData: initialUserData,
    isAuthenticated: state.userAccess.isAuthenticated,
    googleAuth: state.userAccess

  }
}

/**
 * Redux Connect parameter
 *
 * @returns {object} mapped state from redux store
 */
export const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (loginData) => dispatch(userLogin(loginData)),
    googleAccess: (userData) => dispatch(newGoogleAccess(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
