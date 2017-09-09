import React from 'react';
import Navbar from '../navbar/Navbar';
import LoginForm from './Forms/LoginForm';
import toastr from 'toastr';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import Background from '../Background/Background';
import PasswordResetModal from './Forms/PasswordResetModal';
import * as LoginActions from '../../Actions/LoginAction'; 

/**
 * @class Register
 * @classdesc returns the component for user signin
 */
class Login extends React.Component {
  render() {

    const { userLogin } = this.props
    return(
      <div>
        {/* This div holds the navbar component  */}
          <Background>
          <Navbar/>
          <LoginForm userLogin = {userLogin}/>
          </Background>
      </div>
    );
  }
}

Login.propTypes = {
  userLogin: React.PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    loginUser: state.loginUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userLogin: userLoginDetails => dispatch(LoginActions.userLogin(userLoginDetails))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
