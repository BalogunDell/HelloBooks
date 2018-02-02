import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Loader from '../../presentational/Loader';

/**
 * Books
 * @param {boolean} loadingBooks
 * 
 * @param {array} books
 * 
 * @param {number} getBookId
 * 
 * @param {string} bookAvailabilityMessage
 * 
 * @param {boolean} noProps
 * 
 * @return {JSX} JSX representation of DOM
 */
const Books = ({
  loadingBooks,
  books,
  getBookId,
  bookAvailabilityMessage
}) => {
  return (
    <div>
      { loadingBooks ? 
        <div>
          <h5 className="center"><Loader/></h5>
          <br/>
          <h6 className="center">Loading books..</h6>
          </div>
          : 
          null }
        {/* Row for books  */}
        <div className="row">
          <div className="col s12 m12 l11 offset-l1">
            <div className="books-holder center">
              {books.length === 0 ?
              <h4 className="center">
                {bookAvailabilityMessage}
              </h4>
              :
              books.map((book, id) => 
                <div className="book-holder-prot" key= {book.id}>
                  {/* Book title  */}
                  <div className="item book-title center">
                    <h6><strong>{book.title}</strong></h6>
                  </div>

                  {/* Book image  */}
                  <div className="item img-holder center">
                    <img 
                      src= {book.imageUrl} alt="" 
                      id={(book.title).split(' ')[0]}/>
                    <div className="img-overlay">
                      <p>{book.title} by <strong>{book.author}</strong></p>
                    </div>
                  </div>

                  {/* Book details  */}
                  <div className="dets">
                    <Link to={`/user/bookdetails`} id="bookdetail">
                      <button 
                        type="button"
                        value={book.id}
                        className="btn waves-effect waves-teal"
                        onClick={getBookId}>Details
                      </button>
                    </Link>
                    <p>qty: {book.quantity}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Books;
