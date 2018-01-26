import React from 'react'
import { Link } from 'react-router-dom';

  /**
   * Renders book info - BookInfo
   * 
   * @returns {JSX} JSX representation of DOM
  */
const BookInfo = ({
  book,
  isAdmin,
  disableBtn,
  handleBorrow,
  borrowedMessage,
  borrowErrorStatus,
  borrowSuccessStatus
}) => {
  return(
    <div>
      <div className="row">
        <div className="col s12 m12 l6 offset-4 center">
            <img
            src= {book.imageUrl} alt={book.title} 
            className="responsive-img"/>  
        </div>

        <div className="col s12 m12 l3 offset-9">
          <div className="bookInfo">
            <table>
              <thead>
                <tr>
                  <th>
                      {book.title} 
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Author</td>
                    <td>{book.author}</td> 
                </tr>

                <tr>
                  <td>Category</td>
                    <td>{book.category.category}</td> 
                </tr>

                <tr>
                  <td>ISBN</td>
                    <td>{book.isbn}</td> 
                </tr>

                <tr>
                  <td>Year</td>
                    <td>{book.year}</td> 
                </tr>

                <tr>
                  <td>Pages</td>
                    <td>{book.pages}</td> 
                </tr>

                <tr>
                  <td>Quantity Available</td>
                    <td>{book.quantity}</td> 
                </tr>
              </tbody>
            </table>
          </div>

          <hr/>

            <div>
                <p>{book.description}</p> 
            </div>

          <hr/>

            <div>
              <table>
                <tbody>
                  <tr>
                    <td>
                      { isAdmin 
                      ?
                      <Link 
                        to="/user/books"
                        className="btn waves-teal waves-effect">Back
                      </Link>
                      :
                      <button
                        className="btn waves-teal waves-effect" 
                        onClick={handleBorrow}
                        disabled={disableBtn}>BORROW
                      </button>

                      }
                    </td>
                  </tr>
                  <tr
                    className="red-text">
                    <td>{borrowedMessage}</td>
                  </tr>
                  {borrowErrorStatus 
                  ? <tr>
                      <td>
                        <button className="btn waves-teal waves-effect">
                          <Link
                            to="/user/books">Back to library
                          </Link>
                        </button>
                      </td>
                    </tr> 
                  :
                  null 
                  }
                  
                  {borrowSuccessStatus
                    ?
                    <tr>
                      <td>
                        <button className="btn waves-teal waves-effect">
                          <Link 
                            to="/user/history">View history
                          </Link>
                        </button>
                      </td>
                    </tr>
                    :
                    null
                  }
                </tbody>
              </table>
            </div>
        </div>
      </div>
    </div>
  );
}

export default BookInfo;