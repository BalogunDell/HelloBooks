import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className="container nav-wrapper">
        <a href="#!" className="brand-logo">
          <img src={'https://res.cloudinary.com/djvjxp2am/image/upload/v1509980754/hb-logo_fyj92s.png'} alt="HelloBooks logo"/></a>
        <a id="sideBarTrigger" data-activates="side_menu" className="button-collapse"><i className="material-icons">menu</i></a>
        <ul className="right hide-on-med-and-down">
        <li>
            <Link activeClassName="active" exact to="/">Home</Link> 
        </li>

        <li>
            <Link activeClassName="active" to="/about">About</Link> 
          </li>

          <li>
            <Link activeClassName="active" to="/login">Login</Link> 
          </li>
          <li>
            <Link activeClassName="active" to="/register">Create Account</Link> 
          </li>
        </ul>

        <ul className="side-nav" id="side_menu">
          <li>
            <Link activeClassName="active" to="/">Home</Link> 
        </li>

        <li>
            <Link activeClassName="active" to="/about">About</Link> 
        </li>

          <li>
            <Link activeClassName="active" to="/books">Books</Link> 
          </li>
          <li>
            <Link activeClassName="active" to="/login">Login</Link> 
          </li>
          <li>
            <Link activeClassName="active" to="/register">Create Account</Link> 
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;