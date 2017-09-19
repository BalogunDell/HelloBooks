import React from 'react';
import { Link } from 'react-router-dom';

const bookDetails = ({ book, handleBorrowAction, borrowErrorMessage, disableBtn, resetBacktoLibBtn}) => {
  const success = <div className="successMessage">
                    <center>
                      <div>
                         <h5>You have successfully borrowed this book</h5> 
                        {/* <h5>{borrowErrorMessage}</h5> */}
                        <img src="/images/checkmark.gif" alt=""/>
                      </div>
                    </center>
                  </div>
  const failure = <div className="failureMessage">
                      <center>
                        <div>
                          <h6>{borrowErrorMessage}</h6>
                          {/* <img src="/images/checkmark.gif" alt=""/> */}
                          <i className="material-icons">cancel</i>
                        </div>
                      </center>
                    </div>

  const backToLib = <td>
                      <button className="btn waves-teal waves-effect"
                      onClick={resetBacktoLibBtn}>
                        <Link to="/user/books">Back To Library</Link>
                      </button>
                    </td>


  let message = borrowErrorMessage ? failure: ''
  let backToLibBtn = disableBtn ? backToLib : ''
  
 return (
    <div className="row">
      <div className="row">
        <div className="col s12 m12 l6 offset-3 center">
          <h3>Book Details</h3>
        </div>
      </div>

      <div className="row">
        <div className="col s12 m12 l6 offset-4 center">
          <img src= {`/images/books/${book.image}`} alt={book.title} className="responsive-img"/> 
          {/* <ul><li>Helo</li></ul> */}
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
                  <td>Catergory</td>
                  <td>{book.category}</td>
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
                    <td><button className="btn waves-teal waves-effect" onClick={handleBorrowAction} disabled={disableBtn}>BORROW</button></td>
                  </tr>
                  <tr>
                    {backToLibBtn}
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
      </div>

      {/* ERROR OR SUCCESS MESSAGE HERE */}
        {message}
    </div>
  )
}


bookDetails.proType = {
  book: React.PropTypes.object.isRequired
}
export default bookDetails;