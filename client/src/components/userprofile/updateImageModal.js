import React from 'react';
import LoaderText from './adminSubComponents/loader';

const updateImageModal = ({imageUploadHandler, handleImageEdit, loader}) => {
  return (
  <div>
    <div className="modal" id="confirmationModal">
      <div className="container">
        <div className="modal-content">
          <div className="row">
            <div className="col s12 m12 l7 offset-l3">
              <div className="row">
                <h5 className="center">Upload new image</h5>
                <p>Select an image to upload</p>
              </div>
              <form onSubmit={imageUploadHandler} id="imageEdit">
                <div className="file-field input-field">
                  <div className="btn" id="imageSelector">
                    <span><i className="material-icons">add_a_photo</i></span>
                    <input type="file" 
                    name="image"
                    id="bookImage" 
                    accept=".jpg" 
                    onChange={imageUploadHandler}/>
                    
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path" type="text" placeholder="Upload book image"/>           
                  </div>
                </div>

                <div className="row">
                  <div className="col s12 m12 l7 offset-l3">
                    {loader ? <LoaderText/> : '' }
                    {/* {deleteErrorStatus ? errorMessage: null}
                    {successMessage} */}
                  </div>
                </div>

                <div className="row center">
                  <div className="col s12 m12 l6">
                    <input type="submit" className="btn green" value="Update"/>
                  </div>

                  <div className="col s12 m12 l6">
                    <button className="btn red modal-close">Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div> 
      </div>
    </div>
  </div>
);
}

export default updateImageModal;