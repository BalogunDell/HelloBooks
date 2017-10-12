import React from 'react';
import { connect } from 'react-redux';
import Spinner from './loader';

import * as categoryActions from '../../../Actions/categoryAction';

class CreateCategoryModal extends React.Component {
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

  handleInput(event) {
    this.setState({newCategory: event.target.value});
  }

  closeModal(event) {
    this.setState({
      newCategory: '',
      newCategoryError: '',
      newCategoryErrorStatus: false,
      newCategorySuccessStatus: false,
      newCategorySuccess: '',
      loader: false,
      disableSubmit: false
    })
  }
  saveCategory(event) {
    this.setState({loader: true, disableSubmit:true})
    event.preventDefault();
    this.props.createCategory({category: this.state.newCategory})
    .then(()=>{
      this.setState({loader:false, 
        newCategoryError: '', 
        disableSubmit: true, 
        newCategoryErrorStatus: false,
        newCategorySuccessStatus:true,
        newCategorySuccess: 'Category has been created'})
    })
    .catch(error => {
      console.log(error)
      this.setState({
        loader:false, 
        newCategoryError: error.response.data.message, 
        disableSubmit: false,
        newCategorySuccessStatus: false,
        newCategoryErrorStatus: true });
    });
  }

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
                      <input type="text" name="newCategory" value={this.state.newCategory}
                      onChange={this.handleInput}
                      className="validate" required/>
                      <label htmlFor="isbn" data-error="" data-success="">New Category<span>*</span></label>
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
                      
                      {/* Check if error status is true, render error message */}
                      { this.state.newCategoryErrorStatus
                      ?
                        <div className="red-text"> {this.state.newCategoryError}</div>
                      :
                        null
                      }

                      {/* Check if success status is true, render success message */}
                      {this.state.newCategorySuccessStatus
                      ?
                        <div className="green-text">{this.state.newCategorySuccess}</div>
                      :
                      null
                      }
                      
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field center">
                      <input type="submit" className="btn waves-effect waves-teal" disabled={this.state.disableSubmit}/>
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <div className="input-field center">
                  <button className="btn waves-effect waves-teal red modal-action modal-close">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    createCategory: category => dispatch(categoryActions.createCategory(category))
  }
}

export default connect(null, mapDispatchToProps)(CreateCategoryModal);