import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import {
  getUserBooks,
  returnBook
} from '../../actions/booksAction';
import UserBooks from '../presentational/UserBooks';


/**
 * @description History component
 *
 * @class History
 *
 * @extends {Component}
 */
export class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.userId,
      loading: false,
      allUserBooks: [],
      allbooks: false,
      restricted: false
    }
  }

/**
 * @description React Lifecycle hook -  componentWillReceiveProps
 *
 * @param {object} nextProps
 *
 * @returns {object} updated state
 */
  componentWillReceiveProps(nextProps) {
    if(nextProps.fetchedBooks) {
      this.setState({
        loading: false, 
        allUserBooks: nextProps.fetchedBooks
      });
  }
}

/**
 * @description React Lifecycle hook -  componentDidMount
 *
 * @returns {object} updated state
 */
  componentDidMount() {
    this.props.getUserBooks(this.state.userId)
    .then(() => {
    })
    .catch((error) => {

    });
  }

/**
 * @description React method -  render
 *
 * @returns {JSX} JSX representation of DOM
 */
  render() {
    return(
      <div>
        <div className="row">
          <div className="col s12 books-holder-title center">
            <h1>Borrow History</h1>
          </div>
        </div>
        
        <div className="row borrowHistory">
          <div className="col s12 m12 l11 offset-l1">
            {this.state.allbooks.length === 0 
              ?
                <h3>Loading books...</h3>
              :
                this.state.allUserBooks == undefined
              ?
                <h3>You have no books yet</h3>
              :
                <UserBooks
                  allUserBooks = {this.state.allUserBooks}
                />
              }
          </div>
        </div>
      </div>
    );
  }
}

/**
 * @description HOC - Redux Connect method parameter
 *
 * @param {Object} state
 *
 * @returns {object} action creators
 */
export const mapStateToProps = (state) => {
  return {
    fetchedBooks: state.books.fetchedBooks,
  }
}

/**
 * @description HOC - Redux Connect method parameter
 *
 * @param {Object} dispatch
 *
 * @returns {object} action creators
 */
export const mapDispatchToProps = (dispatch) => {
  return {
    getUserBooks: (userId) => dispatch(getUserBooks(userId)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (History);