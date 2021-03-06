import React from 'react';
import Background from '../../presentational/Background/Background';
import Navbar from '../../presentational/Navbar/Navbar';
import { Link } from 'react-router-dom';

/**
 * Home Component
 * 
 * @description Renders the Home component
 * 
 * @returns {JSX} JSX representation of DOM
 */
const Home = () => {
  return(
  <div>
    <div className="container">
      <div className="intro">
        <h1>Hellobooks Library</h1>
        <p>Hello books allows you to borrow books
          that have been gathered from different part of the  world. Finding
          books of your choice just got easier with us.
        </p>
        <div className ="row">
          <div className= "col s12 m12 l6">

            <Link 
              className="btn waves-effect waves-ripple about" 
              name="about" 
              to ="/about">Get to know more
            </Link>  
          </div>

          <div className= "col s12 m12 l6">
            <Link 
              className="btn waves-effect waves-ripple signup" 
              name="signup" 
              to ="/register">Signup
            </Link>

          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Home;