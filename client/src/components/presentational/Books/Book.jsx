import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../presentational/Loader';

/**	
	* @description Rneders the Book component
	*
	* @param  {object} bookData
	*
  * @return {object} dispatch object
  *
	*/
const Book = (bookData) => {
  const books = bookData.bookData.bookData.books
  return (
    <div>
      <div className="row">
      <div className="col s12 books-holder-title">
        <h1 className="trending">Trending Books</h1>
      </div>
  </div>
  <div className="row">
    <div className="col s12 m12 l12">
      <div className="books-holder center">
        {books.map((book, id) => 
          <div className="trending-book-holder-prot" key= {book.id}>

            <div className="item book-title center">
              <h6><strong>{book.title}</strong></h6>
            </div>

            <div className="item img-holder center">
              <img src= {book.imageUrl} alt=""/>
              <div className="img-overlay">
                <p>{book.title} by <strong>{book.author}</strong></p>
              </div>
            </div>

            <div className="dets">
              <Link to={`/login`} id="borrowBook">
                <button 
                  type="button"
                  value={book.id}
                  className="btn waves-effect waves-teal"
                >Borrow Book
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  </div>
  );
};

Book.proptypes = {
  bookData: React.PropTypes.object
}

export default Book;
