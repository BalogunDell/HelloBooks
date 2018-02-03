import React from 'react';
import toastr from 'toastr';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

import Navbar from '../presentational/Navbar/Navbar';
import LoginForm from './Forms/LoginForm';
import Background from '../presentational/Background/Background';
import { 
  userLogin,
  newGoogleAccess} from '../../Actions/userAccessAction'; 

/**
 * @description Login component
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
   * @description handleLoginInput
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
   * @description googleLoginHandler
   *
   * @memberof Login
   *
   * @returns {object} updated state
   */
  googleLoginHandler(response) {
    const googleId = response.profileObj;
    const userData = {
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      username: `${response.profileObj.givenName}`,
      password: `${response.profileObj.givenName}`,
      email: response.profileObj.email,
      imageUrl: response.profileObj.imageUrl,
      googleUser: true
    }
    this.props.googleAccess(userData).then(() => {
      this.setState({
        isLoading: false,
        isAuthenticated: true
      });
    }).catch(() => {
      isLoading: false
    })
  }


  /**
   * @description loginHandler
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
        })
    });
  }
  
  /**
   * @description React Lifecycle method
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
      localStorage.getItem('Token')) {
      this.setState({
        isAuthenticated: true
      });
    }
  }


  /**
   * @description React render method
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
            isLoading = {this.state.isLoading}
            googleLoginHandler = {this.googleLoginHandler}
            currentLocation = {this.props.currentLocation}/>
          </Background>
      </div>
    );
  }
}


/**
 * @description Redux Connect parameter
 *
 * @returns {object} mapped state from redux store
 */
export const mapStateToProps = (state, ownProps) => {
    let initialUserData = { username:'' , password:'' }
  return {
    initialUserData: initialUserData,
    isAuthenticated: state.userAccess.isAuthenticated,
    googleAuth: state.userAccess,
    currentLocation: ownProps

  }
}

/**
 * @description Redux Connect parameter
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
