import React from 'react';
import { Link, Route } from 'react-router-dom';
/**
 * @class Books
 * @classdesc returns the Books component
 */
const Allbooks = ({ books, path, getBookId}) => {
    return(
      
      <div>
        {/* Row for header  */}
        <div className="row">
          <div className="col s12 books-holder-title center">
            <h1>All Books</h1>
          </div>
        </div>
      
        {/* Row for books  */}
        
        <div className="row">
          <div className="col s12 m12 l11 offset-l1">
            <div className="books-holder center">
              {books.map((book, id) => 
                <div className="book-holder-prot" key= {book.id}>
                  {/* Book title  */}
                  <div className="item book-title center">
                    <h6><strong>{book.title}</strong></h6>
                  </div>

                  {/* Book image  */}
                  <div className="item img-holder center">
                    <img src= {`/images/books/${book.image}`} alt=""/>
                    <div className="img-overlay">
                      <p>{book.title} by <strong>{book.author}</strong></p>
                    </div>
                  </div>

                  {/* Book details  */}
                  <div className="dets">
                    <Link to={`${path}/bookdetails`}>
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
  }

  export default Allbooks;