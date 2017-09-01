import React from 'react';
import Navbar from '../navbar/Navbar';
import RegistrationForm from './Forms/RegistrationForm';
import Background from '../Background/Background';

/**
 * @class Register
 * @classdesc returns the component for user signup
 */
class Register extends React.Component {
  render() {
    return(
      <div>
        {/* This div holds the navbar component  */}
        <Background>
          <Navbar/>
          <RegistrationForm/>
        </Background>
        </div>
    );
  }
}

export default Register;
