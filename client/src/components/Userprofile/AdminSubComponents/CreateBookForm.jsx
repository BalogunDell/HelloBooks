import React from 'react';
import { Link } from 'react-router-dom';
import LoaderText from './Loader';

import CreateCategoryModal from './CreateCategoryModal';

const CreateBookForm = ({
  disableBtn,
  showHiddenBtns,
  loader, 
  errorMessage,
  successStatus,
  errorStatus,
  successMessage,
  createBookHandler, 
  handleInput,
  initialData,
  createCategory,
  loadedCategories, 
  imageUploadHandler,
  fileUploadHandler }) => {
  
  return (
  
    <div className="createBookForm">
      <div>
        <h4 className="center">CREATE BOOK</h4>
      </div>

      <div className="create-book">
        <form 
          onSubmit={createBookHandler} 
          id="handleSubmit" 
          className="create-form" 
          encType="multipart/form-data">
          
          <div className="input-field">
            <input type="number" name="isbn"
              maxLength="6"
              minLength="6"
              value={initialData.isbn}
              onChange={handleInput}
              className="validate" required />
            <label
              htmlFor="isbn"
              data-error="isbn must be numbers"
              data-success="">ISBN<span>*</span></label>
          </div>

          <div className="row">
            <div className="input-field col s12 m12 l6">
              <input type="text" className="validate"
                name="title"
                minLength="3"
                value={initialData.title}
                onChange={handleInput} required />
              <label 
                htmlFor="title"
                data-error="Input is not valid"
                data-success="">Title<span>*</span></label>
            </div>

            <div className="input-field col s12 m12 l6">
              <input type="text" 
                className="validate"
                name="author"
                minLength="3"
                value={initialData.author}
                onChange={handleInput} required />
              <label
                htmlFor="title"
                data-error="Input is not valid"
                data-success="">Author<span>*</span></label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12 m12 l6">
              <label>Pages<span>*</span></label>
              <input 
                type="number"
                className="validate"
                name="pages"
                maxLength="5"
                value={initialData.pages}
                onChange={handleInput} required />
            </div>

            <div className="input-field col s12 m12 l6">
              <input 
                type="number"
                className="validate"
                name="year"
                maxLength= "4"
                value={initialData.year}
                onChange={handleInput} required />
              <label
                htmlFor="year"
                data-error="Year must be numbers"
                data-success="">Year <span>*</span></label>
            </div>
          </div>

          <div className="input-field">
            <textarea
              minLength="30"
              className="materialize-textarea"
              name="description"
              value={initialData.description}
              onChange={handleInput}
              data-length="500" required />
            <label>Description<span>*</span></label>
          </div>

          <div className="row">
            <div className="input-field col s12 m12 l12">
              <label>Quantity<span>*</span></label>
              <input type="number" className="validate"
                name="quantity"
                maxLength="4"
                onChange={handleInput}
                value={initialData.quantity} required />
            </div>

              <select
                name="categoryid"
                className= "browser-default"
                value={initialData.categoryid}
                onChange={handleInput}>
                <option 
                  value="...">Select a category
                </option>
                { loadedCategories.map((val, key) => {                  
                       return (<option key={val.id} 
                          value={val.id} 
                          id={`#${val.category}`}>{val.category}
                      </option>)
                    })
                }
              </select>
              <a
                id="newCategory"
                href="#addCategory"
                className="modal-trigger">Add new category</a>
            </div>

          <div className="row">
            <div className="file-field input-field uploadImage">
              <div className="btn">
                <span>
                  <i 
                    className="material-icons">add_a_photo
                  </i>
                </span>
                <input 
                  type="file"
                  name="image"
                  id="bookImage"
                  accept=".jpg"
                  onChange={imageUploadHandler}
                />
              </div>
              <div className="file-path-wrapper">
                <input
                  className="file-path validate"
                  required
                  type="text"
                  id="bookImageInput"
                  placeholder="Upload book image"/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="file-field input-field uploadImage">
              <div className="btn">
                <span>
                  <i className="material-icons">file_upload
                  </i>
                </span>
                <input
                  type="file"
                  name="pdf"
                  id="pdf"
                  accept=".pdf"
                  onChange={fileUploadHandler}
                />
              </div>
              <div className="file-path-wrapper">
                <input
                  className="file-path validate"
                  required
                  type="text"
                  id="pdfInput"
                  placeholder="Upload book file"
                />
              </div>
            </div>
          </div>
          

          <div className="row">
            <div className="input-field center">
              { loader 
                ?
                <LoaderText/>
                :
                null
                }
              { errorStatus
                ?
                <h6 className="red-text">{errorMessage}</h6>
                :
                null
                }
              { successStatus
                ?
                <h6 className="green-text">{successMessage}</h6>
                :
                null
                }

            </div>
          </div>
          
          <div className="row">
            <div className="input-field">
              { showHiddenBtns 
               ? 
                <div className="row hiddenBtns">
                  <div className="input-field col s12 m6 l12">
                    <Link
                      to="/user/books"
                      className="btn custom waves-effect waves-teal">View Book
                    </Link>
                  </div>
                </div>
                :
                <input 
                  type="submit"
                  id="createBook" 
                  className="submitBtn waves-effect waves-teal custom" 
                  disabled= {disableBtn}
                />
              }
            </div>
          </div>
        </form>
      </div>
      <CreateCategoryModal />
    </div>
  );
}

CreateBookForm.proptypes = {
errorMessage: React.PropTypes.string,
createBookHandler: React.PropTypes.func.isRequired,
handleInput: React.PropTypes.func.isRequired,
initialData: React.PropTypes.object.isRequired,
loadedCategories: React.PropTypes.array.isRequired,
imageUploadHandler: React.PropTypes.func.isRequired,
errorStatus: React.PropTypes.bool,
successStatus: React.PropTypes.bool,
successMessage: React.PropTypes.string

}

export default CreateBookForm;