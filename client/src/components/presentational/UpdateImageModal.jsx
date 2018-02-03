import React from 'react';
import PropTypes from 'prop-types';
import LoaderText from '../presentational/Loader';


/**
 *  ProfileInfo -  Renders profile information
 *
 * @param {function} imageUploadHandler
 * @param {function} handleImageEdit
 * @param {function} cancelEdit
 * @param {boolean} loader
 * @param {string} newImageUploadError
 * @param {boolean} newImageUploadSuccess
 * @param {string} newImageUploadErrorMessage
 * @param {string} newImageUploadSuccessMessage
 * @param {function} disableUpdateBtn
 * @param {string} preview
 *
 * @returns {object} action creators
 */
const UpdateImageModal = ({
    imageUploadHandler, 
    handleImageEdit, 
    cancelEdit, 
    loader, 
    newImageUploadError, 
    newImageUploadSuccess, 
    newImageUploadErrorMessage, 
    newImageUploadSuccessMessage, 
    disableUpdateBtn,
    preview }) => {
  return (
  <div>
    <div className="modal" id="confirmationModal">
      <div className="container">
        <div className="modal-content">
          <div className="row">
            <div className="col s12 m12 l7">
              <div className="row">
                <h5 className="center">Upload new image</h5>
              </div>
              <form onSubmit={handleImageEdit} id="imageEdit">
                <div className="file-field input-field">
                  <div className="col l4">
                    <div
                      className="btn"
                      id="imageSelector">
                      <span>
                        <i className="material-icons">add_a_photo</i>
                      </span>
                      <input
                        type="file"
                        name="image"
                        id="bookImage"
                        accept=".jpg" 
                        onChange={imageUploadHandler}
                      />
                    </div>
                  </div>

                  <div className="file-path-wrapper">
                    <input 
                      className="file-path validate"
                      type="text"
                      placeholder="Upload new profile image"/>           
                  </div>
                </div>

                <div className="row">
                  <div className="col s12 m12 l7 offset-l3">
                    <h6> { loader ? <LoaderText/> : '' }</h6>
                    <h6 className="red-text"> 
                    { newImageUploadError 
                      ? 
                      newImageUploadErrorMessage 
                      : 
                      null 
                      } 
                    </h6>
                    <h6 className="green-text"> 
                    { newImageUploadSuccess
                      ?
                      newImageUploadSuccessMessage
                      :
                      null }
                      </h6>
                  </div>
                </div>

                <div className="row center">
                <div className="col s12 m12 l6">
                  <input className="btn green" 
                    onClick={handleImageEdit}
                    readOnly disabled={disableUpdateBtn}
                    value="Update"/>
                </div>

                <div className="col s12 m12 l6">
                  <input className="btn red modal-close"
                    onClick={cancelEdit}
                    readOnly
                    value="Cancel"/>
                </div>
              </div>
              </form>
            </div>

            <div className="col s12 m12 l5">
              <h6 className="center">Image preview</h6>
              <div className="selectedImagePreview">
                <img src={preview} className="img-circle" alt=""/>
              </div>
            </div>

          </div>
        </div> 
      </div>
    </div>
  </div>
);
}

UpdateImageModal.propTypes = {
  imageUploadHandler: PropTypes.func,
  handleImageEdit: PropTypes.func,
  cancelEdit: PropTypes.func,
  loader: PropTypes.bool,
  newImageUploadError: PropTypes.bool,
  newImageUploadSuccess: PropTypes.bool,
  newImageUploadErrorMessage: PropTypes.string,
  newImageUploadSuccessMessage: PropTypes.string,
  disableUpdateBtn: PropTypes.bool
}

export default UpdateImageModal;