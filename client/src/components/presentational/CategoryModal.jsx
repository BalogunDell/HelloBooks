import React from 'react';
import Loader from './Loader'

/**
 * @description CategoryModal component
 * 
 * @param {function} saveCategory
 * @param {string} newCategory
 * @param {function} handleInput
 * @param {boolean} loader
 * @param {string} loaderText
 * @param {boolean} newCategoryErrorStatus
 * @param {boolean} newCategoryError
 * @param {boolean} newCategorySuccessStatus
 * @param {string} newCategorySuccess
 * @param {boolean} disableSubmit
 * @param {function} closeModal
 * 
 * @returns {JSX}
*/
const CategoryModal = ({
  saveCategory,
  newCategory,
  handleInput,
  loader,
  loaderText,
  newCategoryErrorStatus,
  newCategoryError,
  newCategorySuccessStatus,
  newCategorySuccess,
  disableSubmit,
  closeModal

}) => {
  return <div>
        <div className="container">
          <div className="row">
            <h5 className="center">Add New Category</h5>
          </div>
          <div className="row">
            <div className="col s12 m12 l6 offset-l3">
              <div className="modal-content">
                <form onSubmit={saveCategory}>
                  <div className="row">
                    <div className="input-field">
                      <input 
                        type="text" name="newCategory" 
                        value={newCategory}
                        onChange={handleInput}
                        className="validate"
                        required
                        />
                      <label 
                        htmlFor="isbn"
                        data-error=""
                        data-success="">New Category<span>*</span></label>
                    </div>
                  </div>
      
                  <div className="row">
                    <div className="center">
                      
                      { loader ? 
                      <div>
                      <Loader/>
                      {loaderText}
                      </div>
                      : null }
                      
                      { newCategoryErrorStatus
                      ?
                        <div className="red-text">
                          {newCategoryError}
                        </div>
                      :
                        null
                      }

                      {newCategorySuccessStatus
                      ?
                        <div className="green-text">
                          {newCategorySuccess}
                        </div>
                      :
                      null
                      }
                      
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field center">
                      <input type="submit" 
                        className="btn waves-effect waves-teal" 
                        disabled={disableSubmit}/>
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <div className="input-field center">
                  <button
                    className="btn waves-effect waves-teal red modal-action modal-close"
                    onClick ={closeModal}>Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
}

export default CategoryModal;
