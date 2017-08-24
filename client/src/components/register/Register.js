import React from 'react';
import Navbar from '../navbar/Navbar';
import Books from '../books/Books';

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
          <div className="row form-holder">
              <div className="col s12 m6 offset-m3 center black">
              Registration point
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
