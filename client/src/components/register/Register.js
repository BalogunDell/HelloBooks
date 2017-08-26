import React from 'react';
import Navbar from '../navbar/Navbar';
import Books from '../books/Books';
import RegistrationForm from './Forms/RegistrationForm';
import LoginForm from './Forms/LoginForm';

/**
 * @class Register
 * @classdesc returns the component for user signup and signin
 */
class Register extends React.Component {
  render() {
    return(
      <div>
        {/* This div holds the navbar component  */}
        <div className="home-bg">
          <Navbar/>
            <RegistrationForm/> 
        </div>
      </div>
    );
  }
}

export default Register;
