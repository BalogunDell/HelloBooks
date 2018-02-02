import React from 'react';
import { Redirect } from 'react-router-dom';
import CreateCategoryModal from '../containers/CreateCategoryModal';
import Loader from '../presentational/Loader';

/**
 * renders forgot password form
 *
 * @param {Object} props
 *
 * @returns {JSX}  JSX representation of commponent
 */
const EditBookForm = ({
  redirect,
  handleUpdate,
  book,
  handleEditInput,
  loadedCategories,
  imageUploadHandler,
  fileUploadHandler,
  error,
  errorStatus,
  loader,
  selectedCategoryId
}) => {
return (
  <div>
    {redirect ? <Redirect to ="/user/dashboard"/> : 
          <div>
            <div className="container">
              <div className="col s12 m12 l6 offset-l3">
                <div className="row">
                  <h5 className="center">Edit book</h5>
                </div>
              <form 
                className="create-form" 
                id="handleSubmit" 
                onSubmit={handleUpdate} 
                encType="multipart/form-data">
                <div className="input-field">
                  <input 
                    placeholder ={book.isbn} 
                    type="text" 
                    name="isbn" 
                    id="isbn"
                    maxLength="6"
                    value={book.isbn}
                    onChange={handleEditInput}
                    disabled
                    className="validate"
                  />
                  <label 
                    className="active"
                    htmlFor="isbn"
                    data-error="isbn must be numbers"
                    data-success="">ISBN <span>*</span>
                  </label>
                </div>

                <div className="row">
                  <div className="input-field col s12 m12 l12">
                    <input 
                      type="text"
                      placeholder={book.title} 
                      id="title" 
                      className="validate"
                      name="title"
                      minLength="3"
                      value={book.title}
                      onChange={handleEditInput}
                      required />
                    <label 
                      htmlFor="title" 
                      data-error="Input is not valid" 
                      data-success="">Title<span>*</span>
                    </label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12 m12 l12">
                    <input 
                      type="text"
                      className="validate"
                      placeholder={book.author}
                      id="author"
                      name="author"
                      minLength="3"
                      value={book.author}
                      onChange={handleEditInput}
                      required />
                    <label
                      htmlFor="author"
                      data-error="Input is not valid"
                      data-success="">Author<span>*</span>
                    </label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12 m12 l6">
                    <label htmlFor="pages">Pages<span>*</span></label>
                    <input 
                      type="number"
                      className="validate"
                      id="Pages"
                      placeholder={book.pages}
                      name="pages"
                      maxLength="4"
                      value={book.pages}
                      onChange={handleEditInput}
                      required
                    />
                  </div>

                  <div className="input-field col s12 m12 l6">
                    <input type="number" className="validate"
                    name="year"
                    maxLength="4"
                    value={book.year}
                    onChange={handleEditInput}                
                    required />
                    <label htmlFor="year" 
                      data-error="Year must be numbers" 
                      id="Year"
                      data-success="">Year <span>*</span></label>
                  </div>
                </div>

                <div className="input-field">
                  <textarea minLength="30" className="materialize-textarea"
                  name="description"
                  id="description"
                  value={book.description}
                  onChange={handleEditInput}
                  data-length="500" required />
                  <label htmlFor="description">Description<span>*</span></label>
                </div>

                <div className="row">
                  <div className="input-field col s12 m12 l12">
                    <label htmlFor="qty">Quantity<span>*</span></label>
                    <input type="number" className="validate"
                    name="quantity"
                    id="qty"
                    value={book.quantity}
                    onChange={handleEditInput}                  
                    maxLength="4"
                    required />
                  </div>

                  <select 
                    name="categoryId" 
                    id="categoryId"
                    className= "browser-default"
                    value={book.Category.category} 
                    onChange={handleEditInput}>
                    <option value={book.categoryId}>
                      {book.Category.category}
                    </option>
                    { loadedCategories.map((val, index) => {                  
                      return (<option 
                                key={index}
                                value={val.id}
                                id={`${val.category}`}>{val.category}
                              </option>)
                    })
                    }
                  </select>
                  <a
                    id="newCategory"
                    href="#addCategory"
                    className="modal-trigger">Add new category
                  </a>
                  </div>

                <div className="row">
                  <div className="file-field input-field uploadImage">
                    <div className="btn">
                      <span>
                        <i className="material-icons">add_a_photo</i>
                      </span>
                      <input type="file" 
                      name="image" 
                      id="bookImage" 
                      accept=".jpg" 
                      onChange={imageUploadHandler}/>
                      
                    </div>
                    <div className="file-path-wrapper">
                      <input 
                        className="file-path"
                        type="text"
                        placeholder="Upload book image"/>           
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="file-field input-field uploadImage">
                    <div className="btn">
                      <span>
                        <i className="material-icons">file_upload</i>
                      </span>
                      <input
                      type="file" name="pdf" 
                      id="bookImage" 
                      accept=".pdf" 
                      onChange={fileUploadHandler}/>
                      
                    </div>
                    <div className="file-path-wrapper">
                      <input
                        className="file-path"
                        type="text"
                        placeholder="Upload book file"/>
                    </div>
                  </div>
                </div>
              

                <div className="row">
                  <div className="input-field center">
                    { loader ? <Loader/> : null }
                    { errorStatus 
                      ?
                      <h6 className="red-text">{error}</h6>
                      : 
                      null
                      }
                  </div>
                </div>
              
                <div className="row">
                  <div className="input-field">
                    <div className="row hiddenBtns">
                      <div className="input-field col s12 m6 l12">
                      <input type="submit"
                        value= "Update book"
                        className="btn submitBtn waves-effect waves-teal custom"
                        id="editBook"/>                      
                      </div>
                    </div>
                  </div>
                </div>
            </form>
          </div>
        </div>
        <CreateCategoryModal/>
      </div>
    }
  </div>
);
};

export default EditBookForm;
