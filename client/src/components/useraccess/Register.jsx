import React, {PropTypes} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../navbar/Navbar';
import RegistrationForm from './Forms/RegistrationForm';
import Background from '../Background/Background';
import * as UserAcessActions from '../../Actions/userAccessAction';



/**
 * @class Register
 * @classdesc returns the component for user signup
 */
class Register extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userData: Object.assign({}, this.props.initialUserData),
      redirect: false,
      error: '',
      loading: false
    }

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //  Handle user input
  handleUserInput(event) {
    // get name of the target element
      const name = event.target.name; 

    // copy key in userData and assign to supllied data
      let suppliedData = Object.assign({}, this.state.userData);

    // set each key of the supllied value
      suppliedData[name] = event.target.value
    
    // update userData state to the supllied data 
      return this.setState({userData: suppliedData})
    }


    // Handle Registration Button

    handleSubmit(event) {
      event.preventDefault()
      this.setState({ loading: true, error: '' })
      this.props.saveNewUser(this.state.userData).then(() =>{
          this.setState({redirect:this.props.authStatus, loading: false})
      }).catch(errors =>{
        this.setState({error: errors.response.data.message, loading: false})
      })
    }
  

  render() {
    return( 
      this.state.redirect ? <Redirect to="/user"/> : 
      <div>
        {/* This div holds the navbar component  */}
        <Background>
          <Navbar/>
          <RegistrationForm 
            userData = { this.state.userData }
            error = {this.state.error}
            handleUserInput =  {this.handleUserInput}
            handleSubmit = {this.handleSubmit}
            loading = { this.state.loading}
          />
        </Background>
        </div>
    );
  }
}


//  Define the mapStateToProps function for connect
function mapStateToProps(state, ownProps) {
  let initialUserData = { username: '', firstname: '', lastname: '', email: '', password: '', confirmPassword: ''}
  return {
    initialUserData: initialUserData,
    authStatus: state.userAccess.isAuthenticated,
    userType: state.userAccess.userData
  }
}


//  Define the mapDispatchToProps function for connect
function mapDispatchToProps(dispatch) {
  return {
    saveNewUser: userRegObject => dispatch(UserAcessActions.saveNewUser(userRegObject))
  }
}


Register.propTypes = {
  saveNewUser: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(Register);