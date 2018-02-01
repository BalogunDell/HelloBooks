import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../presentational/Loader';

import {
  createCategory,
  getCategories } from '../../Actions/categoryAction';

/**
 * Create Category Modal component
 *
 * @class CreateCategoryModal
 *
 * @extends {Component}
 */
export class CreateCategoryModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newCategory: '',
      newCategoryError: '',
      newCategoryErrorStatus: false,
      newCategorySuccessStatus: false,
      newCategorySuccess: '',
      loader: false,
      disableSubmit: false
    }

    this.handleInput = this.handleInput.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.loaderText = <h6 className="green-text">Creating category...</h6>
  }

  /** Handles user input - handleInput
  *
  * @param {object} event
  *
  * @return {object} updated state
  */
  handleInput(event) {
    this.setState({newCategory: event.target.value});
  }

  /** Closes the modal - closeModal
  *
  * @param {object} event
  *
  * @return {object} updated state
  */
  closeModal(event) {
    this.setState({
      newCategory: '',
      newCategoryError: '',
      newCategoryErrorStatus: false,
      newCategorySuccessStatus: false,
      newCategorySuccess: '',
      loader: false,
      disableSubmit: false
    });
  }

  /** Saves category - saveCategory
  *
  * @param {object} event
  *
  * @return {object} updated state
  */
  saveCategory(event) {
    event.preventDefault();
    this.setState({ loader: true, disableSubmit:true })
    this.props.createCategory({ category: this.state.newCategory })
    .then(() => {

      this.props.getCategories().then(() => {
        // Get the updated categories
      this.setState({
        loader:false, 
        newCategoryError: '', 
        disableSubmit: true, 
        newCategoryErrorStatus: false,
        newCategorySuccessStatus:true,
        newCategorySuccess: 'Category has been created'});
        setTimeout(() => {
          $('.modal').modal('close');
          this.setState({
            newCategory: '',
            newCategoryError: '',
            newCategoryErrorStatus: false,
            newCategorySuccessStatus: false,
            newCategorySuccess: '',
            loader: false,
            disableSubmit: false
          });
        },3000);
      })
      .catch(() => {
        this.setState({
          loader:false, 
          newCategoryError: 'Internal server error', 
          disableSubmit: false,
          newCategorySuccessStatus: false,
          newCategoryErrorStatus: true
        });
      });
    })
    .catch(error => {
      this.setState({
        loader:false, 
        newCategoryError: error.response.data.error, 
        disableSubmit: false,
        newCategorySuccessStatus: false,
        newCategoryErrorStatus: true });
    });
  }
  
  /** React render method  - saveCategory
  *  
  * @param {object} event
  *
  * @return {JSX} JSX representation of DOM
  */
  render() {
    return (
      <div className="modal" id="addCategory">
        <div className="container">
          <div className="row">
            <h5 className="center">Add New Category</h5>
          </div>
          <div className="row">
            <div className="col s12 m12 l6 offset-l3">
              <div className="modal-content">
                <form onSubmit={this.saveCategory}>
                  <div className="row">
                    <div className="input-field">
                      <input 
                        type="text" name="newCategory" 
                        value={this.state.newCategory}
                        onChange={this.handleInput}
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
                      
                      { this.state.loader ? 
                      <div>
                      <Spinner/>
                      {this.loaderText}
                      </div>
                      : null }
                      
                      { this.state.newCategoryErrorStatus
                      ?
                        <div className="red-text">
                          {this.state.newCategoryError}
                        </div>
                      :
                        null
                      }

                      {this.state.newCategorySuccessStatus
                      ?
                        <div className="green-text">
                          {this.state.newCategorySuccess}
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
                        disabled={this.state.disableSubmit}/>
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <div className="input-field center">
                  <button
                    className="btn waves-effect waves-teal red modal-action modal-close"
                    onClick ={this.closeModal}>Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    getCategories: state
  }
}
export const mapDispatchToProps = (dispatch) => {
  return {
    createCategory: category => dispatch(createCategory(category)),
    getCategories: () => dispatch(getCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategoryModal);