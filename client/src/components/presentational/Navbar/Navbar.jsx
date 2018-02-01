import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 
 * Renders the Navbar component
 * 
 * @returns {JSX} JSX representation of DOM
 */
const Navbar = () => {
  return (
    <nav>
      <div className="container nav-wrapper">
        <Link to="/" className="brand-logo">
          <img 
            src={'https://res.cloudinary.com/djvjxp2am/image/upload/v1509980754/hb-logo_fyj92s.png'}
            alt="HelloBooks logo"
          />
        </Link>
        <a 
          id="sideBarTrigger"
          data-activates="side_menu"
          className="button-collapse">
          <i className="material-icons">menu
          </i>
        </a>
        <ul className="right hide-on-med-and-down">
        <li>
            <Link
              to="/">Home
            </Link> 
        </li>

        <li>
            <Link
              to="/about">About
            </Link> 
          </li>

          <li>
            <Link
              to="/login">Login
            </Link> 
          </li>
          <li>
            <Link 
              to="/register">Create Account
            </Link> 
          </li>
        </ul>

        <ul className="side-nav" id="side_menu">
          <li>
            <Link 
              to="/">Home
            </Link> 
        </li>

          <li>
              <Link 
                to="/about">About
                </Link> 
          </li>

          <li>
            <Link
              to="/login">Login
            </Link> 
          </li>

          <li>
            <Link 
              to="/register">Create Account
            </Link> 
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;