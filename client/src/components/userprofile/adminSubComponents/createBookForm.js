import React from 'react';

import CreateCategoryModal from './createCategory';

const createBookForm = ({ createBookHandler, handleInput, initialData, createCategory, loadedCategories}) => {
  return (
    <div className="createBookForm">
      <div>
        <h4 className="center">CREATE BOOK</h4>
      </div>

      <div className="create-book">
          <form onSubmit= {createBookHandler} className="create-form" encType="multipart/form-data">
            <div className="input-field">
              <input type="text" name="isbn"
              pattern='[0-9]{6}'
              maxLength="6"
              value={initialData.isbn} 
              onChange={handleInput} 
              className="validate" required/>
              <label htmlFor="isbn" data-error="isbn must be numbers" data-success="">ISBN <span>*</span></label>
            </div>

          <div className="row">
            <div className="input-field col s12 m12 l6">
              <input type="text" className="validate" 
              name="title"
              minLength="3"
              pattern="([a-zA-Z])+$"
              value={initialData.title} 
              onChange={handleInput} required/>
              <label htmlFor="title" data-error="Input is not valid" data-success="">Title<span>*</span></label>
            </div>

            <div className="input-field col s12 m12 l6">
              <input type="text" className="validate" 
              name="author" 
              minLength="3"
              value={initialData.author} 
              onChange={handleInput} required/>
              <label htmlFor="title" data-error="Input is not valid" data-success="">Author<span>*</span></label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12 m12 l6">
              <label>Pages<span>*</span></label>
              <input type="number" className="validate" 
              name="pages"
              maxLength="4"
              value={initialData.pages} 
              onChange={handleInput} required/>
            </div>

            <div className="input-field col s12 m12 l6">
              <input type="number" className="validate" 
              name="year"
              pattern="(\d){4}"
              value={initialData.year} 
              onChange={handleInput} required/>
              <label htmlFor="year" data-error="Year must be numbers" data-success="">Year <span>*</span></label>
            </div>
          </div>

            <div className="input-field">
              <textarea minLength="30" className="materialize-textarea" 
              name="description" 
              value={initialData.description}
              onChange={handleInput}
              data-length="500" required/>
              <label>Description<span>*</span></label>
            </div>

          <div className="row">
            <div className="input-field col s12 m12 l6">
              <label>Quantity<span>*</span></label>
              <input type="number" className="validate" 
              name="quantity"
              maxLength="4"
              onChange={handleInput}
              value={initialData.quantity} required/>
            </div>

            <div className="input-field col s12 m12 l6">
              <select name="category" value={initialData.category} onChange={handleInput}>
                {loadedCategories.map((cat, id) => {
                  <option value={cat.id} key={id}>{cat.category}</option>
                })}
              </select>
              {$('select').material_select()}
              <a id="newCategory" href="#addCategory" className="modal-trigger">Add new category</a>
            </div>
          </div>

          <div className="row">
            <div className="file-field input-field">
              <div className="btn silver">
                <span><i className="material-icons">add_a_photo</i></span>
                <input type="file" name="image" id="bookImage" accept=".jpg" value={initialData.image} onChange={handleInput}/>
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" required type="text"/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="input-field">
              <input type="submit" className="submitBtn waves-effect waves-teal green"/>
            </div>
          </div>
        </form>
      </div>
      <CreateCategoryModal/>
    </div>
  );
}

export default createBookForm;