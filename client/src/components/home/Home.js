import React from 'react';
import Navbar from '../navbar/Navbar';
import Books from '../books/Books';

/**
 * @class Home
 * @classdesc Returns the Home component
 */
export default class Home extends React.Component {
  render() {
    return(
    <div>
      <div className="home-bg">
        <Navbar/>
        <div className="container">
            <div className="intro">
              {/*  This holds the intro message and the title  */}
              <h1>Hellobooks Library</h1>
              <p>Hello books allows you to borrow books that have been gathered from 
              different part of the  world. Finding books of your choice 
            just got easier with us</p>
              <button className="btn waves-effect waves-ripple">Get to know more</button>
              <button className="btn waves-effect waves-ripple" >Signup</button>
          </div>
          <div className="arrow-down center">
            <a href="#">
              <i className="fa fa-arrow-circle-down fa-4x arrow"></i>
            </a>
          </div>
        </div>
      </div>
      {/* Include the book component  */}
        <Books/>
    </div>
    );
  }
}