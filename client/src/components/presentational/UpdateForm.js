import React from 'react';
import Loader from '../presentational/Loader';


/**
 * @description UpdateForm renders profile update form
 *
 * @param {object} props
 * @param { function } handleProfileUpdate,
 * @param {object} userData,
 * @param {function} handleUserInput,
 * @param {string} errorMessage,
 * @param {boolean} errorStatus,
 * @param {boolean} loader,
 * @param {boolean} successStatus,
 * @param {boolean} successMessage,
 * @param {boolean} disable,
 * @param {function} cancelEdit
 * @returns {JSX}  JSX representation of commponent
 */
const UpdateForm = ({
  handleProfileUpdate,
  userData,
  handleUserInput,
  errorMessage,
  errorStatus,
  loader,
  successStatus,
  successMessage,
  disable,
  cancelEdit
}) => {
  return(
    <form onSubmit={handleProfileUpdate}>
          <div className="row">
            <div className="input-field col s6">
              <input 
                type="text" 
                required
                minLength="2"
                id="firstName" 
                name="firstName"
                className="validate"
                value= {userData.firstName}
                onChange= {handleUserInput}
              />
              <label data-error="Invalid input">First name
                <span>*</span>
              </label>
            </div>

            {/* Last name input  */}
            <div className="input-field col s6">
              <label>Last name
                <span>*</span>
              </label>
              <input 
                type="text" 
                id="lastName" 
                required
                minLength="2"
                name="lastName" 
                value= {userData.lastName} 
                onChange= {handleUserInput}
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
                  value = {userData.username}
                  onChange= {handleUserInput}
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
                errorStatus 
                ?
                  <h6 className="red-text center">
                    {errorMessage}
                  </h6>
                : 
                null
              }

              { 
                loader 
                ?
                  <Loader/>
                : 
                null
              }

              { 
                successStatus 
                ?
                  <h6 className="green-text center">
                  {successMessage}
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
              className="btn waves-ripple waves-effect custom" 
              disabled={disable}
              id="saveBtn"
              value="Save"/>
          </div> 
        </div>
        </form>
  );
}; 

export default UpdateForm;
