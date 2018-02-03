import React from 'react';
import { connect } from 'react-redux';

import { editProfile } from '../../Actions/userProfileAction';
import Loader from '../presentational/Loader';


/**
 * 
 * @class profileUpdateForm
 * 
 * @description profileUpdateForm for user profile update
 * 
 * @extends {React.Component}
 * 
 * @classdesc Creates form for profile edit
 */
export class ProfileUpdateForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userData: {},
      errorMessage: '',
      errorStatus: false,
      loader: false,
      successStatus: false,
      successMessage: '',
      disable: false,
    }

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
  }

  /**
   * @member handleUserInput
   * 
   * @description handleUserInput Handler
   * 
   * @param {object} event
   * 
   * @returns {object} updated state
   * 
   * @memberof ProfileUpdateForm
   */
  handleUserInput(event) {
    let tempFileHolder = { ...this.state.userData};
    let name = event.target.name;
    tempFileHolder[name] = event.target.value;
    this.setState({userData: tempFileHolder});
  }


  /**
   * @member handleProfileUpdate
   * 
   * @description handleProfileUpdate Handler
   * 
   * @param {object} event
   * 
   * @returns {object} updated state
   * 
   * @memberof ProfileUpdateForm
   */
  handleProfileUpdate(event) {
    event.preventDefault();
    this.setState({loader: true});
    this.props.updateProfile(this.state.userData)
    .then(() => {
        Materialize.toast('Profile has been updated', 3000, 'blue rounded');
        setTimeout(() => {
        }, 1000);
        
    })
    .catch(error => {
      this.setState({
        errorStatus: true,
        disable: false,
        loader: false});
    });
  }

  /**
   * @description React lifecycle method - componentWillMount
   * 
   * @memberof ProfileUpdateForm
   * 
   * @returns {object} updated state
   */
  componentWillMount() {
    const userData = JSON.parse(localStorage.getItem('info'));
    this.setState({userData: { ...userData } });
  }

  /**
   * @description React lifecycle method - componentWillMount
   * 
   * @memberof ProfileUpdateForm
   * 
   * @returns {object} updated state
   */
  componentDidMount() {
    $(document).ready(() => {
      Materialize.updateTextFields();
    });
  }

  /**
   * @description React render method - render
   * 
   * @memberof ProfileUpdateForm
   * 
   * @returns {JSX} JSX representation of DOM
  */
  render() {
    const {cancelEdit} = this.props;
    return(
      <div className="change-password">
      { this.state.loadingData 
        ?
        <h3>Loading profile data...</h3>
        :
        <form onSubmit={this.handleProfileUpdate}>
          <div className="row">
            <div className="input-field col s6">
              <input 
                type="text" 
                required
                minLength="2"
                id="firstName" 
                name="firstName"
                className="validate"
                value= {this.state.userData.firstName}
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
                id="lastName" 
                required
                minLength="2"
                name="lastName" 
                value= {this.state.userData.lastName} 
                onChange= {this.handleUserInput}
              />
            </div>
          </div>

          {/* Email input  */}
          <div className="row">
              <div className="input-field col s12">
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  className="validate" 
                  required
                  value = {this.state.userData.username}
                  onChange= {this.handleUserInput}
                />
                <label 
                  htmlFor="username" 
                  data-error="Invalid email" 
                  data-success="">Username
                    <span>*</span>
                </label>
              </div>  
            </div>
            <div className="row">
              { 
                this.state.errorStatus 
                ?
                  <h6 className="red-text center">
                    {this.state.errorMessage}
                  </h6>
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

              { 
                this.state.successStatus 
                ?
                  <h6 className="green-text center">
                  {this.state.successMessage}
                  </h6>
                : 
                null
              }
            </div>

            {/* Email input  */}
         <div className="row">  
          <div className="input-field col s12 m12 l6">
            <input type="button" 
              className="btn waves-ripple waves-effect red" 
              onClick={cancelEdit}
              id= "cancelEdit"
              value="Cancel"/>
          </div> 
          <div className="input-field col s12 m12 l6">
            <input type="submit"
              className="btn waves-ripple waves-effect" 
              disabled={this.state.disable}
              id="saveBtn"
              value="Save"/>
          </div> 
        </div>
        </form>
      }
      </div>  
    );
  }
}


export const stateToProps = (state, ownProps) => {
  return {
    newUserDetails: state.userProfile.data
  }
}

export const dispatchToProps = (dispatch) => {
  return {
    updateProfile: (newData) => dispatch(editProfile(newData))
  }
} 

export default connect(stateToProps, dispatchToProps)(ProfileUpdateForm);