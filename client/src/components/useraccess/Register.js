import React from 'react';
import Navbar from '../navbar/Navbar';
import RegistrationForm from './Forms/RegistrationForm';


/**
 * @class Register
 * @classdesc returns the component for user signup
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
