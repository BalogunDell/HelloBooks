import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Userdashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      libaryBooks: {
        title: 'Books in the library',
        availablebooks: 140,
        message: 'Have you read a book today? Borrow from the library now'
      },
      borrowedBooks: {
        count: 1,
        lastbook: {
          booktitle:'Learn Angular 2',
          dateborrowed: '2nd-sept-2017',
          expectedReturnDate: '5th-sept 2017'
        }
      },
      unreturnedBooks: {

      },
      
      notifications: {

      }
    }
  }

  render() {
    return(
      <div>
        <div className="row">
          <div className=" col s12 m12 l10 offset-l1 userDashboard">
            <div>
              <div className="card blue-grey">
                <div className="card-content white-text">
                  <p>{this.state.libaryBooks.message}</p><br/>
                  <span className="card-title"> We have {this.state.libaryBooks.availablebooks} {this.state.libaryBooks.title} yet unborrowed</span>
                </div>
                <div className="card-action black">
                  <Link to='/user/:id/avaiablebooks'>View all</Link>
                </div>
              </div> 
            </div>

            {/* Second flex item  */}

            <div>
              <div className="card grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Total number of books borrowed: {this.state.borrowedBooks.count}</span>
                 
                    <ul>
                      <li>Last borrowed book</li>
                      <li>Title: {this.state.borrowedBooks.lastbook.booktitle}</li>
                      <li>Borrowed on: {this.state.borrowedBooks.lastbook.dateborrowed}</li>
                      <li>To be returned on: {this.state.borrowedBooks.lastbook.expectedReturnDate}</li>
                    </ul>
                </div>
                <div className="card-action black white-text">
                  <Link to='/user/:id/borrowedbooks'>View all borrowed books</Link>
                </div>
              </div> 
            </div>

            
          </div>
        </div>
      </div>
    );
  }
}

export default Userdashboard;