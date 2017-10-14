import React from 'react';
import { connect } from 'react-redux';

import * as userActions from '../../Actions/userProfileAction';
import Loader from './adminSubComponents/loader';

class profileUpdateForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      userData: {},
      errorMessage: '',
      errorStatus: false,
      loader: false,
      successStatus: false,
      successMessage: ''
    }

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
  }

  handleUserInput(event) {
    let tempFileHolder = Object.assign({}, this.state.userData);
    let name = event.target.name;
    console.log(tempFileHolder[name].value);
    tempFileHolder[name] = event.target.value;
    this.setState({userData: tempFileHolder});
  }

  handleProfileUpdate(event) {
    event.preventDefault();
    
    // Set loader to true
    this.setState({loader: true});
    console.log(this.state.userData)
    // Save edit update
    this.props.updateProfile(this.state.userData)
    .then(() => {
      this.setState({
        loader: false, 
        errorStatus: false, 
        errorMessage: '',
        successStatus: true,
        successMessage: 'Profile has been updated'});
    })
    .catch(error => {
      this.setState({
        errorStatus: true, 
        errorMessage: error.response.data.message,
        loader: false});
    });
  }

  componentWillMount() {
    const userData = JSON.parse(localStorage.getItem('info'));
    this.setState({userData: Object.assign({}, userData)});
  }

  componentDidMount() {
    $(document).ready(() => {
      Materialize.updateTextFields();
    });
  }
  render() {
    const {cancelEdit} = this.props;
    return(
      <div className="change-password">
        <form onSubmit={this.handleProfileUpdate}>
          <div className="row">
            <div className="input-field col s6">
              <input 
                type="text" 
                required 
                id="firstname" 
                name="firstname"
                className="validate"
                value= {this.state.userData.firstname}
                onChange= {this.handleUserInput}
              />
              <label data-error="Invalid input">Firstname
                <span>*</span>
              </label>
            </div>

            {/* Last name input  */}
            <div className="input-field col s6">
              <label>Lastname
                <span>*</span>
              </label>
              <input 
                type="text" 
                id="lastname" 
                required
                minLength="4"
                name="lastname" 
                value= {this.state.userData.lastname} 
                onChange= {this.handleUserInput}
              />
            </div>
          </div>

          {/* Email input  */}
          <div className="row">
              <div className="input-field col s12">
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="validate" 
                  value = {this.state.userData.email}
                  onChange= {this.handleUserInput}
                />
                <label 
                  htmlFor="email" 
                  data-error="Invalid email" 
                  data-success="">Email
                    <span>*</span>
                </label>
              </div>  
            </div>


            <div className="row">
              { 
                this.state.errorStatus 
                ?
                  <h6 className="red-text center">{this.state.errorMessage}</h6>
                : 
                null
              }

              { 
                this.state.loader 
                ?
                  <Loader/>
                : 
                null
              }
            </div>

            {/* Email input  */}
         <div className="row">
          <div className="input-field col s12 m12 l6">
            <button className="btn waves-ripple waves-effect">Save</button>
          </div>  

          <div className="input-field col s12 m12 l6">
            <button className="btn waves-ripple waves-effect red" onClick={cancelEdit}>Cancel</button>
          </div>  
        </div>
        </form>
      </div>  
    );
  }
}

const stateToProps = (state, ownProps) => {
  return {
    newUserDetails: state.userProfile
  }
}

const dispatchToProps = (dispatch) => {
  return {
    updateProfile: (newData) => dispatch(userActions.editProfile(newData))
  }
} 

export default connect(stateToProps, dispatchToProps)(profileUpdateForm);