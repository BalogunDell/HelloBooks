import React from 'react';
import toastr from 'toastr';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

import Navbar from '../navbar/Navbar';
import LoginForm from './Forms/LoginForm';
import Background from '../Background/Background';
import { 
  userLogin,
  newGoogleAccess} from '../../Actions/userAccessAction'; 

/**
 * @class Register
 * @classdesc returns the component for user signin
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



// ******************************************************//
// DEFINE METHODS OF THE CLASS TO HANDLE INPUT AND LOGIN //
// ******************************************************//


  // Handle userinput 
  handleLoginInput(event) {
    // Get the name of each input field
    const field = event.target.name;

    // copy userData a new object and assign to tempUserDataCont
    let tempUserDataCont = { ...this.state.userData }

    // set the value typed in to the value of the corresponding key
    tempUserDataCont[field] = event.target.value;

    // return the new userData for comsumption
    return this.setState({ userData: tempUserDataCont })

  }

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


  // Handle login
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
  
  // ******************************************************//
// DEFINE METHODS OF THE CLASS TO HANDLE INPUT AND LOGIN //
// ******************************************************//

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


// ******************************************************//
// RENDER METHOD ***ANYTHING HERE SHOWS ON THE SCREEN*** //
// ******************************************************//
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
            error = {this.state.loginError}
            isLoading = {this.state.isLoading}
            googleLoginHandler = {this.googleLoginHandler}/>

          </Background>
      </div>
    );
  }
}
// ******************************************************//
// END OF RENDER ***ANYTHING HERE SHOWS ON THE SCREEN*** //
// ******************************************************//




// ******************************************************//
// DEFINE CONNECT PARAMETERS: **THEY ARE BOTH FUNCTIONS**//
// ******************************************************//
export const mapStateToProps = (state, ownProps) => {
    let initialUserData = { username:'' , password:'' }
  return {
    initialUserData: initialUserData,
    isAuthenticated: state.userAccess.isAuthenticated,
    googleAuth: state.userAccess

  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (loginData) => dispatch(userLogin(loginData)),
    googleAccess: (userData) => dispatch(newGoogleAccess(userData))
  }
}
// ******************************************************//
// **************END OF CONNECT PARAMETERS***************//
// ******************************************************//


// Export the connected component
export default connect(mapStateToProps, mapDispatchToProps)(Login);
