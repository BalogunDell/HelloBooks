import React from 'react';
import logo from '../../assets/images/hb-logo.png';

/**
 * @class Navbar
 * @classdesc returns a navbar component 
 */
export default class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <div className="container nav-wrapper">
          <a href="#!" className="brand-logo"><img src={logo} alt="HelloBooks logo"/></a>
         <a href="#" data-activates="side_menu" className="button-collapse"><i className="fa  fa-bars"></i></a>
         <ul className="right hide-on-med-and-down">
           <li><a href="#">Home</a></li>
           <li><a href="#">About</a></li>
           <li><a href="#">Books</a></li>
           <li><a href="#">Login</a></li>
           <li><a href="#">Create Account</a></li>
         </ul>

         <ul className="side-nav" id="side_menu">
           <li><a href="#">Home</a></li>
           <li><a href="#">About</a></li>
           <li><a href="#">Books</a></li>
           <li><a href="#">Login</a></li>
           <li><a href="#">Create Account</a></li>
         </ul>
        </div>
      </nav>
    );
  }
}
