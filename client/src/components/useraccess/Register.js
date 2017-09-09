import React from 'react';
import Navbar from '../navbar/Navbar';
import RegistrationForm from './Forms/RegistrationForm';
import Background from '../Background/Background';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as RegisterActions from '../../Actions/RegisterAction';
/**
 * @class Register
 * @classdesc returns the component for user signup
 */
class Register extends React.Component {
  
  render() {
    const { userRegistration } = this.props;
    return(
      <div>
        {/* This div holds the navbar component  */}
        <Background>
          <Navbar/>
          <RegistrationForm userRegistration = { userRegistration }/>
        </Background>
        </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    registerUser: state.registerUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userRegistration: userRegObject => dispatch(RegisterActions.userRegistration(userRegObject))
    // actions: bindActionCreators(RegisterActions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);