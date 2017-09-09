import React from 'react';
import Background from '../Background/Background';
import Navbar from '../navbar/Navbar';
import { Link } from 'react-router-dom';

/**
 * @class Home
 * @classdesc Returns the Home component
 */
export default class Home extends React.Component {
  render() {
    return(
    <div>
        <div className="container">
            <div className="intro">
              {/*  This holds the intro message and the title  */}
              <h1>Hellobooks Library</h1>
              <p>Hello books allows you to borrow books that have been gathered from 
              different part of the  world. Finding books of your choice 
            just got easier with us</p>
              <Link className=" button btn waves-effect waves-ripple" to ="/about">Get to know more</Link>
              <Link className="button btn waves-effect waves-ripple" to ="/register">Signup</Link>
          </div>
          <div className="arrow-down center">
            <a href="#">
              <i className="fa fa-arrow-circle-down fa-4x arrow"></i>
            </a>
          </div>
        </div>
    </div>
    );
  }
}