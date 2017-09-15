import React from 'react';
import toastr from 'toastr';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import Navbar from '../navbar/Navbar';
import LoginForm from './Forms/LoginForm';
import Background from '../Background/Background';
import PasswordResetModal from './Forms/PasswordResetModal';
import * as UserAcessActions from '../../Actions/userAccessAction'; 

/**
 * @class Register
 * @classdesc returns the component for user signin
 */
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state =  {
      userData: Object.assign({}, this.props.initialUserData),
      loginError: '',
      isAuthenticated: false,
      isLoading: false,

    }

    this.handleLoginInput = this.handleLoginInput.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }



// ******************************************************//
// DEFINE METHODS OF THE CLASS TO HANDLE INPUT AND LOGIN //
// ******************************************************//


  // Handle userinput 
  handleLoginInput(event) {
    // Get the name of each input field
    const field = event.target.name;

    // copy userData a new object and assign to tempUserDataCont
    let tempUserDataCont = Object.assign({}, this.state.userData)

    // set the value typed in to the value of the corresponding key
    tempUserDataCont[field] = event.target.value;

    // return the new userData for comsumption
    return this.setState({userData: tempUserDataCont})

  }


  // Handle login
  loginHandler(event) {
    event.preventDefault();
    this.setState({isLoading: true})
    this.props.userLogin(this.state.userData).then(() => {
    this.setState({isLoading: false, isAuthenticated: true})
    })
    .catch(error => {
      this.setState({isLoading:false, loginError: error.response.data.message})
    })
  }
  
  // ******************************************************//
// DEFINE METHODS OF THE CLASS TO HANDLE INPUT AND LOGIN //
// ******************************************************//



// ******************************************************//
// RENDER METHOD ***ANYTHING HERE SHOWS ON THE SCREEN*** //
// ******************************************************//
  render() {
    return(
      this.state.isAuthenticated ? <Redirect to ="/user"/> : 
      <div>
        {/* This div holds the navbar component  */}
          <Background>
          <Navbar/>
          <LoginForm 
            userData = {this.state.userData}
            handleLoginInput = {this.handleLoginInput}
            loginHandler = {this.loginHandler}
            error = {this.state.loginError}
            isLoading = {this.state.isLoading}/>
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
function mapStateToProps(state, ownProps){
    let initialUserData = { email:'' , password:'' }
  return {
    initialUserData: initialUserData

  }
}


function mapDispatchToProps(dispatch) {
  return {
    userLogin: (loginData) => dispatch(UserAcessActions.userLogin(loginData))
  }
}
// ******************************************************//
// **************END OF CONNECT PARAMETERS***************//
// ******************************************************//


// Export the connected component
export default connect(mapStateToProps, mapDispatchToProps)(Login);
