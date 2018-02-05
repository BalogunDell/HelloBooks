import React from 'react';
import { connect } from 'react-redux';

import {
  createCategory,
  getCategories } from '../../actions/categoryAction';
import CategoryModal from '../presentational/CategoryModal';

/**
 * @description Create Category Modal component
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

 /** 
  * @description Handles user input - handleInput
  *
  * @param {object} event
  *
  * @return {object} updated state
  */
  handleInput(event) {
    this.setState({newCategory: event.target.value});
  }

 /** 
  * @description Closes the modal - closeModal
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

 /** 
  * 
  * @description Saves category - saveCategory
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
          disableSubmit: false,
          newCategorySuccessStatus: false,
          newCategoryErrorStatus: true
        });
      });
    })
    .catch(error => {
      this.setState({
        loader:false, 
        disableSubmit: false,
        newCategorySuccessStatus: false,
        newCategoryErrorStatus: true });
    });
  }
  
 /** 
  * 
  * @description React render method  - saveCategory
  *  
  * @param {object} event
  *
  * @return {JSX} JSX representation of DOM
  */
  render() {
    return (
      <div className="modal" id="addCategory">
        <CategoryModal
          saveCategory={this.saveCategory}
          newCategory={this.state.newCategory}
          handleInput={this.handleInput}
          loader={this.state.loader}
          loaderText={this.loaderText}
          newCategoryErrorStatus={this.state.newCategoryErrorStatus}
          newCategoryError={this.state.newCategoryError}
          newCategorySuccessStatus={this.state.newCategorySuccessStatus}
          newCategorySuccess={this.state.newCategorySuccess}
          disableSubmit={this.state.disableSubmit}
          closeModal={this.closeModal}
        />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (CreateCategoryModal);