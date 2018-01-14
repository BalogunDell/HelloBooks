import React from 'react';
import { connect } from 'react-redux';

import * as bookActions from '../../Actions/booksAction';
import AuthenticateUser from '../HOC/authenticate';
/**
 * @class History
 * @classdesc returns the borrow history of the user
 */
export class BorrowedBooks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: this.props.userID,
      loading: false
    }
  }

  componentWillMount() {
    this.setState({loading: true})
    this.props.getUserBooks().then(() => {
      this.setState({loading:false})
    })
    .catch(error => {
    })
  }

  render() {
    return(
      <div>
          <div className="row">
          <div className="input-field col s12 m12 l4 offset-l1 filter-table">
            <label>Filter table</label>
            <select>
              <option value="">Filter here</option>
              <option value="All books">All books</option>
              <option value="Returned books">Returned books</option>
              <option value="Pending Returns">Pending returns</option> 
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export function mapDispatchToProps (dispatch) {
  return {
    getUserBooks: (userid) => dispatch(bookActions.getUserBooks(userid))
  }
}
AuthenticateUser(BorrowedBooks);
export default connect(null, mapDispatchToProps)(BorrowedBooks);
