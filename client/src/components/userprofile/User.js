import React from 'react';
import { axios } from 'axios';
import Details from './Details';
import UserNav from './Usernav';
import { Redirect, Link } from 'react-router-dom';

import Allbooks from '../Allbooks/Allbooks';
import UserDashboard from './Dashboard';

class User extends React.Component {
  constructor(prop) {
    super(prop);

    this.state = {
      isLoggedIn:false,
      redirect:false
    }

  }

   Authenticate() {
    const token = localStorage.getItem('token');
    if(token === null) {
      this.setState({redirect: true});
    }
  }

  componentDidMount() {
    this.Authenticate();
  }

  render() {
    if(this.state.redirect) {
      <Redirect to="/login"/>
    }
    else {

    }
    return (
      <div className="container">
        {this.element}
        <div className="row">
          <div className="col s12 m1">
            <UserNav/>
          </div>
          
          <div className="col s12 m11 l12 offset-l1 center">
            <div className="content-display">
              <UserDashboard/>
              {/* <Allbooks/> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;