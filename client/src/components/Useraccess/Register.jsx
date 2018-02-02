import React, {PropTypes} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../presentational/Navbar/Navbar';
import RegistrationForm from './Forms/RegistrationForm';
import Background from '../presentational/Background/Background';
import { saveNewUser } from '../../Actions/userAccessAction';



/**
 * renders Register Component
 * 
 * @class Register
 * 
 * @extends {Component}
 */
export class Register extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userData: {...this.props.initialUserData},
      redirect: false,
      errorMessage: '',
      loading: false
    }

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  /**
   * User input hander - handleUserInput 
   * 
   * @param {object} event 
   * 
   * @returns {object} updated state
   */
  handleUserInput(event) {
    
      const name = event.target.name; 
      let suppliedData = Object.assign({}, this.state.userData);
      suppliedData[name] = event.target.value
      return this.setState({userData: suppliedData})
    }

  /**
   * User input hander - handleUserInput 
   * 
   * @param {object} event 
   * 
   * @returns {object} updated state
   */
  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      loading: true,
      errorMessage: '' 
    });
    this.props.saveNewUser(this.state.userData)
      .then(() => {
          this.setState({
            redirect:this.props.authStatus,
            loading: false
          });
      })
      .catch(errors =>{
        this.setState({
          errorMessage: errors.response.data.error,
          loading: false
      });
    });
  }
  
  /**
   * React render method - render 
   * 
   * @returns {JSX} JSX representation of DOM
   */
  render() {
    return( 
      this.state.redirect ? <Redirect to="/user/books"/> : 
      <div>
        <Background>
          <Navbar/>
          <RegistrationForm 
            userData = { this.state.userData }
            errorMessage = {this.state.errorMessage}
            handleUserInput =  {this.handleUserInput}
            handleSubmit = {this.handleSubmit}
            loading = { this.state.loading}
          />
        </Background>
        </div>
    );
  }
}


/**
 * Redux Connect parameter
 * 
 * @param {object} state
 * 
 * @returns {object} mapped state of redux store
 */
export const mapStateToProps = (state) => {
  let initialUserData = { 
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  return {
    initialUserData: initialUserData,
    authStatus: state.userAccess.isAuthenticated,
    userType: state.userAccess.userData
  }
}


/**
 * Redux Connect parameter
 * 
 * @param {Function} dispatch
 * 
 * @returns {object} dispatched actions
 */
export const mapDispatchToProps = (dispatch) => {
  return {
    saveNewUser: (userRegObject) => dispatch(saveNewUser(userRegObject))
  }
}


Register.propTypes = {
  saveNewUser: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(Register);