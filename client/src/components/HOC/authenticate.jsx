import React from 'react';
import jwt from 'jsonwebtoken';
import { Redirect } from 'react-router-dom';

require('dotenv').config();

const authenticate = (BasicComponent) => {
/**
 * 
 * @class authenticate
 * @extends {React.Component}
 */
  return class Authenticate extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        redirect: false
      }
    }
/**
 * 
 * @returns { object } object
 * @memberof Authenticate
 */
    componentWillMount() {
      // console.log(localStorage.getItem('Access-Token'));
      jwt.verify(localStorage.getItem('Access-Token'), process.env.SECRET, (err, decoded) => {
        if(err) {
          localStorage.clear();
          Materialize.toast(`You token is either invalid or has expired`, 4000, 'blue rounded');
          return this.setState({ redirect: true });
        }
        return decoded;
      });
    }

    render() {
      return (
        <div>
          {
            this.state.redirect
          ?
            <Redirect to ="/login"/>
          :
            <BasicComponent {...this.props}/>
           }
          
        </div>
      );
    }
  }
};

export default authenticate;

