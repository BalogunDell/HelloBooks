import React from 'react';
import { Link, NavLink } from 'react-router-dom';

/**
 * @class Navbar
 * @classdesc returns a navbar component 
 */
export default class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <div className="container nav-wrapper">
          <a href="#!" className="brand-logo">
            <img src={'https://res.cloudinary.com/djvjxp2am/image/upload/v1509980754/hb-logo_fyj92s.png'} alt="HelloBooks logo"/></a>
         <a id="sideBarTrigger" data-activates="side_menu" className="button-collapse"><i className="material-icons">menu</i></a>
         <ul className="right hide-on-med-and-down">
          <li>
             <NavLink activeClassName="active" exact to="/">Home</NavLink> 
          </li>

           <li>
              <NavLink activeClassName="active" to="/login">Login</NavLink> 
           </li>
           <li>
              <NavLink activeClassName="active" to="/register">Create Account</NavLink> 
           </li>
         </ul>

         <ul className="side-nav" id="side_menu">
           <li>
             <NavLink activeClassName="active" to="/">Home</NavLink> 
          </li>

          <li>
             <NavLink activeClassName="active" to="/about">About</NavLink> 
          </li>

           <li>
              <NavLink activeClassName="active" to="/books">Books</NavLink> 
           </li>
           <li>
              <NavLink activeClassName="active" to="/login">Login</NavLink> 
           </li>
           <li>
              <NavLink activeClassName="active" to="/register">Create Account</NavLink> 
           </li>
         </ul>
        </div>
      </nav>
    );
  }
}
