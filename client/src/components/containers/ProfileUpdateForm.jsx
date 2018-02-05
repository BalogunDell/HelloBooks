import React from 'react';
import { connect } from 'react-redux';

import { editProfile } from '../../actions/userProfileAction';
import UpdateForm from '../presentational/UpdateForm';


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
      restricted: false
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
    this.setState({
      loader: true
    });
    event.preventDefault();
    this.props.editProfile(this.state.userData)
    .then(() => {
      this.setState({
        loader: false
      });
        Materialize.toast(
          'Profile has been updated',
          3000,
          'blue rounded');
        setTimeout(() => {
        }, 1000);
        
        this.props.cancelEdit();
    })
    .catch((error) => {
      if(!error.logout) {
      return this.setState({
        errorStatus: true,
        disable: false,
        loader: false});
      }
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
        <UpdateForm
          handleProfileUpdate={this.handleProfileUpdate} 
          userData={this.state.userData}
          handleUserInput={this.handleUserInput}
          errorMessage={this.state.errorMessage}
          errorStatus={this.state.errorStatus}
          loader={this.state.loader}
          successStatus={this.state.successStatus}
          successMessage={this.state.successMessage}
          disable={this.state.disable}
          cancelEdit={cancelEdit}
        />
      }
      </div>
    );
  }
}


export const stateToProps = (state, ownProps) => {
  return {
    newUserDetails: state.userProfile.data,
  }
}

export const dispatchToProps = (dispatch) => {
  return {
    editProfile: (newData) => dispatch(editProfile(newData))
  }
} 

export default connect(
  stateToProps,
  dispatchToProps)
  (ProfileUpdateForm);