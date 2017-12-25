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
              <div className ="row">
                <div className= "col s12 m12 l6">
                  <Link className="btn waves-effect waves-ripple" to ="/about">Get to know more</Link>  
                </div>
                <div className= "col s12 m12 l6">
                  <Link className="btn waves-effect waves-ripple" to ="/register">Signup</Link>
                </div>
              </div>
          </div>
        </div>
    </div>
    );
  }
}