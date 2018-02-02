import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import {
  getUserBooks,
  returnBook
} from '../../Actions/booksAction';
import UserBooks from '../presentational/UserBooks';
import authenticate from '../presentational/HOC/authenticate';


/**
 * History component
 *
 * @class History
 *
 * @extends {Component}
 */
export class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.userID,
      loading: false,
      allUserBooks: [],
      allbooks: false,
    }
  }

/**
 * React Lifecycle hook -  componentWillReceiveProps
 *
 * @param {object} nextProps
 *
 * @returns {object} updated state
 */
  componentWillReceiveProps(nextProps) {
    if(nextProps.fetchedBooks.response) {
      this.setState({loading: false, 
        allUserBooks: nextProps.fetchedBooks.response,
      });
  }
}

/**
 * React Lifecycle hook -  componentDidMount
 *
 * @returns {object} updated state
 */
  componentDidMount() {
    this.setState({loading: true})    
    this.props.getUserBooks(this.state.userId).then(() => {
      this.setState({loading:false})
    })
    .catch((error) => {
      this.setState({
        loading: false
      })
    });
  }

/**
 * React method -  render
 *
 * @returns {JSX} JSX representation of DOM
 */
  render() {
    return(
      <div>
        {/* Row for header  */}
        <div className="row">
          <div className="col s12 books-holder-title center">
            <h1>Borrow History</h1>
          </div>
        </div>
      
        {/* Row for books  */}
        
        <div className="row borrowHistory">
          <div className="col s12 m12 l11 offset-l1">
            {this.state.loading 
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
 *  HOC - Redux Connect method parameter
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
 *  HOC - Redux Connect method parameter
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
export default connect(mapStateToProps, mapDispatchToProps)(authenticate(History));