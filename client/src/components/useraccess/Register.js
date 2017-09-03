import React from 'react';
import Navbar from '../navbar/Navbar';
import RegistrationForm from './Forms/RegistrationForm';
import Background from '../Background/Background';
import { connect } from 'react-redux';
import { UserRegReq } from '../../Actions/Register';
/**
 * @class Register
 * @classdesc returns the component for user signup
 */
class Register extends React.Component {
  render() {
    const { UserRegReq } = this.props;
    return(
      <div>
        {/* This div holds the navbar component  */}
        <Background>
          <Navbar/>
          <RegistrationForm UserRegReq = {UserRegReq}/>
        </Background>
        </div>
    );
  }
}

Register.propTypes = {
  UserRegReq: React.PropTypes.func.isRequired
}
export default connect(null, {UserRegReq})(Register);
