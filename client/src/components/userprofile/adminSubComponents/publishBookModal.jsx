import React from 'react';
import LoaderText from './loader';

const publishBookModal = ({loader, publishBookHander, cancelPublish, errorStatus, errorMessage, successStatus, successMessage, modalHeader}) => {
 return (
  <div>
    <div className="modal" id="confirmationModal">
      <div className="container">
        <div className="modal-content">
          <div className="row">
            <div className="col s12 m12 l7 offset-l3">
              <h6 className="green-text">{modalHeader}</h6>
            </div>
          </div>
          
          <div className="row">
            <div className="col s12 m12 l7 offset-l3">
              {loader ? <LoaderText/> : null }
              
              
            </div>
          </div>

          <div className="row center">
            <div className="col s12 m12 l6">
              <button className="btn green" onClick={publishBookHander}>Publish</button>
            </div>

            <div className="col s12 m12 l6">
              <button className="btn red modal-close" onClick={cancelPublish}>Cancel</button>
            </div>
          </div>
        </div> 
      </div>
    </div>
  </div>
);
}

export default publishBookModal;