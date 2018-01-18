import React from 'react';
import LoaderText from './loader';

const confirmationModal = ({
  deleteErrorStatus,
  handleDeleteCancel,
  deleteErrorSuccess,
  disabled,
  loader,
  errorMessage,
  successMessage,
  deleteBookTrigger}) => {
  const SuccessMessage = <h6>Book has been successfully deleted</h6>
  const question = <h6>Are you sure you want to delete this book?</h6>
  deleteErrorSuccess ? successMessage : question
  return (
  <div>
    <div className="modal" id="confirmationModal">
      <div className="container">
        <div className="modal-content">
          <div className="row">
            <div className="col s12 m12 l7 offset-l3">
              {question}
            </div>
          </div>
          
          <div className="row">
            <div className="col s12 m12 l7 offset-l3">
              {loader ? <LoaderText/> : null}
              {deleteErrorStatus ? errorMessage: null}
              {successMessage}
            </div>
          </div>

          <div className="row center">
            <div className="col s12 m12 l6">
              <button className="btn green" 
                id="delete" 
                disabled={disabled} 
                onClick={deleteBookTrigger}>Delete</button>
            </div>

            <div className="col s12 m12 l6">
              <button 
                className="btn red modal-close" 
                onClick={handleDeleteCancel}>Cancel
              </button>
            </div>
          </div>
        </div> 
      </div>
    </div>
  </div>
);
}

export default confirmationModal;