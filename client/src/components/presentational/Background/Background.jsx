import React from 'react';
import { Redirect } from 'react-router-dom';

/**
 * @class Home
 * 
 * @classdesc Returns the Home component
 * 
 * @returns {JSX} JSX representation of DOM
 */
class Background extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false
    }
  }

/**
 * @description React lifecycle hook - componentWillMount
 * 
 * @returns {object} updated state
 */
  componentWillMount() {
    const currentLocation = window.location.pathname;
    const token = localStorage.getItem('Token');
    if(token != null
    &&
    currentLocation.match('/resetpassword/uniqueUrl')) {
      localStorage.clear();
      return this.setState({ redirect: false });
    }
    return this.setState({ redirect: false })
  }

/**
 * @description React lifecycle hook - componentDidMount
 * 
 * @returns {void}
 */
  componentDidMount() {
    $(document).ready(() => {
      $(".button-collapse").sideNav();
    });
  }

 /**
 * @description xReact render method - render
 * 
 * @returns {JSX} JSX representation of DOM
 */ 
  render() {
    return (
    <div>
      { this.state.redirect 
      ?
        <Redirect to= "/user/books"/>
      :
        <div className="home-bg">
          {this.props.children}
        </div>
        }
    </div>
    );
  }
}

export default Background;